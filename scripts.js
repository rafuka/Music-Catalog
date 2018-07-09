(function() {
	'use strict';

	if (!('indexedDB' in window)) {
		return;
	}

	var idb = window.indexedDB;

	var openReq = idb.open('music-catalog', 1);

	openReq.onsuccess = function(e) {
		var db = e.target.result;
		console.log('database opened!')
		console.log(db);
		var transaction = db.transaction('albums', 'readonly');
		var objStore = transaction.objectStore('albums');

		var getReq = objStore.getAll();

		getReq.onsuccess = function(e) {
			
			var albumsData = e.target.result;
			console.log(albumsData);

			var catalog = document.getElementById('catalog');

			albumsData.forEach(function(albumData) {
				var newAlbum = createAlbumElement(albumData);
				catalog.appendChild(newAlbum);
			});
		};
	};

	openReq.onerror = function(e) {
		console.log(e.target.errorCode);
	};

	// If the database didn't exist, the onupgradeneeded event will be called
	// And the database will be populated with new data.
	openReq.onupgradeneeded = function(e) {
		console.log('database created!');
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
					title: 'Pidgeons tryna steal my money.',
					trackNum: 17,
					date: 1964,
					author: 'Scrutin Martinez',
					imgUrl: './assets/albumcover2.jpeg'
				},
				{
					title: 'Abraham\'s lost flip-flop',
					trackNum: 13,
					date: 1989,
					author: 'The Melting Hipsters',
					imgUrl: './assets/albumcover3.jpeg'
				}
			];

			console.log('adding albums');

			albums.forEach(function(album) {
				objStore.add(album);
				console.log('album added');
			});
		};
	};

	function createAlbumElement(albumData) {
		var divWrap = document.createElement('div');
		var img = document.createElement('img');
		var info = document.createElement('div');
		var infoTitle = document.createElement('h2');
		var infoAuthor = document.createElement('p');

		divWrap.classList.add('album');
		img.classList.add('album__image');
		info.classList.add('album__info');
		infoTitle.classList.add('album__title');
		infoAuthor.classList.add('album__author');

		console.log(infoAuthor);
		infoAuthor.innerHTML = albumData.author;
		infoTitle.innerHTML = albumData.title;

		info.appendChild(infoTitle);
		info.appendChild(infoAuthor);

		img.setAttribute('src', albumData.imgUrl);
		img.setAttribute('title', 'Album Cover');

		divWrap.appendChild(img);
		divWrap.appendChild(info);

		return divWrap;
	}
})();
