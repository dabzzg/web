import Vue from "vue";
import Router from "vue-router";
import Index from "@/App";
const includPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return includPush.call(this, location).catch(err => err);
};
Vue.use(Router);

import page from '@/components/page.vue'
import index1 from '@/components/index.vue'
import mdmVsSmall from "@/components/mdmVsSmall";
import groundVsSmall from "@/components/groundVsSmall";
import motiondiffuseVsSmall from "@/components/motiondiffuseVsSmall";

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/index"
      // redirect:"login",
    },
    {
      path: "/index",
      name: "index",
      component: index1,
      meta: { requireAuth: true },
      redirect: "/index/bigVsSmall",
      children: [
        {
          path: "/index/bigVsSmall",
          name: "bigVsSmall",
          component: page,
        },
        {
          path: "/index/mdmVsSmall",
          name: "mdmVsSmall",
          component: mdmVsSmall,
        },
        {
          path: "/index/groundVsSmall",
          name: "groundVsSmall",
          component: groundVsSmall,
        },
        {
          path: "/index/motiondiffuseVsSmall",
          name: "motiondiffuseVsSmall",
          component: motiondiffuseVsSmall,
        }
      ]
    },
  ]
});
