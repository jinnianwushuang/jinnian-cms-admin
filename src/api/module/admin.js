/*
 * @Author         : your name
 * @Date           : 2022-03-12 15:12:14
 * @LastEditTime   : 2022-03-12 15:12:14
 * @LastEditors    : Please set LastEditors
 * @Description    : 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath       : \front-web-cms-admin\src\api\module\admin.js
 */

import axios  from "src/api/commom/axioswapper.js"

let prefix=''
//管理员登录接口
export const post_admin_login = (params, url='/admin/login') => axios.post(`${prefix}${url}`, params)

 