import { AppRegistry } from 'react-native';
import App from './App';
import appConfig from './app.json'; 

const MyApp: string = appConfig.expo.name; 

AppRegistry.registerComponent(MyApp, () => App);
