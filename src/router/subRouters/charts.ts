import { RouterView } from "vue-router";
const charts = [
  {
    path: "/charts",
    name: "Charts",
    meta: {
      icon: "el-icon-s-data",
      title: "charts-page",
    },
    redirect: "/charts/ordinary",
    component: RouterView,
    children: [
      {
        path: "/charts/ordinary",
        name: "OrdinaryCharts",
        meta: {
          icon: "el-icon-s-data",
          title: "ordinary-charts-page",
        },
        component: () => import("@/views/Echarts/index.tsx"),
      },
    ],
  },
];

export default charts;
