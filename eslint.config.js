import js from '@eslint/js';

export default [
    js.configs.recommended,

    {
        ignores: [
            'node_modules/**',
            'client/dist/**',
            'server/dist/**',
            'coverage/**',
        ],
    },
];