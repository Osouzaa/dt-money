import styled from 'styled-components'

export const TransactionContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;

`

export const TransactionTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  td {
    padding: 1.25rem 2rem;
    background: ${(props) => props.theme['gray-700']};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }

  /* Ocultar a terceira coluna no desktop */
  td:nth-child(3) {
    display: none;
  }

  @media (max-width: 768px) {
    display: block;
    width: 100%;

    tbody {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    tr {
      display: flex;
      flex-direction: column;
      background: ${(props) => props.theme['gray-700']};
      padding: 1.5rem;
      border-radius: 8px;
      gap: 0.5rem;
    }

    td {
      width: 100%;
      padding: 0;
      text-align: left;
      border: none;
    }

    td:first-child {
      font-size: 1rem;
      color: ${(props) => props.theme['gray-300']};
    }

    td:nth-child(2) {
      font-size: 1.25rem;
      font-weight: 700;
    }

    /* Exibir a terceira coluna apenas no mobile */
    td:nth-child(3) {
      display: block;
    }

    /* Ocultar as colunas 4 e 5 no mobile */
    td:nth-child(4),
    td:nth-child(5) {
      display: none;
    }
  }
`

interface PriceHighLightProps {
  variant: 'income' | 'outcome';
}

export const PriceHighLight = styled.span<PriceHighLightProps>`
  color: ${(props) =>
    props.variant === 'income'
      ? props.theme['green-300']
      : props.theme['red-300']};
`

export const ContentIconsMobile = styled.div`
  display: flex;
  align-items: center;
  gap:.5rem;

  span {
    font-size: 1rem;
    color: ${props => props.theme['gray-500']}
  }

  svg {
    color: ${props => props.theme['gray-500']};
    width: 1rem;
    height: 1rem;
  }
`
