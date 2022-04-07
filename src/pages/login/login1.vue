<!--
 * @Date           : 2022-03-13 03:02:55
 * @FilePath       : /jinnian-cms-admin/src/pages/login/login1.vue
 * @Description    :
-->
<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card
          v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '30%' }"
        >
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="profile.svg" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">Log in</div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="q-gutter-md">
              <q-input filled v-model="username" label="Username" lazy-rules />

              <q-input
                type="password"
                filled
                v-model="password"
                label="Password"
                lazy-rules
              />

              <div>
                <q-btn
                  @click="login"
                  label="Login"
                  to="/"
                  type="button"
                  color="primary"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import { api_admin } from "src/api/index";

export default defineComponent({
  setup() {
    return {
      username: ref("admin"),
      password: ref("123456"),
    };
  },
  methods: {
    async login() {
      let params = {
        name: this.username,
        password: this.password,
      };
      let res = await api_admin.handle_login(params);
      console.log("//管理员登录  res--", res);
      let { code, data, msg, success } = res.data;

      if (success) {
        this.$q.sessionStorage.set("token", data);

        this.$router.push({
          name: "user",
        });
      }
    },
  },
});
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
}
</style>
