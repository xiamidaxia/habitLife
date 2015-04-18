/**
 * 公用的router钩子
 */
_.extend(Iron.Router.hooks, {
    loadingEnd: function() {
        if (this.ready()) {
            NProgress.done()
        }
    },
    isLogin: function() {
        if (! Meteor.userId()) {
            this.addGoto('userLogin')
        } else {
            this.next()
        }
    }
})
