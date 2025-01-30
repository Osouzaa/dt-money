import { DateOfInput, SummaryCard, SummaryContainer } from './styles'
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'
import { priceFormatter } from '../../utils/formatter'
import { useSummary } from '../../hook/useSummary'

export function Summary() {
  const summary = useSummary()

  // Formatar data para exibição
  function formatDate(dateString: string | null) {
    if (!dateString) return 'Nenhuma'
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })
  }

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>
        <strong>{priceFormatter.format(summary.income)}</strong>
        {summary.lastIncomeDate && (
          <DateOfInput>Última entrada em {
            formatDate(summary.lastIncomeDate)
    }
          </DateOfInput>
        )}
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>
        <strong>{priceFormatter.format(summary.outcome)}</strong>
        {summary.lastOutcomeDate && (
          <DateOfInput>Última saída em {
            formatDate(summary.lastOutcomeDate)
    }
          </DateOfInput>
        )}
      </SummaryCard>

      <SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>
        <strong>{priceFormatter.format(summary.total)}</strong>
        {summary.firstTransactionDate && (
          <DateOfInput>
            De {formatDate(
            summary.firstTransactionDate)}
            até {formatDate(summary.lastTransactionDate)}
          </DateOfInput>
        )}
      </SummaryCard>
    </SummaryContainer>
  )
}
