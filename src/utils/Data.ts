import {ref, watch} from "vue";

class CookieManager {
    /**
     * 设置cookie
     * @param name - cookie名称
     * @param value - cookie值
     * @param expires - 过期时间，单位秒，默认为0表示不过期
     */
    public static setCookie(name: string, value: string, expires: number = 0) {
        let cookieString = `${name}=${value}; path=/`
        if (expires > 0) {
            const date = new Date()
            date.setTime(date.getTime() + (expires * 1000))
            cookieString += `; expires=${date.toUTCString()}`
        }
        document.cookie = cookieString
    }

    /**
     * 获取cookie
     * @param name - cookie名称
     * @returns cookie值，如果不存在则返回null
     */
    public static getCookie(name: string): string | null {
        const nameEQ = `${name}=`
        const ca = document.cookie.split(';')
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i]
            while (c.charAt(0) === ' ') c = c.substring(1, c.length)
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
        }
        return null
    }

    /**
     * 删除cookie
     * @param name - cookie名称
     *
     */
    public static deleteCookie(name: string) {
        CookieManager.setCookie(name, "", -1)
    }
}


let exData = {
    token: ref(CookieManager.getCookie("token")),
    isLogin: ref(CookieManager.getCookie("token") != null),
    isLoading: ref(false),
    title: ref("")
}

// 监听标题更新并更新页面标题
watch(exData.title, (newValue) => {
    document.title = `班级之家 | ${newValue}`
})


export {
    CookieManager,
    exData
}