import { AppRegistry } from 'react-native'
import { registerRootComponent } from 'expo'

import { expo } from './app.json'
import App from './src/App'


registerRootComponent(App)
AppRegistry.registerComponent(expo.slug, () => App)