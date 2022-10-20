import { useState } from 'react';
import { Image } from 'react-native';
import NoImage from '../../assets/images/no_image_found.svg';

interface Props {
  width: string | number;
  height: string | number;
  cover?: string;
}

/**
 * Cover image with fallback.
 *
 * @param {Props} { width, height, cover = '000' }
 * @return {*}  {JSX.Element}
 */
const CoverImage = ({ width, height, cover = '000' }: Props): JSX.Element => {
  const [err, setErr] = useState(false);

  return (
    <>
      {!err ? (
        <Image
          style={{
            width: width,
            height: height,
          }}
          source={{
            uri: `https://covers.openlibrary.org/b/id/${cover}-M.jpg?default=false`,
          }}
          onError={() => setErr(true)}
          resizeMode="contain"
          // TODO: Need to be replaced with better image.
          loadingIndicatorSource={require('../../assets/images/bookCoverTest.jpg')}
        />
      ) : (
        <NoImage width={width} height={height} />
      )}
    </>
  );
};

export default CoverImage;
