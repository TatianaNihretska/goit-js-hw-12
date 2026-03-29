// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const lightbox = new SimpleLightbox(".gallery a");


 export function createGallery(images){
    const markup = images
    .map(
      image => 
   `<li class="gallery-item">
      <a class="gallery-link" href="${image.largeImageURL}">
      <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}" />
      </a>
    <div class="gallery-description">
    <p>Likes ${image.likes}</p>
    <p>Views ${image.views}</p>
    <p>Comments ${image.comments}</p>
    <p>Downloads ${image.downloads}</p>
    </div>
    </li>`
    ).join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
 };


 export function clearGallery() {
  gallery.innerHTML = '';
}

const loader = document.querySelector(".loader");
const loadB = document.querySelector('.load-button')
export function showLoader() {
  loader.classList.add("is-visible");
};

export function hideLoader() {
  loader.classList.remove("is-visible");
};

 export function showLoadMoreButton(){
loadB.classList.add("is-visible");
};
 export function hideLoadMoreButton(){
loadB.classList.remove("is-visible");
};