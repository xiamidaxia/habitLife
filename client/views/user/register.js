var errReason = Template.userRegister.createVar("errReason", {reset: true})

Template.userRegister.helpers({
    errReason: function() {
        return errReason.get()
    }
})

Template.userRegister.actions({
    "submit": function(e, t) {
        var target = t.t(e)
        var username = target.find("[name=username]").val().trim()
        if (username === "高杲杲") {
            alert("傻叉, 高你妹啊。。。。。。。。。。。哈哈哈哈。。。。")
        }
        NProgress.start()
        Accounts.createUser({
            username: username,
            password: target.find("[name=password]").val().trim()
        }, function(error) {
            NProgress.done()
            if (error) {
                return errReason.set(error.reason)
            }
            //跳转到goto位置
            if (gotoName = Router.current().params.query.goto) {
                Router.go(gotoName)
            } else {
                Router.go('home')
            }
        });
        e.preventDefault()
    }
})