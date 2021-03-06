window.addEventListener('DOMContentLoaded', () => {
    //  Tabs

    const tabsContent = document.querySelectorAll('.tabcontent'),
          tabsButton = document.querySelectorAll('.tabheader__item'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent () {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabsButton.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }
    
    function showTabContent (i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabsButton[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabsButton.forEach((item, i) => {
                if (item == target) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //  Timer

    const timerBlock = document.querySelector('.timer'),
          timerDays = timerBlock.querySelector('#days'),
          timerHours = timerBlock.querySelector('#hours'),
          timerMinutes = timerBlock.querySelector('#minutes'),
          timerSeconds = timerBlock.querySelector('#seconds');

    const myDate = '2021-03-19'; //T22:59:15 GMT+0300
    function getRemainingDate(date) {
        
        const timeLeft = Date.parse(date) - Date.parse(new Date()),

              days = Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
              hours = Math.floor((timeLeft / (1000 * 60 * 60 ) % 24)),
              minutes = Math.floor((timeLeft / (1000 * 60)) % 60),
              seconds = Math.floor((timeLeft / (1000)) % 60);
        // console.log(timeLeft);
        // console.log(days);
        // console.log(hours);
        // console.log(minutes);
        // console.log(seconds);
        
        return {
            'total': timeLeft,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }; 
    }

    function getZero(number) {
        if (number >= 0 && number < 10) {
            return `0${number}`;
        } else {
            return number;
        }
    }

    function setTime(date) {

        const timeInterval = setInterval(timeUpdate, 1000);
        timeUpdate();  //инициализация, для моментального обновления

        function timeUpdate() {

            const getDate = getRemainingDate(date);

            timerDays.innerHTML = getZero(getDate.days);
            timerHours.innerHTML = getZero(getDate.hours);
            timerMinutes.innerHTML = getZero(getDate.minutes);
            timerSeconds.innerHTML = getZero(getDate.seconds);
            
            if (getDate.total <= 0) {
                clearInterval(timeInterval);
            }
        }
        
    }
    setTime(myDate);
    

    // Modal 

    const modalWindow = document.querySelector('.modal'),
          modalTrigger = document.querySelectorAll('[data-modal]'),
          modalClose = document.querySelector('[data-close]');
          

    function showModal() {
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }
    function hideModal() {
        modalWindow.classList.remove('show');
        modalWindow.classList.add('hide');
        document.body.style.overflow = 'scroll';
            
    }

    modalTrigger.forEach((item, i) => {
        item.addEventListener('click', showModal); // showModal передаю как callback
    });

    modalClose.addEventListener('click', hideModal);

    modalWindow.addEventListener('click', (event) => {
        if (event.target === modalWindow) {
            hideModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modalWindow.classList.contains('show')) {
            hideModal();
        }
    });


    const modalTimerId = setTimeout(showModal, 5000);

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // Использование классов для шаблона карточек
    
        class MenuCards {
            constructor(src, alt, title, text, price, parentSelector, ...classes) {
                this.src = src;
                this.
                jalt = alt;
                this.title = title;
                this.text = text;
                this.price = price; 
                this.parent = document.querySelector(parentSelector); //в св-ве this.parent лежит DOM элемент
                this.classes = classes;
                this.transfer = 28;
                this.changeToUAH();
            }

            changeToUAH() {
                this.price = this.price * this.transfer;
            }

            renderCard() {
                const element = document.createElement('div');

                if (this.classes.length === 0) { //установление класса menu__item по умолч.
                    this.element = 'menu__item';
                    element.classList.add(this.element);
                } else {
                    this.classes.forEach(className => element.classList.add(className));
                }

                element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.text}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                `;
                this.parent.append(element);
            }
            
        }

                                    //1 card
        new MenuCards(
            "img/tabs/vegy.jpg",
            "vegy",
            'Меню "Фитнес"',
            'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
            9,
            '.menu .container'
        ).renderCard();

                                        //2 card
        new MenuCards(
            "img/tabs/elite.jpg",
            "elite",
            'Меню “Премиум”',
            'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
            20,
            '.menu .container',
            'menu__item'
        ).renderCard();

                                        //3 card
        new MenuCards(
            "img/tabs/post.jpg",
            "post",
            'Меню "Постное"',
            'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
            15,
            '.menu .container',
            'menu__item'
        ).renderCard();

});