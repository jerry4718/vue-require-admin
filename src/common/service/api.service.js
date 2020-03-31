define(['ajax'], function (ajax) {
    const host = '';
    const baseUrl = '';

    function appendQuery (data) {
        return `?${Object.keys(data).map(key => `${key}=${encodeURIComponent(data[key])}`).join('&')}`;
    }

    async function baseRequest ({method = 'GET', where = 'form', api, headers, data = {}}) {
        // if (Authorization) {
        //   headers['Authorization'] = 'Bearer ' + Authorization
        // }
        const requestOptions = {
            url: host + baseUrl + api + (where === 'query' ? appendQuery(data) : ''),
            method,
            headers,
            dataType: 'json',
            data: where === 'form' ? data : void 0,
        };
        const [err, response] = await ajax(requestOptions);

        console.log(requestOptions.url, err, response);

        if (err) {
            throw err;
        }

        if (!response) {
            throw Error(`小程序: uni.request返回值中 没有 response 对象`);
        }

        const {statusCode, errMsg, data: _data} = response;

        if (statusCode !== 200) {
            throw Error(`小程序: 异常 [code: ${statusCode}, message: ${errMsg}]`);
        }

        if (!_data) {
            throw Error(`小程序: uni.request返回值中 没有 data 对象`);
        }

        const {code} = _data;

        if (code !== 200) {
            throw Error(`服务器: 异常 [code: ${code}]`);
        }

        return _data;
    }

});
