import { COPY, BASE, STATE } from './createProxy'

export default function finalize(state) {
    state[COPY] = state[COPY] || {}
    let newCopy = Array.isArray(state[BASE]) ? [...state[BASE], ...state[COPY]] : {...state[BASE], ...state[COPY]}
    for(let key of Object.getOwnPropertyNames(state[BASE])) {
        if(Object.prototype.toString.call(state[key]) === '[object Object]') newCopy[key] = finalize(state[STATE].scope[key])
    }
    state[COPY] = newCopy
    state[STATE].revoke()
    Object.freeze(newCopy)
    return newCopy
}


