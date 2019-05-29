/**
 * @license
 *  Copyright Baidu Inc. All Rights Reserved.
 *
 *  master入口
 * @file demo-api internal extension slave entry
 */

const {getVideoClass} = require('./video');

module.exports = {
    async onReady(context) {
        context.Video = getVideoClass(window.san);
        context.event.on('demo-video', ({type, data}) => {
            const video = document.querySelector(`#${data.id} > video`)
            if (!video) {
                return;
            }
            switch(type) {
                case 'play': video.play(); break;
                case 'pause': video.pause(); break;
                case 'seek': video.currentTime = data.position; break;
            }
        });
    },
    schemeHandlers: {
        openDemoVideo: context => ({query: {params: {data}}}) => {
            const video = new context.Video({data});
            const el = document.getElementById(data.id);
            video.attach(el);
        }
    }
};
