import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface ISpaceProps {
  width: number;
  height: number;
}

const Spacer = ({ width, height }: ISpaceProps) => {
  return (
    <View
      style={{
        width: width,
        height: height,
      }}
    ></View>
  );
};

export default Spacer;

const styles = StyleSheet.create({});
