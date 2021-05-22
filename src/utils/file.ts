import { downFile } from "./tool";

interface fileOptions {
  name: string;
  domstr: string;
  composition: boolean;
  source: boolean;
  [propName: string]: any;
}

export default class GenerateFile {
  isBrowser = false;
  constructor() {
    this.isBrowser = typeof window !== "undefined";
  }
  private templateFile = (renderStr = '', importStr = '', componentStr = '', composition = true) => `<template>
      <div>
        ${renderStr}
      </div>
</template>

<script>
${composition
      ? `import { defineComponent } from 'vue'
${importStr}
export default defineComponent({
    name: 'RenderUi',
    components: {
      ${componentStr}
    },
    props: {},
    setup (props, context) {
        return {

        }
    }
})`
      : `${importStr}
export default {
    name: 'RenderUi',
    props: {},
    components: {
      ${componentStr}
    },
    data () {
        return {

        }
    },
    created () {

    },
    mounted () {

    },
    methods: {

    },
}`
    }
</script>

<style scoped lang="less">
      
</style>
`;
  private htmlFile = (str = "", title = "") => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
    />
    <link rel="stylesheet" href="https://unpkg.com/element-plus/lib/theme-chalk/index.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vant@next/lib/index.css" />
    <title>${title}</title>
    <style>

    </style>
  </head>
  <body>
    ${str}
  </body>
  <script></script>
</html>
`;
  generateFile(options: any) {
    const defaultOptions: fileOptions = Object.assign(
      {
        name: "test",
        domstr: "",
        composition: true,
        source: true,
        renderStr: '',
        importStr: '',
        componentStr: ''
      },
      options
    );
    if (defaultOptions.source) {
      downFile(
        new Blob([
          this.templateFile(defaultOptions.renderStr, defaultOptions.importStr, defaultOptions.componentStr, defaultOptions.composition),
        ]),
        defaultOptions.name,
        ".vue"
      );
    } else {
      downFile(
        new Blob([this.htmlFile(defaultOptions.domstr, defaultOptions.name)]),
        defaultOptions.name,
        ".html"
      );
    }
  }
}
