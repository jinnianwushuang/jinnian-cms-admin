
<template>
  <div class="q-pa-md">
    <div ref="tableHeader">
      <!-- 导航栏 -->
      <div class="q-py-xs">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="主页面" />
          <q-breadcrumbs-el label="用户模块" />
        </q-breadcrumbs>
      </div>
      <!-- 搜索区域 -->
      <div class="row q-my-sm">
        <q-input outlined v-model="search_form.name" dense class="w200 q-mr-md">
          <template v-slot:prepend> 名字 </template>
        </q-input>
        <q-space />
        <q-btn
          color="primary"
          glossy
          class="q-mr-md"
          @click="hadle_click_search"
          label="搜索"
        />
        <q-btn
          color="deep-orange"
          glossy
          @click="hadle_reset_search_form"
          label="重置"
        />
      </div>
    </div>
    <q-table
      class="sticky-header-table"
      :rows="table_data"
      :columns="columns"
      row-key="name"
      table-header-class="bg-grey-4   text-weight-bolder"
      hide-pagination
      hide-bottom
      v-model:pagination="pagination"
      :style="`max-height:${scroll_area_height}px`"
    >
      <template v-slot:body-cell-handle="props">
        <q-td :props="props">
          <q-btn
            color="primary"
            class="q-mr-md"
            glossy
            @click="handle_edit_record(props.row)"
            label="编辑"
          />
          <q-btn
            color="deep-orange"
            glossy
            @click="handle_delete_record(props.row)"
            label="删除"
          />
        </q-td>
      </template>
    </q-table>
    <!-- 底部翻页器 -->
    <div class="q-mt-md row justify-center">
      <a-pagination
        v-model:current="currentPage"
        :page-size-options="pageSizeOptions"
        :total="total"
        show-size-changer
        show-quick-jumper
        :page-size="pageSize"
        :show-total="(total) => `总共 ${total} 条`"
        @change="onChange"
        @showSizeChange="onShowSizeChange"
      >
        <template #itemRender="{ type, originalElement }">
          <a v-if="type === 'prev'">上一页</a>
          <a v-else-if="type === 'next'">下一页</a>
          <component :is="originalElement" v-else></component>
        </template>
        <template #buildOptionText="props">
          <span>{{ props.value }}条/页</span>
        </template>
      </a-pagination>
    </div>
    <!-- 编辑弹窗 -->
    <q-dialog v-model="show_dialog_edit">
      <q-card class="my-card w600 q-px-md">
        <q-card-section class="no-padding">
          <div class="row">
            <div class="text-weight-bolder lh40">编辑数据</div>
            <q-space />
            <q-btn flat round icon="close" v-close-popup />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section class="q-py-md">
          <div class="row">
            <div class="w120 form-item-label">名字</div>
            <q-input
              ref="inputRef"
              class="col"
              filled
              dense
              v-model="detail_obj.name"
              :rules="[
                (val) => val.length <= 32 || 'Please use maximum 32 characters',
              ]"
            />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn
            v-close-popup
            color="primary"
            @click="handle_conform_edit"
            label="确定"
          />
          <q-btn
            v-close-popup
            color="deep-orange"
            glossy
            @click="handle_cancel_edit"
            label="取消"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { columns } from "./config/index";

import pagination_composables from "src/composables/pagination.js";

import { api_user } from "src/api";

import { defineComponent, ref } from "vue";
import { window_size_mixin } from "src/mixin/index";
export default {
  components: {},
  mixins: [window_size_mixin],
  data() {
    return {
      //显示编辑弹窗
      show_dialog_edit: false,
      //编辑弹窗内的数据
      detail_obj: {},
      //搜索表单
      search_form: {
        name: "",
      },
      //表格数据
      table_data: [],

    };
  },

  setup() {
    let { pageSizeOptions, currentPage, pageSize, total, pagination } =
      pagination_composables();

    return {
      columns,
      pagination,
      pageSizeOptions,
      currentPage,
      pageSize,
      total,
    };
  },
  created() {
    this.init_table_data();
  },

  methods: {
    /**
     * 列表查询
     */
    async init_table_data() {
      let params = {
        name: this.search_form.name,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      };
      let res = await api_user.get_user_all(params);
      let { code, msg, data } = res.data;

      console.log("获取用户列表", data);

      this.table_data = data.docs;
      this.total = data.total;
      this.pagination.rowsNumber = data.total;
    },
    /**
     * 创建
     */
    async handle_create_data() {
      let params = {
        name: "name" + Math.ceil(100 * Math.random()),
        password: "pass" + Math.ceil(100 * Math.random()),
        age: Math.ceil(100 * Math.random()),
      };

      let res = await api_user.post_user_create(params);
      let { code, msg, data } = res.data;
    },
    /**
     * 翻页器每页条数改变
     * @param {*} current
     * @param {*} page_size
     */
    onShowSizeChange(current, page_size) {
      console.log(current, page_size);
      this.pagination.rowsPerPage = page_size;
      this.pageSize = page_size;
      this.init_table_data();
    },
    /**
     * 翻页器 页数改变
     * @param {*} pageNumber
     */
    onChange(pageNumber) {
      console.log("Page: ", pageNumber);
      this.pagination.page = pageNumber;
      this.currentPage = pageNumber;
      this.init_table_data();
    },
    /**
     * 点击 查询条件 搜索 按钮
     */
    hadle_click_search() {
      this.init_table_data();
    },
    /**
     * 点击 查询条件 重置 按钮
     */
    hadle_reset_search_form() {
      this.currentPage = 1;
      this.search_form = {
        name: "",
      };
      this.init_table_data();
    },
    /**
     * 点击 删除 一条数据
     */
    handle_delete_record(record) {
      console.log("record", record._id);
    },
    /**
     * 点击 编辑 一条数据
     */
    handle_edit_record(record) {
      this.detail_obj = record;
      this.show_dialog_edit = true;
      console.log("record", record._id);
    },
    /**
     *编辑弹窗  确定
     *
     */
    async handle_conform_edit() {
      let params = {
        ...this.detail_obj,
      };
      let res = await api_user.post_user_update(params);
      let { code, msg, data } = res.data;
      this.init_table_data();
    },
    /**
     * 编辑弹窗  取消
     */
    handle_cancel_edit() {
      this.show_dialog_edit = false;
      this.detail_obj = {};
    },

  },
};
</script>
