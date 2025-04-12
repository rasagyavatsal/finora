// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Text, Button } from '@chakra-ui/react'; // Chakra UI components

const Navbar: React.FC = () => {
  return (
    <Box bg="teal.500" color="white" p={4}>
      <Flex justify="space-between" align="center">
        <Text fontSize="2xl" fontWeight="bold">
          Finora
        </Text>
        <Flex>
          <Button variant="link" color="white" mr={4}>
            <Link to="/">Home</Link>
          </Button>
          <Button variant="link" color="white">
            <Link to="/about">About</Link>
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
