<!--
 * @Date           : 2022-04-03 22:01:57
 * @LastEditTime   : 2022-04-04 19:12:28
 * @Description    :  
-->
<template>
  <div>
    <q-badge :color="compute_color()"> {{ find_obj.label }} </q-badge>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    find_obj() {
      return this.options.find((x) => x.value == this.value);
    },
  },
  props: {
    value: {
      type: Number,
      default: null,
    },
    options: {
      type: Array,
      default: () => [
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
    },
  },
  methods: {
    compute_color() {
      if (this.find_obj.color) {
        return this.find_obj.color;
      }
      let color = "grey";
      switch (this.value) {
        case 1:
          color = "white";
          break;
        case -1:
          color = "grey";
          break;
        case -2:
          color = "red";
          break;
        default:
          break;
      }
      return color;
    },
  },
};
</script>
<style lang="scss" scoped></style>
