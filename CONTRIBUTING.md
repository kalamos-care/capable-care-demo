# Contributing Guidelines

## Branches and naming

The main branch of this repository is called `main` and all incomming PRs should be made against it. Please prefix your PR with (bug/chore/feature) depending on the nature of your PR. If applicable (for most cases), please link the corresponding Shortcut ticket to your PR by typing in [ch{shortcut-ticket-number}] into the description field of your PR.

Any PRs merged into `main` get automatically deployed, so please test your PRs accordingly.

No PRs should be merged without an approval from at least one reviewer with passing linting/formatting checks.

Before merging, make sure your PR is rebased or has pulled in the latest changes from the `main` branch.

## Setup your development environment

We use [prettier](https://prettier.io/) to format the code in our repository. Please follow the steps to [setup your editor of choice](https://prettier.io/docs/en/editors.html) with the prettier extension so that your code meets our formatting guidelines. Alternatively, you can run `yarn prettier --write .` to format all the files in one go. If you choose that option, please make sure to do so as one separate commit.

### VS Code + Prettier extension:

- Install [VS Code prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- Include the following lines in the `settings.json` of your VS Code editor:
  ```
  {
      "editor.formatOnSave": true, // prettier will automatically format your files on each save
      "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
  ```
- Prettier will now automatically format your files as you save them
