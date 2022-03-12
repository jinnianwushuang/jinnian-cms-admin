/*
 * @Author         : your name
 * @Date           : 2022-03-12 15:13:06
 * @LastEditTime   : 2022-03-12 19:57:22
 * @LastEditors    : Please set LastEditors
 * @Description    : 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath       : \front-web-cms-admin\src\api\module\user.js
 */

import axios  from "src/api/commom/axioswapper.js"

let prefix =''

// 
// export const post1 = (params, url) => axios.post(`${prefix}${url}`, params)
// export const get1 = (params, url) => axios.get(`${prefix}${url}`, { params: {...params } })

//  用户列表
 
export const get_user_all = (params, url='/user/all') => axios.get(`${prefix}${url}`, { params: {...params } })
//获取用户详情

export const get_user_info = (params, url='/user/info') => axios.get(`${prefix}${url}`, { params: {...params } })

// 删除用户
export const post_user_delete = (params, url='/user/delete') => axios.post(`${prefix}${url}`, params)
// 创建用户

export const post_user_create = (params, url="/user/create") => axios.post(`${prefix}${url}`, params)

//修改用户信息
export const post_user_edit = (params, url="/user/edit") => axios.put(`${prefix}${url}`,  params)
