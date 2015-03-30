MethodRoute.addGlobalHooks({
    /**
     * 检测是否登录
     */
    isLogin: function() {
        if (!this.userId) {
            throw new Meteor.Error("unlogin")
        }
    },
    /**
     * 检测是否是自己的字段，该方式适用于数据中包含"userId"字段
     * @param id
     */
    checkIsSelf: function(id) {
        //注意: 这里的name调用的是MethodRoute定义时候的name，非Meteor官方文档支持
        var collectionName = this.name
        var cur = global[collectionName].findOne({_id: id})
        if(cur.userId !== this.userId) {
            throw Meteor.Error('permissionDenied')
        }
    }
})