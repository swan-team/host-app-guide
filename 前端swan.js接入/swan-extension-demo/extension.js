/**
 * @file extension示例
 * @author sunweinan(sunweinan@baidu.com)
 */
define('swan-extension-service', ['swan', 'boxjs'], function (require, module, exports, define, swan, boxjs) {
    module.exports = {
        name: 'tieba',
        // 此处扩展的名字应与客户端实现的ACTION_TYPE对应
        hostMethodDescriptions: ['publishThread'],
        // 扩展API
        methods: {
            testAPI() {
                boxjs.publishThread({
                    data:{
                        title:'1234'
                    }
                });
            }
        },
        // 扩展组件
        components: {
            'video': {
                behaviors: ['userTouchEvents', 'animateEffect'],
                template: '<div class="tieba-video" on-click="testTap">{{content}}<slot></slot></div>',
                depandencies: ['swaninterface'],
                initData() {
                    return {
                        content: 'Extension Content'
                    };
                },
                testTap() {
                    console.log('Will Use Extension API');
                    swan.tieba.testAPI();
                    alert('testVideo Used!');
                },
                attached() {
                    // swan.showModal({
                    //     title:"~"+JSON.stringify(swan.tieba)
                    // })
                    console.log('Extension Component Attached');
                    // swan.tieba.testAPI();
                }
            },
            'view': {
                superComponent: 'swan-component',

                template: `<swan-view
                                on-click="testClickView"
                                class="{{__privateClass}}"
                                style="background: rgba(255, 0, 0, .2)"
                        >
                            <slot></slot>
                        </swan-view>`,

                behaviors: ['userTouchEvents', 'noNativeBehavior', 'hoverEffect', 'animateEffect', 'nativeEventEffect'],

                initData() {
                    return {
                        privateClass: '',
                        hoverStartTime: 50,
                        hoverStayTime: 400,
                        hoverStopPropagation: false
                    };
                },

                testClickView() {
                    console.log('Will Use Extension API');
                    swan.tieba.testAPI();
                    alert('testView Used!');
                }
            },
            'radio': {
                behaviors: ['form', 'userTouchEvents', 'noNativeBehavior', 'animateEffect', 'color'],

                initData() {
                    return {
                        id: this.id,
                        value: '',
                        checked: false,
                        disabled: false
                    };
                },

                computed: {

                    /**
                     * 根据是否 checked、是否 disabled 创建 className
                     *
                     * @return {string} className
                     */
                    getRadioInputClass() {
                        let res = ['swan-radio-input'];
                        this.data.get('__checked') && res.push('swan-radio-input-checked');
                        this.data.get('__disabled') && res.push('swan-radio-input-disabled');
                        return res.join(' ');
                    },

                    /**
                     * 根据是否 checked 创建边框颜色
                     *
                     * @return {string} 边框颜色
                     */
                    getRadioInputColor() {
                        return this.data.get('__checked') ? this.data.get('__color') : '';
                    }
                },

                template: `<swan-radio on-click="testClickRadio">
                            <div class="swan-radio-wrapper">
                                <div class="{{getRadioInputClass}}">
                                    <div class="swan-radio-input-border"
                                        style="border-color: {{getRadioInputColor}}">
                                    </div>
                                    <div class="swan-radio-input-button"
                                        style="background-color: {{getRadioInputColor}}">
                                    </div>
                                </div>
                                <slot></slot>
                            </div>
                        </swan-radio>`,

                compiled() {

                    // 响应 label 的点击事件
                    this.bindAction('bindtap', $event => {
                        this.radioTap($event);
                    });
                },

                /**
                 * 组件创建
                 */
                attached() {
                    this.nextTick(() => {
                        const {
                            value,
                            __checked
                        } = this.data.get();

                        // 监听 checked 变化
                        this.watch('__checked', checked => {
                            // 向 radio-group 派发 radio 的选中状态被切换的消息
                            this.radioGroup && this.dispatch('radio:checkedChanged', {
                                value,
                                id: this.id,
                                checked
                            });
                        });

                        // 向 radio-group 派发 radio 已创建的消息
                        this.dispatch('radio:added', {
                            value,
                            id: this.id,
                            checked: __checked
                        });

                        // 声明点击 label 触发 label 内第一个控件的事件
                        this.communicator.onMessage('LabelFirstTapped', message => {
                            if (message.data && this.id === message.data.target) {
                                this.radioTap(message.data.event);
                            }
                        });

                        // 响应 label 的点击事件
                        this.communicator.onMessage('LabelTapped', message => {
                            if (message.data && message.data.target === this.id) {
                                this.radioTap(message.data.event);
                            }
                        });

                        // 响应来自 radio-group 派发的已有 radio 被选中的消息
                        if (this.radioGroup && this.radioGroup.id) {
                            this.communicator.onMessage(`radioGroup-${this.radioGroup.id}`, message => {
                                const checkedId = message.data.checkedId;

                                // 已选中的 radio 非本组件时，将选中状态设置为 false
                                if (checkedId !== null && checkedId !== this.id) {
                                    this.data.set('checked', false);
                                }
                            });
                        }
                    });
                },

                /**
                 * 组件销毁
                 */
                detached() {
                    if (this.radioGroup) {

                        // 向 radio-group 派发 radio 已删除的消息
                        this.dispatch('radio:removed');
                        this.radioGroup = null;
                    }
                },

                /**
                 * radio 的点击事件
                 *
                 * @param {Event} $event 对象
                 */
                radioTap($event) {
                    const {
                        __disabled,
                        __checked
                    } = this.data.get();
                    if (!__disabled && !__checked) {
                        this.data.set('checked', true);
                        // 向 radio-group 派发 radio 已选中的消息
                        this.radioGroup && this.dispatch('radio:checked', $event);
                    }
                },

                /**
                 * 响应 form 组件的 reset 事件
                 *
                 * @override
                 */
                resetFormValue() {
                    this.radioGroup && this.data.set('checked', false);
                },

                /**
                 * 点击事件
                 */
                testClickRadio() {
                    alert('tiebaRadio Used!');
                }
            }
        },
        // 扩展私有的统计逻辑
        customLog(swanEventFlow) {
            // 监听page生命周期函数
            swanEventFlow.onMessage('PagelifeCycle', event => {
                if (event.params.eventName === 'onLoad') {
                    console.log(event.params);
                }
            });
            swanEventFlow.onMessage('PagelifeCycle', event => {
                if (event.params.eventName === 'onShow') {
                    console.log(event.params);
                }
            });
            swanEventFlow.onMessage('PagelifeCycle', event => {
                if (event.params.eventName === 'onReady') {
                    console.log(event.params);
                }
            });
            swanEventFlow.onMessage('PagelifeCycle', event => {
                if (event.params.eventName === 'onHide') {
                    console.log(event.params);
                }
            });
            swanEventFlow.onMessage('PagelifeCycle', event => {
                if (event.params.eventName === 'onUnload') {
                    console.log(event.params);
                }
            });
            swanEventFlow.onMessage('PagelifeCycle', event => {
                if (event.params.eventName === 'onPullDownRefresh') {
                    console.log(event.params);
                }
            });
            swanEventFlow.onMessage('PagelifeCycle', event => {
                if (event.params.eventName === 'onReachBottom') {
                    console.log(event.params);
                }
            });
            swanEventFlow.onMessage('PagelifeCycle', event => {
                if (event.params.eventName === 'onPageScroll') {
                    console.log(event.params);
                }
            });
            swanEventFlow.onMessage('PagelifeCycle', event => {
                if (event.params.eventName === 'shareAction') {
                    console.log(event.params);
                }
            });
            swanEventFlow.onMessage('PagelifeCycle', event => {
                if (event.params.eventName === 'shareSuccess') {
                    console.log(event.params);
                }
            });
            swanEventFlow.onMessage('PagelifeCycle', event => {
                if (event.params.eventName === 'shareFailed') {
                    console.log(event.params);
                }
            });

            // 监听app生命周期函数
            swanEventFlow.onMessage('ApplifeCycle', event => {
                if (event.params.eventName === 'onLaunch') {
                    console.log(event.params);
                }
            });
            swanEventFlow.onMessage('ApplifeCycle', event => {
                if (event.params.eventName === 'onShow') {
                    console.log(event.params);
                }
            });
            swanEventFlow.onMessage('ApplifeCycle', event => {
                if (event.params.eventName === 'onHide') {
                    console.log(event.params);
                }
            });
            swanEventFlow.onMessage('ApplifeCycle', event => {
                if (event.params.eventName === 'onError') {
                    console.log(event.params);
                }
            });

            // 监听框架流程事件
            swanEventFlow.onMessage('TraceEvents', event => {
                // 宿主打印日志的逻辑
                if (event.params.eventName === 'masterPreloadStart') {
                    console.log(event.params);
                }
            });
            swanEventFlow.onMessage('TraceEvents', event => {
                // 宿主打印日志的逻辑
                if (event.params.eventName === 'masterPreloadCreateHistorystack') {
                    console.log(event.params);
                }
            });
            swanEventFlow.onMessage('TraceEvents', event => {
                // 宿主打印日志的逻辑
                if (event.params.eventName === 'slavePreloadStart') {
                    console.log(event.params);
                }
            });
            swanEventFlow.onMessage('TraceEvents', event => {
                // 宿主打印日志的逻辑
                if (event.params.eventName === 'slavePreloadListened') {
                    console.log(event.params);
                }
            });
            swanEventFlow.onMessage('TraceEvents', event => {
                // 宿主打印日志的逻辑
                if (event.params.eventName === 'masterActiveStart') {
                    console.log(event.params);
                }
            });
            swanEventFlow.onMessage('TraceEvents', event => {
                // 宿主打印日志的逻辑
                if (event.params.eventName === 'masterActiveInitRender') {
                    console.log(event.params);
                }
            });
            swanEventFlow.onMessage('TraceEvents', event => {
                // 宿主打印日志的逻辑
                if (event.params.eventName === 'slaveActiveStart') {
                    console.log(event.params);
                }
            });
            swanEventFlow.onMessage('TraceEvents', event => {
                // 宿主打印日志的逻辑
                if (event.params.eventName === 'slaveActivePageLoadStart') {
                    console.log(event.params);
                }
            });

        }
    };
});
