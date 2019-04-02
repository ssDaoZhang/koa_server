const Router = require('koa-router');

let router  = new Router();
let page = 1, page_size =10;
router.get('', async (ctx, next) => {
    let topicArr = [];
    //注意异步操作不能少 await, 使用await的都是async函数
    let res = await ctx.db.execute(`SELECT Q.ID, Q.topices, Q.title, Q.attention_count, ANS.summary, AUT.name, AUT.avatarUrl,AUT.headline
        FROM 
        question_table AS Q 
        LEFT JOIN answer_table AS ANS ON Q.best_answer_ID=ANS.ID
        LEFT JOIN author_table AS AUT ON ANS.author_ID=AUT.ID
        LIMIT ${(page - 1)*page_size}, ${page_size};`);
    // console.log(res[0]);
    await new Promise((resolve, reject) => {
        res.forEach(async (ele, index) =>{
            let topics = await ctx.db.execute(`SELECT title FROM topic_table WHERE ID IN (${ele.topices});`);
            // console.log('话题：', topics);
            topicArr.push(topics);
            if(index == res.length - 1){
                resolve();
            }
        });
    });

    // console.log('22222:', topicArr);
    await ctx.render('list'/*模板文件名*/, {questions:res, topics:topicArr}/*传入模板的数据*/);
});

router.get('detail/:id', async (ctx, next) => {
    let {id} = ctx.params;
    console.log(id);
    let question = await ctx.db.execute(`SELECT * FROM question_table WHERE ID=${id}`);
    let answers = await ctx.db.execute(`SELECT * FROM
        answer_table AS ANS
        LEFT JOIN author_table AS AUT ON ANS.author_id=AUT.ID
        WHERE ANS.question_ID=${id}
    `);
    console.log(question);
    console.log(answers);
    // await ctx.render('item'/*模板文件名*/, {}/*传入模板的数据*/);
});

module.exports = router.routes();