import { View } from 'react-native';
import P from './P';

interface Props {
  text: string;
  index: number;
}

const Tag = ({ text, index }: Props): JSX.Element => {
  const getBackground = (): string => {
    if (index === 0) return '#FFA9A9';
    if (index === 1) return '#ABFFA9';
    if (index === 2) return '#A9C1FF';
    return '#A9C1FF';
  };

  const getText = (): string => {
    if (index === 0) return '#7E1212';
    if (index === 1) return '#1E5F1D';
    if (index === 2) return '#27375F';
    return '#27375F';
  };

  return (
    <View
      style={{
        paddingVertical: 2,
        paddingHorizontal: 10,
        backgroundColor: getBackground(),
        borderRadius: 5,
        marginTop: 5,
        marginRight: 5,
      }}>
      <P size={12} color={getText()}>
        {text}
      </P>
    </View>
  );
};

export default Tag;
