import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  rating: number;
}

const Rating = ({ rating }: Props): JSX.Element => {
  const arr = [0, 0, 0, 0, 0];

  return (
    <>
      {arr.map((item, index) => {
        if (index <= rating - 1)
          return (
            <Ionicons key={index} name={'star'} size={32} color={'#F5C826'} />
          );
        return (
          <Ionicons key={index} name={'star'} size={32} color={'#DFDFDE'} />
        );
      })}
    </>
  );
};

export default Rating;
