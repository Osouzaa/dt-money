import { TransactionContext } from '../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

export function useSummary() {
  const transactions = useContextSelector(TransactionContext, (context) => {
    return context.transactions
  })

  const summary = transactions.reduce(
    (acc, transaction) => {
      const transactionDate = new Date(transaction.createdAt)

      if (transaction.type === 'income') {
        acc.income += transaction.amount
        acc.total += transaction.amount

        if (!acc.lastIncomeDate || transactionDate > new Date(
          acc.lastIncomeDate)) {
          acc.lastIncomeDate = transaction.createdAt
        }
      } else {
        acc.outcome += transaction.amount
        acc.total -= transaction.amount

        if (!acc.lastOutcomeDate || transactionDate > new Date(
          acc.lastOutcomeDate)) {
          acc.lastOutcomeDate = transaction.createdAt
        }
      }

      if (!acc.firstTransactionDate || transactionDate < new Date(
        acc.firstTransactionDate)) {
        acc.firstTransactionDate = transaction.createdAt
      }
      if (!acc.lastTransactionDate || transactionDate > new Date(
        acc.lastTransactionDate)) {
        acc.lastTransactionDate = transaction.createdAt
      }

      return acc
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
      lastIncomeDate: '',
      lastOutcomeDate: '',
      firstTransactionDate: '',
      lastTransactionDate: '',
    },
  )

  return summary
}
