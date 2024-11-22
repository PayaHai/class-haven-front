<script setup lang="ts">
import {onMounted, ref} from "vue"
import { RouterLink, RouterView, useRouter} from "vue-router"

import { exData } from "@/utils/Data"

// 路由
const router = useRouter()
function goPath(path: string) {
    router.push(path)
}
function reload() {
    location.reload()
}

// 标题
exData.title.value = "登录"

// 初始化一些变量
let CFToken = null
let isErr = ref(true)


window.onloadTurnstileCallback = function () {
    turnstile.render("#turnstile", {
        "sitekey": "0x4AAAAAAA0TMBPkuSIAZgUr",
        "callback": (token:string) => {
            CFToken = token
        },
        "error-callback": () => {}
    })
}
</script>

<template>
    <div v-if="isErr" class="center-container">
        <el-col :sm="12" :lg="6" class="form-container">
            <el-result
                icon="error"
                title="错误"
                sub-title="人机验证遇到了些问题"
            >
                <template #extra>
                    <el-button type="primary" @click="reload()">刷新</el-button>
                </template>
            </el-result>
        </el-col>
    </div>

    <div v-if="!isErr" id="login" class="center-container mdui-prose">
        <div class="form-container login">
            <h1>登录</h1>
            <mdui-text-field variant="outlined" icon="numbers" maxlength="3" counter label="姓名" style="margin-bottom: 20px;"></mdui-text-field>
            <mdui-text-field variant="outlined" icon="password" maxlength="64" counter label="密码"></mdui-text-field>
            <div id="turnstile" style="margin-bottom: 20px;"></div>
            <mdui-button full-width>登陆</mdui-button>
        </div>
    </div>
</template>

<style scoped>
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
