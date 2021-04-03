export const COPY = Symbol()
export const BASE = Symbol()
export const STATE = Symbol()
export const CHANGED = Symbol()
export const MODIFYCHAIN = Symbol()
export const DELETE = Symbol()

interface IProxyState {
    base: Object,
    copy: {
        [key: string]: any
    },
    isChanged: boolean,
    scope: Object,
    revoke: Function,
    isArray: boolean,
    inModifyChain: boolean,
    deletes: string[],
    parent: IProxyState
}

const getHandler = () => {
    return {
        get(target: IProxyState, key) {
            if(key === STATE) return target
            if(key === BASE) return target.base
            if(key === COPY) return target.copy
            if(key === CHANGED) return target.isChanged
            if(key === MODIFYCHAIN) return target.inModifyChain
            if(key === DELETE) return target.deletes
            let value = getSource(target, key)
    
            if(Array.isArray(value) || Object.prototype.toString.call(value) === '[object Object]') {
                if(target.scope[key]) return target.scope[key]
                return target.scope[key] = createProxy(value, target)
            }

            if(target.base instanceof Map) {
                if(key === 'get') {
                    const get = (key) => {
                        if(target.scope[key]) return target.scope[key]
                        const source = value.call(target.base, key)
                        if(Array.isArray(source) || Object.prototype.toString.call(source) === '[object Object]') {
                            return target.scope[key] = createProxy(source, target)
                        } 
                        return target.scope[key] = source
                    }
                    return get
                }
            }

            return value
        },
        set(target: IProxyState,key,val) {
            if(key === COPY) return target.copy = val
            if(key === BASE) throw new Error("Error: base can't change")
            if(getSource(target,key) === val) return true
            if(!target.isChanged) markChanged(target)    
            if(target.scope[key]) delete target.scope[key]

            // bp modify chain
            bpModifyChain(target)

            target.copy[key] = val
            return true
        },
        deleteProperty(target: IProxyState, key: any): boolean {
            if(!target.deletes) target.deletes = []
            if(!target.base.hasOwnProperty(key)) return true
            target.deletes.push(key)

            bpModifyChain(target)
            return true
        }
    }
}

function bpModifyChain(target: IProxyState) {
    while(target) {
        target.inModifyChain = true
        target = target.parent
    }
}

function markChanged(state: IProxyState) {
    if(state.isChanged) return
    state.isChanged = true
    state.copy = {}
}

function getSource(state,key) {
    if(state.isChanged) {
        return state.copy[key] !== undefined ? state.copy[key] : state.base[key]
    } 
    return state.base[key]
}

export default function createProxy(state, parent: IProxyState): IProxyState {
    const proxyState: IProxyState = {
        base: state,
        copy: null,
        isChanged: false,
        scope: {},
        isArray: Array.isArray(state),
        revoke: null,
        inModifyChain: false,
        deletes: null,
        parent
    }

    const {proxy, revoke} = Proxy.revocable(proxyState, getHandler())
    proxyState.revoke = revoke
    return proxy
}

export {
    IProxyState
}