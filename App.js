import React from 'react';
import {StackNavigator} from 'react-navigation';
import Menu from "./pages/Menu";
import Counter from './pages/Counter';

const Navigation = StackNavigator({
    Home: {screen: Menu},
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
