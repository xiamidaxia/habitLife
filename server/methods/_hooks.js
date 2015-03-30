MethodRoute.addGlobalHooks({
    isLogin: function() {
        if (!this.userId) {
            throw new Meteor.Error("unlogin")
        }
    }
})