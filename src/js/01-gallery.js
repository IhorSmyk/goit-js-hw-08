import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const galleryRef = document.querySelector('.gallery');

function createGalleryMarkup(items) {
  return items
    .map(
      el =>
        `<a class="gallery__item"
     href="${el.original}">
      <img class="gallery__image"
      src="${el.preview}"
      alt="${el.description}" />
    </a>`
    )
    .join('');
}

galleryRef.innerHTML = createGalleryMarkup(galleryItems);
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

console.log(galleryItems);
