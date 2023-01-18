// фунція яка рообить запит на сервер
// функція яка робить розітку на підставі даних отриманих з сервера
// функія пагінації
// фунція дамальовк нових зображень

import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

searchForm.addEventListener('submit', onSearch);
loadMore.addEventListener('click', onLoadMore);

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32765009-e8a3776ebed1bf95519eebcf0';

let page = 1;
let searchImg = '';

async function onSearch(evt) {
  evt.preventDefault();

  searchImg = evt.target.searchQuery.value;
  gallery.innerHTML = '';
  page = 1;
  await getImages(searchImg);
  page += 1;
  // setTimeout();
}

function onLoadMore(evt) {
  evt.preventDefault();

  LoadMore(searchImg);
  page += 1;
  // setTimeout();
}

async function getImages(img) {
  console.log(img);
  try {
    const response = await axios.get(`${BASE_URL}?q=${img}`, {
      params: {
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: page,
      },
    });

    getMurkup(response.data.hits);
  } catch (error) {
    console.error(error);
  }
}

function getMurkup(err) {
  const murkup = err
    .map(
      ({ largeImageURL, webformatURL, likes, views, comments, downloads }) => {
        return `
      
      <div class="photo-card">
      <a href="${largeImageURL}"><img src="${webformatURL}" alt="" title=""/>
      <a href="images/image2.jpg"><img src="images/thumbs/thumb2.jpg" alt="" title="Beautiful Image"/></a>
    </a>
      <div class="info">
        <p class="info-item">
          <b>Likes: ${likes}</b>
        </p>
        <p class="info-item">
          <b>Views: ${views}</b>
        </p>
        <p class="info-item">
          <b>Comments: ${comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads: ${downloads}</b>
        </p>
      </div>
    </div>
    
      
   
    `;
      }
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', murkup);
  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}

function LoadMore(img) {
  getImages(img);
}
