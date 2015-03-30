var userMenuOpened = new ReactiveVar()

Template.appMenu.helpers({
    isLogin: function() {
        return !! Meteor.userId()
    },
    userMenuOpened: function() {
        return userMenuOpened.get()
    },
    username: function() {
        var user = Meteor.user()
        return user && user.username
    }
})

Template.appMenu.actions({
    closeUserMenu: function() {
        return userMenuOpened.set(false)
    },
    openUserMenu: function() {
        return userMenuOpened.set(true)
    },
    logout: function() {
        Meteor.logout(function() {
            Router.go(Router.current().url)
        })
    }

})