/*
 * @Date           : 2022-04-05 11:58:02
 * @LastEditTime   : 2022-04-05 19:53:08
 * @Description    :
 */
import { boot } from "quasar/wrappers";

let utils = {
  /**
   *
   * @param {*} obj  需要 移除假值的对象
   * @param {*} exclude_keys   不参与计算的key ， 如果这些key 对应假值 将保留
   */
  remove_false_key(obj = {}, exclude_keys = []) {
    for (let i in obj) {
      if (!exclude_keys.includes(i) && !obj[i]) {
        delete obj[i];
      }
    }
  },
  /**
   * 生产随机字符串
   */
  randomstring(n=16){

    let result=''
    let str="ABCDEFGH1人KLMNOPQRSTUVWXYZabCdefghijk1mnopqrstuVWxyz0123456789"
    for(let i=0;i<n;i++){
    

        let i = Math.floor(Math.random()* (str.length))
        result+= str[i]  

    }
      
     return result

  },
  /**
   * 
   * 默认截取
   */
   default_format_substring(val=''){
 
       val = val.trim()
       let str=  val? (val||'').substring(0,20)+"...":''
      
  
    return str
   }
};

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$lodash

  app.config.globalProperties.$utils = utils;
});


export {utils }