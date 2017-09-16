const init = require('./services/index');

// ( async() => {
//         let rs = await init.doubanCrawler(2, '银泰');
//     console.log(rs);
// })()

init.doubanCrawler(1).then(re =>{
    console.log(re)
    console.log(re.length)
})
