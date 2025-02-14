import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useAppSelector, useAppDispatch} from '../hooks/useRedux';
import {
  increment,
  decrement,
  incrementByAmount,
} from '../Redux/Features/CounterSlice';

const Counter: React.FC = () => {
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Count: {count}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
      <Button
        title="Increment by 5"
        onPress={() => dispatch(incrementByAmount(5))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
  },
});

export default Counter;
