import { Box, Heading, Progress } from '@chakra-ui/react';
import { FormikProps } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { IsUpdateOrCreate } from './AddUpdateProduct';
import Dropzone, { IDropzoneProps } from 'react-dropzone-uploader';
import axios from 'axios';
import { Image } from '../../../app/products/types';
interface AddImageProps {
  props: FormikProps<IsUpdateOrCreate>;
  setImgLoading: Dispatch<SetStateAction<number | null>>;
  imgLoading: number | null;
}

export const AddImage: React.FC<AddImageProps> = ({
  props,
  setImgLoading,
  imgLoading,
}): JSX.Element => {
  const urls: Array<Image> = [...props.values.images!];

  const handleChangeStatus: IDropzoneProps['onChangeStatus'] = ({ file }, status) => {};

  const handleSubmit: IDropzoneProps['onSubmit'] = (files, allFiles) => {
    const url = `https://api.cloudinary.com/v1_1/${process.env
      .REACT_APP_CLOUD_NAME!}/upload`;

    files.forEach(async ({ file }) => {
      const formData = new FormData();

      //append archivo en array y el upload preset unsigned
      formData.append('file', file);
      formData.append('upload_preset', process.env.REACT_APP_UNSIGNED_UPLOAD_PRESET!);

      //upload a cloudinary unsigned, obtengo % de upload!
      const { data } = await axios.post(url, formData, {
        onUploadProgress: function (progressEvent) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setImgLoading(percentCompleted);
        },
      });

      //agregar ids a array cuando ya este el server
      //urls.push(data.public_id);

      //temp
      urls.push({ url: data.url, public_id: data.public_id });

      props.setFieldValue('images', urls);
    });

    allFiles.forEach((f) => f.remove());
  };

  return (
    <Box my={3}>
      <Dropzone
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        maxFiles={5}
        accept='image/*'
        inputContent='Haga click o arrastre imagen para agregar'
        inputWithFilesContent={(files) =>
          `Puede agregar ${5 - (files.length + props.values.images?.length!)} mas`
        }
        submitButtonDisabled={(files) => files.length < 1}
        styles={{
          dropzone: { backgroundColor: '#ffffff', overflow: 'hidden', border: 'none' },
          submitButton: {
            padding: '10px 25px',
            backgroundColor: '#2d3748',
            color: '#ffffff',
          },
          inputLabel: { color: '#2d3748', opacity: '92%' },
          inputLabelWithFiles: {
            padding: '10px 25px',
            backgroundColor: '#2d3748',
            color: '#ffffff',
          },
        }}
      />
      {imgLoading && (
        <Box mt={3}>
          <Heading mb={1}>
            {imgLoading !== 100 ? 'Subiendo images' : 'Imagenes subidas'}{' '}
          </Heading>
          <Progress borderRadius='lg' value={imgLoading} />
        </Box>
      )}
    </Box>
  );
};
