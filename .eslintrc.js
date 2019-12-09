module.exports = {
    "env": {
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "quotes": ["error", "single"],
        "object-curly-newline": ["error", {
            multiline: true,
            minProperties: 3,
        }],
        "object-curly-spacing": ["error", "always"],
        "require-atomic-updates": "off",
    }
};