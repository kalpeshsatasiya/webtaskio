var parallel    = require('async').parallel;
var MongoClient = require('mongodb').MongoClient;



module.exports = function (ctx, done) {
  var title = ctx.data.title;
   

	function saveRecord(title, db, cb) {
	  var doc       = {
		title: title
	  };

	 var increment = {
    $inc: {
      count: 1
		}
	};

	  var opts      = {
		upsert: true
	  };
  
	db
    .collection('words')
    .updateOne(doc,increment, opts, function (err) {
      if(err) return cb(err);	  
      console.log('Successfully saved %s', title);
      cb(null);
    });
}


  MongoClient.connect(ctx.data.MONGO_URL, function (err, db) {
    if(err) return done(err);

    var save_job = saveRecord(title, db, function (err) {
          if(err) return done(err);
          cb(null);
        });
      


    parallel(save_job, function (err) {
      if(err) return done(err);

      done(null, 'Successfully added title.');
    });

  });
};
