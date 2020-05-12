// Database create/get operations

import { Router } from 'express'
import { exists, add, db } from './db'

const router = Router()

router.get('/uuid', (req, res, next) => {
  const uuid = req.query.uuid
  console.log('REQUEST')
  console.log(uuid, db)
  if (!exists(uuid)) { // eslint-disable-line
    console.log('not found', uuid)
    res.status(404).send('Not found')
    return
  }
  res.json(true)
})

router.post('/uuid', (req, res, next) => {
  const uuid = req.body.uuid
  const id = req.body.id
  if (!uuid || !id) {
    res.status(400).send('Bad request')
    return
  }
  add(uuid, id)
  res.json(true)
})

export default router
