const imageDiv = document.getElementById('imageDiv');
const count = 30;
const apiKey = `a5UUKtL_u1fIfW5DR8XzxY3fVffy_WcjrJ3gOuGnFpQ`;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
const loader = document.getElementById('loading');

let isDownloaded = false;
let imagesLoaded = 0;
let totalImages = 0;
let imagesArray = [];

async function getImages() {
    try {
        const response = await fetch(apiUrl)
        imagesArray = await response.json();
        console.log(imagesArray)
        displayImages();
    } catch (error) {
    }
}

getImages();

function displayImages() {
    totalImages = imagesArray.length;
    imagesLoaded = 0;
    imagesArray.forEach(image => {
        const item = document.createElement('a');
        setAttributes(item, { href: image.urls.regular });
        const img = document.createElement('img');
        setAttributes(img, { src: image.urls.regular, alt: image.alt_description });
        img.addEventListener('load', imageLoaded);
        item.appendChild(img);
        imageDiv.appendChild(item);
    })
}

function imageLoaded() {
    console.log('Resimler yüklendi');
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        loader.hidden = true;
        isDownloaded = true;
    }
}

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && isDownloaded) {
        getImages();
    }
})