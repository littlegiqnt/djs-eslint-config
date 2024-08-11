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
            "@typescript-eslint/no-unnecessary-type-parameters": "off",
        },
    },
);
