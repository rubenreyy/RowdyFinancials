// AccountsContext.tsx
import React, { createContext, useState, ReactNode, useContext } from 'react';

interface Account {
  id: string;
  name: string;
  balance: number;
}

interface AccountsContextProps {
  accounts: Account[];
  addAccount: (name: string, balance: number) => void;
  updateAccountBalance: (accountId: string, amount: number) => void;
}

// Create the context without default values
const AccountsContext = createContext<AccountsContextProps | undefined>(undefined);

// Helper hook to use the AccountsContext
export const useAccounts = () => {
  const context = useContext(AccountsContext);
  if (!context) {
    throw new Error("useAccounts must be used within an AccountsProvider");
  }
  return context;
};

export const AccountsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accounts, setAccounts] = useState<Account[]>([
    { id: "1", name: "Checking", balance: 1000 },
    { id: "2", name: "Savings", balance: 2000 },
  ]);

  const addAccount = (name: string, balance: number) => {
    const newAccount = {
      id: String(accounts.length + 1),
      name,
      balance,
    };
    setAccounts([...accounts, newAccount]);
  };

  const updateAccountBalance = (accountId: string, amount: number) => {
    setAccounts(prevAccounts =>
      prevAccounts.map(account =>
        account.id === accountId
          ? { ...account, balance: account.balance + amount }
          : account
      )
    );
  };

  return (
    <AccountsContext.Provider value={{ accounts, addAccount, updateAccountBalance }}>
      {children}
    </AccountsContext.Provider>
  );
};
