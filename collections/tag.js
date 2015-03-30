Tag = new Meteor.Collection('Tag')

Tag.type = {
    content: String,
    createAt: Date,
    userId: String
}

Router.route('tagIndex', {
    "path": "/tag",
    data: function() {
        return {
            tags: Tag.find()
        }
    },
    action: function() {
        if (this.ready()) {
            this.title('标签管理')
            this.render()
        }
    }
})

