import { COPY, BASE, STATE, IProxyState } from './createProxy'


export default function finalize(state: IProxyState) {
    state[COPY] = state[COPY] || {}
    
    let newCopy
    if(Array.isArray(state[BASE])) {
        newCopy = [...state[BASE]]
        for(let key in state[COPY]) {
            newCopy[key] = state[COPY][key]
        }
    } else {
        newCopy = {...state[BASE], ...state[COPY]}
    }

    for(let key of Object.getOwnPropertyNames(state[BASE])) {
        if(Object.prototype.toString.call(state[key]) === '[object Object]') newCopy[key] = finalize(state[STATE].scope[key])
    }
    state[COPY] = newCopy
    state[STATE].revoke()
    Object.freeze(newCopy)
    return newCopy
}


