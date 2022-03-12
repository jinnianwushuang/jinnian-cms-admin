<!--
 * @Author         : your name
 * @Date           : 2022-03-12 21:58:23
 * @LastEditTime   : 2022-03-13 00:02:15
 * @LastEditors    : Please set LastEditors
 * @Description    : 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath       : /front-web-cms-admin/src/pages/user/index.vue
-->
<template>
  <div class="q-pa-md">
    <q-table
      title="Treats"
      :rows="table_data"
      :columns="columns"
      row-key="name"
      hide-header
      hide-pagination
      hide-bottom
    />
    <div class="q-mt-md">
      <a-pagination
        v-model:current="currentPage"
        :page-size-options="pageSizeOptions"
        :total="total"
        show-size-changer
        show-quick-jumper
        :page-size="pageSize"
        @change="onChange"
        @showSizeChange="onShowSizeChange"
      >
        <template #itemRender="{ type, originalElement }">
          <a v-if="type === 'prev'">上一页</a>
          <a v-else-if="type === 'next'">下一页</a>
          <component :is="originalElement" v-else></component>
        </template>
        <template #buildOptionText="props">
          <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
          <span v-else>全部</span>
        </template>
      </a-pagination>
    </div>
  </div>
</template>

<script>
import { columns, mock_rows } from "./config/index";
 
import  pagination_composables  from  "src/composables/pagination.js"

import { api_user } from "src/api";
 

import { defineComponent, ref } from "vue";
export default {
  data() {
    return {
      table_data:[]
    }
  },
  components: {
 
  },
  setup() {
    let {
    pageSizeOptions,
    currentPage,
    pageSize,
    total,
    onShowSizeChange,
    onChange,
    } = pagination_composables()

    return {
      columns,
      rows: mock_rows,
      pageSizeOptions,
      currentPage,
      pageSize ,
      total,
      onShowSizeChange,
       onChange,
   
    };
  },
  created () {
     this.init_table_data();
    // for (let i=0;i<100;i++) {
    //    this.handle_create_data()
      
    // }
  },
  methods: {
    /**
     * 列表查询
     */
   async init_table_data() {

      let params={
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
       let  res = await api_user.get_user_all(params);
       let {code,msg,data} = res.data


      console.log("获取用户列表",data);
      
         this.table_data= data
    },
      /**
   * 创建
   */
  async handle_create_data(){
       
       let params={
         name: 'name'+Math.ceil(100*Math.random()),
         password: 'pass'+Math.ceil(100*Math.random()),
         age: Math.ceil(100*Math.random())

       }

    let  res = await api_user.post_user_create(params)
     let {code,msg,data} = res.data 
  }

  },



};
</script>
