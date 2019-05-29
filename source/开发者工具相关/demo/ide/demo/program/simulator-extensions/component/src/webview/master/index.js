/**
 * @license
 *  Copyright Baidu Inc. All Rights Reserved.
 *
 *  master入口
 * @file demo-api internal extension master entry
 */

const videoHandlers = {
    playDemoVideo: context => ({query: {params: {data}}}) => {
        context.event.send('demo-video', {type: 'play', data});
    },
    pauseDemoVideo: context => ({query: {params: {data}}}) => {
        context.event.send('demo-video', {type: 'pause', data});
    },
    seekDemoVideo: context => ({query: {params: {data}}}) => {
        context.event.send('demo-video', {type: 'seek', data});
    }
};

module.exports = {
    schemeHandlers: {
        ...videoHandlers
    },
    middleWares: [
        context => next => async scheme => {
            switch (scheme.action) {
                case 'chooseInvoiceTitle':
                case 'chooseAddress':
                case 'requestPolymerPayment':
                    context.event.send(
                        'inspector.loggerToConsole',
                        {
                            level: 'error',
                            value: `在demo宿主中,不支持${scheme.action}`
                        }
                    );
                    break;
                default:
                    return next(scheme);
            }
        }
    ],
    async onReady(context) {
        context.simulator = {
            ...context.simulator,
            // 授权方法
            authorize: scope => authorizeAsync(context, scope)
        };
        // todo清除授权
        context.event.on('clear-auth', () => {
            clearAuthorize(context);
        });
        const hasUpdate = context.app.startParams.isUpdate;
        context.event.send('swan-core-events', {
            type: 'updateStatusChange',
            payload: {
                eventType: 'checkForUpdate',
                data: JSON.stringify({
                    hasUpdate
                })
            }
        });
    }
};
