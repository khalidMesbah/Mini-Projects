// get and set main information & collecting information
let sliderImages = Array.from(document.querySelectorAll('.slider-container img'));
let numberOfSliderImages = sliderImages.length;
let currentSlideIndex = 1;
let slideNumberEl = document.getElementById("slide-number");
let prevEl = document.getElementById("prev");
let nextEl = document.getElementById("next");
let indicatorsEl = document.getElementById("indicators");

// create indicators list
const indicatorsList = document.createElement('ul');
indicatorsList.setAttribute(`id`, `indicators-ul`);

// create indicator elements based on the number of sliderImages
sliderImages.map((e, i) => {
    const indicatorElement = document.createElement('li');
    indicatorElement.setAttribute(`data-index`, `${i + 1}`);
    indicatorElement.textContent = indicatorElement.getAttribute('data-index');
    indicatorsList.append(indicatorElement);
});
indicatorsEl.append(indicatorsList);
let indicatorsListElements = Array.from(indicatorsList.children);


const currentSlide = (index) => {
    // update slide
    sliderImages.map((img, i) => {
        img.classList.remove("active");
        if (i === index - 1) img.classList.add(`active`);
    });
    // update slide indicator
    indicatorsListElements.map((e, i) => {
        e.classList.remove('active');
        if (i === index - 1) e.classList.add('active');
    });
    // update slide number
    slideNumberEl.textContent = `slide #${index}`;
};
const checkFirstOrLast = (i) => {
    if (i <= 1) prevEl.classList.add(`disabled`);
    else prevEl.classList.remove(`disabled`);
    if (i >= 5) nextEl.classList.add(`disabled`);
    else nextEl.classList.remove(`disabled`);
};

const nextSlide = () => {
    if (nextEl.classList.contains(`disabled`)) return;
    currentSlideIndex++;
    checkFirstOrLast(currentSlideIndex);
    currentSlide(currentSlideIndex);
};
nextEl.onclick = nextSlide;

const prevSlide = () => {
    if (prevEl.classList.contains(`disabled`)) return;
    currentSlideIndex--;
    checkFirstOrLast(currentSlideIndex);
    currentSlide(currentSlideIndex);
};
prevEl.onclick = prevSlide;

indicatorsListElements.map(e => {
    e.onclick = () => {
        checkFirstOrLast(+e.getAttribute('data-index'));
        currentSlide(+e.getAttribute('data-index'));
        currentSlideIndex = +e.getAttribute('data-index');
    };
});

checkFirstOrLast(currentSlideIndex);
currentSlide(currentSlideIndex);

// auto switching slides
let intervalid;
const autoMovingSlides = () => {
    intervalid = setInterval(() => {
        checkFirstOrLast(++currentSlideIndex);
        currentSlide(currentSlideIndex);
        if (currentSlideIndex >= 5) currentSlideIndex = 0;
    }, 1500);
};
autoMovingSlides();
window.onclick = () => {
    clearInterval(intervalid);
    setTimeout(autoMovingSlides, 5000);
};