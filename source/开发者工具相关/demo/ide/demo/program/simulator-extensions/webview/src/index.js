const {join} = require('path');


let wv = null;
module.exports = {
    onReady(context) {
        // context.san 开发者工具2.2.4版本起支持
        var Wv = context.san.defineComponent({
            template: '<div><ui-webview s-ref="aa" class="wv-main {{c}}" name="simulator" src="https://www.baidu.com" preload="{{preloadPath}}"/></div>',
            initData: function () {
                return {
                    preloadPath: join(__dirname, 'preload.js'),
                    c: 'wv-show'
                };
            },
            show() {
                this.data.set('c', 'wv-show');
            },
            hide() {
                this.data.set('c', 'wv-hide');
            },
            init() {
                let w = this.ref('aa').el;
                w.addEventListener('dom-ready', () => {
                    w.openDevTools();
                    context.event.send('test', w.getWebContents().id).then(res=>{
                        console.log('get res', res);
                    });
                });
            }
        });

        context.event.on('wv-open', res => {
            if (wv) {
                wv.show();
            }
            else {
                wv = new Wv();
                wv.attach(context.el);
                wv.init();
            }
        });
        context.event.on('wv-hide', res => {
            if (wv) {
                wv.hide();
            }
        });


        context.event.on('wv-test', res => {
            alert('wv-test');
        });

    },
    onRefresh() {
        if (wv) {
            wv.detach();
            wv = null;
        }
    }
};
