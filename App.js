import React from 'react';
import {StackNavigator} from 'react-navigation';
import Menu from "./pages/Menu";
import Counter from './pages/Counter';
import Login from './pages/Login';

const Navigation = StackNavigator({
    Home: {screen: Login},
    Counter: {screen: Counter}
}, {
    navigationOptions: {
        header: null,
    }
});

export default class App extends React.Component {
  render() {
    return (
      <Navigation/>
    );
  }
}
