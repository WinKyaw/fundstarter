var http = require("http");
var fs = require("fs");

//part 1(a)
// var readfilesync = function(callback){
// 	return readfile('./index.html', 'utf8');
// }

// var connection = function(request, response){
	

// 	return response.sendreadSyncHTML();
// }

// var server = http.createServer(connection);
// server.listen(8100);


//part 1(b)
fs.readFile('./index.html', function(err, html) {
	if(err) {
		throw err;
	}
	
	var server = http.createServer(function(request, response) {
		response.writeHeader(200, {"Content-Type": "text/html"});
		response.write(html);
		response.end();
	});
	server.listen(8000);
});

