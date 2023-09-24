import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { G_LayoutStyles } from '../common/styles';
import CheckBox from 'expo-checkbox';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface ITaskCardProps {
  name: string;
  isCompleted: boolean;
  taskIndex: number;
  onCheckBoxValueChange: (taskIndex: number, isCompleted: boolean) => void;
  onDeleteHandle: (taskIndex: number) => void;
}

const TaskCard = ({
  name,
  isCompleted,
  onCheckBoxValueChange,
  onDeleteHandle,
  taskIndex,
}: ITaskCardProps) => {
  return (
    <View style={[G_LayoutStyles['flex-Row-JCC-AIC'], { paddingVertical: 15 }]}>
      <CheckBox
        color={'#dee2e6'}
        value={isCompleted}
        onValueChange={val => {
          onCheckBoxValueChange(taskIndex, val);
        }}
        style={styles.checkBoxStyle}
      />
      <Text
        style={{
          flex: 1,
          marginLeft: 20,
          textDecorationLine: isCompleted ? 'line-through' : 'none',
          color: isCompleted ? '#dee2e6' : 'black',
        }}
      >
        {name}
      </Text>
      {isCompleted && (
        <TouchableOpacity
          onPress={() => {
            onDeleteHandle(taskIndex);
          }}
        >
          <Ionicons color={'#dee2e6'} name="trash" size={18} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  checkBoxStyle: {
    borderWidth: 1,
    height: 18,
    width: 18,
    padding: 5,
  },
});
