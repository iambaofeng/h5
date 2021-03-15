import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import back from "@assets/js/common/back";
import http from "./http/axios";
import cookie from "@assets/js/common/cookie";
import base64 from "@assets/js/common/base64";
import api from "@api/apiBase";
import "amfe-flexible/index.js";
import "./utils/screen.js";
Vue.config.productionTip = false;

import RouteTransition from "vue-route-transition";
Vue.use(RouteTransition);

import {
  Field,
  RadioGroup,
  Radio,
  CellGroup,
  cell,
  Checkbox,
  CheckboxGroup,
  Toast,
  Tabbar,
  TabbarItem,
  Image as VanImage,
  NavBar,
  Form,
  DatetimePicker,
  Popup,
  Picker,
  Col,
  Row,
  DropdownMenu,
  DropdownItem,
  List,
  Step,
  Steps,
  Uploader,
  Icon,
  PullRefresh,
  Loading,
  SwipeCell,
  Button,
  Dialog,
  Rate,
  Swipe,
  SwipeItem,
  Tab,
  Tabs,
  AddressList,
} from "vant";

Vue.use(Field);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(CellGroup);
Vue.use(cell);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Toast);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(VanImage);
Vue.use(NavBar);
Vue.use(Form);
Vue.use(DatetimePicker);
Vue.use(Popup);
Vue.use(Picker);
Vue.use(Col);
Vue.use(Row);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(List);
Vue.use(Step);
Vue.use(Steps);
Vue.use(Uploader);
Vue.use(Icon);
Vue.use(PullRefresh);
Vue.use(Loading);
Vue.use(SwipeCell);
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Rate);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(AddressList);

/**
 * 全局配置common方法
 */
Object.assign(Vue.prototype, {
  http, //ajax封装的请求
  api, //接口地址全局封装
  cookie, //cookie存，删，
  base64, //base64加密封装
});

new Vue({
  router,
  store,
  back,
  render: (h) => h(App),
}).$mount("#app");
