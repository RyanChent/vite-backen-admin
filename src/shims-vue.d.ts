declare module "*.vue" {
  import { defineComponent } from "vue";
  const component: ReturnType<typeof defineComponent>;
  export default component;
}

declare module "*.tsx" {
  import { defineComponent } from "vue";
  const component: ReturnType<typeof defineComponent>;
  export default component;
}

declare module "animate.css";
declare module "nprogress";
declare module "*.ts";
declare module "*.json";
declare module "vue-quill-editor";
