import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const lightbox = new SimpleLightbox('.gallery a', {});
function renderImages(images, append = false) {
  const gallery = document.querySelector('.gallery');

  if (!append) {
    gallery.innerHTML = '';
  }

  images.forEach(image => {
    const card = document.createElement('div');
    card.classList.add('card');

    const a = document.createElement('a');
    a.href = image.largeImageURL;
    a.setAttribute('data-lightbox', 'gallery');

    const img = document.createElement('img');
    img.src = image.webformatURL;
    img.alt = image.tags;

    const likes = document.createElement('span');
    likes.textContent = `Likes: ${image.likes}`;

    const views = document.createElement('span');
    views.textContent = `Views: ${image.views}`;

    const comments = document.createElement('span');
    comments.textContent = `Comments: ${image.comments}`;

    const downloads = document.createElement('span');
    downloads.textContent = `Downloads: ${image.downloads}`;

    a.appendChild(img);
    card.appendChild(a);
    card.appendChild(likes);
    card.appendChild(views);
    card.appendChild(comments);
    card.appendChild(downloads);

    gallery.appendChild(card);
  });

  lightbox.refresh();
}

function showMessage(message, type = 'error') {
  iziToast[type]({
    title: '',
    message: message,
    position: 'topRight',
  });
}

function addLoader() {
  const loader = document.querySelector('.loader');
  loader.textContent = 'Loading...';
  loader.classList.remove('hidden');
}

function removeLoader() {
  const loader = document.querySelector('.loader');
  loader.classList.add('hidden');
}

export { renderImages, showMessage, addLoader, removeLoader };
