import React from 'react';
import {
	StyleSheet,
	Text,
	Image,
	MenuItem,
	Font,
	View,
	TextInput,
  Animated,
	TouchableOpacity
} from 'react-native'; 
import { Actions } from 'react-native-router-flux';


class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),  
  }

  componentDidMount() {
    Animated.timing(                  
      this.state.fadeAnim,            
      {
        toValue: 3,                   
        duration: 10000,               
      }
    ).start();                        
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View                 
        style={{
          ...this.props.style,
          opacity: fadeAnim,         
        }}
      >
        {this.props.children}
      </Animated.View> 
    );
  } 
}


export default class Menu extends React.Component {
      render() {
      return (
      <View style={styles.container}>
      <FadeInView style={{width: 250, height: 50, backgroundColor: '#7DCEA0'}}>
      <Text
        style={{ fontFamily: 'Chalkboard SE', color: 'white', fontSize: 60, textAlign: 'center',
         margin: 10 }} 
        onPress={() => Actions.game()}>
        Navvii
      </Text>
      </FadeInView>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 60,
    paddingRight: 60,
    backgroundColor: '#7DCEA0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});