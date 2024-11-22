<script setup lang="ts">
import {nextTick, onMounted, ref} from "vue"
import { RouterLink, RouterView, useRouter} from "vue-router"

import { exData } from "@/utils/Data"
import Loaging from "@/utils/Loaging"
import { setColorScheme } from "mdui"


// 配色
setColorScheme("#40EDED")

// 加载动画
Loaging.start()
onMounted(() => {
    nextTick(() => {
        Loaging.close()
    })
})

// 路由
const router = useRouter()
function goPath(path: string) {
    router.push(path)
}
function goBack() {
    router.go(-1)
}
</script>

<template>
    <div class="app-container">
        <mdui-navigation-rail divider>
            <mdui-avatar src="/img/logo-1024.png" style="margin-bottom:20px;margin-top:20px;--shape-corner: 10px" onclick="window.location.href='/'"></mdui-avatar>
            <mdui-button-icon icon="refresh" slot="bottom" id="loading" :loading = "exData.isLoading.value"></mdui-button-icon>

            <mdui-navigation-rail-item icon="query_stats" @click="goPath('/results-query')">成绩查询</mdui-navigation-rail-item>

            <!-- <mdui-navigation-rail-item v-if="exData.isLogin.value" icon="home" @click="goPath('/')">主页</mdui-navigation-rail-item>
            <mdui-navigation-rail-item v-if="exData.isLogin.value" icon="assignment" @click="goPath('/tool')">工具</mdui-navigation-rail-item>
            <mdui-navigation-rail-item v-if="exData.isLogin.value" icon="supervised_user_circle" @click="goPath('/user')">用户</mdui-navigation-rail-item>

            <mdui-navigation-rail-item v-if="!exData.isLogin.value" icon="login" @click="goPath('/login')">登录</mdui-navigation-rail-item>
            <mdui-navigation-rail-item v-if="!exData.isLogin.value" icon="fingerprint" @click="goPath('/register')">注册</mdui-navigation-rail-item>

            <mdui-navigation-rail-item icon="question_answer" @click="goPath('/qa')">Q&A</mdui-navigation-rail-item> -->
        </mdui-navigation-rail>

        <div class="content-container">
            <el-page-header @click="goBack" title="返回">
                <template #content>
                    <span>{{ exData.title }}</span>
                </template>
            </el-page-header>

            <RouterView class="router-view"></RouterView>
        </div>
    </div>
</template>

<style>
.app-container {
  display: flex;
  height: 100vh;
}

.content-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.router-view {
  flex-grow: 1;
  overflow: auto;
}
</style>
