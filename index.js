var http = require("http");
var fs = require("fs");

//part 1(a)
var readfilesync = function(callback){
	return readfile('./index.html', 'utf8');
}

var connection = function(request, response){
	

	return response.sendreadSyncHTML();
}

var server = http.createServer(connection);
server.listen(8100);

