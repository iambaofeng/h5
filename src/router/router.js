import Vue from "vue";
import Router from "vue-router";
import cookie from "@assets/js/common/cookie.js";
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "",
      redirect: "/login",
      // component: (resolve) => require(["@/views/login/Login.vue"], resolve),
    },
    /**
     * 登录
     */
    {
      path: "/login",
      name: "login",
      component: (resolve) => require(["@/views/login/Login.vue"], resolve),
    },
    /**
     * 404
     */
    {
      path: "/404",
      name: "404",
      component: (resolve) => require(["@/views/login/Login.vue"], resolve),
    },
    {
      path: "/main",
      name: "main",
      component: (resolve) => require(["@/views/Main.vue"], resolve),
      redirect: "home",
      children: [
        /**
         * 首页
         */
        {
          path: "/home",
          name: "home",
          component: (resolve) => require(["@/views/home/Home.vue"], resolve),
        },
        {
          path: "/tab",
          component: (r) => require(["@/views/tab.vue"], r),
        },
        {
          path: "/swipe",
          component: (r) => require(["@/views/swipe.vue"], r),
        },
        /**
         * 我的
         */
        {
          path: "/self",
          name: "self",
          component: (resolve) => require(["@/views/self/Self.vue"], resolve),
        },
      ],
    },

    {
      path: "/rate",
      meta: { keepAlive: false },
      component: (r) => require(["@/views/rate.vue"], r),
    },
    {
      path: "/button",
      component: (r) => require(["@/views/button"], r),
    },
    {
      path: "/address",
      component: (r) => require(["@/views/address"], r),
    },
    {
      path: "/demo",
      component: (r) => require(["@/views/demo"], r),
    },
    /**
     * 我的-设置头像
     */
    {
      path: "/self/setPhoto",
      name: "selfSetPhoto",
      component: (resolve) => require(["@/views/self/SetPhoto.vue"], resolve),
    },
    /**
     * 我的-设置密码
     */
    {
      path: "/self/setPassword",
      name: "selfSetPassword",
      component: (resolve) =>
        require(["@/views/self/SetPassword.vue"], resolve),
    },
    /**
     * 我的-设置
     */
    {
      path: "/self/set",
      name: "selfSet",
      component: (resolve) => require(["@/views/self/Set.vue"], resolve),
    },
    /**
     * 我的-评价
     */
    {
      path: "/self/setEvaluate",
      name: "setEvaluate",
      component: (resolve) =>
        require(["@/views/self/SetEvaluate.vue"], resolve),
    },
    /**
     * 我的-版本
     */
    {
      path: "/self/versions",
      name: "setVersions",
      component: (resolve) => require(["@/views/self/Versions.vue"], resolve),
    },
  ],
});

export default router;
/**
 * 路由之前做的事情
 */
router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    next({
      path: "/home", //匹配不到path路由404页面
    });
  } else {
    const token = cookie.get("yinshui_test_token");
    if (!token && to.name !== "login") {
      next({
        path: "/login",
      });
      return;
    }
    if (token && to.name === "login") {
      next({
        path: "/home",
      });
      return;
    }
    next();
  }
});
