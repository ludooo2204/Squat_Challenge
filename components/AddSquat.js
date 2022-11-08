/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addSquatSession } from '../redux/actionCompteur';
import styled from 'styled-components/native';
import Sound from 'react-native-sound';




const AddSquat = () => {
  const dispatch = useDispatch();
  Sound.setCategory('Playback');


  useEffect(() => {
    sound.setVolume(1);
    return () => {
      sound.release();
    };
  }, []);

  const playPause = () => {
    sound.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  };

  let sound = new Sound('bip.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('failed to load the sound', error);
    } else {
      // console.log("kikou")
      // sound.play(); // have to put the call to play() in the onload callback
    }
  });

  const handleSquat = () => {
    let time = +new Date();
    console.log('time');
    console.log(time);
    console.log('typeof time');
    console.log(typeof time);
    playPause();
    dispatch(addSquatSession(time));
  };

  return (
    <PressableSquat onPress={handleSquat}>
      <Plus> + </Plus>
    </PressableSquat>
  );
};

export default AddSquat;

const PressableSquat = styled.Pressable`
padding: 85px;
background-color: lightgrey;
width: 80%;
border-radius: 20px;
margin-top: 50px;
border-color: black;
border-width: 2px;
`;
const Plus = styled.Text`
 font-size: 100px;
 text-align: center
`;