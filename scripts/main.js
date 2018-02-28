var DETAIL_IMAGE_SELECTOR = "[data-image-role='target']";
var DETAIL_TITLE_SELECTOR = "[data-image-role='title']";
var THUMBNAIL_LINK_SELECTOR = "[data-image-role='trigger']";

function setDetails(imageUrl, titleText) {
  "use strict";
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  /*detailImage.setAttribute("src", "img/otter3.jpg"); */
  detailImage.setAttribute("src", imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  /* detailTitle.textContent = "You Should Be Dancing"; */
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-url");
}

function titleFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-title");
}

function setDetailsFromThumb(thumbnail) {
  "use strict";
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
  "use strict";
  thumb.addEventListener("click", function(event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
  });
}

function getThumbnailsArray() {
  "use strict";
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function initializeEvents() {
  "use strict";
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
}

initializeEvents();

function imageSlide() {
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  var currentImageDetail = detailImage.getAttribute("src");
  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  var currentImageTitle = detailTitle.textContent;

  var thumbnailsArray = getThumbnailsArray();
  var currentArrayIndex;
  for (var i = 0; i < thumbnailsArray.length; i++) {
    if (thumbnailsArray[i].innerHTML.indexOf(currentImageDetail) != -1) {
      currentArrayIndex = i;
    }
  }
  if (document.activeElement.id == "previous-button") {
    if (currentArrayIndex > 0) {
      var previousImage = thumbnailsArray[currentArrayIndex - 1].getAttribute("data-image-url");
      var previousImageTitle = thumbnailsArray[currentArrayIndex - 1].getAttribute("data-image-title");
      setDetails(previousImage, previousImageTitle);
    }
  } else if (document.activeElement.id == "next-button") {
    if (currentArrayIndex < thumbnailsArray.length - 1) {
      var nextImage = thumbnailsArray[currentArrayIndex + 1].getAttribute("data-image-url");
      var nextImageTitle = thumbnailsArray[currentArrayIndex + 1].getAttribute("data-image-title");
      setDetails(nextImage, nextImageTitle);
    }
  }
}
