const crawler = require('./services/crawler');

(async() => {
    let tenPagesData = [];
    for (let i = 0; i < 250; i += 25) {
        let results = await crawler.fetchSingleDoubanList(i);

        for (let j = 0; j < results.length; j++) {
            let item = results[j];
            if (isNear(item.title)) {
                let results = await crawler.fetchSingleDoubanTopic(item.url);
                fontTenPagesData.push(results);
            }
        }
        // await crawler.fetchSingleDoubanTopic(results[0].url);
    }
    console.log('10pages', tenPagesData);
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