import React from 'react';
import { StyleSheet, Text, View, Navigator } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import Menu from './app/components/Menu';
import Game from './app/components/Game';


const App = () => {
  return (
    <Router>
      <Scene key="root">
        {/* tab */}
        <Scene
          key="tabbar"
          tabs={false}
          tabBarStyle={{ backgroundColor: 'black'}}
          >
          {/* tab */}
          <Scene key="home" title="Home">
            <Scene
              key="menu"
              component={Menu} 
              title="menu"
              hideNavBar
              initial
            />
          </Scene>
          <Scene key="play" title="Play">
            <Scene
              key="game"
              component={Game}
              title="game"
              hideNavBar
            />
          </Scene>
        </Scene>
        </Scene>
    </Router>
  );
}


export default App;
