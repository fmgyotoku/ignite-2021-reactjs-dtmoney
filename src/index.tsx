import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { Model, createServer } from 'miragejs'

createServer({
  models: {
    transaction: Model
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1, 
          title: 'Website freelance', 
          type: 'deposit',
          category:'Dev', 
          amount: 3000, 
          createdAt: new Date('2023-05-20 10:00:00')
        }, 
        {
          id: 2, 
          title: 'Rent', 
          type: 'withdraw',
          category:'Household', 
          amount: 1100, 
          createdAt: new Date('2023-05-22 08:00:00')
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api'

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data)
    })
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)