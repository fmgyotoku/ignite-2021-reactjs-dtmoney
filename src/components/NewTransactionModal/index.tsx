import Modal from 'react-modal'
import { FormEvent, useContext, useState } from 'react'
import { useTransactions } from '../../hooks/useTransactions'

import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import expenseImg from '../../assets/expense.svg'

import { Container, TransactionTypeContainer, RadioBox } from './styles'

interface NewTransactionModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

Modal.setAppElement('#root')

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const { createTransaction } = useTransactions()
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')
  const [type, setType] = useState('deposit')

  async function handleCreateTransaction(event: FormEvent) {
    event.preventDefault()

    await createTransaction({
      title, 
      amount, 
      category,
      type
    })

    setTitle('')
    setAmount(0)
    setCategory('')
    setType('deposit')

    onRequestClose()
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      overlayClassName='react-modal-overlay'
      className='react-modal-content'
    >
      <button type='button' onClick={onRequestClose} className='react-modal-close'>
        <img src={closeImg} alt='Close Modal' />
      </button>

      <Container onSubmit={ handleCreateTransaction }>
        <h2>Create Transaction</h2>

        <input 
          placeholder='Description'
          value={ title }
          onChange={ event => setTitle(event.target.value) }
        />

        <input 
          type='number'
          placeholder='Amount'
          value={ amount }
          onChange={ event => setAmount(Number(event.target.value)) }
        />

        <TransactionTypeContainer>
          <RadioBox 
            type='button'
            onClick={ () => { setType('deposit') } }
            $isActive={ type === 'deposit' }
            $activeColor="green"
          >
            <img src={incomeImg} alt='Income' />
            <span>Income</span>
          </RadioBox>
          <RadioBox 
            type='button'
            onClick={ () => { setType('withdraw') } }
            $isActive={ type === 'withdraw' }
            $activeColor="red"
          >
            <img src={expenseImg} alt='Expense' />
            <span>Expense</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input 
          placeholder='Category'
          value={ category }
          onChange={ event => setCategory(event.target.value) }
        />

        <button type='submit'>
          Create
        </button>
      </Container>
    </Modal>
  )
}

