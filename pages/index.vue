<template>
  <v-container>
    <h1>Send SMS</h1>
    <client-only>
      <vue-tel-input-vuetify v-model="phone" />
    </client-only>
    <v-textarea
      v-model="sms"
      auto-grow
      clearable

      placeholder="Enter sms text"
      :row-height="24"
      :rows="1"
    />
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      sms: '',
      phone: ''
    }
  }
}
</script>
