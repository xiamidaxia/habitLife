Router.configure({
    layoutTemplate: 'appBody',
    notFoundTemplate: 'appNotFound',
    loadingTemplate: 'appLoading',
    waitOn: function() {
        //每次加载数据都开启进度条
        NProgress.start()
        return [
            Meteor.subscribe("Message.mine"),
            Meteor.subscribe('Habit.mine'),
            Meteor.subscribe('Habit.friend.mine'),
            Meteor.subscribe('Tag.mine'),
            Meteor.subscribe("Habit.recently")
        ]
    },
    fastRender: true
});

dataReadyHold = null;



if(Meteor.isClient) {
    //router扩展方法
    RouteController.prototype.title = function(title) {
        $(document.head).find('title').text("虾米大虾 - " + title)
    }
    //用该方法跳转之后会带上goto参数
    RouteController.prototype.addGoto = function(name) {
        return Router.go(name, {}, {query: {goto: this.url}})
    }
    //用该方法直接去调用goto
    Router.goto = function() {
        var gotoName = Router.current().params.query.goto
        if (gotoName) {
            Router.go(gotoName)
        } else {
            Router.go('home')
        }

    }
    // Keep showing the launch screen on mobile devices until we have loaded
    // the app's data
    dataReadyHold = LaunchScreen.hold();
    Router.onBeforeAction('loading', {except: ['userLogin', 'userRegister']});
    Router.onBeforeAction('isLogin', {except: [
        "userDetail",   //用户详情页，任何人都可以查看
        "habitRecently", //查看广播的习惯
        'userLogin',
        'userRegister']})
    Router.onBeforeAction('dataNotFound', {except: ['userLogin', 'userRegister']});
    Router.onAfterAction('loadingEnd')
}

Router.map(function() {
/*    this.route('listsShow', {
        path: '/lists/:_id',
        // subscribe to todos before the page is rendered but don't wait on the
        // subscription, we'll just render the items as they arrive
        onBeforeAction: function() {
            this.todosHandle = Meteor.subscribe('todos', this.params._id);

            if(this.ready()) {
                // Handle for launch screen defined in app-body.js
                dataReadyHold.release();
            }
        },
        data: function() {
            return ListCollection.findOne(this.params._id);
        },
        action: function() {
            this.render();
        }
    });*/

    this.route('home', {
        path: '/',
        action: function() {
            if (this.ready()) {
                this.render()
            }
        }
    });
});

/*var current = Router.current();
if (current.route.name === 'listsShow' && current.params._id === this._id) {
    return 'active';
}*/
