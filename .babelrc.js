module.exports = {
    "presets": [
        require('@babel/preset-env'),
        require("@babel/preset-typescript")
    ],
    "plugins": [
        "@babel/proposal-class-properties",
        "@babel/proposal-object-rest-spread"
    ]
}