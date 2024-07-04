const { log, error } = console;
const got = require('got');
const events = require('events');
const Websocket = require('ws');
const { sort } = require('fast-sort');
const real = require('./real')

let pairs = [],
  symValJ = {};
const eventEmitter = new events();
let count = 0;
let ws = '';


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const checkBtcUsdtEthBnb = (d1, d2, d3) => {
  if (d1 != 'USDT') {
    return false;
  }
  return true;
}


const getPairs = async () => {
  const resp = await got('https://api.binance.com/api/v3/exchangeInfo');
  const eInfo = JSON.parse(resp.body);
  const symbols = [
    ...new Set(
      eInfo.symbols
        .filter((d) => d.status === 'TRADING')
        .map((d) => [d.baseAsset, d.quoteAsset])
        .flat()
    ),
  ];
  const validPairs = eInfo.symbols
    .filter((d) => d.status === 'TRADING')
    .map((d) => d.symbol);
  validPairs.forEach((symbol) => {
    symValJ[symbol] = { bidPrice: 0, askPrice: 0 };
  });

  let s1 = symbols,
    s2 = symbols,
    s3 = symbols;
  s1.forEach((d1) => {
    s2.forEach((d2) => {
      s3.forEach((d3) => {
        if (!checkBtcUsdtEthBnb(d1, d2, d3)) {
          return;
        }
        if (!(d1 == d2 || d2 == d3 || d3 == d1)) {
          let lv1 = [],
            lv2 = [],
            lv3 = [],
            l1 = '',
            l2 = '',
            l3 = '';
          if (symValJ[d1 + d2]) {
            lv1.push(d1 + d2);
            l1 = 'num';
          }

          if (symValJ[d2 + d1]) {
            lv1.push(d2 + d1);
            l1 = 'den';
          }


          if (symValJ[d2 + d3]) {
            lv2.push(d2 + d3);
            l2 = 'num';
          }

          if (symValJ[d3 + d2]) {
            lv2.push(d3 + d2);
            l2 = 'den';
          }


          if (symValJ[d3 + d1]) {
            lv3.push(d3 + d1);
            l3 = 'num';
          }

          if (symValJ[d1 + d3]) {
            lv3.push(d1 + d3);
            l3 = 'den';
          }

          if (lv1.length && lv2.length && lv3.length) {
            //排除 T/USDT TUSD/T 情况 导致分母搞错了
            if (lv1[0] !== lv2[0] && lv1[0] !== lv3[0] && lv2[0] !== lv3[0]) {
              if (lv1[0] == 'GALAEUR' || lv2[0] == 'GALAEUR' || lv3[0] == 'GALAEUR') {
                return;
              }
              pairs.push({
                l1: l1,
                l2: l2,
                l3: l3,
                d1: d1,
                d2: d2,
                d3: d3,
                lv1: lv1[0],
                lv2: lv2[0],
                lv3: lv3[0],
                lv1de: eInfo.symbols
                  .filter((d) => d.status === 'TRADING')
                  .filter((d) => d.symbol === lv1[0])[0].filters[1].stepSize,
                lv2de: eInfo.symbols
                  .filter((d) => d.status === 'TRADING')
                  .filter((d) => d.symbol === lv2[0])[0].filters[1].stepSize,
                lv3de: eInfo.symbols
                  .filter((d) => d.status === 'TRADING')
                  .filter((d) => d.symbol === lv3[0])[0].filters[1].stepSize,

                value: -100,
                tpath: '',
              });
            }
          }

        }
      });
    });
  });
  log(`Finished identifying Arbitrage Paths. Total paths = ${pairs.length}`);
};

const processData = async (data) => {
  console.log('recv msg from binance ws');
  try {
    let ps = [];
    data = JSON.parse(data);
    if (data['result'] === null) return;

    //Update JSON
    data.forEach((d) => {
      symValJ[d.s].bidPrice = d.b * 1;
      symValJ[d.s].askPrice = d.a * 1;
    });

    let max_d_value = 0;
    let max_po;
    pairs.forEach((d) => {
      if (
        symValJ[d.lv1]['bidPrice'] &&
        symValJ[d.lv2]['bidPrice'] &&
        symValJ[d.lv3]['bidPrice']
      ) {

        //Level 1 calculation
        let lv_calc, lv_str;
        if (d.l1 === 'num') {
          lv_calc = symValJ[d.lv1]['bidPrice'];
          lv_str =
            d.d1 +
            '->' +
            d.lv1 +
            "['bidP']['" +
            symValJ[d.lv1]['bidPrice'] +
            "']" +
            '->' +
            d.d2 +
            '<br/>';
        } else {
          lv_calc = 1 / symValJ[d.lv1]['askPrice'];
          lv_str =
            d.d1 +
            '->' +
            d.lv1 +
            "['askP']['" +
            symValJ[d.lv1]['askPrice'] +
            "']" +
            '->' +
            d.d2 +
            '<br/>';
        }

        //Level 2 calculation
        if (d.l2 === 'num') {
          lv_calc *= symValJ[d.lv2]['bidPrice'];
          lv_str +=
            d.d2 +
            '->' +
            d.lv2 +
            "['bidP']['" +
            symValJ[d.lv2]['bidPrice'] +
            "']" +
            '->' +
            d.d3 +
            '<br/>';
        } else {
          lv_calc *= 1 / symValJ[d.lv2]['askPrice'];
          lv_str +=
            d.d2 +
            '->' +
            d.lv2 +
            "['askP']['" +
            symValJ[d.lv2]['askPrice'] +
            "']" +
            '->' +
            d.d3 +
            '<br/>';
        }

        //Level 3 calculation
        if (d.l3 === 'num') {
          lv_calc *= symValJ[d.lv3]['bidPrice'];
          lv_str +=
            d.d3 +
            '->' +
            d.lv3 +
            "['bidP']['" +
            symValJ[d.lv3]['bidPrice'] +
            "']" +
            '->' +
            d.d1;
        } else {
          lv_calc *= 1 / symValJ[d.lv3]['askPrice'];
          lv_str +=
            d.d3 +
            '->' +
            d.lv3 +
            "['askP']['" +
            symValJ[d.lv3]['askPrice'] +
            "']" +
            '->' +
            d.d1;
        }

        d.tpath = lv_str;
        d.value = parseFloat((lv_calc - 1));
        //三角费率千分之1 * 3  不然没有意义
        //GALA/EUR GAL/AEUR 费率不一样
        //usdt  aeur gal usdt 导致80多倍
        if (d.value > max_d_value) {
          max_d_value = d.value;
          max_po = {
            'd1': d.d1,
            'd2': d.d2,
            'd3': d.d3,
            'l1': d.l1,
            'l2': d.l2,
            'l3': d.l3,
            'lv1': d.lv1,
            'lv2': d.lv2,
            'lv3': d.lv3,
            'lv1de': d.lv1de,
            'lv2de': d.lv2de,
            'lv3de': d.lv3de,
          };

        }
      }
    });
    console.log('max_d ', max_d_value);
    console.log('max_po ', JSON.stringify(max_po));

    if (max_d_value > 0.0034) {
      ps.push(new Promise((resolve, reject) => {
        real.executeTradesParamObj(max_po, resolve)
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            reject(error);
          })
      }));
    }

    if (ps.length > 0) {
      Promise.all(ps)
        .then(() => {
          console.log('all promises resolved');
        })
        .catch((error) => {
          console.log('error', error);
        });

    }

    //Send Socket
    // eventEmitter.emit(
    //   'ARBITRAGE',
    //   sort(pairs.filter((d) => d.value > 0)).desc((u) => u.value)
    // );
  } catch (err) {
    error(err);
  }
};

const wsconnect = () => {
  ws = new Websocket(`wss://stream.binance.com:9443/ws`); //!ticker@arr
  ws.on('open', () => {
    ws.send(
      JSON.stringify({
        method: 'SUBSCRIBE',
        params: ['!ticker@arr'],
        id: 121212131,
      })
    );
  });
  ws.on('error', log);
  ws.on('message', processData);
};

module.exports = { getPairs, wsconnect, eventEmitter };
