import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppSelector } from 'hooks';
import P from '@common/P';

interface Props {
  route: {
    params: {
      author_name: string;
      key: string;
    };
  };
}

/**
 *
 *
 * @param {Props} { route }
 * @return {*}  {JSX.Element}
 */
const AuthorSection: React.FunctionComponent<Props> = ({
  route,
}: Props): JSX.Element => {
  const [authors] = useState(route.params.author_name);
  const colors = useAppSelector(state => state.theme.colors);

  return (
    <View style={styles.container}>
      <P color={colors.text2} size={12}>
        {String(authors).split(/,/g).join(', ')}
      </P>
      <P color={colors.text3} size={12}>
        {route.params.key.split('/')[2]}
      </P>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

export default AuthorSection;
