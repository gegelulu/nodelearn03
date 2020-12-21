const app = require('express')();
const superagent = require('superagent');
const cheerio = require('cheerio');

app.get('/', function(req, res, next){
    //superagent catch https://cnnodejs.org html
    superagent.get('http://cnodejs.org')
        .end(function(err, sres) {
            //dispose error
            if(err){
                return next(err);
            } 
            //cheerio 加载后和jquery一样 
            // console.log(sres.text)
            let $ = cheerio.load(sres.text);
            let items = [];
            $('#topic_list .topic_title').each(function(idx, element) {
                let $el = $(element);
                items.push({
                    title: $el.attr('title'),
                    href: $el.attr('href'),
                });
            })
            $('#topic_list .user_avatar').each(function(idx, element) {
                let $el = $(element);
                items[idx].author = $el.attr('href').split('/')[2];
            })
            res.send(items);
        })
})

app.listen(5000, function(req,res){
    console.log('app is listening at 5000')
})