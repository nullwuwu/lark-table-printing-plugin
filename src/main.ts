import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'

createApp(App).mount('#app')


window.addEventListener('beforeprint', () => {
  document.documentElement.classList.add('is-printing');
})

window.addEventListener('afterprint', () => {
  document.documentElement.classList.remove('is-printing');
})