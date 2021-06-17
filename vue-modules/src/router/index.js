import Vue from "vue";
import VueRouter from "vue-router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueRouter);
Vue.use(ElementUI);

// Vue-router在3.1之后把$router.push()方法改为了Promise。所以假如没有回调函数，错误信息就会交给全局的路由错误处理，因此就会报上述的错误。
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes: [
    {
      path: "/",
      // component: () => import('@/views/home'),
      redirect: 'module/cmp-dxy',
    },
    {
      path: "/module",
      component: () => import('@/views/home'),
      redirect: '/module/cmp-dxy',
      children: [
        {
          path: "cmp-dxy",
          name: "module",
          component: () => import('@/views/module/components/cmp-dxy')
        },
        {
          path: "cmp-element",
          name: "cmp-element",
          component: () => import('@/views/module/components/cmp-element')
        },
        {
          path: "cmp-echart",
          name: "cmp-echart",
          component: () => import('@/views/module/components/cmp-echart')
        },
      ]
    },
    {
      path: "/page",
      name: "page",
      meta: { topMenu: true, topImg: false, leftMenu: false },
      component: () => import('@/views/page')
    },
    {
      path: "/font",
      name: "font",
      meta: { topMenu: true, topImg: false, leftMenu: false },
      component: () => import('@/views/font')
    },
  ]

  // {
  //   path: "/page",
  //   name: "page",
  //   component: () => import('@/views/page')
  // },
})

export default router