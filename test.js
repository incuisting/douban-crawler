const init = require('./services/index');
const express = require('express');
const app = express();



// init.doubanCrawler(1).then(re =>{
//     console.log(re)
//     console.log(re.length)
// })


app.use(express.static('APP'));

app.get('/getPage', function(req, res){
    console.log('res',req.query);
});

app.listen(3000, function(){
    console.log('app is running at port 3000')
});