import { createApp } from 'vue'
import App from './App.vue'
import HttpCheckoutGateway from './gateway/HttpCheckoutGateway'
import AxiosAdapter from './gateway/AxiosAdapter'

const app = createApp(App)
const httpClient = new AxiosAdapter()
app.provide('CheckoutGateway', new HttpCheckoutGateway(httpClient))

app.mount('#app')
