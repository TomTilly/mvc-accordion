# Parcel Boilerplate

This is a boilerplate for a static website using the Parcel bundler. Comes with Babel (uses preset-env), ESLint (uses Airbnb's styleguide as a base), Prettier, Autoprefixer, Sass, and posthtml-include for HTML partials. I've also included my VSCode settings so you can get nice code linting and formatting right in your editor if you'd like. See notes below for details.

## Usage

**1) Clone this repo**

**2) Install dependencies**

```

npm i

```

**3) Start server and start building**

```

npm start

```

When you're ready to launch for production:

```

npm run build

```

## HTML Partials

Put partials in `src/html/partials` and include them with `<include src="partial-name.html"></include>`. The current directory referenced within relative URL paths within partials is the directory containing the file that included the partial.

## Using my VSCode setup

You can find my VSCode settings in `.vscode/settings.json`. You can use these settings as is, or copy them over and use them as a base for your user `settings.json`. They should automatically apply if you open the root of this project in VSCode.

In order for these settings to work properly, you'll need to install a number of VS Code extensions:

1. [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
2. [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
3. [Cobalt2 Theme Official](https://marketplace.visualstudio.com/items?itemName=wesbos.theme-cobalt2)
4. [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)

An important thing to note with my setup is that I run Prettier through ESLint, using ESLint's formatter for JS files. This is why the default Javascript validator and formatter that come with VSCode are disabled. I do, however, use Prettier to format everything else, including inline JavaScript in `<script>` elements within HTML documents. This is because I couldn't figure out how to get Prettier's formatter to ignore content within `<script>` elements (`"html.format.contentUnformatted": "script"` doesn't work). I suspect that Prettier is being applied both through ESLint and through the Prettier extension for these elements. It doesn't seem to cause any issues, but I hope to figure out an elegant solution in the future.

You can alter the Prettier and ESLint settings to your liking in their respective config files (`.prettierrc.json` and `.eslintrc.json`). Note that the Prettier rules within `.eslintrc.json` will only apply within JS files, so you'll also have to update them in `.prettierrc.json`.
