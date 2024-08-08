# SATLANTIS (mobile-app)

## Setup

### Modules
- install node_modules (check engine version in package json):
  ```console
    yarn
  ```

- run clean install project:
  ```console
    yarn clean:install
  ```

### Expo
- install eas global:
  ```console
    npm install -g eas-cli
  ```

- sign in to expo (ask username and password):
  ```console
    eas login
  ```

### Run App
- Run Android:
  ```console
    yarn android
  ```

- Run IOS:
  ```console
    yarn ios
  ```

### Issues

#### Expo
- Check if all package version and configuration are OK:
  ```console
    npx expo-doctor
  ```

#### iOS
- Build: 
  - Hermes-engine (Command PhaseScriptExecution failed with a nonzero exit code):
    - 1 on your terminal run `which node`
    - 2 copy node PATH
    - 3 create new file inside ios folder called `.xcode.env.local`
    - 4 inside file add: `export NODE_BINARY=/Users/hernanparis/.nvm/versions/node/v{node-version}/bin/node`

## Workflow

- go to dev:
  ```console
    git checkout dev
  ```
- update local dev:
  ```console
    git pull origin dev
  ```
- create new branch:
  ```console
    git checkout -b [author]/[feature|bugfix|hotfix]/[description-no-spaces]
  ```
- develop the new feature or fix the related bug
- before commit the changes, check linter, types and tests (commit will failed)
- when commiting:
  ```console
    git commit -m "(feat|fix|build|chore): description with spaces"
  ```