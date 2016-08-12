export default function (router) {
  router.map({
    '/': {
      name: 'home',
      component: function (resolve) {
        require(['./views/home.vue'], resolve)
      }
    },
    '/sign': {
      name: 'sign',
      component: function (resolve) {
        require(['./views/sign.vue'], resolve)
      },
      subRoutes: {
        '/': {
          name: 'signin',
          component: function (resolve) {
            require(['./views/_signin.vue'], resolve)
          }
        },
        'signup': {
          name: 'signup',
          component: function (resolve) {
            require(['./views/_signup.vue'], resolve)
          }
        }
      }
    }
  })
  router.redirect({
    '*': '/'
  })

  // 路由器跳转前
  router.beforeEach(function () {
    console.log('beforeEach')
    window.scrollTo(0, 0)
  })
  // 路由器跳转后
  router.afterEach(function () {
    console.log('afterEach')
    window.scrollTo(0, 0)
  })
}
