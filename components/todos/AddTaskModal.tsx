import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { G_TextStyle } from '../common/styles';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';

interface IAddTaskModalProps {
  children: React.ReactNode;
}

const AddTaskModal = ({ children }: IAddTaskModalProps) => {
  return (
    <Animated.View
      entering={SlideInDown.duration(500)}
      exiting={SlideOutDown.duration(750)}
      style={styles.addTaskModelContainer}
    >
      {children}
    </Animated.View>
  );
};

export default AddTaskModal;

interface IAddTaskModelHeader {
  onCloseClick: () => void;
}
AddTaskModal.Header = ({ onCloseClick }: IAddTaskModelHeader) => {
  return (
    <View style={styles.headerContainer}>
      <Ionicons
        onPress={onCloseClick}
        name="close-outline"
        size={24}
        color={'black'}
      />
      <Text
        style={{
          flex: 1,
          textAlign: 'center',
        }}
      >
        New Task
      </Text>
    </View>
  );
};

interface IInputTaskProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

AddTaskModal.InputTask = ({ value, setValue }: IInputTaskProps) => {
  return (
    <View style={styles.inputTaskContainer}>
      <Text style={G_TextStyle.smallGrayText}>
        What tasks are you planning to perform ?
      </Text>
      <TextInput
        value={value}
        onChangeText={inputVal => {
          setValue(inputVal);
        }}
        keyboardType="default"
        selectionColor={'black'}
        style={styles.inputTaskTextInput}
        autoFocus
        placeholder="Enter the task "
      />
    </View>
  );
};

interface ITaskArea {
  todoName: string;
  image: any;
}

AddTaskModal.TaskArea = ({ todoName, image }: ITaskArea) => {
  return (
    <View style={styles.taskAreaContainer}>
      <Image
        source={image}
        style={styles.taskAreaImage}
        resizeMode={'contain'}
      />
      <Text style={G_TextStyle.smallGrayText}>{todoName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  addTaskModelContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  inputTaskContainer: {
    paddingHorizontal: 20,
    marginVertical: 30,
  },
  inputTaskTextInput: {
    fontSize: 40,
    marginTop: 5,
    color: 'black',
    fontWeight: '500',
    textAlign: 'justify',
  },
  taskAreaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  taskAreaImage: {
    height: 10,
    width: 10,
    marginRight: 10,
  },
});
