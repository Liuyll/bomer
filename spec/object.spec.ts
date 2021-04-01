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
})

