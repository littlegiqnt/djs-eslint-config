import stylisticPlugin from "@stylistic/eslint-plugin";
import eslint from "@eslint/js";
import tsEslint, { type ConfigWithExtends } from "typescript-eslint";

interface CreateConfigOptions {
    rootDir: string;
}

export const createConfig = (options: CreateConfigOptions) => tsEslint.config(
    eslint.configs.recommended,
    ...tsEslint.configs.strictTypeChecked,
    ...tsEslint.configs.stylisticTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: options.rootDir,
            },
        },
    },
    stylisticPlugin.configs["disable-legacy"] as ConfigWithExtends,
    stylisticPlugin.configs.customize({
        flat: true,
        indent: 4,
        quotes: "double",
        semi: true,
        arrowParens: true,
        blockSpacing: true,
        braceStyle: "1tbs",
        commaDangle: "always-multiline",
        quoteProps: "consistent-as-needed",
    }) as ConfigWithExtends,
    {
        rules: {
            "@stylistic/indent": ["error", 4, {
                ArrayExpression: 1,
                CallExpression: { arguments: 1 },
                flatTernaryExpressions: true,
                FunctionDeclaration: { body: 1, parameters: 1 },
                FunctionExpression: { body: 1, parameters: 1 },
                ignoreComments: false,
                ignoredNodes: [
                    "TemplateLiteral *",
                    "TSUnionType",
                    "TSIntersectionType",
                    "TSTypeParameterInstantiation",
                    "FunctionExpression > .params[decorators.length > 0]",
                    "FunctionExpression > .params > :matches(Decorator, :not(:first-child))",
                ],
                ImportDeclaration: 1,
                MemberExpression: 1,
                ObjectExpression: 1,
                offsetTernaryExpressions: true,
                outerIIFEBody: 1,
                SwitchCase: 1,
                VariableDeclarator: 1,
            }],
            "@stylistic/multiline-ternary": "off",
            "@typescript-eslint/no-unnecessary-type-parameters": "off",
            "@typescript-eslint/restrict-template-expressions": ["error", { allowNumber: true }],
            "@typescript-eslint/strict-boolean-expressions": "error",
        },
    },
);
