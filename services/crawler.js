const axios = require('axios');
const cheerio = require('cheerio');

async function fetchSingleDoubanList(start) {

    let response = await axios.get(`https://www.douban.com/group/HZhome/discussion?start=${start}`);
    let htmlContent = response.data;

    const $ = cheerio.load(htmlContent);
    const result = $('a[title]');

    const resultList = [];

    for (let i = 0; i < result.length; i++) {
        resultList.push({
            title: result.eq(i).attr('title'),
            url: result.eq(i).attr('href')
        });
    }

    return resultList;

}

async function fetchSingleDoubanTopic(url) {
    let response = await axios.get(url);
    let htmlContent = response.data;

    const $ = cheerio.load(htmlContent);
    const contentText = $('.topic-content > p');
    for (let i = 0; i < contentText.length; i++) {
        console.log(contentText.eq(i).text());
    }

}

module.exports = {
    fetchSingleDoubanList,
    fetchSingleDoubanTopic
}