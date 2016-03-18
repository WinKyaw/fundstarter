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
// fs.readFile('./index.html', function(err, html) {
// 	if(err) {
// 		throw err;
// 	}
	
// 	var server = http.createServer(function(request, response) {
// 		response.writeHeader(200, {"Content-Type": "text/html"});
// 		response.write(html);
// 		response.end();
// 	});
// 	server.listen(8000);
// });

//part 2
var htmlFile = 'index.html',
	server = undefined,
	port = process.env.PORT || 8080;

var stats = fs.statSync(htmlFile);
if(!stats.isFile()) {
	console.log("[ERROR] " + htmlFile + " not of type 'file'");
	return;
}

/// Open file and read into buffer; serve over http
fs.open(htmlFile, 'r', function(err, fd) {
	if(err) {
		throw err;
	}

	fs.stat(htmlFile, function(err, stat) {
		if(err == null) {
			console.log("File read success");

			// Create buffer; fs.readFile returns a buffer
			var fileByteSize = getFileSizeInBytes(htmlFile) + 256;
			var buffer = new Buffer(fileByteSize);

			// Read contents of file into created buffer
			fs.read(fd, buffer, 0, buffer.length, 0, function(error, bytesRead) {
				if(error) {
					throw error;
				}

				// Print only read bytes
				if(bytesRead > 0) {
					buffer = buffer.slice(0, bytesRead);
				}

				// Render file contents and serve on http request
				server = http.createServer(function(request, response) {
					response.writeHeader(200, {"Content-Type": "text/html"});
					response.write(buffer.toString('utf-8'));
					response.end();
				});

				server.listen(port);	// Http listen
			});

		} else {
			throw "[ERROR] " + htmlFile + " not found\n";
		}

	});
});

function getFileSizeInBytes(filename) {
	var stats = fs.statSync(filename),
		size = stats['size'];

	return size; 
}