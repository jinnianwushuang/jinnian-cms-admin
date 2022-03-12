/*
 * @Author         : your name
 * @Date           : 2022-03-12 15:19:23
 * @LastEditTime   : 2022-03-12 21:10:18
 * @LastEditors    : Please set LastEditors
 * @Description    : 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath       : \front-web-cms-admin\src\api\commom\axioswapper.js
 */


import axios from 'axios'

const api = axios.create({ baseURL: 'http://127.0.0.1:7001' })
export default api 