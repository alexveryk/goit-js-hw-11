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

function onSearch(evt) {
  evt.preventDefault();

  searchImg = evt.target.searchQuery.value;
  if (!searchImg) {
    Notiflix.Notify.warning(
      'The input field is empty, enter the value for the search'
    );
  } else {
    gallery.innerHTML = '';
    page = 1;
    getImages(searchImg);
    page += 1;
  }
}

function onLoadMore(evt) {
  evt.preventDefault();

  LoadMore(searchImg);
  page += 1;
  // setTimeout();
}

async function getImages(img) {
  console.log(img);
  const perPage = 40;

  try {
    const response = await axios.get(`${BASE_URL}?q=${img}`, {
      params: {
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: perPage,
        page: page,
      },
    });

    let totalHits = response.data.totalHits;

    let endPage = totalPages(totalHits, perPage);

    if (page > endPage && page > 2) {
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      setTimeout(() => {
        loadMore.classList.add('is-hidden');
      }, 1500);
    }

    getMurkup(response.data.hits);

    const responseRequest = response.data.hits;
    LoadMoreBtn(responseRequest);
  } catch (error) {
    console.error(error);
  }
}

function getMurkup(err) {
  const murkup = err
    .map(
      ({
        largeImageURL,
        webformatURL,
        likes,
        views,
        comments,
        downloads,
        tags,
      }) => {
        return `  
      
      <div class="photo-card">
      <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" title=""/>
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

function LoadMoreBtn(res) {
  if (!res.length) {
    return Notiflix.Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );

    loadMore.classList.add('is-hidden');
  } else {
    setTimeout(() => {
      loadMore.classList.remove('is-hidden');
    }, 1000);
  }
}

function totalPages(elements, elemOnPage) {
  let total = Math.round(elements / elemOnPage);
  console.log(total);
  return total;
}
