/*
 * @Date           : 2022-03-14 21:34:32
 * @LastEditTime   : 2022-03-15 01:31:24
 * @Description    :
 */

// API 异步 模板占位 方法
const temp_promise_fn = new Promise((resolve, reject) => {
  resolve({ data: { code: "", msg: "", data: "" } });
});
export default {
  data() {
    return {
      //列表 表格项配置
      columns: [],
      //页面创建就发起请求
      init_table_when_created: true,
      //显示查询条件搜索功能区
      show_search_form_area: true,
      //显示翻页器功能区
      show_pagination_area: true,
      //显示 新建按钮
      show_create_btn: true,
      //显示编辑按钮
      show_edit_btn: true,
      //显示删除按钮
      show_delete_btn: true,
      //显示操作列
      show_handle_column: true,
      //显示编辑弹窗
      show_dialog_edit: false,
      //编辑弹窗内的数据 模板
      detail_obj_temp: {},
      //编辑弹窗内的数据
      detail_obj: {},
      //搜索表单 模板
      search_form_temp: {},
      //搜索表单
      search_form: {},
      //表格数据
      table_data: [],
      //增加 API
      api_fn_create: temp_promise_fn,
      //删除 API
      api_fn_delete: temp_promise_fn,
      //修改 API
      api_fn_update: temp_promise_fn,
      //查询 API
      api_fn_read: temp_promise_fn,
      //翻页器配置
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
      },
      //翻页器 每页条数选项数组
      pageSizeOptions: ["10", "20", "30", "40", "50", "100"],
      //当前页
      currentPage: 1,
      //每页条数
      pageSize: 10,
      //总条数
      total: 0,
    };
  },
  props: {
    // 是否是子组件
    is_child_component: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    //页面创建后基础流程
    this.base_process_when_created();
  },
  methods: {
    /**
     * 页面创建后基础流程
     */
    base_process_when_created() {
      //初始化 编辑弹窗内的数据 模板
      this.show_search_form_area && this.init_detail_obj_temp();
      //初始化 搜索表单 模板
      this.show_search_form_area && this.init_search_form_temp();
      //初始化  翻页器 配置
      this.show_pagination_area && this.init_pagination_config();
      //初始化 列表 表格项配置
      !this.show_handle_column && this.init_columns();
      //页面创建就发起请求
      this.init_table_when_created && this.init_table_data();
    },
    //初始化 编辑弹窗内的数据 模板
    init_detail_obj_temp() {
      this.detail_obj_temp = this.$lodash.cloneDeep(this.detail_obj);
    },
    //初始化 搜索表单 模板
    init_search_form_temp() {
      this.search_form_temp = this.$lodash.cloneDeep(this.search_form);
    },
    //初始化 列表 表格项配置
    init_columns() {
      this.columns = this.columns.filter((x) => x.name != "handle");
    },
    //初始化  翻页器 配置
    init_pagination_config() {
      if (this.show_pagination_area) {
        //显示翻页器功能区
        //当前页
        this.currentPage = 1;
        //每页条数
        this.pageSize = 10;
        //总条数
        this.total = 0;
        //翻页器配置
        this.pagination = {
          sortBy: "desc",
          descending: false,
          page: 1,
          rowsPerPage: 10,
          rowsNumber: 0,
        };
      } else {
        //不显示翻页器功能区
        //当前页
        this.currentPage = 1;
        //每页条数
        this.pageSize = 1000000;
        //总条数
        this.total = 1000000;
        //翻页器配置
        this.pagination = {
          sortBy: "desc",
          descending: false,
          page: 1,
          rowsPerPage: 1000000,
          rowsNumber: 1000000,
        };
      }
    },
    /**
     * 列表查询
     */
    async init_table_data() {
      let params = {
        ...this.search_form,
      };
      if (this.show_pagination_area) {
        //显示翻页器功能区
        params.currentPage = this.currentPage;
        params.pageSize = this.pageSize;
      }
      let res = await this.api_fn_read(params);
      let { code, msg, data } = res.data;
      console.log("获取列表", data);
      let docs = data.docs || [];
      this.table_data = docs;
      if (this.show_pagination_area) {
        //显示翻页器功能区
        this.total = data.total;
        this.pagination.rowsNumber = data.total;
      }
    },
    /**
     * 创建 mock数据
     */
    async handle_mock_data() {
      let params = {
        name: "name" + Math.ceil(100 * Math.random()),
        password: "pass" + Math.ceil(100 * Math.random()),
        age: Math.ceil(100 * Math.random()),
      };
      let res = await this.api_fn_create(params);
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
     * 点击  新建 按钮
     */
    hadle_click_create() {
      this.detail_obj = Object.assign({}, this.detail_obj_temp);
      this.show_dialog_edit = true;
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
      this.search_form = this.$lodash.cloneDeep(this.search_form_temp);
      this.init_table_data();
    },
    /**
     * 点击 删除 一条数据
     */
    async handle_delete_record(record) {
      console.log("record", record.id);
      let params = {
        id: record.id,
      };
      let res = await this.api_fn_delete(params);
      let { code, msg, data } = res.data;
    },
    /**
     * 点击 编辑 一条数据
     */
    handle_edit_record(record) {
      this.detail_obj = Object.assign({}, this.detail_obj_temp, record);
      this.show_dialog_edit = true;
      console.log("record", record.id);
    },
    /**
     *编辑弹窗  确定
     *
     */
    handle_conform_edit() {
      if (this.detail_obj.id) {
        //修改   确定
        this.handle_conform_update();
      } else {
        // 新增   确定
        this.handle_conform_create();
      }
    },
    /**
     * 新增   确定
     *
     */
    async handle_conform_create() {
      let params = {
        ...this.detail_obj,
      };
      let res = await this.api_fn_create(params);
      let { code, msg, data } = res.data;
      this.init_table_data();
    },
    /**
     * 修改   确定
     *
     */
    async handle_conform_update() {
      let params = {
        ...this.detail_obj,
      };
      let res = await this.api_fn_update(params);
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
