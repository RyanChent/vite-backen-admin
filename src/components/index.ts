import { isNotEmptyString } from "@/utils/types.ts";
const excludeName: Array<string> = [
  "Menus",
  "ManageMenus",
  "Header",
  "ManageHeader",
  "Footer",
  "Icons",
  "ManageIcons",
  "ManageFooter",
  "UIRender",
  "ManageUIRender",
  "UIRenderHead",
  "ManageUIRenderHead",
  "UIRenderContent",
  "ManageUIRenderContent",
  "ComponentTools",
  "ManageComponentTools",
  "MultiTab",
  "ManageMultiTab",
  "VideoPlayer",
  "ManageVideoPlayer",
  "JsonEditor",
  "ManageJsonEditor"
];
export default (app: any) => {
  const components = {
    tsx: import.meta.globEager("./**/*.tsx"),
    vue: import.meta.globEager("./**/*.vue"),
  };
  Object.values({ ...components.tsx, ...components.vue }).forEach(
    ({ default: component }) => {
      const { name, componentName } = component;
      let globalName: string = "";
      if (isNotEmptyString(name) && isNotEmptyString(componentName)) {
        globalName = name.length > componentName.length ? componentName : name;
      } else {
        globalName = name || componentName;
      }
      if (!excludeName.includes(globalName)) {
        app.component(globalName, component);
      }
    }
  );
};
