// import axios from 'axios';

// const gallery = document.querySelector('.gallery');
// const searchForm = document.querySelector('#search-form');
// searchForm.addEventListener('submit', searchImages);
// let keysWord = null;

// function searchImages(evt) {
//   evt.preventDefault();
//   const { searchQuery } = evt.target;
//   console.dir(searchQuery.value);
//   keysWord = searchQuery.value;

//   fetchUsers(keysWord)
//     .then(data => {
//       console.log(data);
//       renderUserList(data);
//     })
//     .catch(error => console.log(error));
// }

// function fetchUsers(key) {
//   return fetch(
//     `https://pixabay.com/api/?key=32765009-e8a3776ebed1bf95519eebcf0&q=${key}&image_type=photo&pretty=true`
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }

// function renderUserList(users) {
//   const markup = users.hits
//     .map(hits => {
//       return `<div class="photo-card">
//       <img src="${hits.webformatURL}" alt="${hits.tags}" loading="lazy"  width="300"/>
//       <div class="info">
//         <p class="info-item">
//           <b>Likes: ${hits.likes}</b>
//         </p>
//         <p class="info-item">
//           <b>Views: ${hits.views}</b>
//         </p>
//         <p class="info-item">
//           <b> Comments: ${hits.comments}</b>
//         </p>
//         <p class="info-item">
//           <b>Downloads: ${hits.downloads}</b>
//         </p>
//       </div>
//     </div>`;
//     })
//     .join('');
//   //   conssole.log(markup);
//   gallery.innerHTML = markup;
// }

// const fetchPostsBtn = document.querySelector('.btn');
// const userList = document.querySelector('.posts');
// const alertPopup = document.querySelector('.alert');
// let isAlertVisible = false;

// // Controls the group number
// let page = 1;
// // Controls the number of items in the group
// let limit = 5;
// // In our case total number of pages is calculated on frontend
// const totalPages = 100 / limit;

// fetchPostsBtn.addEventListener('click', () => {
//   // Check the end of the collection to display an alert
//   if (page > totalPages) {
//     return toggleAlertPopup();
//   }

//   fetchPosts()
//     .then(posts => {
//       renderPosts(posts);
//       // Increase the group number
//       page += 1;

//       // Replace button text after first request
//       if (page > 1) {
//         fetchPostsBtn.textContent = 'Fetch more posts';
//       }
//     })
//     .catch(error => console.log(error));
// });

// function fetchPosts() {
//   const params = new URLSearchParams({
//     _limit: limit,
//     _page: page,
//   });

//   return fetch(`https://jsonplaceholder.typicode.com/posts?${params}`).then(
//     response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     }
//   );
// }

// function renderPosts(posts) {
//   const markup = posts
//     .map(({ id, title, body, userId }) => {
//       return `<li>
//           <h2 class="post-title">${title.slice(0, 30)}</h2>
//           <p><b>Post id</b>: ${id}</p>
//           <p><b>Author id</b>: ${userId}</p>
//           <p class="post-body">${body}</p>
//         </li>`;
//     })
//     .join('');
//   userList.insertAdjacentHTML('beforeend', markup);
// }

// function toggleAlertPopup() {
//   if (isAlertVisible) {
//     return;
//   }
//   isAlertVisible = true;
//   alertPopup.classList.add('is-visible');
//   setTimeout(() => {
//     alertPopup.classList.remove('is-visible');
//     isAlertVisible = false;
//   }, 3000);
// }

const murkup = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<a class="gallery__item" href="${original}">
      <img class="gallery__image" src="${preview}"  alt="${description}"/>
    </a>
`
  )
  .join('');

gallery.insertAdjacentHTML('beforeend', murkup);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
