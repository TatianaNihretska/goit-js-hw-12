// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
 
const refs ={
user: document.querySelector('.form'),
loadB: document.querySelector('.load-button'),
}

const PER_PAGE = 15;
let query = '';
let page = 1;
let totalHits = 0;

 refs.user.addEventListener('submit',  async e => {
  e.preventDefault();
const formData = new FormData(e.target);
  query = formData.get('search-text').trim();
 
  if (!query) {
    iziToast.error({ message: 'Please enter a search query' });
    return;}
 
  page = 1;
   clearGallery();
  hideLoadMoreButton();
  showLoader();

  try{
     const data = await getImagesByQuery(query,page);
     totalHits = data.totalHits;
     
      if (!data.hits.length) {
      
        iziToast.error({
          message: 'Sorry, there are no images matching your search query.',
          position: 'topRight',
          backgroundColor: '#ef4040',
          messageColor: 'white',
        });
        return;
      }
      createGallery(data.hits);
     
     if (page * PER_PAGE < totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        backgroundColor: '#40afefff',
        messageColor: 'white',
      });
    }

}
    catch (error){
      iziToast.error({
        message: 'Something went wrong. Please try again later.',
        position: 'topRight',
        backgroundColor: '#ef4040',
        messageColor: 'white',
      });
    } finally {hideLoader()}
  });


 refs.loadB.addEventListener('click', async () => {
  page++;
  showLoader();
   hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(query,page);

    createGallery(data.hits);

    scrollPage();

    if (page * PER_PAGE >= totalHits) {
      hideLoadMoreButton();

      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        backgroundColor: '#40afefff',
        messageColor: 'white',
    });
 } else {
      showLoadMoreButton();
    }

  } catch (error){
    iziToast.error({
      message: 'Something went wrong.',
      position: 'topRight',
      backgroundColor: '#ef4040',
      messageColor: 'white',
    });
  } finally {
    hideLoader();
  }
});

 
//!=========================================



function scrollPage() {
   const card = document.querySelector('.gallery-item:last-child');

  if (!card) return;
  const height = card.getBoundingClientRect().height;

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}