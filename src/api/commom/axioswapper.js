/*
 * @Author         : your name
 * @Date           : 2022-03-12 15:19:23
 * @LastEditTime   : 2022-04-06 22:22:24
 * @LastEditors    : Please set LastEditors
 * @Description    : 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath       : \jinnian-cms-admin\src\api\commom\axioswapper.js
 */



import {   SessionStorage,Notify } from 'quasar'

import axios from 'axios'




const api = axios.create({ baseURL: 'http://127.0.0.1:17101' })


// Add a request interceptor
api.interceptors.request.use(function (config) {
    // Do something before request is sent
    let token = SessionStorage.getItem('token')
    config.headers['Authorization'] =  `Bearer ${token}` ;

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
api.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
console.log('response.data.code',response.data.code);
    if(response.data.code=='100003'){
        Notify.create({
            message:'登录已失效，请重新登录！',
            position:"top"
        })
        window.location.href =window.location.origin

        return Promise.reject('');
    }
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });



export default api
