import React from 'react';
import { FormikProps } from 'formik';
import { Box, Grid, Heading, Image } from '@chakra-ui/react';
import { IsUpdateOrCreate } from './AddUpdateProduct';
//@ts-ignore
//import { Image } from 'cloudinary-react';
import { DeleteIcon } from '@chakra-ui/icons';
import { AlertModal } from '../../common/AlertModal';
import { deleteImage } from '../../../app/products/productActions';
import { Image as ImageType } from '../../../app/products/types';

interface ListImagesProps {
  props: FormikProps<IsUpdateOrCreate>;
}

export const ListImages: React.FC<ListImagesProps> = ({ props }): JSX.Element => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<ImageType | null>(null);
  const cancelRef = React.useRef();

  const removeImage = async () => {
    await deleteImage(selectedImage?.public_id!, () => {
      props.setFieldValue(
        'images',
        props.values.images?.filter((img) => img.url !== selectedImage?.url)
      );
    });
  };

  return (
    <React.Fragment>
      {props.values.images?.length! > 4 && (
        <Heading my={2} size='md'>
          Debe eliminar una imagen para subir otra
        </Heading>
      )}
      <Grid templateColumns='repeat(3, 1fr)'>
        {props.values.images?.map((img) => {
          return (
            <Box key={img.url} py={2} px={1} position='relative'>
              <Box
                position='absolute'
                top='-1'
                right='3'
                // backgroundColor='black'
                // borderRadius='lg'
              >
                <DeleteIcon
                  color='red'
                  fontSize='lg'
                  cursor='pointer'
                  onClick={() => {
                    setIsOpen(true);
                    setSelectedImage(img);
                  }}
                />
              </Box>

              {/* <Image
                cloudName={process.env.REACT_APP_CLOUD_NAME}
                publicId={img}
                upload_preset={process.env.REACT_APP_UNSIGNED_UPLOAD_PRESET}
                width='150'
                heigth='150'
              /> */}

              <Image
                rounded={'lg'}
                height={140}
                width={140}
                objectFit={'cover'}
                src={img.url}
              />
            </Box>
          );
        })}

        <AlertModal
          header='Eliminar imagen'
          message={`Esta seguro que desea la eliminar?`}
          mainActionTxt='Eliminar'
          mainAction={removeImage}
          cancelRef={cancelRef}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </Grid>
    </React.Fragment>
  );
};
