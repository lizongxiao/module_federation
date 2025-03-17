import { createApp, defineAsyncComponent } from "vue";
import App from "./components/App.vue";

const app = createApp(App);

// 注册APP组件
app.component("App", App);

// 注册远程组件

app.component(
  "HelloWorld",
  defineAsyncComponent(() => import("remoteApp/HelloWorld"))
);

// 挂载应用
app.mount("#app");
