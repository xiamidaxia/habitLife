/* Template.appBody.rendered = function() {
    this.find('#appBodyContainer')._uihooks = {
        insertElement: function(node, next) {
            console.log('cacacac')
            $(node)
                .hide()
                .insertBefore(next)
                .fadeIn(function () {
                    listFadeInHold.release();
                });
        },
        removeElement: function(node) {
            $(node).fadeOut(function() {
                $(this).remove();
            });
        }
    };
};*/
Template.appBody.helpers({
    thisArray: function() {
        return [this]
    },
    connected: function() {
/*        if (Session.get(SHOW_CONNECTION_ISSUE_KEY)) {
            return Meteor.status().connected;
        } else {
            return true;
        }*/
    }
})

Template.appBody.events({

})
