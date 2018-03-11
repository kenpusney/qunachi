import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Message from './model/Message';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: Message.SITE_TITLE,
      },
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        title: Message.ABOUT_TITLE,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
