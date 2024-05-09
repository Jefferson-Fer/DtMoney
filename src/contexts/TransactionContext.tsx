import { ReactNode, useEffect, useState, useCallback } from 'react'
import { api } from '../lib/axios/axios'
import { createContext } from 'use-context-selector'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionContextType {
  transactions: Transaction[]
  fecthTransaction: (query?: string) => Promise<void>
  newCreateTransaction: (data: CreateTransactionInput) => Promise<void>
}

interface TransactionProviderType {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionProvider({ children }: TransactionProviderType) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fecthTransaction = useCallback(async (query?: string) => {
    const response = await api.get('transactions', {
      params: {
        q: query,
      },
    })

    console.log(response.request)
    setTransactions(response.data)
  }, [])

  const newCreateTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, category, price, type } = data

      const response = await api.post('transactions', {
        description,
        category,
        price,
        type,
        createdAt: new Date(),
      })

      setTransactions((state) => [response.data, ...state])
    },
    [],
  )

  useEffect(() => {
    fecthTransaction()
  }, [fecthTransaction])

  return (
    <TransactionsContext.Provider
      value={{ transactions, fecthTransaction, newCreateTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
