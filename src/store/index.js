/*
 * @Date           : 2022-04-05 14:23:04
 * @LastEditTime   : 2022-04-05 15:20:51
 * @Description    :  
 */
import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
import window_resize from "./module/window_resize"
import questionTopic from "./module/questionTopic"
export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      window_resize,
      questionTopic
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
