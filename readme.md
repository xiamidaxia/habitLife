## meteor最佳实践


----

##集合创建:
- Mine = new Meteor.Collection('Mine')： 首字母大写
- Mine.type : 用于定义各字段类型，定义参照Meteor官方文档中的 `Check` 方式
- 类型中如果有枚举字符串类型，如type必须为 'PERSON' 或 'ANIMAL', 那么请用数字来标识，并添加enumType方法，如：

```javascript
        Mine.enumType = {
            //名称统一用大写
            "PERSON": 0,
            "ANIMAL": 1
        }
        Mine.type = {
            name: Match.Where(function(x) {
                check(x, String)
                return x.length > 0 && x.length < 20
            }),
            describe: Match.Where(function(x) {
                check(x, String)
                return x.length < 1000
            }),
            type: Number,
            createAt: Date,
            userId: String
        }
```

## 路由创建

- 参照 [Iron-router](https://github.com/iron-meteor/iron-router) 文档
- Router.current().params.query 或者在action中用this.params.query 和 this.params.hash 调用url参数
- router的名称要对应模板文件的名字，且为驼峰, router常用格式如下:
    
```javascript
        //对应 views/mine/index.html
        Router.route('mineIndex', {
            "path": "/mine",
            //用于加载数据
            waitOn: function() {
                //这里必须return，才能正常触发loading, 详细见下一个说明
                return [
                    Meteor.subscribe('mine.index')
                ]
            },
           //在action之前执行
            beforeAction: function() {
                //this.ready是用来判断waitOn的数据是否已经准备好
                if (this.ready()) {
                } else {
                    //next会传递到下一个beforeAction
                    this.next()
                }
            },
            //在action之后执行
            afterAction: function() {
            },
            action: function() {
                this.title("mine首页") //定义
                this.render()
            }
        })
        Router.route('mineList', {
            "path": "/mine/list",
            action: function() {
                this.title("mine列表")
                this.render()
            }
        })
        Router.route('mineItem', {
            "path": "/mine/item/:_id"
        })
```

- 有些时候我们写的路由需要一些公共的方法，那么可以创建一个controller
    
```javascript
            var MineController = RouteController.extend({
                "beforeAction": function() {
                    //每个路由都会执行
                }
            })
            Route.route('mineIndex', {
                controller: MineController,
                beforeAction: function() {
                    //这里还可以再定义
                }
            })
            Route.route('mineList', {
                controller: MineController
            })
```

- iron-router 中 waitOn是要返回订阅的reactive对象，否则无法触发loading
    
```javascript
            Router.configure({
                layoutTemplate: 'appBody',
                notFoundTemplate: 'appNotFound',
                loadingTemplate: 'appLoading',
                waitOn: function() {
                    //每次加载数据都开启进度条
                    NProgress.start()
                    return [
                        Meteor.subscribe('Tag.myTag')
                    ];
                }
            });
            //或者
            Router.route('tagIndex', {
                "path": "/tag",
                waitOn: function() {
                    return Meteor.subscribe('Tag.myTag')
                },
                data: function() {
                    return {
                        tags: Tag.find()
                    }
                },
                action: function() {
                    if (this.ready()) {
                        this.render()
                    }
                }
            })
```

- router的hooks都放在 lib/_hooks.js 方法，公用hook方法请参照lib/router.js写法，如下，第二个参数可以只支持 `only` 和 `except`:

```javascript
        //这些定义的都是公用的beforeAction
        Router.onBeforeAction('myHookName', {except: ['userLogin', 'userRegister']});
        Router.onBeforeAction('myHookName2', {only: ['userLogin', 'userRegister']});
```
