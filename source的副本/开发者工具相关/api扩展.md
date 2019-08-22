# 添加一个api：



##在extensionJs中添加api入口

在 ~/.swan-cli/vendor/demo-program-extension/1.0.0目录，extension.js中，修改前端框架extensionJs的实现，
在hostMethodDescriptions 内添加一个新的api描述，在methods中增加调用

        
        // 宿主名称,也是api的命名空间,在此文件内的api会以swan.demo.xxx的方式调用
        name: 'demo',
        // hostMethodDescriptions是api的参数描述,name就是上面schemeHandlers中的key字段,也是middleWares里scheme的action
        hostMethodDescriptions: [{
            name: 'demo',
            args: [
                {name: 'data', value: 'Object='},
                {name: 'cb', value: 'string'}
            ]
        }],
        // methods是暴露给开发者的方法名,即swan.demo.xxx的xxx部分
        // methods下的key和schemeHandlers的key不要求一致,比如下面的demo、demo1都会调用action是demo的api实现
        methods: {
            demo: function (obj) {
                // boxjs.demo 这个demo部分对应的就是scheme的action name,也就是hostMethodDescriptions里面的name字段
                return boxjs.demo({
                    data: obj.data || {},
                    cb: createCb(obj)
                });
            },
            demo1: function (obj) {
                return boxjs.demo({
                    data: obj.data || {},
                    cb: createCb(obj)
                });
            }
        }
    
##在工具模拟器扩展中添加api的实现

- 打开 `demo/program/simulator-extensions/api/master.js` 文件,这个是api能力的native实现部分。  <p style="display:none;">~~todo api没有实现schememap,这个还做不了,实现方式待确认。。。~~</p>
- 修改schemeHandlers部分的代码，添加demo方法的实现，也就是extensionJs 
    
        // schemeHandlers 的 key 取值是对应 api scheme 的 action 部分
        schemeHandlers: {
            demo: context => async ({query: {params: {data, cb}}}) => {
                context.utils.execute(cb, 0, 'success', data);
            }
        }
        
        

