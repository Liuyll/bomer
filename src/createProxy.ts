export const COPY = Symbol()
export const BASE = Symbol()
export const STATE = Symbol()
export const CHANGED = Symbol()

const handler = {
    get(target,key) {
        if(key === STATE) return target
        if(key === BASE) return target.base
        if(key === COPY) return target.copy
        if(key === CHANGED) return target.isChanged

        let value = getSource(target,key)
        if(Array.isArray(value) || Object.prototype.toString.call(value) === '[object Object]') {
            if(target.scope[key]) return target.scope[key]
            return target.scope[key] = createProxy(value)
        }
        return value
    },
    set(target,key,val) {
        if(key === COPY) return target.copy = val
        if(key === BASE) throw new Error("Error: base can't change")
        if(getSource(target,key) === val) return true
        if(!target.isChanged) markChanged(target)    
        if(target.scope[key]) delete target.scope[key]
        return target.copy[key] = val
    }
}


function markChanged(state) {
    if(state.isChanged) return
    state.isChanged = true
    state.copy = {}
}

function getSource(state,key) {
    return state.isChanged ? state.copy[key] : state.base[key]; 
}

export default function createProxy(state) {
    const proxyState = {
        base: state,
        copy: null,
        isChanged: false,
        scope: {}
    }

    const {proxy, revoke} = Proxy.revocable(proxyState,handler)
    proxyState['revoke'] = revoke
    return proxy
}