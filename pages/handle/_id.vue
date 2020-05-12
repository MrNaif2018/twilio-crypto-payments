<template>
  <v-container>
    <h1>Send SMS</h1>
    <div v-if="sid">
      <p class="green--text">
        Successfully Sent! Message SID: {{ sid }}
      </p>
      <v-btn color="success" @click="$router.push('/')">
        Return back
      </v-btn>
    </div>
    <v-form ref="form">
      <v-select v-model="from" label="Select a phone number to send from" :items="phones" :loading="loading" :rules="[nonEmpty]" />
      <client-only>
        <vue-tel-input-vuetify
          v-model="phone"
          valid-characters-only
          disabled-formatting
          mode="international"
          :rules="[isValid]"
          @validate="validate"
        />
      </client-only>
      <v-textarea
        v-model="sms"
        auto-grow
        clearable
        :rules="[nonEmpty]"
        placeholder="Enter sms text"
        :row-height="24"
        :rows="1"
      />
      <br>
      <v-btn :disabled="disabled" color="primary" @click="submit">
        Submit
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      sms: '',
      phone: '',
      from: '',
      valid: false,
      sid: undefined,
      disabled: false,
      loading: true,
      phones: []
    }
  },
  validate ({ $axios, params }) {
    console.log($axios.defaults.baseURL)
    return $axios.get(`/api/uuid?uuid=${params.id}`).then(r => true).catch(e => false)
  },
  beforeCreate () {
    this.$axios.get('/api/phones').then((r) => {
      this.loading = false
      this.phones = r.data
    })
  },
  methods: {
    validate ({ number, valid, country }) {
      this.valid = valid
    },
    submit () {
      if (this.$refs.form.validate()) {
        this.disabled = true
        this.$axios.post('/api/send', { uuid: this.$route.params.id, text: this.sms, from: this.from, to: this.phone }).then(r => (this.sid = r.data.sid))
      }
    },
    isValid (val) {
      return this.valid || 'Invalid phone number'
    },
    nonEmpty: val => (val && val.length > 0) || 'Must not be empty'
  }
}
</script>
