import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { SearchForm } from './components/SearchForm'
import {
  ContentIconsMobile,
  PriceHighLight,
  TransactionContainer,
  TransactionTable,
} from './styles'
import { TransactionContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { useContextSelector } from 'use-context-selector'
import { CalendarBlank, TagSimple } from 'phosphor-react'

export function Transactions() {
  const transactions = useContextSelector(TransactionContext, (context) => {
    return context.transactions
  })
  return (
    <div>
      <Header />
      <Summary />
      <TransactionContainer>
        <SearchForm />

        <TransactionTable>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.title}</td>
                  <td>
                    <PriceHighLight variant={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {priceFormatter.format(transaction.amount)}
                    </PriceHighLight>
                  </td>
                  <td>
                    <td>
                      <ContentIconsMobile>
                        <TagSimple />
                        <span>{transaction.category}</span>
                      </ContentIconsMobile>
                    </td>
                    <td>
                      <ContentIconsMobile>
                        <CalendarBlank />
                        <span>{dateFormatter.format(
                          new Date(transaction.createdAt))}
                        </span>
                      </ContentIconsMobile>
                    </td>
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </TransactionTable>
      </TransactionContainer>
    </div>
  )
}
