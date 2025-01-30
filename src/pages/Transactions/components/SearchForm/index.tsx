import { MagnifyingGlass } from 'phosphor-react'
import {
  ContainerInputSearch,
  SearchFormContainer,
  TotalTransactionsContainer,
} from './styles'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionContext } from '../../../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormSchema = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const {
    fetchTransactions,
    transactions,
  } = useContextSelector(TransactionContext,
    (context) => {
      return {
        fetchTransactions: context.fetchTransactions,
        transactions: context.transactions,
      }
    })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormSchema>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransactions(data: SearchFormSchema) {
    await fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <TotalTransactionsContainer>
        <p>Transações</p>

        <span>{transactions.length}</span>
      </TotalTransactionsContainer>
      <ContainerInputSearch>
        <input
          type="text"
          placeholder="Busque por transações"
          {...register('query')}
        />
        <button type="submit" disabled={isSubmitting}>
          <MagnifyingGlass size={20} />
          <span>Buscar</span>
        </button>
      </ContainerInputSearch>
    </SearchFormContainer>
  )
}
