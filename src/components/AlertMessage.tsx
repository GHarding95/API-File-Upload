import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';

interface AlertMessageProps {
  errorMessage: string;
  responseText: string;
}

function AlertMessage({ errorMessage, responseText }: AlertMessageProps) {
  return (
    <div className='message'>
      {errorMessage ? (
        <Alert
          status='error'
          variant='subtle'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
          height='auto'
        >
          <AlertIcon boxSize='40px' mr={0} />
          <AlertTitle mt={4} mb={1} fontSize='lg'>
            Error!
          </AlertTitle>
          <AlertDescription maxWidth='sm'>
            {errorMessage}
          </AlertDescription>
        </Alert>
      ) : responseText ? (
        <Alert
          status='success'
          variant='subtle'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
          height='auto'
        >
          <AlertIcon boxSize='40px' mr={0} />
          <AlertTitle mt={4} mb={1} fontSize='lg'>
            Success!
          </AlertTitle>
          <AlertDescription maxWidth='sm'></AlertDescription>
        </Alert>
      ) : null}
    </div>
  );
}

export default AlertMessage;
