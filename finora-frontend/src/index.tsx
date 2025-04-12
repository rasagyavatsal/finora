// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './AppRouter';
import { ChakraProvider } from '@chakra-ui/react'; // Import ChakraProvider

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ChakraProvider>
    <AppRouter />
  </ChakraProvider>
);
