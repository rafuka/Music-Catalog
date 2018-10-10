import app from './app.js';

app();

(function() {
	'use strict';

	/*if (!('indexedDB' in window)) {
		return;
	}*/

	/*const idb = window.indexedDB;

	let openReq = idb.open('music-catalog', 1);

	openReq.onsuccess = function(e) {
		let db = e.target.result;
		let transaction = db.transaction('albums', 'readonly');
		let objStore = transaction.objectStore('albums');

		let getReq = objStore.getAll();

		getReq.onsuccess = function(e) {

			let albumsData = e.target.result;
			let catalog = document.getElementById('albums-list');

			albumsData.forEach(albumData => {
				let newAlbum = createAlbumElement(albumData);
				catalog.appendChild(newAlbum);
			});

			TweenMax.staggerFrom('.album', 1, { scale: 0, delay: 3 }, .3);
		};
	};*/

	/*openReq.onerror = function(e) {
		console.log(e.target.errorCode);
	};

	// If the database didn't exist, the onupgradeneeded event will be called
	// And the database will be populated with new placeholder data.
	openReq.onupgradeneeded = function(e) {
		var db = e.target.result;
		var objStore = db.createObjectStore('albums', { keyPath: 'id', autoIncrement: true });

		objStore.transaction.oncomplete = function(e) {
			var transaction = db.transaction('albums', 'readwrite');
			var objStore = transaction.objectStore('albums');

			// create some dummy data.
			var albums = [
				{
					title: 'Misterious Stuffy Bugs',
					trackNum: 13,
					date: 1989,
					author: 'Winnie McGranny',
					imgUrl: './assets/albumcover1.jpeg'
				},
				{
					title: 'Pidgeons tryna steal my money',
					trackNum: 17,
					date: 1964,
					author: 'Scrutin Martinez',
					imgUrl: './assets/albumcover2.jpeg'
				},
				{
					title: 'Abraham\'s lost flip-flop',
					trackNum: 9,
					date: 2006,
					author: 'The Melting Hipsters',
					imgUrl: './assets/albumcover3.jpeg'
				},
				{
					title: 'Grandma\'s Bass Drop',
					trackNum: 24,
					date: 1964,
					author: 'Winnie McGranny',
					imgUrl: 'https://placeimg.com/300/300/people'
				},
				{
					title: 'Pidgeons tryna steal my money',
					trackNum: 17,
					date: 1964,
					author: 'Scrutin Martinez',
					imgUrl: 'https://placeimg.com/300/300/tech'
				},
				{
					title: 'Abraham\'s lost flip-flop',
					trackNum: 13,
					date: 1989,
					author: 'The Melting Hipsters',
					imgUrl: 'https://placeimg.com/300/300/animals'
				}
			];

			albums.forEach(album => objStore.add(album));
		};
	};*/


	var addNewBtn = document.getElementById('add-new');

	addNewBtn.addEventListener('click', function(e) {
		console.log('click!');
	});

})();
