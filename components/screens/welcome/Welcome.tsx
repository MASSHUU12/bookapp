import { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useAppSelector } from '../../../hooks';
import { commonStyles } from '../../../styles/commonStyles';
import Btn from '../../common/Btn';
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

  const screens = [<WelcomeScreen />, <TrackBooksScreen />, <SetGoalsScreen />];

  const [currentScreen, setCurrentScreen] = useState(1);

  /**
   * Move to the next screen.
   *
   * @return {*}  {void}
   */
  const nextScreen = (): void => {
    let num = currentScreen + 1;

    if (num > screens.length) return;

    setCurrentScreen(num);
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
      />
      <View style={{ ...styles.footer, ...commonStyles.wrapRow }}>
        <Btn
          text="Next"
          color={colors.textBtn}
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
