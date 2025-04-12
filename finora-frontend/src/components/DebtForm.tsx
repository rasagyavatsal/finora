import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, VStack } from '@chakra-ui/react';

interface DebtFormProps {
  onSubmit: (debt: { amount: number; name: string }) => void;
}

const DebtForm: React.FC<DebtFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount && name) {
      const debt = { name, amount: parseFloat(amount) };

      try {
        const response = await fetch('/api/debts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(debt),
        });
        const data = await response.json();
        if (response.ok) {
          onSubmit(debt);
          setAmount('');
          setName('');
        } else {
          alert(data.message || 'Failed to add debt');
        }
      } catch (error) {
        alert('Error: ' + error);
      }
    }
  };

  return (
    <Box maxW="sm" mx="auto" p={5}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="flex-start">
          <FormControl isRequired>
            <FormLabel>Debt Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter debt name"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Amount</FormLabel>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </FormControl>
          <Button type="submit" colorScheme="teal" width="full">
            Add Debt
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

// Export the component as a module
export default DebtForm;
