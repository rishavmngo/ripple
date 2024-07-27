import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureUpdateEvent,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import {ANIMATION_DURATION} from '../constants';

export const usePanXGesture = () => {
  const offsetX = useSharedValue(0);
  const startX = useSharedValue(0);

  const handlePanX = (e: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
    'worklet';
    const dragX = startX.value + e.translationX;
    /*
    dragX > 0 -> dragging to right side.
    dragX < 0 -> dragging to left side.
    */
    offsetX.value = dragX;
  };

  const panXGesture = Gesture.Pan()
    .onUpdate(e => {
      handlePanX(e);
    })
    .onEnd(() => {
      startX.value = offsetX.value;
    });

  const panXAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: offsetX.value,
        },
      ],
    };
  }, []);

  return {
    panXAnimatedStyles,
    panXGesture,
  };
};
