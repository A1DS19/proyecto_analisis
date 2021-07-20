import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';

interface AlertModalProps {
  header: string;
  message: string;
  isOpen: boolean;
  mainActionTxt: string;
  setIsOpen: (open: boolean) => void;
  mainAction: () => void;
  cancelRef: React.MutableRefObject<undefined>;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  setIsOpen,
  mainAction,
  cancelRef,
  header,
  message,
  mainActionTxt,
}): JSX.Element => {
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef as any}
      onClose={() => setIsOpen(false)}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            {header}
          </AlertDialogHeader>

          <AlertDialogBody>{message}</AlertDialogBody>

          <AlertDialogFooter>
            <Button
              mr={3}
              bg='red.500'
              onClick={() => {
                mainAction();
                setIsOpen(false);
              }}
              ml={3}
            >
              {mainActionTxt}
            </Button>
            <Button ref={cancelRef as any} onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
