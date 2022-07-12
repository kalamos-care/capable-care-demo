# Capable Care reference implementation

This repository provides a working example of a React-based web application integrating Capable Health's authentication mechanism and patient API endpoints, such as care plans, goals, and tasks. For more information on Capable Health's API, [see the documentation and API specification](https://docs.capablehealth.com/).

---

## Requirements

- Node 16.14.2
  (`nvm install 16.14.2`)
- Yarn
  (`brew install yarn`)

## Getting Started

### Configure the environment

In development, copy `.env.sample` to `.env` and to `.env.local` and update accordingly.

#### Authentication

In order to configure authentication, you will need to add a `COGNITO_REGION`,
a `COGNITO_USER_POOL_ID` and a `COGNITO_USER_POOL_WEB_CLIENT_ID` all of which
can be found in your portal.  
Once configured you will be able to sign in and all
patient requests to the Capable Health api will be scoped to that user.

Read [our authentication overview](https://docs.capablehealth.com/docs/authentication) for more details.

#### CMS keys

This application uses Contentful to serve images and copy that isn't stored in Capable
Health.  
To do this you will need to add a `CONTENTFUL_SPACE_ID` and a
`CONTENTFUL_DELIVERY_TOKEN` to your .env.

#### Sentry keys

This application uses Sentry for error reporting. These variables are not required
for local development.

In your staging/production environments, you will need to add the `SENTRY_DSN`
and `SENTRY_ENVIRONMENT` to your .env. You can find the DSN in your project
settings by navigating to `[Project] > Settings > Client Keys (DSN)` in [sentry.io](https://sentry.io).  
The `SENTRY_DSN` is safe to keep public if needed because they do not allow read access
to any information.

### Run the application

```bash
yarn
yarn start
```

This will install package and run the application in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes. You may also see lint errors in the console.

## Customizing the application

There are a number of ENV variables that can be used to make aesthetic changes
to the application. The process works locally and in deployed environments.

For example, perhaps you want to change the primary color from blue (`#0100c8`)
to fluorescent green (`#00FF00`), you would find the `REACT_APP_COLOR` ENV
variable in the .env.local file and change:

```text
REACT_APP_COLOR='#0100c8' --> REACT_APP_COLOR='#00FF00'
```

To see the changes you will need to restart your server.

In a deployed environment, like Render, you will need to find the ENV variables
for the application you want to modify, change them, and then trigger a rebuild
and deploy.

These are the available styling variables:

- `REACT_APP_COLOR` for changing the primary color used by the app.
- `REACT_APP_LOGO` for changing the light copy logo used in the app.
  (This logo is currently used in the home screen header.)
- `REACT_APP_LOGO_DARK` for changing the dark copy logo used in the app.
  (This logo is currently used on the login page.)
- `REACT_APP_FAVICON` for changing the FAVICON (32x32) used by the app.
- `REACT_APP_APPLE_TOUCH_ICON` a 512x512 `png` icon that will be used for progressive web apps.
- `REACT_APP_NAME` for changing the name displayed in the browser tab.

For examples of how to format these values, check the `.env.sample`.

## Configuration for static site deployment

Capable Care uses client-side rendering. Therefore, you will need to `rewrite`
any requests to paths other than the root to the `index.html`. For example, you can do this
by [adding a rule in Render](https://render.com/docs/deploy-create-react-app#using-client-side-routing):

1. Visit the `Redirect/Rewrite` section for the project.
2. You will need to add a new rule:
   - set the source to `/*`
   - set the destination `/index.html`
   - set the action to `Rewrite`

## Contributing guidelines

If you would like to contribute to this repository, please see our [CONTRIBUTING.md](CONTRIBUTING.md) guidelines.

## Trademark notice

"Capable Health" and "Capable Care" are registered trademarks of Capable Health, Inc ("Capable"). You may not use these trademarks to infer that your product or service is endorsed or associated with Capable without permission. You may use these marks to refer to Capable in a way where it’s clear that you’re simply referring to the project, not claiming endorsement or association.
