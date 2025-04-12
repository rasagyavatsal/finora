// src/App.tsx

import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import FileUploadForm from './components/FileUploadForm';

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Box p={5}>
        <h1>Upload Bank Statements</h1>
        <FileUploadForm />
      </Box>
    </ChakraProvider>
  );
};

export default App;
