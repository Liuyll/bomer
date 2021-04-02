import createProxy, { closeCatching, IProxyState, startCatching } from './createProxy'
import finalize from './finalize'

type Recipe = (state: any, ...args : any[]) => void
interface ICurried {
    (action: Object): void
}

function produce(recipe: Recipe): ICurried;
function produce(recipe: Recipe, initState: Object): ICurried;
function produce(state: Object, recipe: Recipe)
function produce(state: Object, recipe: Recipe, action: Object)

function produce(state: Object, recipe ?: Recipe, action ?: Object) {
    if(typeof state !== 'function') {
        if(typeof recipe !== 'function') throw new Error()
        startCatching()
        let bomerProxy: IProxyState = createProxy(state) 
        
        if(action) {
            recipe(bomerProxy, action)
        } else {
            recipe(bomerProxy)
        }
        closeCatching()
        
        return finalize(bomerProxy)
    } else {
        // curried produce
        let realState: Object = recipe
        let realRecipe: Recipe = state as Recipe

        return (action: Object) => {
            startCatching()
            const bomerProxy = createProxy(realState)
            realRecipe(realState, action)
            closeCatching()

            realState = finalize(bomerProxy)
            return realState
        }
    }
}
 
export {
    produce,
    Recipe
}