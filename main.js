const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const body = document.querySelector('body');
const overflow = document.querySelector('.overflow');

burger.addEventListener('click', openBurger);
document.addEventListener('click', closeBurger);

function openBurger () {
    burger.classList.toggle('open');
    nav.classList.toggle('open');
    body.classList.toggle('no-scroll');
    overflow.classList.toggle('show');
}

function closeBurger (evt) {
    if (evt.target.closest('.nav__item') || evt.target.closest('.overflow')) {
        burger.classList.remove('open');
        nav.classList.remove('open');
        body.classList.remove('no-scroll');
        overflow.classList.remove('show');
    }
}

//--------------------------------modal----------------------//
const petsCard = document.querySelector('.swiper__content');
const modalWidnow = document.querySelector('.modal-window');
const swiperContent = document.querySelector('.swiper__content');

function getData () {
    let xhr = new XMLHttpRequest();
    const url = './pets.json';
    xhr.open('GET', url, false);
    try {
        xhr.send();
        if (xhr.status != 200) {
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        } else {
            return xhr.response
        }
    } catch(err) {
        alert("нет данных от сервера")
    }
}
console.log(JSON.parse(getData ()))
function createModalWindow (whatName) {
    let data = JSON.parse(getData ());
    let whatIndex = data.filter((x, i, arr) => {
        if (x.name === whatName) {
            return arr[i];
        }
    })

    let html = `
    <div class="modal-wrapper">
        <div class="modal">
            <div class="modal__img">
                <img src="${whatIndex[0].img}" width="500" height="500" alt="${whatIndex[0].name}">
            </div>
            <div class="modal__content">
                <p class="modal__title">${whatIndex[0].name}</p>
                <p class="modal__breed">${whatIndex[0].type} - ${whatIndex[0].breed}</p>
                <p class="modal__description">${whatIndex[0].description}</p>
                <ul class="modal__items">
                    <li class="modal__item">
                        <span class="modal__item-type"><b>Age:</b> ${whatIndex[0].age}</span>
                    </li>
                    <li class="modal__item">
                        <span class="modal__item-type"><b>Inoculations:</b> ${whatIndex[0].inoculations}</span>
                    </li>
                    <li class="modal__item">
                        <span class="modal__item-type"><b>Diseases:</b> ${whatIndex[0].diseases}</span>
                    </li>
                    <li class="modal__item">
                        <span class="modal__item-type"><b>Parasites:</b>  ${whatIndex[0].parasites}</span>
                    </li>
                </ul>
            </div>
            <span class="modal__btn-close"></span>
        </div>
    </div>`
    
    modalWidnow.insertAdjacentHTML("afterbegin", html);
}

petsCard.onclick = function (evt) {
    if (evt.target.closest('.swiper__content-block')) {
        let whatName = evt.target.closest('.swiper__content-block').children[1].textContent;
        createModalWindow (whatName);
        modalWidnow.classList.toggle('open');
        body.classList.toggle('no-scroll');
    }
}
modalWidnow.addEventListener('click', closeModal);

function closeModal (evt) {
    if (evt.target.closest('.modal__btn-close') ) {
        modalWidnow.classList.remove('open');
        body.classList.remove('no-scroll');
    }
    if (!evt.target.closest('.modal')) {
        modalWidnow.classList.remove('open');
        body.classList.remove('no-scroll');
    }
}

//--------------------------------slider----------------------//
if (location.pathname === "/") {
    function getDataCardForSlider () {
        let xhr = new XMLHttpRequest();
        const url = './pets.json';
        xhr.open('GET', url, false);
        try {
            xhr.send();
            if (xhr.status != 200) {
                alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
            } else {
                return xhr.response
            }
        } catch(err) {
            alert("нет данных от сервера")
        }
    }

    function getCard () {
        let data = JSON.parse(getData());
        const result = [];

        data.forEach((card, index) => {
            result.push(`
                    <div class="swiper__content-block" id="${index}">
                        <div class="swiper__content-block-img">
                            <img src="${card.img}" alt="${card.name}" width="270" height="270">
                        </div>
                        <h3 class="swiper__content-block-title">${card.name}</h3>
                        <button class="swiper__content-block-btn">Learn more</button>
                    </div>
                `)
        })
        return result;
    }

    const sliderContentActive = document.querySelector('.slider__content-slide--active');
    const sliderContentLeft = document.querySelector('.slider__content-slide--left');
    const sliderContentRight = document.querySelector('.slider__content-slide--right');
    const slider = document.querySelector('.slider');
    const sliderContent = document.querySelector('.slider__content');
    const btnNext = document.querySelector('.swiper__btn-next');
    const btnPrev = document.querySelector('.swiper__btn-prev');

    const noSortArr = getCard();
    const arrPets = getCard().sort(() => Math.random() -0.5);
    
    window.addEventListener('resize', generateCard);

    let arrEmpty = [];

    generateCard ();

    function generateCard () {
        sliderContentActive.innerHTML = '';
        sliderContentRight.innerHTML = '';
        sliderContentLeft.innerHTML = '';
        sliderContent.style.transform = `translateX(-${slider.clientWidth}px)`;
        if (window.innerWidth > 1000) {
            sliderContentLeft.insertAdjacentHTML('afterbegin', arrPets[0]);
            sliderContentLeft.insertAdjacentHTML('afterbegin', arrPets[1]);
            sliderContentLeft.insertAdjacentHTML('afterbegin', arrPets[2]);
            sliderContentActive.insertAdjacentHTML('afterbegin', arrPets[3]);
            sliderContentActive.insertAdjacentHTML('afterbegin', arrPets[4]);
            sliderContentActive.insertAdjacentHTML('afterbegin', arrPets[5]);
            sliderContentRight.insertAdjacentHTML('afterbegin', arrPets[6]);
            sliderContentRight.insertAdjacentHTML('afterbegin', arrPets[7]);
            sliderContentRight.insertAdjacentHTML('afterbegin', arrPets[0]);
            arrEmpty.length = 0;
            arrEmpty.push(+sliderContentActive.children[0].id, +sliderContentActive.children[1].id, +sliderContentActive.children[2].id);
        } else if (window.innerWidth < 1000 && window.innerWidth > 720 ) {
            sliderContentLeft.insertAdjacentHTML('afterbegin', arrPets[0]);
            sliderContentLeft.insertAdjacentHTML('afterbegin', arrPets[1]);
            sliderContentActive.insertAdjacentHTML('afterbegin', arrPets[2]);
            sliderContentActive.insertAdjacentHTML('afterbegin', arrPets[3]);
            sliderContentRight.insertAdjacentHTML('afterbegin', arrPets[4]);
            sliderContentRight.insertAdjacentHTML('afterbegin', arrPets[5]);
            arrEmpty.length = 0;
            arrEmpty.push(+sliderContentActive.children[0].id, +sliderContentActive.children[1].id);
        } else {
            sliderContentLeft.insertAdjacentHTML('afterbegin', arrPets[0]);
            sliderContentActive.insertAdjacentHTML('afterbegin', arrPets[1]);
            sliderContentRight.insertAdjacentHTML('afterbegin', arrPets[2]);
            arrEmpty.length = 0;
            arrEmpty.push(+sliderContentActive.children[0].id);
        }
    }

    btnPrev.addEventListener('click', sliderPrev);
    btnNext.addEventListener('click', sliderNext);

    let positionSliderNow = 0;
    let arrAllDigit = [0,1,2,3,4,5,6,7];
    let newArrElementActive = [];

    function sliderNext () {
        if (window.innerWidth > 1000) {
            sliderContentLeft.innerHTML = sliderContentActive.innerHTML;
            sliderContentActive.innerHTML = sliderContentRight.innerHTML;
            arrEmpty.length = 0;
            arrEmpty.push(+sliderContentRight.children[0].id, +sliderContentRight.children[1].id, +sliderContentRight.children[2].id);
            sliderContentRight.innerHTML ='';
            newArrElementActive.length = 0;
            arrAllDigit.forEach(x => {
                if (!arrEmpty.includes(x)){
                    newArrElementActive.push(x);
                }
            })
            let actialVal = newArrElementActive.sort(() => Math.random() -0.5).slice(0,3);
            arrEmpty.length = 0;
            arrEmpty.push(actialVal[0],actialVal[1],actialVal[2]);
            sliderContentRight.insertAdjacentHTML('afterbegin', noSortArr[actialVal[0]]);
            sliderContentRight.insertAdjacentHTML('afterbegin', noSortArr[actialVal[1]]);
            sliderContentRight.insertAdjacentHTML('afterbegin', noSortArr[actialVal[2]]);
        } else if (window.innerWidth < 1000 && window.innerWidth > 720 ) {
            sliderContentLeft.innerHTML = sliderContentActive.innerHTML;
            sliderContentActive.innerHTML = sliderContentRight.innerHTML;
            arrEmpty.length = 0;
            arrEmpty.push(+sliderContentRight.children[0].id, +sliderContentRight.children[1].id);
            sliderContentRight.innerHTML ='';
            newArrElementActive.length = 0;
            arrAllDigit.forEach(x => {
                if (!arrEmpty.includes(x)){
                    newArrElementActive.push(x);
                }
            })
            let actialVal = newArrElementActive.sort(() => Math.random() -0.5).slice(0,2);
            arrEmpty.length = 0;
            arrEmpty.push(actialVal[0],actialVal[1]);
            sliderContentRight.insertAdjacentHTML('afterbegin', noSortArr[actialVal[0]]);
            sliderContentRight.insertAdjacentHTML('afterbegin', noSortArr[actialVal[1]]);
        } else {
            sliderContentLeft.innerHTML = sliderContentActive.innerHTML;
            sliderContentActive.innerHTML = sliderContentRight.innerHTML;
            arrEmpty.length = 0;
            arrEmpty.push(+sliderContentRight.children[0].id);
            sliderContentRight.innerHTML ='';
            newArrElementActive.length = 0;
            arrAllDigit.forEach(x => {
                if (!arrEmpty.includes(x)){
                    newArrElementActive.push(x);
                }
            })
            let actialVal = newArrElementActive.sort(() => Math.random() -0.5).slice(0,1);
            arrEmpty.length = 0;
            arrEmpty.push(actialVal[0]);
            sliderContentRight.insertAdjacentHTML('afterbegin', noSortArr[actialVal[0]]);
        }
        positionSliderNow = +sliderContent.style.transform.replace('translateX(','').replace('px)','');
        sliderContent.style.transform = `translateX(${positionSliderNow - slider.clientWidth}px)`;
        btnNext.removeEventListener('click', sliderNext);
    }

    function sliderPrev () {
        positionSliderNow = +sliderContent.style.transform.replace('translateX(','').replace('px)','');
        sliderContent.style.transform = `translateX(${positionSliderNow + slider.clientWidth}px)`;
        if (window.innerWidth > 1000) {
            sliderContentRight.innerHTML = sliderContentActive.innerHTML;
            sliderContentActive.innerHTML = sliderContentLeft.innerHTML;
            arrEmpty.length = 0;
            arrEmpty.push(+sliderContentLeft.children[0].id, +sliderContentLeft.children[1].id, +sliderContentLeft.children[2].id);
            sliderContentLeft.innerHTML ='';
            newArrElementActive.length = 0;
            arrAllDigit.forEach(x => {
                if (!arrEmpty.includes(x)){
                    newArrElementActive.push(x);
                }
            })
            let actialVal = newArrElementActive.sort(() => Math.random() -0.5).slice(0,3);
            arrEmpty.length = 0;
            arrEmpty.push(actialVal[0],actialVal[1],actialVal[2]);
            sliderContentLeft.insertAdjacentHTML('afterbegin', noSortArr[actialVal[0]]);
            sliderContentLeft.insertAdjacentHTML('afterbegin', noSortArr[actialVal[1]]);
            sliderContentLeft.insertAdjacentHTML('afterbegin', noSortArr[actialVal[2]]);
        } else if (window.innerWidth < 1000 && window.innerWidth > 720 ) {
            sliderContentRight.innerHTML = sliderContentActive.innerHTML;
            sliderContentActive.innerHTML = sliderContentLeft.innerHTML;
            arrEmpty.length = 0;
            arrEmpty.push(+sliderContentLeft.children[0].id, +sliderContentLeft.children[1].id);
            sliderContentLeft.innerHTML ='';
            newArrElementActive.length = 0;
            arrAllDigit.forEach(x => {
                if (!arrEmpty.includes(x)){
                    newArrElementActive.push(x);
                }
            })
            let actialVal = newArrElementActive.sort(() => Math.random() -0.5).slice(0,2);
            arrEmpty.length = 0;
            arrEmpty.push(actialVal[0],actialVal[1]);
            sliderContentLeft.insertAdjacentHTML('afterbegin', noSortArr[actialVal[0]]);
            sliderContentLeft.insertAdjacentHTML('afterbegin', noSortArr[actialVal[1]]);
        } else {
            sliderContentRight.innerHTML = sliderContentActive.innerHTML;
            sliderContentActive.innerHTML = sliderContentLeft.innerHTML;
            arrEmpty.length = 0;
            arrEmpty.push(+sliderContentLeft.children[0].id);
            sliderContentLeft.innerHTML ='';
            newArrElementActive.length = 0;
            arrAllDigit.forEach(x => {
                if (!arrEmpty.includes(x)){
                    newArrElementActive.push(x);
                }
            })
            let actialVal = newArrElementActive.sort(() => Math.random() -0.5).slice(0,1);
            arrEmpty.length = 0;
            arrEmpty.push(actialVal[0]);
            sliderContentLeft.insertAdjacentHTML('afterbegin', noSortArr[actialVal[0]]);
        }

        btnPrev.removeEventListener('click', sliderPrev);
    }

    sliderContent.addEventListener('transitionend', () => {
        sliderContent.classList.add('no-transition');
        sliderContent.style.transform = `translateX(-${slider.clientWidth}px)`;
        setTimeout(() =>{sliderContent.classList.remove('no-transition')}, 0);

        btnPrev.addEventListener('click', sliderPrev);
        btnNext.addEventListener('click', sliderNext);
    })
}

//--------------------------------pagination----------------------//
if (location.pathname === "/page/our-pets.html") {
    function getData () {
        let xhr = new XMLHttpRequest();
        const url = './pets.json';
        xhr.open('GET', url, false);
        try {
            xhr.send();
            if (xhr.status != 200) {
                alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
            } else {
                return xhr.response
            }
        } catch(err) {
            alert("нет данных от сервера")
        }
    }
    
    function createCardPagination() {
        let data = JSON.parse(getData());
        const arrCard1 = [];
        const arrCard2 = [];
        const arrCard3 = [];
        const result = [];
        let count = 0;
        data.forEach(card => {
            count++;
            if (count <=3) {
                    arrCard1.push(`
                    <div class="swiper__content-block">
                        <div class="swiper__content-block-img">
                            <img src="${card.img}" alt="pets-katrine" width="270" height="270">
                        </div>
                        <h3 class="swiper__content-block-title">${card.name}</h3>
                        <button class="swiper__content-block-btn">Learn more</button>
                    </div>
                `)
            } else if (count > 3 && count <= 6) {
                    arrCard2.push(`
                    <div class="swiper__content-block">
                        <div class="swiper__content-block-img">
                            <img src="${card.img}" alt="pets-katrine" width="270" height="270">
                        </div>
                        <h3 class="swiper__content-block-title">${card.name}</h3>
                        <button class="swiper__content-block-btn">Learn more</button>
                    </div>
                `)
            } else {
                arrCard3.push(`
                    <div class="swiper__content-block">
                        <div class="swiper__content-block-img">
                            <img src="${card.img}" alt="pets-katrine" width="270" height="270">
                        </div>
                        <h3 class="swiper__content-block-title">${card.name}</h3>
                        <button class="swiper__content-block-btn">Learn more</button>
                    </div>
                `)
            }
        })
        for (let i = 0; i < 6; i++) {
            let arrMix1 = arrCard1.sort(() => Math.random() -0.5);
            let arrMix2 = arrCard2.sort(() => Math.random() -0.5);
            let arrMix3 = arrCard3.sort(() => Math.random() -0.5);
            let newAnswer = [...arrMix1, ...arrMix2, ...arrMix3];
            result.push(...newAnswer);
        }
        return result;
    }
    let arrayAllCard = [...createCardPagination()];
    
    const swiperBlock = document.querySelector('.wrapper-pets__content');
    const paginationActive = document.querySelector('.pagination-button--active');
    const paginationPrev = document.querySelector('.swiper__pagination--prev');
    const paginationNext = document.querySelector('.swiper__pagination--next');
    const paginationLast = document.querySelector('.swiper__pagination--last');
    const paginationFirst = document.querySelector('.swiper__pagination--first');
    
    let page = 1;
    let lastPage = 0;
    let firstCard = 0;
    let lastCard = 0;
    
    if (window.innerWidth > 1000) {
        lastCard = 8;
    } else if (window.innerWidth < 1000 && window.innerWidth > 720 ) {
        lastCard = 6;
    } else {
        lastCard = 3;
    }
    function setCard () {
        swiperBlock.innerHTML = '';
        if (window.innerWidth > 1000) {
            page = 1;
            paginationActive.textContent = `${page}`;
            lastPage = 6;
            firstCard = 0;
            lastCard = 8 * page;
            arrayAllCard.slice(0,8).forEach(oneCard => {
                swiperBlock.insertAdjacentHTML('afterbegin', oneCard);
            })
        } else if (window.innerWidth < 1000 && window.innerWidth > 720 ) {
            page = 1;
            paginationActive.textContent = `${page}`;
            lastPage = 8;
            firstCard = 0;
            lastCard = 8 * page;
            arrayAllCard.slice(0,6).forEach(oneCard => {
                swiperBlock.insertAdjacentHTML('afterbegin', oneCard);
            })
        } else {
            page = 1;
            paginationActive.textContent = `${page}`;
            lastPage = 16;
            firstCard = 0;
            lastCard = 8 * page;
            arrayAllCard.slice(0,3).forEach(oneCard => {
                swiperBlock.insertAdjacentHTML('afterbegin', oneCard);
            })
        }
        paginationPrev.classList.add('pagination-button--disabled');
        paginationFirst.classList.add('pagination-button--disabled');
        paginationLast.classList.remove('pagination-button--disabled');
        paginationNext.classList.remove('pagination-button--disabled');
    }
    setCard()
    window.addEventListener('resize', setCard);
    
    paginationNext.addEventListener('click', painationNextSlide);
    paginationLast.addEventListener('click', painationLastSlide);
    paginationPrev.addEventListener('click', painationPrevSlide);
    paginationFirst.addEventListener('click', painationFirstSlide);
    
    function painationNextSlide () {
        if (page !== lastPage) {
            paginationActive.textContent = `${++page}`;
            swiperBlock.innerHTML = '';
            if (window.innerWidth > 1000) {
                lastPage = 6;
                firstCard = 8 * (page - 1);
                lastCard = 8 * page;
                arrayAllCard.slice(firstCard, lastCard).forEach(oneCard => {
                    swiperBlock.insertAdjacentHTML('afterbegin', oneCard);
                })
            } else if (window.innerWidth < 1000 && window.innerWidth > 720 ) {
                lastPage = 8;
                firstCard = 6 * (page - 1);
                lastCard = 6 * page;
                arrayAllCard.slice(firstCard, lastCard).forEach(oneCard => {
                    swiperBlock.insertAdjacentHTML('afterbegin', oneCard);
                })
            } else {
                lastPage = 16;
                firstCard = 3 * (page - 1);
                lastCard = 3 * page;
                arrayAllCard.slice(firstCard, lastCard).forEach(oneCard => {
                    swiperBlock.insertAdjacentHTML('afterbegin', oneCard);
                })
            }
            if (page !== 1) {
                paginationPrev.classList.remove('pagination-button--disabled');
                paginationFirst.classList.remove('pagination-button--disabled');
            }
            if (page === lastPage) {
                paginationLast.classList.add('pagination-button--disabled');
                paginationNext.classList.add('pagination-button--disabled');
            }
        console.log(firstCard, lastCard)
        }
    }
    function painationLastSlide () {
        if (page !== lastPage) {
            page = lastPage;
            paginationActive.textContent = `${page}`;
            swiperBlock.innerHTML = '';
            if (window.innerWidth > 1000) {
                lastPage = 6;
                firstCard = 8 * (page - 1);
                lastCard = 8 * page;
                arrayAllCard.slice(firstCard, lastCard).forEach(oneCard => {
                    swiperBlock.insertAdjacentHTML('afterbegin', oneCard);
                })
            } else if (window.innerWidth < 1000 && window.innerWidth > 720 ) {
                lastPage = 8;
                firstCard = 6 * (page - 1);
                lastCard = 6 * page;
                arrayAllCard.slice(firstCard, lastCard).forEach(oneCard => {
                    swiperBlock.insertAdjacentHTML('afterbegin', oneCard);
                })
            } else {
                lastPage = 16;
                firstCard = 3 * (page - 1);
                lastCard = 3 * page;
                arrayAllCard.slice(firstCard, lastCard).forEach(oneCard => {
                    swiperBlock.insertAdjacentHTML('afterbegin', oneCard);
                })
            }
            if (page === lastPage) {
                paginationLast.classList.add('pagination-button--disabled');
                paginationNext.classList.add('pagination-button--disabled');
                paginationPrev.classList.remove('pagination-button--disabled');
                paginationFirst.classList.remove('pagination-button--disabled');
            }
            console.log(firstCard, lastCard)
        }
    }
    function painationPrevSlide () {
        if (page > 1) {
            paginationActive.textContent = `${--page}`;
            swiperBlock.innerHTML = '';
            if (window.innerWidth > 1000) {
                lastPage = 6;
                firstCard = 8 * (page - 1);
                lastCard = 8 * page;
                arrayAllCard.slice(firstCard, lastCard).forEach(oneCard => {
                    swiperBlock.insertAdjacentHTML('afterbegin', oneCard);
                })
            } else if (window.innerWidth < 1000 && window.innerWidth > 720 ) {
                lastPage = 8;
                firstCard = 6 * (page - 1);
                lastCard = 6 * page;
                arrayAllCard.slice(firstCard, lastCard).forEach(oneCard => {
                    swiperBlock.insertAdjacentHTML('afterbegin', oneCard);
                })
            } else {
                lastPage = 16;
                firstCard = 3 * (page - 1);
                lastCard = 3 * page;
                arrayAllCard.slice(firstCard, lastCard).forEach(oneCard => {
                    swiperBlock.insertAdjacentHTML('afterbegin', oneCard);
                })
            }
            if (page === 1) {
                paginationPrev.classList.add('pagination-button--disabled');
                paginationFirst.classList.add('pagination-button--disabled');
            }
            paginationLast.classList.remove('pagination-button--disabled');
            paginationNext.classList.remove('pagination-button--disabled');
        console.log(firstCard, lastCard)
        }
    }
    function painationFirstSlide () {
        if (page > 1) {
            page = 1;
            paginationActive.textContent = `${page}`;
            if (page === 1) {
                paginationPrev.classList.add('pagination-button--disabled');
                paginationFirst.classList.add('pagination-button--disabled');
            }
            setCard ();
            paginationLast.classList.remove('pagination-button--disabled');
            paginationNext.classList.remove('pagination-button--disabled');
        }
    }
}

