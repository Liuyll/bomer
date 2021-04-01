import { useState, useCallback, useReducer } from 'react'
import { produce } from '.'

export const useImmutable = (state) => {
    const [store, setStore] = useState(state)
    const mutable = useCallback((recipe) => {
        setStore(produce(store,recipe))
    },[])
    return [store, mutable]
}

export const useImmutableReducer = (reducer, initState) => {
    const patchReducer = useCallback((state,action) => produce(state,reducer,action),[])
    return useReducer(patchReducer,initState)
}