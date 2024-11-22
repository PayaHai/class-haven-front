import axios from 'axios'
import {ElNotification} from "element-plus";

export type ApiRes = {
    code: number
    msg: string
    data: object
}

/**
 * 请求服务器
 * @param path 路径
 * @param data 数据
 */
export async function exApi(path: string, data: object):Promise<ApiRes> {
    return new Promise(async (resolve, reject) => {
        axios.post(import.meta.env.VITE_API_URL + path, data).then((res: {data:ApiRes}) => {
            if (res.data.code == 200) {
                resolve(res.data)
            } else {
                reject(res.data)
                ElNotification({
                    title: '请求服务器失败',
                    message: res.data.msg,
                    type: 'error',
                })
            }
        }).catch((err) => {
            reject({
                code: -1,
                msg: `请求失败，由于：${err}`,
                data: {}
            })

            ElNotification({
                title: '请求服务器失败',
                message: err,
                type: 'error',
            })
        })
    })
}