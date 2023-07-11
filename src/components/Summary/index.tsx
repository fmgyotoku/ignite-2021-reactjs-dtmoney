import incomeImg from '../../assets/income.svg'
import expenseImg from '../../assets/expense.svg'
import totalImg from '../../assets/balance.svg'

import { Container } from "./styles"
import { useTransactions } from '../../hooks/useTransactions'

export function Summary() {
  const { transactions } = useTransactions()

  const summary = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'deposit') {
      acc.deposits += transaction.amount
      acc.total += transaction.amount
    } else {
      acc.withdraws += transaction.amount
      acc.total -= transaction.amount
    }

    return acc
  }, {
    deposits: 0, 
    withdraws: 0,
    total: 0
  })

  return (
    <Container>
      <div>
        <header>
          <p>Income</p>
          <img src={incomeImg} alt="Income" />
        </header>
        <strong>
          {new Intl.NumberFormat('en-AU', {
            style: 'currency', 
            currency: 'AUD'
          }).format(summary.deposits)}
        </strong>
      </div>
      <div>
        <header>
          <p>Expenses</p>
          <img src={expenseImg} alt="Expense" />
        </header>
        <strong>- 
          {new Intl.NumberFormat('en-AU', {
            style: 'currency', 
            currency: 'AUD'
          }).format(summary.withdraws)}
        </strong>
      </div>
      <div className='highlight-background'>
        <header>
          <p>Balance</p>
          <img src={totalImg} alt="Balance" />
        </header>
        <strong>
          {new Intl.NumberFormat('en-AU', {
            style: 'currency', 
            currency: 'AUD'
          }).format(summary.total)}
        </strong>
      </div>
    </Container>
  )
}