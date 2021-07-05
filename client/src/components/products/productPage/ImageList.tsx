import React, { Dispatch, SetStateAction } from 'react';
import { Image } from '@chakra-ui/react';

interface ImageListProps {
  images: string[];
  setSelectedImage: Dispatch<SetStateAction<string>>;
}

export const ImageList: React.FC<ImageListProps> = ({
  images,
  setSelectedImage,
}): JSX.Element => {
  const [currentImage, setCurrentImage] = React.useState(images[0]);

  const renderImages = () => {
    return images.map((image) => {
      return (
        <Image
          borderRadius='md'
          border={`${currentImage === image && '2px solid #3182CE'}`}
          onMouseEnter={() => {
            setSelectedImage(image);
            setCurrentImage(image);
          }}
          maxWidth='65px'
          maxHeight='65px'
          mb={2}
          key={image}
          src={image}
          alt='imagen producto'
        />
      );
    });
  };
  return <React.Fragment>{renderImages()}</React.Fragment>;
};
