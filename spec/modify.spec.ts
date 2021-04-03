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

    it('uneffect get dont result in modify', () => {
        const obj = {
            a: {
                b: {
                    c: 1
                },
                d: {
                    e: 1
                }
            }
        }
        
        const newObj = produce(obj, (state) => {
            state.a.d
            state.a.b.c++
        })

        expect(obj.a.d).to.be.equal(newObj.a.d)
    })

    it('multi property modify', () => {
        const obj = {
            a: {
                b: {
                    c: 1,
                    d: 1
                }
            }
        }
        
        const newObj = produce(obj, (state) => {
            state.a.b.c++
            state.a.b.d++
        })

        expect(newObj.a.b.c).to.be.equal(2)
        expect(newObj.a.b.d).to.be.equal(2)
    })
})