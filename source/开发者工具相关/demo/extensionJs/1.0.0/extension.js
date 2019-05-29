/**
 * @license
 *  Copyright Baidu Inc. All Rights Reserved.
 *
 *  This source code is licensed under the Apache License, Version 2.0; found in the
 *  LICENSE file in the root directory of this source tree.
 *
 * @file demo宿主扩展
 */

define('swan-extension', ['swan', 'boxjs'], function (require, module, exports, define, swan, boxjs) {
    const getElementBox = el => {
        const boxRect = el.getBoundingClientRect();
        const elementStyle = window.getComputedStyle(el);
        const topWidth = parseFloat(elementStyle.getPropertyValue('border-top-width'));
        const bottomWidth = parseFloat(elementStyle.getPropertyValue('border-bottom-width'));
        const leftWidth = parseFloat(elementStyle.getPropertyValue('border-left-width'));
        const rightWidth = parseFloat(elementStyle.getPropertyValue('border-right-width'));
        const width = el.offsetWidth - leftWidth - rightWidth;
        const height = el.offsetHeight - topWidth - bottomWidth;
        return {
            top: boxRect.top + window.scrollY + topWidth + '',
            left: boxRect.left + window.scrollX + leftWidth + '',
            width: `${width < 0 ? 0 : width}`,
            height: `${height < 0 ? 0 : height}`
        };
    };

    var id = 0;
    var createCb = function (obj) {
        let callbackName = `_demo_cb_` + id;
        window[callbackName] = function (args) {
            let ret = JSON.parse(args);
            if (+ret.status === 0) {
                obj.success && obj.success(ret.data);
            }
            else {
                obj.fail && obj.fail(ret.data);
            }
            obj.complete && obj.complete(ret.data);
        };
        return callbackName;
    };

    module.exports = {
        name: 'demo',
        hostMethodDescriptions: [
            {name: 'demo', args: [{name: 'data', value: 'Object='}, {name: 'cb', value: 'string'}]},
            {name: 'wv', args: []},
            {name: 'openDemoVideo', args: [{name: 'data', value: 'Object='}]},
            {name: 'playDemoVideo', args: [{name: 'data', value: 'Object='}]},
            {name: 'pauseDemoVideo', args: [{name: 'data', value: 'Object='}]},
            {name: 'seekDemoVideo', args: [{name: 'data', value: 'Object='}]}
        ],
        components: {
            video: {
                behaviors: ['userTouchEvents', 'animateEffect'],
                template: '<div class="demo-video"><slot></slot></div>',
                depandencies: ['swaninterface'],
                attached() {
                    boxjs.openDemoVideo({
                        data: {
                            ...this.data.get(),
                            position: getElementBox(this.el)
                        }
                    });
                }
            }
        },
        methods: {
            demo(obj) {
                return boxjs.demo({
                    data: obj.data || {},
                    cb: createCb(obj)
                });
            },
            wv(obj) {
                return boxjs.wv();
            },
            createVideoContext: vid =>
                ((id => ({
                    play: () => boxjs.playDemoVideo({data: {id}}),
                    pause: () => boxjs.pauseDemoVideo({data: {id}}),
                    seek: position => boxjs.seekDemoVideo({data: {id, position}})
                }))(vid))
        }
    };
});
