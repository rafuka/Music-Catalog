

// Custom Errors

function NoIndexedDB(message) {
	this.message = message;
}

NoIndexedDB.prototype = new Error();
NoIndexedDB.prototype.name = 'NoIndexedDB';

function FailedToOpenDB(message) {
	this.message = message;
}

FailedToOpenDB.prototype = new Error();
FailedToOpenDB.prototype.name = 'FailedToOpenDB';


// Connect to Indexed DB

function getIndexedDB() {
	if (!('indexedDB' in window)) {
		throw new NoIndexedDB('It seems your browser does not support IndexedDB');
	}

	return new Promise(function(resolve, reject) {
		var openRequest = window.indexedDB.open('MusicCatalog');

		openRequest.onsuccess = function(event) {
			var db = event.target.result;
			resolve(db);
		};

		openRequest.onfailure = function(event) {
			reject(new FailedToOpenDB('Unable to open/create database'));
		};
	});
}

// Set Up app

try {
	getIndexedDB()
	.then(function(db) {
		console.log(db);
	}).catch(function(err) {
		console.error(err.message);
	});
}
catch(err) {
	if (err.name == 'NoIndexedDB') {

	}
	console.error(err.message);
}

// last.fm API KEY: 1fb243b0e9d33f6ee17652a4aaf4d00
