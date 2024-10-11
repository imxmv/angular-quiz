import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config({
    files: ["**/*.ts"],
    plugins: {
        "@typescript-eslint": tseslint.plugin,
    },
    languageOptions: {
        parser: tseslint.parser,
        parserOptions: {
            projectService: true,
            tsconfigRootDir: import.meta.dirname,
        },
    },
    extends: [
        eslint.configs.recommended,
        ...tseslint.configs.recommended,
        ...tseslint.configs.stylistic,
    ],
    rules: {
        "@typescript-eslint/typedef": [
            "error",
            {
                arrowParameter: true,
                variableDeclaration: true,
                propertyDeclaration: true,
                memberVariableDeclaration: true,
                parameter: true,
            },
        ],
    },
});
