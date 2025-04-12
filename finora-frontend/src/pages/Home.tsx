// src/pages/Home.tsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Box, Text, Button, VStack } from '@chakra-ui/react';
import DebtForm from '../components/DebtForm';

interface Debt {
  name: string;
  amount: number;
}

const Home: React.FC = () => {
  const [debts, setDebts] = useState<Debt[]>([]);

  const handleDebtSubmit = (debt: Debt) => {
    setDebts((prevDebts) => [...prevDebts, debt]);
  };

  return (
    <div>
      <Navbar />
      <Box p={6} textAlign="center">
        <Text fontSize="4xl" mb={4}>Welcome to Finora 💸</Text>
        <Text fontSize="xl" mb={6}>Your Personal Debt & Finance Assistant.</Text>
        
        <DebtForm onSubmit={handleDebtSubmit} />

        <Box mt={6}>
          <Text fontSize="2xl">Your Debts</Text>
          <VStack spacing={4} align="flex-start" mt={4}>
            {debts.map((debt, index) => (
              <Box key={index} p={4} borderWidth={1} borderRadius="md">
                <Text>Name: {debt.name}</Text>
                <Text>Amount: ${debt.amount}</Text>
              </Box>
            ))}
          </VStack>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
