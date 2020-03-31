define(function () {
    return function ajax(url, options) {
        if (typeof url === 'object') {
            options = url;
            url = options.url;
        }
        let resolve, reject;
        let promise = new Promise((res, rej) => {
            resolve = res;
            reject = rej;
        });
        options = options || {};
        // 默认是 GET 请求
        options.method = (options.method || 'GET').toUpperCase();
        options.url = options.url || url;
        // 默认是异步请求
        options.async = options.async || true;
        options.data = options.data || {};
        options.headers = options.headers || {};

        let xhr = null;

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest()
        } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP")
        }

        // 遍历请求参数对象，拼接请求参数
        let params = Object.keys(options.data).map(key => `${key}=${options.data[key]}`);

        // 给每个数组后面添加一个 &
        let requestData = params.join('&');

        // 请求类型
        let requestType = options.method.toUpperCase();

        // 如果是 GET 请求
        if (requestType === 'GET') {
            xhr.open(requestType, options.url + (options.url.indexOf('?') > -1 ? '&' : '?') + requestData, options.async);
            // 设置headers
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
            Object.keys(options.headers).forEach(name => xhr.setRequestHeader(name, options.headers[name]));

            xhr.send()
        }
        // 如果是 POST 请求
        else if (requestType === 'POST') {
            xhr.open(requestType, options.url, options.async);
            // 设置headers
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
            Object.keys(options.headers).forEach(name => xhr.setRequestHeader(name, options.headers[name]));

            xhr.send(requestData)
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr);
                resolve({code: 200, data: JSON.parse(xhr.responseText)})
            } else if (xhr.status !== 200) {
                console.log(xhr);
                reject({code: xhr.status, message: 'request error'});
            }
        };
        return promise;
    };
});
