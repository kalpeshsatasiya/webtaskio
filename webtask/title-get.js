"use latest";

var { MongoClient } = require('mongodb');

return (ctx, req, res) => {
  let { MONGO_URL } = ctx.data;

  MongoClient.connect(MONGO_URL, (err, db) => {
    if(err) return res.end(err);

    db
      .collection('words')
      .find()
      .toArray( (err, titles) => {
        if(err) return res.end(err);

        const jsonResult = {
          titles: titles		 
        };
		
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(jsonResult));
      });
  });
};
