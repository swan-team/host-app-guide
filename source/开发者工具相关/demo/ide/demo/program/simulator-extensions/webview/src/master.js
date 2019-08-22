/**
 * @license
 *  Copyright Baidu Inc. All Rights Reserved.
 *
 *  This source code is licensed under the Apache License, Version 2.0; found in the
 *  LICENSE file in the root directory of this source tree.
 * @file master
 * @author wanghongliang02
 * 2019-04-25
 */
let toggle;

module.exports = {
    schemeHandlers: {
        wv: context => async () => {
            toggle = !toggle;
            toggle ? context.event.send('wv-open') : context.event.send('wv-hide');
        }
    }
};

