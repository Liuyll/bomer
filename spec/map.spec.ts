import 'mocha'

import { produce } from '../src'
import { expect } from 'chai'

describe('immutable map', () => {
    it('general map', () => {
        const obj = new Map([['a', { b: 1 }]])

        const newObj = produce(obj, (state) => {
            state.get('a').b++
        })

        expect(newObj.get('a').b).to.be.equal(2)
    })

    it('general map immutable', () => {
        const obj = new Map([['a', { b: 1, c: {
            d: 1
        } }]])

        const newObj = produce(obj, (state) => {
            state.get('a').b++
        })

        expect(newObj).to.be.not.equal(obj)
        expect(newObj.get('a')).to.be.not.equal(obj.get('a'))
        expect(newObj.get('a').c).to.be.equal(obj.get('a').c)
    })
})