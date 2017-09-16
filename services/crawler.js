const axios = require('axios');
const cheerio = require('cheerio');

async function fetchSingleDoubanList(start) {

    let response = await axios.get(`https://www.douban.com/group/HZhome/discussion?start=${start}`);
    let htmlContent = response.data;

    const $ = cheerio.load(htmlContent);
    const result = $('a[title]');

    console.log('length',result.length)

    const resultList = [];

    for (let i = 0; i < result.length; i++) {
        resultList.push({
            title: result.eq(i).attr('title'),
            url: result.eq(i).attr('href')
        });
    }

    return resultList;

}

async function fetchSingleDoubanTopic(url,title) {
    let response = await axios.get(url);
    let htmlContent = response.data;

    const $ = cheerio.load(htmlContent);
    const contentText = $('.topic-content > p:first-child');
    const contentImg = $('.topic-figure > img');
    let details = [];
    let imgs = [];
    for (let i = 0; i < contentText.length; i++) {
        details.push(contentText.eq(i).text());
    }
    for (let j = 0; j < contentImg.length; j++) {
        imgs.push(contentImg.eq(j).attr('src'));
    }
    return {
        title,
        url,
        details,
        imgs
    }
}

module.exports = {
    fetchSingleDoubanList,
    fetchSingleDoubanTopic
}