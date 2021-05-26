import { computed, ref } from "vue";
import { copyContent } from "@/utils/dom.ts";
import { isFunction } from "@/utils/types.ts";
import icons from "@/data/icons.json";
import { t } from "@/lang/index.ts";

export const useIconProps = () => {
  const enKeytoChKey = computed<any>(() => ({
    "el-icon": t("el-icon"),
    "vant-icon": t("vant-icon"),
    "iconfont vite-icon": t("iconfont vite-icon"),
  }));

  const name = ref<any>("el-icon");

  const clickIcon = async (key: string, icon: string, callback: unknown) => {
    let copyIcon: any;
    key !== "vant-icon"
      ? (copyIcon = `<i class="${key}-${icon}" />`)
      : (copyIcon = `<van-icon name="${icon}" />`);
    await copyContent(copyIcon);
    isFunction(callback) && (callback as Function)(`复制成功：${copyIcon}`);
  };

  return {
    icons,
    name,
    enKeytoChKey,
    clickIcon,
  };
};
