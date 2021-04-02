import { produce } from '../src'

const obj = new Map([['a', {'b': 1}]])

const newObj = produce(obj, (state) => state.get('a').b = 10)
console.log(obj, newObj)