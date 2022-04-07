<!--
 * @Date           : 2022-04-03 21:49:58
 * @LastEditTime   : 2022-04-06 15:10:10
 * @Description    :  
-->
<template>
  <q-card class="my-card mw70vw q-px-md w70vw">
    <q-card-section class="no-padding">
      <div class="row">
        <div class="text-weight-bolder lh40">
          {{ editing_obj.id ? "编辑" : "新建" }}数据
        </div>
        <q-space />
        <q-btn flat round icon="close" v-close-popup />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-py-md q-gutter-y-md">
      <div>
        <div class="text-red text-center">
          如果英文没有配置则使用中文的配置。注意因为图片一般偏大，建议点击插入图片进行上传图片。
        </div>
        <div class="text-red text-center">
          请勿直接复制粘贴图片。如果插入图片后期望移动图片位置，请鼠标选中图片，
          剪切到对应的位置。
        </div>
      </div>
      <div class="row">
        <div class="w120 form-item-label">
          标题中文 <span class="text-red">*</span>
        </div>
        <q-input
          class="col"
          filled
          dense
          v-model.trim="editing_obj.title_zn"
          type="text"
          counter
          maxlength="20"
        />
      </div>
      <div class="row">
        <div class="w120 form-item-label">标题英文</div>
        <q-input
          class="col"
          filled
          dense
          v-model="editing_obj.title_en"
          type="text"
          counter
          maxlength="20"
        />
      </div>
      <div class="row">
        <div class="w120 form-item-label">
          内容中文 <span class="text-red">*</span>
        </div>
        <q-editor
          class="col"
          filled
          dense
          v-model="editing_obj.content_zn"
          min-height="5rem"
          ref="content_zn_input"
        />
        <div class="ralative-position w100 h30 q-ml-md">
          <q-file
            class="absolute w100 h30"
            style="z-index: 6"
            flat
            dense
            @update:model-value="handle_content_zn_files_update"
          >
            <template v-slot:file="{ index, file }"> </template>
          </q-file>
          <q-btn color="primary" class="absolute w100 h40" style="z-index: 3">
            插入图片</q-btn
          >
        </div>
      </div>
      <div class="row">
        <div class="w120 form-item-label">内容英文</div>
        <q-editor
          class="col"
          filled
          dense
          v-model="editing_obj.content_en"
          min-height="5rem"
          @update:model-value="handle_content_en_update"
        />
        <div class="ralative-position w100 h30 q-ml-md">
          <q-file
            class="absolute w100 h30"
            style="z-index: 6"
            flat
            dense
            @update:model-value="handle_content_en_files_update"
          >
            <template v-slot:file="{ index, file }"> </template>
          </q-file>
          <q-btn color="primary" class="absolute w100 h40" style="z-index: 3">
            插入图片</q-btn
          >
        </div>
      </div>
      <div class="row">
        <div class="w120 form-item-label">问题主题</div>
        <q-select
          class="col"
          filled
          dense
          emit-value
          multiple
          map-options
          option-label="name_zn"
          option-value="sid"
          :options="questionTopic_options"
          v-model="editing_obj.topic"
        />
      </div>
      <div class="row">
        <div class="w120 form-item-label">状态</div>
        <q-select
          class="col"
          filled
          dense
          emit-value
          map-options
          :options="options_status"
          v-model="editing_obj.status"
        />
      </div>
      <div class="row">
        <div class="w120 form-item-label">置顶</div>
        <q-checkbox v-model="editing_obj.is_top" />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <q-btn color="primary" @click="handle_conform_edit" label="确定" />
      <q-btn
        v-close-popup
        color="deep-orange"
        glossy
        @click="handle_cancel_edit"
        label="取消"
      />
    </q-card-actions>
  </q-card>
</template>
<script>
import { ref, toRaw } from "vue";
import { api_file ,api_faq } from "src/api/index";

import { mapGetters } from 'vuex';

 

export default {
  emits:["emit-edit"],
  data() {
    return {
      editorRef: ref(null),
      files: [],
      editing_obj: {},
      temp_obj: {
        title_zn: "",
        title_en: "",
        content_zn: "",
        content_en: "",
        status: null,
        is_top: false,
        topic: [],
      },
      questionTopic_options:[],
      options_status: [
        {
          label: "开启",
          value: 1,
        },
        {
          label: "关闭",
          value: -1,
        },
        {
          label: "禁用",
          value: -2,
        },
      ],
      //中文内容 旁边的插入图片
      content_zn_files: null,
      //英文内容 旁边的插入图片
      content_en_files: null,
    };
  },
  props: {
    detail_obj: {},
  },
    computed: {
    ...mapGetters([
      'get_questionTopic',
    ])
  },
  created() {
    if (this.detail_obj.id) {
    this.get_info();
   
    } else {
      this.editing_obj = this.$lodash.cloneDeep(this.temp_obj);
    }

    this.questionTopic_options =     JSON.parse(JSON.stringify(this.get_questionTopic))
    

    this.editing_obj.content_zn = ` <div class="text-center"><img src="http://127.0.0.1:17101/public/1.png" style="zoom: 60%;" ></div>`;

    console.log("this.get_questionTopic-",this.get_questionTopic.value);
  },
  methods: {
    async get_info() {
      let params = {
        id: this.detail_obj.id,
      };
      let res = await api_faq.handle_info(params);
      let { code, msg, data } = res.data;
      console.log(data);
  
 
        this.editing_obj = this.$lodash.cloneDeep(data);
      this.$forceUpdate();
    },
    //英文文内容 文件 更新
    handle_content_en_files_update(value) {
      this.handle_content_files_update(value, "content_en");
    },
    //中文内容 文件 更新
    async handle_content_zn_files_update(value) {
      this.handle_content_files_update(value, "content_zn");
    },
    //通用内容 文件 更新
    async handle_content_files_update(value, key) {
      console.log(" //中文内容 文件 更新");
      console.log(value);
      let name = value.name;
      if (!name) {
        return false;
      }
      let data = await this.handle_upload([value]);
      console.log(data);
      let path = data[name];
      let str = ` <div class="text-center"><img src="http://127.0.0.1:17101${path}" style="zoom: 60%;" ></div>`;
      this.editing_obj[key] += str;
    },
    /**
     * 文件上传
     * @param {*} files
     */
    async handle_upload(files = []) {
      console.log("this.files----", this.files);
      let len = files.length;
      if (len == 0) {
        return false;
      }
      let form = new FormData();
      for (let i = 0; i < len; i++) {
        form.append("files[]", files[i]);
      }
      form.set("other", 1);
      let res = await api_file.handle_upload(form);
      form = null;
      console.log(res.data);
      let { code, data, msg, success } = res.data;
      if (success) {
        return data;
      } else {
        return "";
      }
    },
    /**
     * 中文 内容更改
     */
    handle_content_zn_update(value) {
      console.log(
        "this.$refs.content_zn_input.selectionStart-------",
        this.$refs.content_zn_input.selectionStart
      );
      console.log(value);
    },
    /**
     * 英文内容更改
     */
    handle_content_en_update() {
      console.log(value);
    },

    /**
     * 确定 提交更改
     *
     */
    handle_conform_edit() {
      let {
        id,
        title_zn,
        title_en,
        content_zn,
        content_en,
        status,
        is_top,
        topic,
      } = this.editing_obj;

      let final_obj = {
        id,
        title_zn,
        title_en,
        content_zn,
        content_en,
        status,
        is_top,
        topic,
      };

      if (!title_zn || !content_zn) {
        this.$q.notify({
          type: "negative",
          message: '中文标题和中文内容必填',
        });
      }

      this.$utils.remove_false_key(final_obj);

 
      console.log("this.editing_obj-----22---", final_obj);

       this.$emit("emit-edit",final_obj)

    },
    /**
     * 取消  取消更改
     *
     */
    handle_cancel_edit() {},
  },
};
</script>
<style lang="scss" scoped></style>
