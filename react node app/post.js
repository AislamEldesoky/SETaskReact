var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/Blog';

module.exports = {
	addPost: function(title, subject, callback){
		MongoClient.connect(url,{useNewUrlParser: true}, function(err, db) {
            if(err){
                throw err ;
            }
		  	db.collection('post').insertOne( {
				"title": title,
				"subject": subject
			},function(err, result){
				assert.equal(err, null);
		    	console.log("Saved the blog post details.");
		    	if(err == null){
		    		callback(true)
		    	}
		    	else{
		    		callback(false)
		    	}
			});
		});
	},
	getPost: function(callback){
		
		MongoClient.connect(url,{useNewUrlParser: true}, function(err, db){
            if(err){
                throw err ;
            }
			 db.collection('post', function (err, collection) {
		        collection.find().toArray(function (err, list) {
		            callback(list);
		        });
		     });
		})
	}
}