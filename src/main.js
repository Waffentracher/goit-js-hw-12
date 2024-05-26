import { fetchImages, IMAGES_PER_PAGE } from './js/pixabay-api.js';
import {
  renderImages,
  showMessage,
  addLoader,
  removeLoader,
} from './js/render-functions.js';

let page = 1;
let queryValue = '';
let totalHits = 0;

window.addEventListener('DOMContentLoaded', event => {
  const form = document.querySelector('form');
  form.addEventListener('submit', handleSubmit);

  const loadMoreButton = document.querySelector('.load-more-button');
  loadMoreButton.addEventListener('click', handleLoadMore);
});

async function handleSubmit(event) {
  event.preventDefault();

  page = 1;
  queryValue = event.target.elements.query.value.trim();

  if (!queryValue) {
    showMessage('Please enter a search query.', 'warning');
    return;
  }

  addLoader();
  clearGallery();

  try {
    const { images, totalHits: fetchedTotalHits } = await fetchImages(
      queryValue,
      page
    );
    totalHits = fetchedTotalHits;

    if (images.length === 0) {
      showMessage(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      document.querySelector('.load-more-button').style.display = 'none';
      return;
    }

    renderImages(images);
    if (
      images.length < IMAGES_PER_PAGE ||
      page * IMAGES_PER_PAGE >= totalHits
    ) {
      document.querySelector('.load-more-button').style.display = 'none';
      showMessage(
        "We're sorry, but you've reached the end of search results.",
        'info'
      );
    } else {
      document.querySelector('.load-more-button').style.display = 'block';
    }
  } catch (error) {
    console.error('Error processing search:', error);
    showMessage(
      'An error occurred while processing your search. Please try again later.'
    );
  } finally {
    removeLoader();
  }
}

async function handleLoadMore() {
  page++;
  addLoader();

  try {
    const { images } = await fetchImages(queryValue, page);

    if (images.length === 0 || page * IMAGES_PER_PAGE >= totalHits) {
      showMessage(
        "We're sorry, but you've reached the end of search results.",
        'info'
      );
      document.querySelector('.load-more-button').style.display = 'none';
      return;
    }

    renderImages(images, true);

    const cardHeight = document
      .querySelector('.card')
      .getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    console.error('Error loading more images:', error);
    showMessage(
      'An error occurred while loading more images. Please try again later.'
    );
  } finally {
    removeLoader();
  }
}

function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}
