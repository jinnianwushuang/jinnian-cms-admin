/*
 * @Author         : your name
 * @Date           : 2022-03-12 15:13:06
 * @LastEditTime   : 2022-04-06 13:11:50
 * @LastEditors    : Please set LastEditors
 * @Description    : 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath       : /jinnian-cms-admin/src/api/module/user.js
 */

import axios  from "src/api/commom/axioswapper.js"

let prefix=process.env.API_PREFIX_1;

//
// export const post1 = (params, url) => axios.post(`${prefix}${url}`, params)
// export const get1 = (params, url) => axios.get(`${prefix}${url}`, { params: {...params } })


// 增加

export const handle_create = (params, url="/user/create") => axios.post(`${prefix}${url}`, params)
// 删除
export const handle_delete = (params, url='/user/delete') => axios.post(`${prefix}${url}`, params)

//修改
export const handle_update = (params, url="/user/update") => axios.post(`${prefix}${url}`,  params)


//查询

export const handle_read = (params, url='/user/all') => axios.get(`${prefix}${url}`, { params: {...params } })
//详情

export const handle_info = (params, url='/user/info') => axios.get(`${prefix}${url}`, { params: {...params } })

