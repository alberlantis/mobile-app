# SATLANTIS (mobile-app)

## Setup

### Configure local env:
  follow this guide depending on your OS and the device you want to run:
  https://reactnative.dev/docs/set-up-your-environment?platform=android

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

- install ngrok global:
  ```console
    npm install -g @expo/ngrok
  ```

- sign in to expo (ask username and password):
  ```console
    eas login
  ```

### Run App

  #### Local:
  - Run Android DEV with METRO:
    ```console
      yarn android:dev:debug:
    ```
  - Build and Install Android DEV:
    ```console
      yarn android:dev:release:
    ```
  - Run Android PROD with METRO:
    ```console
      yarn android:prod:debug:
    ```
  - Build and Install Android PRDO:
    ```console
      yarn android:prod:release:
    ```
  - Run IOS with METRO:
    ```console
      yarn ios
    ```
  
  #### Expo-go
  - 1 Install Expo-go app in a mobile devile
  - 2 Run dev:
    ```console
      expo:start:dev
    ```
  - 3 Run prod:
    ```console
      expo:start:prod
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
    git checkout -b [author]/[ticket-number]/[feature|bugfix|hotfix]/[description-no-spaces]
  ```
- develop the new feature or fix the related bug
- before commit the changes, check linter, types and tests (commit will failed)
- when commiting:
  ```console
    git commit -m "(feat|fix|build|chore): description with spaces"
  ```