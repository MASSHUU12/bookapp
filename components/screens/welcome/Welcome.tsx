import { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useAppSelector } from 'hooks';
import { commonStyles } from 'styles/commonStyles';
import Btn from '@common/Btn';
import SetGoalsScreen from './screens/SetGoalsScreen';
import TrackBooksScreen from './screens/TrackBooksScreen';
import WelcomeScreen from './screens/WelcomeScreen';

/**
 * Welcome screen.
 *
 * @param {*} { navigation }
 * @return {*}  {JSX.Element}
 */
const Welcome = ({ navigation }: any): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);
  const listRef = useRef<any>(null);

  const [currentScreen, setCurrentScreen] = useState(1);
  const [nextColor, setNextColor] = useState(colors.textBtn);
  const [backColor, setBackColor] = useState(colors.textBtn);

  const screens = [<WelcomeScreen />, <TrackBooksScreen />, <SetGoalsScreen />];

  /**
   * Move to the next screen.
   *
   * @return {*}  {void}
   */
  const nextScreen = (): void => {
    if (currentScreen >= screens.length) return;

    setCurrentScreen(state => state + 1);
    listRef.current.scrollToIndex({ animated: true, index: currentScreen });
  };

  /**
   * Move to the previous screen.
   *
   * @return {*}  {void}
   */
  const backScreen = (): void => {
    if (currentScreen <= 1) return;

    setCurrentScreen(state => state - 1);
    listRef.current.scrollToIndex({ animated: true, index: currentScreen });
  };

  useEffect(() => {
    // Prevent going back & closing an app using back button.
    navigation.addListener(
      'beforeRemove',
      (e: { preventDefault: () => void }) => {
        e.preventDefault();
      },
    );
  }, [navigation]);

  useEffect(() => {
    // Update colors of buttons
    if (currentScreen >= screens.length) setNextColor(colors.text3);
    else setNextColor(colors.textBtn);

    if (currentScreen <= 1) setBackColor(colors.text3);
    else setBackColor(colors.textBtn);
  }, [currentScreen]);

  return (
    <View
      style={{
        ...commonStyles.basicScreen,
        backgroundColor: colors.background,
      }}>
      <FlatList
        data={screens}
        renderItem={({ item }) => {
          return <>{item}</>;
        }}
        horizontal
        ref={listRef}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
      <View style={{ ...styles.footer, ...commonStyles.wrapRow }}>
        <Btn
          text="Back"
          color={backColor}
          bg={colors.background}
          action={backScreen}
        />
        <Btn
          text="Next"
          color={nextColor}
          bg={colors.background}
          action={nextScreen}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    height: 'auto',
  },
});

export default Welcome;
