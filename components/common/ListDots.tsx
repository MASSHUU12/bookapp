import { View } from 'react-native';
import { ColorsType } from 'types/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import { useAppSelector } from 'hooks';
import { commonStyles } from 'styles/commonStyles';

interface Props {
  current: number;
  length: number;
  inactiveBg?: ColorsType;
  activeBg?: ColorsType;
}

/**
 * I can't think of a better name.
 * Just dots that show the current place in the list.
 *
 * @param {Props} {
 *   current,
 *   length,
 *   inactiveBg,
 *   activeBg,
 * }
 * @return {*}  {JSX.Element}
 */
const ListDots = ({
  current,
  length,
  inactiveBg,
  activeBg,
}: Props): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);

  const printDots = (): JSX.Element[] => {
    let arr: JSX.Element[] = [];

    for (let i = 0; i < length; i++) {
      let c: ColorsType | string = '';

      if (i === current) c = activeBg ? activeBg : colors.text4;
      else c = inactiveBg ? inactiveBg : colors.accent;

      arr.push(<Entypo name="dot-single" size={32} color={`${c}`} />);
    }
    return arr;
  };

  return <View style={{ ...commonStyles.wrapRow }}>{printDots()}</View>;
};

export default ListDots;
