import 'mocha'

import { produce } from '../src'
import { expect } from 'chai'

describe('immutable object', () => {
    it('nest object change', () => {
        const obj = {
            a: {
                b: 1
            }
        }
        
        const newObj = produce(obj, (state) => state.a.b = 2)

        expect(newObj.a.b).to.be.equal(2)
    })

    it('delete property', () => {
        const obj = {
            a: {
                b: 1,
                c: 1
            }
        }
        
        const newObj = produce(obj, (state) => delete state.a.b)

        expect(newObj.a.b).to.be.equal(undefined)
    })

    it('delete property(rawObj is not modify)', () => {
        const obj = {
            a: {
                b: 1,
                c: 1
            }
        }
        
        const newObj = produce(obj, (state) => delete state.a.b)

        expect(obj.a.b).to.be.not.equal(undefined)
    })

    it('new property', () => {
        const obj = {
            a: {
                b: 1,
            }
        }
        
        const newObj = produce(obj, (state) => state.a.c = 1)

        expect(newObj.a.c).to.be.not.equal(undefined)
    })


})

