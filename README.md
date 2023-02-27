# example Gatsby Site

### Overview
Created from [gatsby-starter-wordpress-blog](https://github.com/gatsbyjs/gatsby-starter-wordpress-blog)

GatsbyJS is a free and open source static site generator, based on React and powered by GraphQL.

Learn more at [GatsbyJS.org](https://www.gatsbyjs.org/).

## Local Development Setup

### Prerequisites

- Node 16.00.0+ (for local development, use nvm to install and utilize the appropriate version of node)
- Gatsby CLI ([see docs for install instructions](https://www.gatsbyjs.org/docs/gatsby-cli/))


### Setup Instructions

1. Clone the repo.

```shell
git clone git@github.com:weareenvoy/example-gatsby.git
```

OR

```shell
git clone https://github.com/weareenvoy/example-gatsby.git
```

2. Change to the project root directory.

```shell
cd example-gatsby
```

3. Run npm install.

```shell
npm install
```

### Environment Variables

GatsbyJS uses `.env.*` files for enviroment specific variables. Learn more [here](https://www.gatsbyjs.org/docs/environment-variables/)

The `.env.*` files for this project can be found in Envoy's shared LastPass space.


### VSCode Workspace Settings

`.vscode/settings.json` is an optional folder and file you can add to the root of the project that will store this projects specific VSCode workspace settings. Below is an example of settings that can be added to settings.json that fixes eslint issues on save:

```
{
  // These are all my auto-save configs
  "editor.formatOnSave": true,
  // turn it off for JS and JSX, we will do this via eslint
  "[javascript]": {
    "editor.formatOnSave": false
  },
  "[javascriptreact]": {
    "editor.formatOnSave": false
  },
  // tell the ESLint plugin to run on save
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  // Optional BUT IMPORTANT: If you have the prettier extension enabled for other languages like CSS and HTML, turn it off for JS since we are doing it through Eslint already
  "prettier.disableLanguages": ["javascript", "javascriptreact"]
}

```

## Commands

- **Start a development server**

  ```shell
  npm run start
  ```
  Starts a hot-reloading development environment; accessible by default at [localhost:8000](http://localhost:8000).

- **Create a production build**

  ```shell
  npm run build
  ```
  Executes an optimized production build; generating static HTML and per-route JavaScript code bundles.

  The build files are generated and stored in the `public` directory of the project root.

- **Serve the production build locally, for testing**

  ```shell
  npm run serve
  ```

  Starts a local HTML server for testing your built site. Remember to build your site using `npm run build` before using this command.

## Package Management

| NOTE: Be sure to only use `npm` to manage packages in this project, NOT `yarn` or `pnpm` or any other package manager. We're using the _Highlander Principle_ here. |
| :--- |

## Git Flow

When checking out a new branch, be sure to branch off of `staging`.

1. Create your new branch from `staging`

2. Use the following naming conventions:
   - Feature branches: `feature/short-descriptive-title`
   - Hotfix branches: `hotfix/short-descriptive-title`
   
3. Do your work on your newly created feature or hotfix branch and commit.

4. Push your branch to the remote repo and open a PR to merge into `staging`.

5. Add appropriate reviews.

6. Once PR is approved, merge and delete the branch from the remote repo.

7. Rinse and repeat.

## Additional Info

- [GatsbyJS Documentation](https://www.gatsbyjs.org/docs/)
