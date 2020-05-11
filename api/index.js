// Must set TWILIO_SID and TWILIO_TOKEN environment variables

import Twilio from 'twilio'

import express from 'express'
import bodyParser from 'body-parser'
import memorydb from './memorydb'
import { get, exists, deleteItem } from './db'
import { verify } from './utils'

const client = new Twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)

const app = express()
app.use(bodyParser.json())

app.get('/phones', async (req, res, next) => {
  const phones = await client.incomingPhoneNumbers.list()
  res.end(res.json(phones.map(v => v.phoneNumber))) // limit output to phone numbers only
})

app.post('/send', async (req, res, next) => {
  const uuid = req.body.uuid
  const from = req.body.from
  const to = req.body.to
  const text = req.body.text
  if (!uuid || !from || !to || !text || !exists(uuid)) {
    res.status(400).send('Bad request')
    return
  }
  if (!verify(get(uuid))) {
    res.status(400).send('Bad request')
    return
  }
  deleteItem(uuid)
  const { sid } = await client.messages.create({ body: text, from, to })
  res.json({ sid })
})

app.use(memorydb)

// Export the server middleware
export default {
  path: '/api',
  handler: app
}
