import React, { useState } from 'react';

interface DebtFormProps {
  onSubmit: (debt: { amount: number; name: string }) => void;
}

const DebtForm: React.FC<DebtFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount) return;
    onSubmit({ name, amount: parseFloat(amount) });
    setName('');
    setAmount('');
  };

  return (
    <div className="max-w-sm mx-auto p-4 border rounded bg-white shadow">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Debt Name</label>
          <input
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Amount</label>
          <input
            className="w-full border p-2 rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Debt
        </button>
      </form>
    </div>
  );
};

export default DebtForm;
