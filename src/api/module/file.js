/*
 * @Date           : 2022-03-29 22:52:39
 * @LastEditTime   : 2022-03-29 22:53:20
 * @Description    :  
 */


import axios  from "src/api/commom/axioswapper.js"

let prefix=process.env.API_PREFIX_1;


//禁用
export const handle_upload = (params, url="/file/upload") => axios.post(`${prefix}${url}`,  params,)

