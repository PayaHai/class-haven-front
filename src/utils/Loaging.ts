import { ElLoading } from 'element-plus'
import { exData } from "@/utils/Data";

export default class Loaging {
    static loading: any = null

    static start(msg:string = "加载中...") {
        exData.isLoading.value = true
        this.loading = ElLoading.service({
            "text": msg
        })
    }

    static close() {
        exData.isLoading.value = false
        this.loading.close()
    }
}