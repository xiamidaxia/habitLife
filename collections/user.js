Router.route('userLogin', {
    "path": "/user/login",
    action: function() {
        if (this.ready()) {
            this.render()
        }
    }
})

Router.route('userRegister', {
    "path": "/user/register"
})

Router.route('userDetail', {
    "path": "/user/:_id"
})