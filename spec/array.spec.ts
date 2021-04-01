import 'mocha'

import { produce } from '../src'
import { expect } from 'chai'

describe('immutable array', () => {
    it('nest array change', () => {
        const obj = {
            a: [1,2,3]
        }

        const newObj = produce(obj, (state) => {
            state.a[1] = 'change'
        })

        expect(newObj.a[1]).to.be.equal('change')
    })

    it('root array change', () => {
        const obj = [1,2,3]

        const newObj = produce(obj, (state) => {
            state[1] = 'change'
        })

        expect(newObj[1]).to.be.equal('change')
    })

    it('array function: push', () => {
        const obj = [1,2,3]

        const newObj = produce(obj, (state) => {
            state.push('new')
        })

        expect(newObj[newObj.length - 1]).to.be.equal('new')
    })

    it('array function: splice', () => {
        const obj = [1,2,3]

        const newObj = produce(obj, (state) => {
            state.splice(0, 1, 'new')
        })

        expect(newObj[0]).to.be.equal('new')
    })

    it('array function: pop', () => {
        const obj = [1,2,3]

        const newObj = produce(obj, (state) => {
            state.pop()
        })

        expect(newObj[newObj.length - 1]).to.be.equal(obj[obj.length - 2])
    })

    it('array function: splice', () => {
        const obj = [1,2,3]

        const newObj = produce(obj, (state) => {
            state.splice(0, 1, 'new')
        })

        expect(newObj[0]).to.be.equal('new')
    })
})

