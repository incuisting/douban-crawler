const crawler = require('./crawler');

/*
page:初始页面，以25为一个单位
filter：需要筛选的地方
*/

async function doubanCrawler(page, filter) {
    let pageDate = [];
    let initPageIndex = page !== 1 ? (page - 1) * 25 : page - 1;
    let results = await crawler.fetchSingleDoubanList(initPageIndex);
    for (let j = 0; j < results.length; j++) {
        let item = results[j];
        if (isNear(item.title, filter)) {
            let results = await crawler.fetchSingleDoubanTopic(item.url,item.title);
            pageDate.push(results);
        }
    }
    // await crawler.fetchSingleDoubanTopic(results[0].url);

    return pageDate;
}

function isNear(location, filter) {
    if (!filter) {
        return true;
    } else {
        return location.indexOf(filter) > -1;
    }
}

module.exports = {
    doubanCrawler
}
