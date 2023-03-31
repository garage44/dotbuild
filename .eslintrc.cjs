module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:vue/vue3-recommended',
    ],
    globals: {
        $: true,
        app: true,
        globalThis: true,
    },
    ignorePatterns: ['node_modules/', 'protocol.js'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },    
    plugins: [
        'import',
        'sort-class-members',
    ],
    root: true,
    rules: {
        'array-bracket-spacing': [2, 'never'],
        'comma-dangle': [2, 'always-multiline'],
        'eol-last': [2, 'always'],
        'import/first': [2],
        'import/named': [0],
        'import/newline-after-import': [2, {count: 1}],
        'import/no-unresolved': [0],
        indent: ['error', 4],
        'keyword-spacing': [2, {
            after: true,
            before: true,
        }],
        'lines-between-class-members': [2, 'always'],
        
        'no-cond-assign': ['error', 'always'],
        'no-console': [2],
        'no-inline-comments': 'off',
        'no-multiple-empty-lines': [2, {max: 1, maxBOF: 0, maxEOF: 1}],
        'object-curly-spacing': [2, 'never'],
        'one-var': 'off',
        'quote-props': [2, 'as-needed'],
        semi: [2, 'never'],
        'sort-class-members/sort-class-members': [2, {
            accessorPairPositioning: 'getThenSet',
            groups: {
                'conventional-private-methods': [
                    {
                        name: '/_.+/',
                        sort: 'alphabetical',
                        type: 'method',
                    },
                ],
                methods: [
                    {
                        sort: 'alphabetical',
                        type: 'method',
                    },
                ],
            },
            order: [
                'constructor',
                '[static-properties]',
                '[static-methods]',
                '[conventional-private-properties]',
                '[conventional-private-methods]',
                '[properties]',
                '[methods]',
                '[everything-else]',
            ],
            stopAfterFirstProblem: true,
        }],
        'sort-imports': [2, {
            ignoreCase: true,
            ignoreDeclarationSort: false,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ['none',  'all', 'single', 'multiple'],
        }],
        'sort-vars': [2, {ignoreCase: true}],
        'space-before-function-paren': [2, 'never'],
        'space-in-brackets': [0, 'never'],
        'spaced-comment': [2, 'always'],
        strict: [2, 'global'],

        'use-isnan': 2,
        'vue/attributes-order': [2, {
            alphabetical: true,
            order: [
                'DEFINITION',
                'LIST_RENDERING',
                'CONDITIONALS',
                'RENDER_MODIFIERS',
                'GLOBAL',
                'UNIQUE',
                'TWO_WAY_BINDING',
                'OTHER_DIRECTIVES',
                'OTHER_ATTR',
                'EVENTS',
                'CONTENT',
            ],
        }],
        'vue/html-indent': ['error', 4],
        'vue/max-attributes-per-line': ['error', {
            multiline: {
                allowFirstLine: false,
                max: 2,
            },
            singleline: 3,
        }],
        'vue/no-v-html': 0,
        'vue/order-in-components': 'off',
        'vue/padding-line-between-blocks': [2],
        'vue/sort-keys': [2, 'asc', {
            caseSensitive: false,
            ignoreChildrenOf: ['model'],
            ignoreGrandchildrenOf: ['computed', 'directives', 'inject', 'props', 'watch'],
            minKeys: 2,
            natural: false,
        }],
    },
}
