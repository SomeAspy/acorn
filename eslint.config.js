// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
    eslint.configs.recommended,
    {ignores: ["out", "*.config.js"]},
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                project: true,
                tsconfigRootDir: "./tsconfig.json"
            }
        },
        rules: {
            "no-constant-binary-expression": 0,
            "@typescript-eslint/no-non-null-assertion": 0,
            "@typescript-eslint/no-unused-vars": [
                2,
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_"
                }
            ],
            "@typescript-eslint/no-misused-promises": [
                "error",
                {
                    "checksVoidReturn": false
                }
            ]
        }
    }
);
