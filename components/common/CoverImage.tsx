import { useState } from 'react';
import { Image } from 'react-native';

interface Props {
  width: string | number;
  height: string | number;
  cover: string;
}

/**
 * Cover image with fallback.
 *
 * @param {Props} { width, height, cover = '000' }
 * @return {*}  {JSX.Element}
 */
const CoverImage: React.FunctionComponent<Props> = ({
  width,
  height,
  cover,
}: Props): JSX.Element => {
  const [err, setErr] = useState<any>({
    uri: `https://covers.openlibrary.org/b/id/${cover}-M.jpg?default=false`,
  });

  return (
    <Image
      style={{
        width: width,
        height: height,
      }}
      source={err}
      onError={() => setErr(require('../../assets/images/no_image_found.png'))}
      resizeMode="stretch"
      loadingIndicatorSource={require('../../assets/images/loading_cover_image.png')}
    />
  );
};

export default CoverImage;
