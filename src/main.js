
const Crawler = require("crawler");

const c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if (error) {
            console.error(error);
        } else {
            parse(res.body)
        }
        done();
    }
});


function parse(data) {
    const start = data.indexOf('{');
    const end = data.indexOf('}') + 1;
    const jsonStr = data.slice(start, end);
    const jsonObj = eval('(' + jsonStr + ')');

    const fundItems = [];
    for (const key in jsonObj) {
        for (const item of jsonObj[key]) {
            let fundItem = {};
            const fundArray = item.split('|');
            fundItem['code'] = fundArray[0];
            fundItem['name'] = fundArray[1];
            fundItem['day'] = fundArray[3];
            fundItem['unitNetWorth'] = fundArray[4];
            fundItem['dayOfGrowth'] = fundArray[5];
            fundItem['recent1Week'] = fundArray[6];
            fundItem['recent1Month'] = fundArray[7];
            fundItem['recent3Month'] = fundArray[8];
            fundItem['recent6Month'] = fundArray[9];
            fundItem['recent1Year'] = fundArray[10];
            fundItem['recent2Year'] = fundArray[11];
            fundItem['recent3Year'] = fundArray[12];
            fundItem['fromThisYear'] = fundArray[13];
            fundItem['fromBuild'] = fundArray[14];
            fundItem['serviceCharge'] = fundArray[18];
            fundItem['upEnoughAmount'] = fundArray[24];
            fundItems.push(fundItem);
        }
    }
    console.log(fundItems);
}


// Queue just one URL, with default callback
c.queue({
    uri: 'https://fundapi.eastmoney.com/fundtradenew.aspx',
    ft: 'pg',
    sc: '1',
    st: 'desc',
    pi: '2',
    pn: '3000'
});