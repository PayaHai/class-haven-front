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

if (!import.meta.env.DEV) {
    console.log("请不要恶意调试。")
    let startTime = new Date ();
    debugger;
    let endTime = new Date ();
    let isDev = endTime.getTime() - startTime.getTime() > 100;
    let stack = [];
    if (isDev){
        while (true){
            stack.push(this);
            console.log(stack.length,this)
        }
    }
}

app.mount('#app')
