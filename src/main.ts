import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// MDUI
import 'mdui/mdui.css'
import 'mdui'

// ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)

// 路由
import router from './router'
app.use(router)

app.mount('#app')
