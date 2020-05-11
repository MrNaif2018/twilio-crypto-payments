// Verifying sms requests by checking if invoice is completed

import axios from 'axios'

export function verify (id) {
  return axios.get(`https://demo.bitcartcc.com/invoices/${id}`).then(r => r.status === 'complete').catch(e => false)
}
