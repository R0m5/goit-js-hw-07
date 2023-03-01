import { galleryItems } from "./gallery-items.js";
// Change code below this line

const imageContainer = document.querySelector(".gallery");
const imagesMarkup = createImagesMarkup(galleryItems);

imageContainer.insertAdjacentHTML("beforeend", imagesMarkup);
imageContainer.addEventListener("click", onGalleryContainerClick);

function createImagesMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `      
     <div class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
    </a>
    </div>`;
    })
    .join("");
}

function onGalleryContainerClick(event) {
  event.preventDefault();

  const isItemsClick = event.target.nodeName === "IMG";
  if (!isItemsClick) {
    return;
  }

  const currentImgUrl = event.target.dataset.source;

  const instance = basicLightbox.create(
    `<img src = "${currentImgUrl}" width = "auto" height = "auto"/>`,
    {
      onShow: (instance) => {
        document.addEventListener("keydown", onEscKey);
      },
      onClose: (instance) => {
        document.removeEventListener("keydown", onEscKey);
      },
    }
  );
  instance.show();

  function onEscKey(event) {
    if (event.code !== "Escape") {
      return;
    }
    instance.close();
  }
}
console.log(galleryItems);
