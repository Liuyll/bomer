import 'mocha'

import { produce } from '../src'
import { expect } from 'chai'

describe('modify changed object', () => {
    it('only change variation area-unmodify', () => {
        const obj = {
            a: {
                b: 1,
                e: {
                    f: 1
                }
            },
            c: {
                d: 2
            }
        }

        const newObj = produce(obj, (state) => {
            state.a.b = 2
        })

        expect(newObj.c).to.be.equal(obj.c)
    })

    it('only change variation area-modify', () => {
        const obj = {
            a: {
                b: 1,
                e: {
                    f: 1
                }
            },
            c: {
                d: 2
            }
        }

        const newObj = produce(obj, (state) => {
            state.a.b = 2
        })

        expect(newObj.a).to.be.not.equal(obj.a)
    })
})