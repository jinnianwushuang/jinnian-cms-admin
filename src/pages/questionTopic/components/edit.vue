<!--
 * @Date           : 2022-04-03 21:49:58
 * @LastEditTime   : 2022-04-05 17:19:59
 * @Description    :  
-->
<template>
  <q-card class="my-card mw50vw q-px-md w50vw">
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
      <div class="row">
        <div class="w120 form-item-label">名字中文</div>
        <q-input class="col" filled dense v-model="editing_obj.name_zn" />
      </div>
      <div class="row">
        <div class="w120 form-item-label">名字英文</div>
        <q-input class="col" filled dense v-model="editing_obj.name_en" />
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
        <div class="w120 form-item-label">排序</div>
        <q-input
          class="col"
          filled
          dense
          v-model="editing_obj.order"
          type="number"
        />
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
import { ref } from "vue";
export default {
  emits: ["emit-edit"],
  data() {
    return {
      editorRef: ref(null),
      files: [],
      editing_obj: {},
      temp_obj: {
        name_zn: "",
        name_en: "",
        status: null,
        order: 0,
      },
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
    };
  },
  props: {
    detail_obj: {},
  },
  created() {
    if (this.detail_obj.id) {
      this.editing_obj = Object.assign(
        this.$lodash.cloneDeep(this.temp_obj),
        this.$lodash.cloneDeep(this.detail_obj)
      );
    } else {
      this.editing_obj = this.$lodash.cloneDeep(this.temp_obj);
    }
  },
  methods: {
    /**
     * 确定 提交更改
     *
     */
    handle_conform_edit() {
      let {
        id,
        name_zn,
        name_en,
        status,
        order,
      } = this.editing_obj;
      let final_obj = {
        id,
        name_zn,
        name_en,
        status,
        order,
      };
      if (!name_zn) {
        this.$q.notify({
          type: "negative",
          message: "中文名字必填",
        });
      }
      this.$utils.remove_false_key(final_obj);
      this.$emit("emit-edit", final_obj);
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
