import createProxy from './createProxy'
import finalize from './finalize'

export default class Bomer {
    static produce(state,recipe,...args) {
        if(typeof recipe !== 'function') throw new Error()
        const bomerProxy = createProxy(state)
        args.length && recipe(bomerProxy,...args) || recipe(bomerProxy)
        return finalize(bomerProxy)
    }
}

