import js from '@eslint/js';
import json from '@eslint/json';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
    globalIgnores(['dist', "package-lock.json"]),
    {
        plugins: {
            json,
        },
    },
    {
        files: ['**/*.{js,jsx}'],
        extends: [
            js.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                ecmaVersion: 'latest',
                ecmaFeatures: { jsx: true },
                sourceType: 'module',
            },
        },
        rules: {
            'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }],
            'prefer-const': ['error'],
            'indent': ['error', 4],
            'semi': 'error',
            'react-hooks/exhaustive-deps': 'off'
        },
    },
    {
        files: ['**/*.json'],
        language: "json/json",
        extends: [json.configs.recommended],
    },
    {
        files: ['**/*.{ts,tsx}'],
        plugins: { '@typescript-eslint': tseslint.plugin },
        extends: [
            tseslint.configs.recommended
        ],
        rules: {
            'indent': ['error', 4],
            'semi': 'error',
        },
    },
]);
