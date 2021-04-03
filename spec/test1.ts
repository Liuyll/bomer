import { produce } from '../src'
// import produce from 'immer'

const obj = new Map([['a', { b: 1 }]])

const newObj = produce(obj, (state) => {
    state.get('a').b++
})

console.log(obj, newObj)