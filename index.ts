import { AppRegistry } from 'react-native'
import { registerRootComponent } from 'expo'

import { name as appName } from './app.json'
import App from './src/App'


registerRootComponent(App)
AppRegistry.registerComponent(appName, () => App)