/*Template.tagIndex.onRendered(function(){
    console.log('rendered')
})
Template.tagIndex.onCreated(function(){
    console.log('created')
})
Template.tagIndex.onDestroyed(function(){
    console.log('destory')
})*/

Template.tagIndex.actions({
    "add": function(e, t) {
        Meteor.call("Tag.add", {content:'新标签' + (Tag.find().count() + 1)}, function(err, res) {
            if (!err && res) {
                t.t(e).children({"data-id":res.id}).children("[name=content]").attr('contentEditable', 'true').focus()
            } else {
                console.log(err)
            }
        })
    },
    "delete": function() {
        Meteor.call("Tag.delete", this._id)
    },
    "changed [focusout, keypress]": function(e, t) {
        var $target = t.$(e.currentTarget)
        switch (e.type) {
            case "keypress":
                if (_.isKeyCode(e.keyCode, "enter")) {
                    $target.removeAttr('contentEditable')
                    e.preventDefault()
                }
                break;
            case "focusout":
                $target.removeAttr('contentEditable')
                if ($target.data('oldContent') !== $target.text().trim()) {
                    Meteor.call('Tag.change', this._id, $target.text().trim())
                }
                break;
        }
    },
    "editable": function(e, t) {
        t.t(e).attr('contentEditable', 'true').focus()
    }
})