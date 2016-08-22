export default function (router) {
  router.map({
    '/': {
      name: 'home',
      component: function (resolve) {
        require(['./views/home.vue'], resolve);
      },
      subRoutes: {
        '/': {
          name: 'index',
          component: function (resolve) {
            require(['./views/main.vue'], resolve);
          }
        },
        'project': {
          name: 'project',
          component: function (resolve) {
            require(['./views/project.vue'], resolve);
          },
          auth: false
        }
      }
    },
    '/user': {
      name: 'user',
      component: function (resolve) {
        require(['./views/sign.vue'], resolve);
      },
      subRoutes: {
        'signin': {
          name: 'signin',
          component: function (resolve) {
            require(['./views/_signin.vue'], resolve);
          }
        },
        'signup': {
          name: 'signup',
          component: function (resolve) {
            require(['./views/_signup.vue'], resolve);
          }
        }
      }
    }
  });
  router.redirect({
    '*': '/'
  });


  // 路由器跳转前
  router.beforeEach((transition) => {
    //console.log('beforeEach');
    window.scrollTo(0, 0);

    //登录中间验证，页面需要登录而没有登录的情况直接跳转登录
    //console.log(transition);
    if (transition.to.auth) {
        if (localStorage.userId) {
          transition.next();
        } else {
          var redirect = encodeURIComponent(transition.to.path);
          transition.redirect('/user/signin?redirect=' + redirect);
        }
    } else {
        transition.next();
    }
  });

  // 路由器跳转后
  router.afterEach((transition) => {
    //console.log('afterEach');
    window.scrollTo(0, 0);
  });
}
