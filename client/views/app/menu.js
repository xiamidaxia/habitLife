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
    },
    messageCount: function() {
        return Message.find().count()
    },
    habitCount: function() {
        return Habit.find({userId: Meteor.userId()}).count()
    },
    habitFriendCount: function() {
        return Habit.getFriendsHabit().count()
    },
    habitRecentlyCount: function() {
        return Habit.getRecently().count()
    },
    friendCount: function() {
        return Relation.getFriends().count()
    },
    tagCount: function() {
        return Tag.find().count()
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