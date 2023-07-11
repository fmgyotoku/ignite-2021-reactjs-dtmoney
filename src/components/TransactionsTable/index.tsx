import { Container } from "./styles"
import { useTransactions } from "../../hooks/useTransactions"

export function TransactionsTable() {
  const { transactions } = useTransactions()

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Value</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.title}</td>
                <td className={transaction.type}>
                  {new Intl.NumberFormat('en-AU', {
                    style: 'currency', 
                    currency: 'AUD'
                  }).format(transaction.amount)}
                </td>
                <td>{transaction.category}</td>
                <td>
                  {new Intl.DateTimeFormat('en-AU').format(
                    new Date(transaction.createdAt)
                  )}
                </td>
              </tr>
          ))}
        </tbody>
      </table>      
    </Container>
  )
}