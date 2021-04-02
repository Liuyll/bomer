import { useState, useCallback, useReducer } from 'react'
import { produce } from '.'
import { Recipe } from './bomer'

export const useImmutable = (state) => {
    const [store, setStore] = useState(state)
    const mutable = useCallback((recipe) => {
        setStore(produce(recipe, store))
    },[])
    return [store, mutable]
}

export const useImmutableReducer = (reducer: Recipe, initState) => {
    const patchReducer = useCallback((state: Object, action) => produce(state, reducer, action), [])
    return useReducer(patchReducer,initState)
}