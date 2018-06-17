import React from 'react';
import { StyleSheet, Text, View, Navigator, Component } from 'react-native';

var SoundPlayer = require('react-native-sound');
var song = null;
type Props = {};
export default class Sound extends Component<Props> {
    componentWillMount() {
      song = new SoundPlayer('tech-live.mp3', SoundPlayer.MAIN_BUNDLE, (error) => {
        if(error)
            ToastAndroid.show('error when init sound', ToastAndroid.SHORT);
        });
    }

    onPressBtnPlay(){
      if(song != null)
        song.play(() => {
        });
    }

    render() {
      return (
      <View style={styles.menu}>
      <Image source onPress={{uri: 'https://i.imgur.com/FrCYqvS.png'}}
        style={{width: 15, height: 15, alignSelf: 'left'}} />
      </View>
      );
    }
  }