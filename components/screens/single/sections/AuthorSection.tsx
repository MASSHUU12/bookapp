import { View, StyleSheet } from 'react-native';
import { useAppSelector } from 'hooks';
import P from '@common/P';

interface Props {
  route: any;
}

const AuthorSection = ({ route }: Props): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);

  return (
    <View style={styles.author}>
      <P color={colors.text2} size={12}>
        {route.params.author_name}
      </P>
      <P color={colors.text3} size={12}>
        {route.params.key.split('/')[2]}
      </P>
    </View>
  );
};

const styles = StyleSheet.create({
  author: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default AuthorSection;
