import { ScrollView, StyleSheet } from 'react-native';
import { addNumberOfPages, addTitle } from '../../../../features/add/addSlice';
import { useAppSelector } from '../../../../hooks';
import Input from '../../../common/Input';
import P from '../../../common/P';

const Add = (): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);
  const titleValue = useAppSelector(state => state.add.value.title);

  return (
    <ScrollView
      style={{ backgroundColor: colors.background, ...styles.container }}>
      <P color={colors.placeholder} size={16}>
        You're adding
      </P>
      <P color={colors.text2} size={14}>
        What is the title of your book?
      </P>
      <Input value={titleValue} onChange={addTitle} />
      <P color={colors.text2} size={14}>
        How many pages does your book have?
      </P>
      <Input
        value={titleValue}
        onChange={addNumberOfPages}
        keyboardType="numeric"
      />
      <P color={colors.text2} size={14}>
        What page are you currently on?
      </P>
      <Input
        value={titleValue}
        onChange={addNumberOfPages}
        keyboardType="numeric"
        placeholder="Skip this if you haven't started yet"
      />
      <P color={colors.text2} size={14}>
        Link to your book
      </P>
      <Input
        value={titleValue}
        onChange={addNumberOfPages}
        keyboardType="numeric"
        placeholder="Optional"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    flex: 1,
  },
});

export default Add;
