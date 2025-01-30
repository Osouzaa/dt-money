import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { api } from '../lib/axios'
import { createContext } from 'use-context-selector'

interface Transaction {
  id: number;
  title: string;
  type: 'income' | 'outcome';
  amount: number;
  category: string;
  createdAt: string;
}

interface CreateTransactionInput {
  title: string;
  amount: number;
  category: string;
  type: 'income' | 'outcome';
}

interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

export const TransactionContext = createContext({} as TransactionContextType)

interface TransactionsProviderProps {
  children: ReactNode;
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { title, amount, category, type } = data
      const response = await api.post('/transactions', {
        title,
        category,
        amount,
        type,
        createdAt: new Date(),
      })
      setTransactions((state) => [...state, response.data])
    }, [])

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('/transactions', {
      params: {
        q: query,
        _sort: 'createdAt',
        _order: 'DESC',
      },
    })
    setTransactions(response.data)
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionContext.Provider value={{
      transactions,
      fetchTransactions,
      createTransaction,
    }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
