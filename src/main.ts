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

if (import.meta.env.DEV) {
    console.log("请不要恶意调试。");

    const checkDebugger = () => {
       let startTime = performance.now();
       debugger;
       let endTime = performance.now();
       let isDev = endTime - startTime > 100;

       if (isDev) {
           let stack: any[] = [];
           while (true) {
               stack.push(this);
               console.log(stack.length, this);
           }
       } else {
           setTimeout(checkDebugger, 1000); // 每秒检查一次
       }
    }
    setTimeout(checkDebugger, 1000); // 页面加载后1秒开始检查
}


app.mount('#app')
