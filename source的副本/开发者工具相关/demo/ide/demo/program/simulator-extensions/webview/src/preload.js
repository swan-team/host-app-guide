/**
 * @license
 *  Copyright Baidu Inc. All Rights Reserved.
 *
 *  This source code is licensed under the Apache License, Version 2.0; found in the
 *  LICENSE file in the root directory of this source tree.
 * @file preload
 * @author wanghongliang02
 * 2019-04-25
 */

module.exports = context => {
    context.event.on('test', () => {
        context.event.send('wv-test', 'test');
        return 111;
    });


};
