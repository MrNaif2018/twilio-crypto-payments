<template>
  <v-container>
    <h1>Send SMS</h1>
    <p>
      Sending an sms costs 0.00000546 BTC (approximately 0.046$) worth of cryptocurrency (you can pay in any currency you like that is supported).<br>
      Original twilio cost: 0.0075$, amount here couldn't be lower due to minimum transaction amount limit.
    </p>
    <v-btn color="primary" @click="submit">
      Send SMS
    </v-btn>
  </v-container>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
export default {
  methods: {
    submit () {
      const uuid = uuidv4()
      this.$axios.post('https://demo.bitcartcc.com/invoices', { price: 0.00000546, store_id: 8, redirect_url: window.location.origin + `/handle/${uuid}` }).then((res) => {
        this.$axios.post('/api/uuid', { uuid, id: res.data.id }).then((r) => {
          window.location = `https://admin.bitcartcc.com/i/${res.data.id}`
        })
      })
    }
  }
}
</script>
