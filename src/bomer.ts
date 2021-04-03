import createProxy, { IProxyState } from './createProxy'
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
        let bomerProxy: IProxyState = createProxy(state, null) 
        
        if(action) {
            recipe(bomerProxy, action)
        } else {
            recipe(bomerProxy)
        }
        
        return finalize(bomerProxy)
    } else {
        // curried produce
        let realState: Object = recipe
        let realRecipe: Recipe = state as Recipe

        return (action: Object) => {
            const bomerProxy = createProxy(realState, null)
            realRecipe(realState, action)

            realState = finalize(bomerProxy)
            return realState
        }
    }
}
 
export {
    produce,
    Recipe
}