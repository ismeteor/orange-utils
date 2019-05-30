
let rollupTypescript = require("rollup-plugin-typescript");
module.exports = {
    input: 'src/main.ts',
    output: {
        file: 'lib/bundle.js',
        format: 'cjs'
    },
    plugins: [
        rollupTypescript({lib: ["es5", "es6", "dom"], target: "es5"})
    ]
}