<script setup lang="ts">
import {onMounted, ref} from "vue"
import { RouterLink, RouterView, useRouter} from "vue-router"

import { exData , CookieManager } from "@/utils/Data"
import App from "@/App.vue";
import {exApi} from "@/utils/Api";

// 路由
const router = useRouter()
function goPath(path: string) {
    router.push(path)
}
function reload() {
    location.reload()
}

// 标题
exData.title.value = "成绩查询"

// 初始化一些变量
let s_name = ref(CookieManager.getCookie("name") != null)
let name = ref<string>(CookieManager.getCookie("name") || "")
let isErr = ref(false)
let errMsg = ref("请求失败")
let isOk = ref(false)
let qq = ref(false)
let cj = ref({
    "语文": 0,
    "数学": 0,
    "英语": 0,
    "思政": 0
})
let msg = ref("不错嘛，再接再厉！")

exApi("/ResultsQuery/login", {}).then((req:any) => {
    if (req.data.isQuery) {
        CookieManager.setCookie("name", req.data.name)
        s_name.value = true
        name.value = req.data.name
    }
})

function query() {
    qq.value = true
    exApi("/ResultsQuery/query", {name: name.value}).then((req:any) => {
        if (req.data.length == 0) {
            errMsg.value = "数据检索失败，请检查姓名是否正确!"
            isErr.value = true
            return
        }
        cj.value = req.data[0]

        let zf = cj.value["语文"] + cj.value["数学"] + cj.value["英语"] + cj.value["思政"]
        if (zf >= 320) {
            msg.value = "非常好，继续保持！"
        } else if (zf >= 301) {
            msg.value = "不错嘛，再接再厉！"
        } else if (zf >= 263) {
            msg.value = "有进步的空间，加油！"
        } else {
            msg.value = "别气馁，继续努力！"
        }

        CookieManager.setCookie("name", name.value)

        isOk.value = true
    }).catch((err) => {
        errMsg.value = err.code + "：" + err.msg
        isErr.value = true
    })
}
</script>

<template>
    <div v-if="isErr" class="center-container">
        <el-col :sm="12" :lg="6" class="form-container">
            <el-result
                icon="error"
                title="错误"
                :sub-title="errMsg"
            >
                <template #extra>
                    <el-button type="primary" @click="reload()">刷新</el-button>
                </template>
            </el-result>
        </el-col>
    </div>

    <div v-if="true" id="login" class="center-container mdui-prose">
        <div class="form-container login">
            <h1 style="margin-bottom: 20px;">版本更新中，尽情期待...</h1>
            <p>2023级10班 - 职二上半学期期末</p>
        </div>
    </div>

    <div v-if="false" id="login" class="center-container mdui-prose">
        <div class="form-container login">
            <h1 style="margin-bottom: 20px;">期末成绩查询</h1>
            <p>2023级10班 - 职二上半学期期中</p>
            <mdui-text-field variant="outlined" icon="numbers" maxlength="3" counter label="您的姓名" :disabled="s_name" :value="name" @input="name = $event.target.value" style="margin-bottom: 20px;"></mdui-text-field>
            <mdui-button full-width @click="query()" :loading="qq" :disabled="qq">查询</mdui-button>
        </div>
    </div>

    <div v-if="isOk" class="center-container">
        <div class="form-container login">
            <h1>您的期中成绩</h1>
            <mdui-list-item>
                语文
                <mdui-icon slot="icon" name="book"></mdui-icon>
                <h2 slot="end-icon">{{cj["语文"]}}</h2>
            </mdui-list-item>

            <mdui-list-item>
                数学
                <mdui-icon slot="icon" name="format_list_numbered"></mdui-icon>
                <h2 slot="end-icon">{{cj["数学"]}}</h2>
            </mdui-list-item>

            <mdui-list-item>
                英语
                <mdui-icon slot="icon" name="language"></mdui-icon>
                <h2 slot="end-icon">{{cj["英语"]}}</h2>
            </mdui-list-item>

            <mdui-list-item>
                思政
                <mdui-icon slot="icon" name="contact_page"></mdui-icon>
                <h2 slot="end-icon">{{cj["思政"]}}</h2>
            </mdui-list-item>

            <mdui-list-item>
                总分
                <mdui-icon slot="icon" name="done_all"></mdui-icon>
                <h2 slot="end-icon">{{cj["语文"] + cj["数学"] + cj["英语"] + cj["思政"]}}</h2>
            </mdui-list-item>

            <p>{{msg}}</p>
        </div>
    </div>
</template>

<style>
.center-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* 使容器高度为视口高度 */
}

.form-container {
    text-align: center;
    width: 100%; /* 使表单容器宽度为100% */
}

/* 当屏幕宽度大于768px时，设置宽度为50% */
@media (min-width: 768px) {
    .login {
        width: 50%;
    }
}

/* 当屏幕宽度大于1200px时，设置宽度为40% */
@media (min-width: 1200px) {
    .login {
        width: 40%;
    }
}
</style>
