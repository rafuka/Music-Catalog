import TweenLite from 'gsap';

export default function () {

  Vue.component('Album', {
    data() {
      return {}
    },
    props: {
      title: {
        type: String,
        default: () => 'This is the title'
      },
      tracknum: {
        type: Number,
        default: () => 17
      },
      date: {
        type: Number,
        default: () => 1989
      },
      author: {
        type: String,
        default: () => 'Scrutin Martinez'
      },
      imgurl: {
        type: String,
        default: './assets/albumcover1.jpeg'
      }
    },
    created() {
      console.log('album created!');

    },
    mounted() {
      console.log('album mounted!');
      TweenLite.staggerFromTo('.album', .7, {scale: 0, opacity: 0}, {scale: 1, opacity: 1}, .4);
    },
    methods: {

    },
    template:
    `
    <article class="album">
      <img class="album__image" :src="imgurl" title="Album Cover"/>
      <div class="album__info">
        <h2 class="album__title">{{ title }}</h2>
        <p class="album__author">{{ author }}</p>
      </div>
    </article>
    `
  });


  new Vue({
    el: '#music-catalog',
    data: {
      isLoading: true,
      isAddingNew: false,
      albums: [],
      error: null,
      newAlbum: {
        title: '',
        trackNum: 0,
        date: 0,
        author: '',
        imgUrl: './assets/albumcover2.jpeg' // NOTE: this must be changed
      }
    },
    methods: {
      loadAlbums() {
        let vm = this;

        if (!('indexedDB' in window)) { // If there's no database, create dummy data
          console.log('IndexedDB not found! Using dummy data');
          vm.albums = [
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
          vm.isLoading = false;
          return;
        }

        const idb = window.indexedDB;

        let openReq = idb.open('music-catalog', 1);
        let data = [];

         openReq.onsuccess = function(e) {
          let db = e.target.result;
          let transaction = db.transaction('albums', 'readonly');
          let objStore = transaction.objectStore('albums');

          let getReq = objStore.getAll();

          getReq.onsuccess = function(e) {

            data = e.target.result;

            vm.albums = data;
            vm.isLoading = false;
          };
        };

        openReq.onerror = function(e) {
          console.log(e.target.errorCode);
          vm.error = e.target;
        };

        // If the database didn't exist, the onupgradeneeded event will be called
        // And the database will be populated with new placeholder data.
        openReq.onupgradeneeded = function(e) {
          let db = e.target.result;
          let objStore = db.createObjectStore('albums', { keyPath: 'id', autoIncrement: true });

          objStore.transaction.oncomplete = function(e) {
            let transaction = db.transaction('albums', 'readwrite');
            let objStore = transaction.objectStore('albums');

            // create some dummy data.
            data = [
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

            data.forEach(album => objStore.add(album));
          };
        };
      },
      toggleAddNew(e) {
        e.preventDefault();
        this.isAddingNew = !this.isAddingNew;
      },
      addNew(e) {
        e.preventDefault();
        let vm = this;
        vm.albums.push({ ...vm.newAlbum });
      }
    },
    watch: {
      albums: function() {
        console.log('Albums changed!');
      }
    },
    created() {
      console.log('created -----');
      this.loadAlbums();
    },
    mounted() {
      console.log('catalogue mounted!');
    },
  });
}