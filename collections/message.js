Message = new Meteor.Collection('Message')

Message.enumType = {
    "INFO": 0,
    "ADD_FRIEND": 1
}

Message.type = {
    createAt: Date,
    from: String,
    to: String,
    type: Number,
    message: Match.Optional(String) //附加信息
}

Router.route('messageIndex', {
    path: "/message",
    data: function() {
        return Message.find()
    }
})
