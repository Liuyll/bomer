import typescript from 'rollup-plugin-typescript'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import react from 'react'

export default {
    input: 'src/index.ts',
    output: [
        { name: 'bomer', file: 'lib/bomer.js', format: 'umd', sourcemap: false, exports: 'auto' },
        { name: 'bomer', file: 'lib/bomer.esm.mjs', format: 'es', sourcemap: false, exports: 'auto' }
    ],
    plugins: [
        typescript({
            exclude: 'node_modules/**',
            typescript: require('typescript')
        }),
        babel(),
        commonjs({
            include: 'node_modules/**',
            namedExports: {
                'react': Object.keys(react)
            }
        })
    ]
}