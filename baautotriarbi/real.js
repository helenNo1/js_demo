const axios = require('axios');
const qs = require('qs');
const { writeS2F } = require('./wf');
const {sendMail} = require('./mail');

// 币安API基本URL
 const baseUrl = 'https://api.binance.com/api/v3';
//const baseUrl = 'https://testnet.binance.vision/api/v3';

// 替换为您的API密钥和秘密密钥
 const apiKey = '1111';
 const apiSecret = '22222';
//const apiKey = '3333';
//const apiSecret = '4444';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 创建签名
function createSignature(queryString) {
    const crypto = require('crypto');
    return crypto.createHmac('sha256', apiSecret).update(queryString).digest('hex');
}

function get4demical(b, dem) {
    let stringNumber = b.toString();
    let decimalIndex = stringNumber.indexOf('.') + 1; // 找到小数点的索引位置
    let result = stringNumber.slice(0, decimalIndex + dem);
    // 如果最后一个字符是小数点，则去掉
    if (result.endsWith('.')) {
        result = result.slice(0, -1);
    }
    return result;
}

async function getFree(coin) {
    // 获取账户余额
    const timestamp = Date.now();
    const qs = `timestamp=${timestamp}`;
    const sig_s = createSignature(qs);
    const qs_new = `${qs}&signature=${sig_s}`;
    let accountInfo;
    try {
        accountInfo = await axios.get(`${baseUrl}/account?${qs_new}`, {
            headers: {
                'X-MBX-APIKEY': apiKey
            }
        });
    } catch (error) {
        console.log("查询余额失败:", coin, '-', error)
        sendMail('get quantity err', coin );
        process.exit(1);
    }
    let cf = accountInfo.data.balances.find(asset => asset.asset === coin).free
    return cf;
}

async function getQByL(da, db, l, dem) {
    //usdt eth btc
    //ethusdt ethbtc btcusdt den num num usdt eth btc
    //q永远是da
    let q = await getFree(da);
    //quoteOrderQty不考虑lot_size
    if (l === 'den') {
        return q;
    }

    let demnum;
    let dem100000 = Math.floor(parseFloat(dem) * 100000);
    switch (dem100000) {
        case 1:
            demnum = 5;
            break;
        case 10:
            demnum = 4;
            break;
        case 100:
            demnum = 3;
            break;
        case 1000:
            demnum = 2;
            break;
        case 10000:
            demnum = 1;
            break;
        case 100000:
            demnum = 0;
            break;

    }

    let qdem = get4demical(q, demnum);
    if (qdem === '0.' || qdem === '0.0' || qdem === '0.00' || qdem === '0.000' || qdem === '0.0000' || qdem === '0.00000') {
        qdem = '0';
    }
    return qdem;
}


// 以市价购买某个货币
async function marketBuyQty(symbol, quantity, l, qty_type) {
    let side;
    if (l === 'den') {
        side = 'BUY'
    } else if (l === 'num') {
        side = 'SELL'
    }
    let params;
    try {
        // 创建时间戳
        const timestamp = Date.now();
        // 创建签名
        const signature = createSignature(
            `symbol=${symbol}&side=${side}&type=MARKET&${qty_type}=${quantity}&timestamp=${timestamp}`);

        // 构建请求参数
        if (qty_type === 'quoteOrderQty') {
            params = {
                symbol: symbol,
                side: side,
                type: 'MARKET',
                quoteOrderQty: quantity,
                timestamp: timestamp,
                signature: signature
            };
        } else {
            params = {
                symbol: symbol,
                side: side,
                type: 'MARKET',
                quantity: quantity,
                timestamp: timestamp,
                signature: signature
            };
        }

        urlencodeparams = qs.stringify(params);

        // 发送POST请求
        await axios.post(`${baseUrl}/order`, urlencodeparams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-MBX-APIKEY': apiKey
            }
        });

    } catch (error) {
        console.log('购买参数:', params);
        console.error('购买失败:', error.response.data);
        process.exit(1);
        // await sleep(3000); // 延迟 3 秒钟
    }
    console.log('购买参数', params);
    console.log('购买成功');

}


// 以市价购买某个货币
async function marketBuy(symbol, quantity, l) {
    let side, qty_type;
    if (l === 'den') {
        side = 'BUY'
        qty_type = 'quoteOrderQty';
    } else if (l === 'num') {
        side = 'SELL'
        qty_type = 'quantity';
    }
    let params;
    try {
        // 创建时间戳
        const timestamp = Date.now();
        // 创建签名
        const signature = createSignature(
            `symbol=${symbol}&side=${side}&type=MARKET&${qty_type}=${quantity}&timestamp=${timestamp}`);

        // 构建请求参数
        if (qty_type === 'quoteOrderQty') {
            params = {
                symbol: symbol,
                side: side,
                type: 'MARKET',
                quoteOrderQty: quantity,
                timestamp: timestamp,
                signature: signature
            };
        } else {
            params = {
                symbol: symbol,
                side: side,
                type: 'MARKET',
                quantity: quantity,
                timestamp: timestamp,
                signature: signature
            };
        }

        urlencodeparams = qs.stringify(params);

        // 发送POST请求
        const response = await axios.post(`${baseUrl}/order`, urlencodeparams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-MBX-APIKEY': apiKey
            }
        });

    } catch (error) {
        console.error('购买参数', params);
        console.error('购买失败', error.response.data);

        writeS2F('log', JSON.stringify(params));
        writeS2F('log', JSON.stringify(error.response.data));
        sendMail('buy err', JSON.stringify(params) +  JSON.stringify(errors.response.data));
        process.exit(1);
    }

}


//USDT BNB BTC  USDT    BNBUSDT den buy quote BNBBTC num sell quantity  BTCUSDT num sell quantity
async function executeTradesParamObj({ d1, d2, d3, l1, l2, l3, lv1, lv2, lv3, lv1de, lv2de, lv3de }) {
//    await marketBuyQty('BNBUSDT', 100, 'num', 'quoteOrderQty');

    const q1 = await getQByL(d1, d2, l1, lv1de);
    if (q1 === '0') {
        sendMail('get quantity err', d1 + d2 + l1 +lv1de);
        process.exit(2);
    }
    await marketBuy(lv1, q1, l1);

    const q2 = await getQByL(d2, d3, l2, lv2de);
    if (q2 === '0') {
        sendMail('get quantity err', d1 + d2 + l1 +lv1de);
        process.exit(2);
    }
    await marketBuy(lv2, q2, l2);

    const q3 = await getQByL(d3, d1, l3, lv3de);
    if (q3 === '0') {
        sendMail('get quantity err', d1 + d2 + l1 +lv1de);
        process.exit(2);
    }
    await marketBuy(lv3, q3, l3);
}


const po = {
    'd1': 'USDT',
    'd2': 'ETH',
    'd3': 'BTC',
    'l1': 'den',
    'l2': 'num',
    'l3': 'num',
    'lv1': 'ETHUSDT',
    'lv2': 'ETHBTC',
    'lv3': 'BTCUSDT',
    'lv1de': '0.01',
    'lv2de': '0.01',
    'lv3de': '0.01',
}
// executeTradesParamObj(po);

// 执行交易
// await executeTrades();
module.exports = { executeTradesParamObj };
