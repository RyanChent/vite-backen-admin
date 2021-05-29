import { ref } from "vue";
import {
  objectToArrayforTree,
  objectToString,
  arrayToString,
} from "@/utils/data";
import _ from "lodash";

const valueType = [
  {
    label: "String",
    value: "String",
  },
  {
    label: "Number",
    value: "Number",
  },
  {
    label: "Boolean",
    value: "Boolean",
  },
  {
    label: "Function",
    value: "Function",
  },
  {
    label: "Array",
    value: "Array",
  },
  {
    label: "Object",
    value: "Object",
  },
];

const showJson = (jsonString: any, props: any, type: string) =>
  props.showJson &&
  _.debounce(
    () =>
      (jsonString.value =
        type === "Array"
          ? arrayToString(props.json)
          : objectToString(props.json)),
    600
  )();

const getOriginKey = (key: string) => {
  let newKey = key.replace("root", "");
  return newKey.startsWith(".") ? newKey.replace(".", "") : newKey;
};

const setValue = (json: any, data: any, value: any, rootType: string) => {
  const originKey = getOriginKey(data.key);
  if (originKey !== "") {
    if (rootType === "Array") {
      /** 数组有bug，暂时留空 */
      // console.log(originKey)
      // new Function('obj', 'value', `obj${originKey} = value`)(json, value)
      // if (originKey.includes('.')) {
      // console.log('cao')
      // json[originKey.replace(/[\[|\]]/g, "")] = value;
      // } else {
      // console.log(originKey)
      // const firstLayer = originKey.replace("]", "").split(".")[0];
      // const last = originKey.replace(firstLayer + "]", "");
      // new Function("obj", "value", `obj[${firstLayer}]${last} = value`)(
      //   json,
      //   value
      // );
      // }
    } else {
      new Function("obj", "value", `obj.${originKey} = value`)(json, value);
    }
  }
};

const deleteValue = (json: any, data: any, rootType: string) => {
  const originKey = getOriginKey(data.key);
  if (originKey !== "") {
    if (rootType === "Array") {
      /** 数组有bug，暂时留空 */
      // if (originKey.startsWith("[")) {
      //   json.splice(originKey.replace(/[\[|\]]/g, ""), 1);
      // } else {
      //   const firstLayer = originKey.replace("]", "").split(".")[0];
      //   const last = originKey.replace(firstLayer + "]", "");
      //   new Function("obj", `delete obj[${firstLayer}]${last}`)(json);
      // }
    } else {
      new Function("obj", `delete obj.${originKey}`)(json);
    }
  }
};

export const useRenderEditor = (props: any, type: string) => {
  const jsonKey = ref<any>();
  const jsonString = ref<string>();
  const treeData = ref<any>();
  /** Array */
  if (type === "Array") {
    jsonKey.value = props.json.map(
      (item: undefined, index: any) => `root.${index}]`
    );
    jsonString.value = arrayToString(props.json);
    treeData.value = [
      {
        label: "[",
        key: "root",
        type: "Array",
        children: props.json.map((item: undefined, index: any) =>
          objectToArrayforTree(
            props.json,
            index,
            `root.${index}]`,
            jsonKey.value
          )
        ),
      },
      {
        label: "]",
        key: "]",
      },
    ];
  }
  /** Object */
  if (type === "Object") {
    jsonKey.value = Object.keys(props.json).map((key) => `root.${key}`);
    jsonString.value = objectToString(props.json);
    treeData.value = [
      {
        label: "{",
        key: "root",
        type: "Object",
        children: Object.keys(props.json).map((prop) =>
          objectToArrayforTree(props.json, prop, `root.${prop}`, jsonKey.value)
        ),
      },
      {
        label: "}",
        key: "}",
      },
    ];
  }
  // 值变动时响应方法
  const componentOnChange = (prop: any, propKey: any) => {
    setValue(props.json, prop, prop[propKey], type);
    showJson(jsonString, props, type);
  };
  // 值改变类型时
  const propertyTypeChange = (data: any) => {
    switch (data.type) {
      case "Array":
      case "Object":
        if (Array.isArray(data.children)) {
          jsonKey.value = jsonKey.value.filter(
            (key: string) =>
              !data.children.map((item: any) => item.key).includes(key)
          );
        }
        delete data.value;
        data.children = [];
        data.desc = data.type === "Array" ? "Array(0)" : "Object(0)";
        setValue(props.json, data, data.type === "Array" ? [] : {}, type);
        break;
      default:
        data.value = "";
        delete data.desc;
        delete data.children;
        setValue(props.json, data, "", type);
        break;
    }

    showJson(jsonString, props, type);
  };
  // 添加字段
  const addProperty = (parent: any, node: any) => {
    const obj: any = {
      value: "",
      type: "String",
    };
    if (Array.isArray(parent.children)) {
      if (parent.type === "Array") {
        obj.label = parent.children.length;
        obj.key = parent.key + `[${obj.label}]`;
        parent.desc && (parent.desc = `Array(${obj.label + 1})`);
      }
      if (parent.type === "Object") {
        obj.label = "a";
        obj.key = parent.key + `.a`;
        parent.desc && (parent.desc = `Object(${parent.children.length + 1})`);
      }
    }
    if (!jsonKey.value.includes(obj.key)) {
      jsonKey.value.push(obj.key);
      setValue(props.json, obj, obj.value, type);
      parent.children.push(obj);
    }

    if (node.expanded === false) {
      node.expanded = true;
    }
  };
  // 删除字段
  const removeProperty = (parent: any, key: any) => {
    const keyIndex = (parent.children || parent).findIndex(
      (item: any) => item.key === key
    );
    if (keyIndex > -1) {
      (parent.children || parent).splice(keyIndex, 1);
      jsonKey.value.includes(key) &&
        jsonKey.value.splice(jsonKey.value.indexOf(key), 1);
      deleteValue(props.json, { key }, type);
    }

    if (parent.type === "Array") {
      parent.desc && (parent.desc = `Array(${parent.children.length})`);
    }

    showJson(jsonString, props, type);
  };
  // 修改字段key
  const propertyKeyChange = (value: any, node: any, data: any) => {
    const { data: parentData } = node.parent;
    if (jsonKey.value.includes(data.key)) {
      jsonKey.value.splice(jsonKey.value.indexOf(data.key), 1);
    }
    deleteValue(props.json, data, type);
    if (parentData) {
      if (parentData.type === "Array") {
        data.key = `${data.key.slice(
          0,
          data.key.lastIndexOf("[") + 1
        )}${value}]`;
      }
      if (parentData.type === "Object") {
        data.key = `${data.key.slice(
          0,
          data.key.lastIndexOf(".") + 1
        )}${value}`;
      }
    }
    setValue(props.json, data, data.value, type);
    data.label = value;
    if (!jsonKey.value.includes(data.key)) {
      jsonKey.value.push(data.key);
    }
    showJson(jsonString, props, type);
  };
  // 拖拽节点放下时触发 //暂只能同级，无法越级交换
  const dragPropertyDrop = (
    drag: any,
    drop: any,
    position: string,
    e: DragEvent
  ) => {
    switch (position) {
      case "before":
        break;
      case "after":
        break;
      case "inner":
        break;
    }
  };
  return {
    valueType,
    jsonKey,
    jsonString,
    treeData,
    componentOnChange,
    propertyKeyChange,
    removeProperty,
    dragPropertyDrop,
    addProperty,
    propertyTypeChange,
  };
};
