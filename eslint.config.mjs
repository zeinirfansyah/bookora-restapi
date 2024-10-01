import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
    {
        files: ['**/*.{js,mjs,cjs,ts}'],
        ignores: [
            '**/node_modules/**/*',
            '**/dist/**/*',
            '**/build/**/*',
            '**/public/**/*'
        ],
        rules: {}
    },
    { languageOptions: { globals: globals.node } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended
]
