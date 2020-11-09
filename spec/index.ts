import { produce } from '../src'

const a = {
    a:1,
    b:2,
    c: {
        aa:1,
        bb:2
    }
}

const b = produce(a,(s) => {
    s.c.aa = 3
    s.c.bb = 4
})

const c = produce(b,(s) => {
    s.b = 10
})

console.log(a)
console.log(b)
console.log(c)