let result = [];
scan('www.slane.cn', 1, 65535, function (result) {
    console.log('开启端口:');
    for (let i = 0; i < result.length; i++) {
        console.log('端口:' + result[i]);
    }
});


function scan (host, start, end, callback) {
    let net = require('net');
    let count = end - start;
    console.time('port scan time');

    for (let i = start; i <= end; i++){
        console.log('正在扫描' + host + ':' +i);
        if (i == end) {
            console.log('等待扫描结果中......');
        };
        let item = net.connect({
            host:host,
            port:i
        },
        function (i) {
                return function () {
                    result.push(i);
                    this.destroy();
                };
            }(i)
        );
        item.on('error', function (err) {
            if (err.errno == 'ECONNREFUSED') {
                this.destroy();
            }
        });

        item.on('close',function () {
            if (!count--) {
                console.timeEnd('port scan time');
                callback(result);
            }
        });
    }
}