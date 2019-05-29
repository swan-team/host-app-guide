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

module.exports = {
    schemeHandlers: {
        demo: context => async ({query: {params: {data, cb}}}) => {
            context.utils.execute(cb, 0, 'success', data);
        }
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
};

