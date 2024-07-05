import {getById} from '@/data';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {SharedTransition, withSpring} from 'react-native-reanimated';
const customTransition = SharedTransition.custom(values => {
  'worklet';
  return {
    height: withSpring(values.targetHeight),
    width: withSpring(values.targetWidth),
    originX: withSpring(values.targetOriginX),
    originY: withSpring(values.targetOriginY),
  };
});
export default function Detail({route}) {
  const id = route.params.id;
  const item = getById(id);
  if (!item) {
    return;
  }
  return (
    <View style={[style.container]}>
      <Animated.View
        sharedTransitionTag={item.id}
        style={[style.innerContainer, {backgroundColor: item?.itemColor}]}
      />
      <Text>{'hello'}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
