// src/pages/About.tsx
import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const About: React.FC = () => {
  return (
    <Box p={6}>
      <Text fontSize="4xl" mb={4}>About Finora</Text>
      <Text fontSize="xl">
        Finora helps you manage your debt and make smarter financial decisions!
      </Text>
    </Box>
  );
};

export default About;
