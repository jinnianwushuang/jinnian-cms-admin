<!--
 * @Date           : 2022-04-05 15:18:04
 * @LastEditTime   : 2022-04-05 16:06:06
 * @Description    :  
-->
<template>
  <q-card class="my-card mw70vw q-px-md w70vw">
    <q-card-section class="no-padding">
      <div class="row">
        <div class="text-weight-bolder lh40">预览数据</div>
        <q-space />
        <q-btn flat round icon="close" v-close-popup />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-py-md q-gutter-y-md">
      <div>
        <q-btn glossy @click="language = 'zn'" label="中文" class="q-mr-md" />
        <q-btn glossy @click="language = 'en'" label="英文" />
      </div>
      <q-separator />
      <div class="pb30">
        <div class="text-center fz30 fw600 my30">
          {{ info_obj[`title_${language}`] }}
        </div>
        <!-- 主题 -->
        <div class="row text-center justify-center q-gutter-x-lg my20">
          <div>人员：</div>
          <div>{{ info_obj.related_staff }}</div>
        </div>
        <div></div>
        <div v-html="info_obj[`content_${language}`]"></div>
      </div>
    </q-card-section>
    <q-separator />
  </q-card>
</template>
<script>
import { api_updateRecord } from "src/api/index.js";
export default {
  data() {
    return {
      language: "zn",
      topic: [],
      info_obj: {},
    };
  },
  props: {
    detail_obj: {},
  },
  created() {
    this.get_info();
  },
  methods: {
    async get_info() {
      let params = {
        id: this.detail_obj.id,
      };
      let res = await api_updateRecord.handle_info(params);
      let { code, msg, data } = res.data;
      console.log(data);
      this.info_obj = data;
      this.$forceUpdate();
    },
  },
};
</script>
<style lang="scss" scoped></style>
