import React, { Dispatch, SetStateAction } from 'react';
import { Image } from '@chakra-ui/react';
import { Image as ImageType } from '../../../app/products/types';

interface ImageListProps {
  images: [ImageType];
  setSelectedImage: Dispatch<SetStateAction<string>>;
}

export const ImageList: React.FC<ImageListProps> = ({
  images,
  setSelectedImage,
}): JSX.Element => {
  const [currentImage, setCurrentImage] = React.useState(images[0]);

  React.useEffect(() => {
    setSelectedImage(images[0].url);
  }, [setSelectedImage, images]);

  if (!images) return <React.Fragment></React.Fragment>;

  const renderImages = () => {
    return images.map((image) => {
      return (
        <Image
          borderRadius='md'
          border={`${currentImage === image && '2px solid #3182CE'}`}
          onMouseEnter={() => {
            setSelectedImage(image.url);
            setCurrentImage(image);
          }}
          maxWidth='65px'
          maxHeight='65px'
          mb={2}
          key={image.url}
          src={image.url}
          alt='imagen producto'
        />
      );
    });
  };
  return <React.Fragment>{renderImages()}</React.Fragment>;
};
