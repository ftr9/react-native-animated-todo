import { StyleSheet, View, Text, Image } from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolateColor,
} from 'react-native-reanimated';
import TodosRenderer from '../components/todos/TodoRenderer';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/Colors';
import { Resolution } from '../constants/Screen';
import useTasksStore from '../components/todos/store/useTasks.store';

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

const MainPage = () => {
  const activeIndexSharedValue = useSharedValue(0);
  const { todos } = useTasksStore();

  //this makes [0,1,2,3 ...]
  const todosIndexes = Object.values(todos).map((_, index) => index);

  //this makes array of colors ["#qe23eh","#289ehasd",....]
  const todosBackground = Object.values(todos).map(el => el.backgroundColor);

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    //interpolating color after each index change
    const background = interpolateColor(
      activeIndexSharedValue.value,
      todosIndexes,
      todosBackground
    );
    return {
      backgroundColor: background,
    };
  });

  return (
    <AnimatedSafeAreaView
      style={[
        {
          flex: 1,
        },
        animatedBackgroundStyle,
      ]}
    >
      <StatusBar style={'light'} />
      <MainPage.Header />
      <MainPage.GreetingsSection />
      <TodosRenderer
        todos={todos}
        activeIndexSharedValue={activeIndexSharedValue}
      />
    </AnimatedSafeAreaView>
  );
};

export default MainPage;

MainPage.Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Ionicons name="reorder-three-outline" size={24} color={colors.PRIMARY} />
      <Text style={styles.headerText}>TODO</Text>
      <Ionicons name="search-outline" size={24} color={colors.PRIMARY} />
    </View>
  );
};

MainPage.GreetingsSection = () => {
  return (
    <>
      <View style={styles.greetingSectionContainer}>
        <Image
          source={{
            uri: 'https://media.licdn.com/dms/image/D5603AQEcu-NPmPUtaQ/profile-displayphoto-shrink_400_400/0/1688731936183?e=1701302400&v=beta&t=M-0P7FgcFHDXgNCFyWMUsRXtUa70TxHwPBfPjATiu4E',
          }}
          style={{
            height: 50,
            width: 50,
            borderRadius: 100,
          }}
          resizeMode="cover"
        />

        <Text style={styles.greetingSectionText}>Hello, Rahul.</Text>
        <Text
          style={{
            color: colors.PRIMARY,
          }}
        >
          Looks like feel good
        </Text>
        <Text
          style={{
            color: colors.PRIMARY,
          }}
        >
          You have 3 tasks to do today
        </Text>
      </View>
      <Text style={styles.greetingSectionTime}>
        Today: {new Date().toDateString()}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 15,
    letterSpacing: 2,
    color: colors.PRIMARY,
  },
  greetingSectionContainer: {
    padding: Resolution.SCREEN_WIDTH * 0.12,
  },
  greetingSectionText: {
    fontSize: 32,
    fontWeight: '500',
    marginTop: 25,
    marginBottom: 15,
    color: colors.PRIMARY,
  },
  greetingSectionTime: {
    fontWeight: '600',
    marginVertical: 10,
    paddingHorizontal: Resolution.SCREEN_WIDTH * 0.12,
    color: colors.PRIMARY,
  },
});
