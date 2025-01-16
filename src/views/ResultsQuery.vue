<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RouterLink, RouterView, useRouter } from "vue-router";
import { exData, CookieManager } from "@/utils/Data";
import App from "@/App.vue";
import { exApi } from "@/utils/Api";

// 路由
const router = useRouter();
function goPath(path: string) {
    router.push(path);
}
function reload() {
    location.reload();
}

// 标题
exData.title.value = "成绩查询";

// 初始化一些变量
let s_name = ref(CookieManager.getCookie("name") != null);
let name = ref<string>(CookieManager.getCookie("name") || "");
let isErr = ref(false);
let errMsg = ref("请求失败");
let isOk = ref(false);
let qq = ref(false);

// 更新 cj 变量定义
let cj = ref({
    "语文": 0,
    "数学": 0,
    "英语": 0,
    "哲学与人生": 0, // 替换思政为哲学与人生
    "电子技术": 0, // 新增科目
    "二维动画": 0,
    "数据库": 0,
    "体育": 0,
    "历史": 0,
    "艺术": 0
});

exApi("/ResultsQuery/login", {}).then((req: any) => {
    if (req.data.isQuery) {
        CookieManager.setCookie("name", req.data.name);
        s_name.value = true;
        name.value = req.data.name;
    }
});

function query() {
    qq.value = true;
    exApi("/ResultsQuery/query", { name: name.value }).then((req: any) => {
        if (req.data.length == 0) {
            errMsg.value = "数据检索失败，请检查姓名是否正确!";
            isErr.value = true;
            return;
        }
        cj.value = req.data[0];

        CookieManager.setCookie("name", name.value);

        isOk.value = true;
    }).catch((err) => {
        errMsg.value = err.code + "：" + err.msg;
        isErr.value = true;
    });
}

onMounted(() => {
    // 检查 cookie 中是否有名字，并根据结果设置 s_name 和 name
    const storedName = CookieManager.getCookie("name");
    if (storedName) {
        s_name.value = true;
        name.value = storedName;
        query(); // 如果有名字，自动查询成绩
    }
});

function calculateTotalScore(): number {
    return Object.values(cj.value).reduce((acc: number, curr: any) => {
        const num = Number(curr);
        return isNaN(num) ? acc : acc + num;
    }, 0);
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

    <div v-if="!isErr && !isOk" id="login" class="center-container mdui-prose">
        <div class="form-container login">
            <h1 style="margin-bottom: 20px;">期末成绩查询</h1>
            <p>2023级10班 - 职二上半学期期末</p>
            <mdui-text-field variant="outlined" icon="numbers" maxlength="3" counter label="您的姓名" :disabled="s_name" :value="name" @input="name = $event.target.value" style="margin-bottom: 20px;"></mdui-text-field>
            <mdui-button full-width @click="query()" :loading="qq" :disabled="qq">查询</mdui-button>
        </div>
    </div>

    <div v-if="isOk" class="center-container">
        <div class="form-container login">
            <h1>您的期中成绩</h1>
            <p>姓名：{{ name }}</p>
            <mdui-list-item>
                语文
                <mdui-icon slot="icon" name="book"></mdui-icon>
                <h2 slot="end-icon">{{ cj["语文"] }}</h2>
            </mdui-list-item>

            <mdui-list-item>
                数学
                <mdui-icon slot="icon" name="format_list_numbered"></mdui-icon>
                <h2 slot="end-icon">{{ cj["数学"] }}</h2>
            </mdui-list-item>

            <mdui-list-item>
                英语
                <mdui-icon slot="icon" name="language"></mdui-icon>
                <h2 slot="end-icon">{{ cj["英语"] }}</h2>
            </mdui-list-item>

            <mdui-list-item>
                哲学与人生
                <mdui-icon slot="icon" name="contact_page"></mdui-icon>
                <h2 slot="end-icon">{{ cj["哲学与人生"] }}</h2>
            </mdui-list-item>

            <mdui-list-item>
                电子技术
                <mdui-icon slot="icon" name="settings"></mdui-icon>
                <h2 slot="end-icon">{{ cj["电子技术"] }}</h2>
            </mdui-list-item>

            <mdui-list-item>
                二维动画
                <mdui-icon slot="icon" name="movie_creation"></mdui-icon>
                <h2 slot="end-icon">{{ cj["二维动画"] }}</h2>
            </mdui-list-item>

            <mdui-list-item>
                数据库
                <mdui-icon slot="icon" name="storage"></mdui-icon>
                <h2 slot="end-icon">{{ cj["数据库"] }}</h2>
            </mdui-list-item>

            <mdui-list-item>
                体育
                <mdui-icon slot="icon" name="directions_run"></mdui-icon>
                <h2 slot="end-icon">{{ cj["体育"] }}</h2>
            </mdui-list-item>

            <mdui-list-item>
                历史
                <mdui-icon slot="icon" name="history"></mdui-icon>
                <h2 slot="end-icon">{{ cj["历史"] }}</h2>
            </mdui-list-item>

            <mdui-list-item>
                艺术
                <mdui-icon slot="icon" name="palette"></mdui-icon>
                <h2 slot="end-icon">{{ cj["艺术"] }}</h2>
            </mdui-list-item>

            <mdui-list-item>
                总分
                <mdui-icon slot="icon" name="done_all"></mdui-icon>
                <h2 slot="end-icon">{{ calculateTotalScore() }}</h2>

            </mdui-list-item>
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
