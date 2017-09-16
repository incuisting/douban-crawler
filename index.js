const crawler = require('./services/crawler');

(async() => {

    for (let i = 0; i < 100; i += 25) {
        let results = await crawler.fetchSingleDoubanList(i);

        for (let j = 0; j < results.length; j++) {
            let item = results[j];
            if (isNear(item.title)) {
                await crawler.fetchSingleDoubanTopic(item.url)
            }
        }
        // await crawler.fetchSingleDoubanTopic(results[0].url);
    }



})()
.then(result => {
        console.log('done');
        process.exit(0);
    })
    .catch(e => {
        console.log(e);
        process.exit(1);
    })

function isNear(location) {
    return location.indexOf('银泰') > -1;
}