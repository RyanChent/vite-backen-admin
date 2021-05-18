import { downFile } from "./tool";
interface fileOptions {
  name: string;
  str: string;
  composition: boolean;
  source: boolean;
  [propName: string]: any;
}
export default class GenerateFile {
  isBrowser = false;
  constructor() {
    this.isBrowser = typeof window !== "undefined";
  }
  private templateFile = (str = "", composition = true) => `<template>
      <div>
        ${str}
      </div>
</template>

<script>
${
  composition
    ? `import { defineComponent } from 'vue'
export default defineComponent({
    name: 'RenderUi'
    props: {},
    setup (props, context) {
        return {

        }
    }
})`
    : `export default {
    name: 'RenderUi'
    props: {},
    data () {
        return {

        }
    },
    created () {

    },
    mounted () {

    },
    methods: {

    }
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
        str: "",
        composition: true,
        source: true,
      },
      options
    );
    if (defaultOptions.source) {
      downFile(
        new Blob([
          this.templateFile(defaultOptions.str, defaultOptions.composition),
        ]),
        defaultOptions.name,
        ".vue"
      );
    } else {
      downFile(
        new Blob([this.htmlFile(defaultOptions.str, defaultOptions.name)]),
        defaultOptions.name,
        ".html"
      );
    }
  }
}
