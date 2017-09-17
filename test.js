const init = require('./services/index');
const express = require('express');
const app = express();



// init.doubanCrawler(1).then(re =>{
//     console.log(re)
//     console.log(re.length)
// })

//将APP设定为静态目录
app.use(express.static('APP'));

//响应抓取页面的get请求
app.get('/getPage', function(req, res){
    let index= req.query.index;
    let filter = req.query.filter;
    console.log(index,filter);
    if(!filter){
        init.doubanCrawler(index).then((data)=>{
            res.send(data);
        });
    }else{
        init.doubanCrawler(index,filter).then((data)=>{
            res.send(data);
        });
    }

});

//监听端口
app.listen(3000, function(){
    console.log('app is running at port 3000')
});