# bomer

## use
```
import { produce } from 'bomer'

const a = {a:1,b:2}
const b = produce(a, (s) => s.a = 3)
```

## use in react
### useImmutable
like this:
```
import { useImmutable } from 'bomer'

function App() {
    const [state,recipe] = useImmutable({a:{b:{c:1}}})
    return <button onClick={() => recipe(s => s.a.b.c++)}>{state.a}</button>
}
```
as above, you did't need to create a nested object by `...`operator no more.

### useImmutableReducer
```
import { useImmutableReducer } from 'bomer'

function App() {
    const [state, dispatch] = useImmutableReducer((action,state) => {
        switch(action) {
            case 'abc':
                state.a.b.c.value++;
                break;
            case 'ab':
                state.a.b.value++;
                break;
            case 'a':
                state.a.value++;
        }
    },{
        a:{
            value:1,
            b:{
                value:2,
                c:{
                    value:3
                }
            }
        }
    })
}
```

esay!
