import { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  rating: number;
  onRatingChange: Function;
}

const Rating = ({ rating, onRatingChange }: Props): JSX.Element => {
  const arr = [0, 0, 0, 0, 0];
  const [r, setR] = useState(rating);

  useEffect(() => {
    if (typeof onRatingChange === 'function') onRatingChange(r);
  }, [r]);

  return (
    <>
      {arr.map((item, index) => {
        if (index <= r - 1)
          return (
            <Pressable key={index} onPress={() => setR(index + 1)}>
              <Ionicons name={'star'} size={32} color={'#F5C826'} />
            </Pressable>
          );
        return (
          <Pressable key={index} onPress={() => setR(index + 1)}>
            <Ionicons name={'star'} size={32} color={'#DFDFDE'} />
          </Pressable>
        );
      })}
    </>
  );
};

export default Rating;
