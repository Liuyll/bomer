import { COPY, BASE, STATE, IProxyState, MODIFYCHAIN, DELETE } from './createProxy'

export default function finalize(state: IProxyState) {
    let isModify: boolean
    if(state[COPY] || state[DELETE]) isModify = true
    if(!isModify && state[MODIFYCHAIN]) isModify = true

    state[COPY] = state[COPY] || {}
    
    let newCopy: unknown
    if(isModify) {
        if(Array.isArray(state[BASE])) {
            newCopy = [...state[BASE]]
            for(let key in state[COPY]) {
                newCopy[key] = state[COPY][key]
            }
        } else {
            switch(Object.prototype.toString.call(state[BASE])) {
            case '[object Object]':
                newCopy = {...state[BASE], ...state[COPY]}
                break
            case '[object Map]':
                newCopy = new Map()
                ;(state[BASE] as Map<any, any>).forEach((val, key) => {
                    (newCopy as Map<any, any>).set(key, val)
                })
                console.log(newCopy)
            }   
        }

        if(state[DELETE]) {
            (state[DELETE] as IProxyState['deletes']).forEach(key => {
                delete newCopy[key]
            })
        }
    } else {
        newCopy = state[BASE]
    }
    
    if(isModify) {
        // TODO: //
        for(let key of Object.getOwnPropertyNames(newCopy)) {
            if(Object.prototype.toString.call(state[key]) === '[object Object]') {
                newCopy[key] = finalize(state[STATE].scope[key])
            }
        }
    }
    
    state[COPY] = newCopy
    state[STATE].revoke()
    Object.freeze(newCopy)

    return newCopy
}


