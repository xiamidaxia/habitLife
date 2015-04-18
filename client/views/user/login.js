var errReason = Template.userLogin.createVar("errReason", {reset: true})

Template.userLogin.helpers({
    errReason: function() {
        return errReason.get()
    },
    gotoName: function() {
        return encodeURIComponent(Router.current().params.query.goto)
    }
})

Template.userLogin.actions({
    "submit": function(e, t) {
        e.preventDefault()
        var target = t.t(e)
        var username = target.find("[name=username]").val().trim()
        var password = target.find("[name=password]").val().trim()
        NProgress.start()
        Meteor.loginWithPassword(username, password, function(error) {
            NProgress.done()
            if(error) {
                console.log(error)
                return errReason.set(error.reason || error.message)
            }
            //跳转到goto位置
            Router.goto()
        })
    }

})