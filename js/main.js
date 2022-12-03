import gsap from 'gsap';
import imagesLoaded from 'imagesloaded';

const openButton = document.querySelector('.content__button__enter');
const closeButton = document.querySelector('.frame__button__menu');

const overlayPath = document.querySelector('.overlay__path');

const contentTitleMain = document.querySelector('.content__title__main');
const contentTitleSub = document.querySelector('.content__title__sub');

const frame = document.querySelector('.frame');

const menuWrapper = document.querySelector('.menu__wrapper');
const menuItems = document.querySelectorAll('.menu__item');

const tilesLineImg = document.querySelectorAll('.tiles__line__img');

const init = () => {
  const imgLoaded = imagesLoaded(tilesLineImg, { background: true });

  imgLoaded.on('done', () => {
    document.body.classList.remove('loading');
  });
};

init();

const onEnter = () => {
  const tl = gsap.timeline();

  tl.set(overlayPath, {
    attr: { d: 'M 0 100 V 100 Q 50 100 100 100 V 100 z' },
  })
    .to(overlayPath, {
      attr: { d: 'M 0 100 V 50 Q 50 0 100 50 V 100 z' },
      duration: 0.8,
      ease: 'power4.in',
    })
    .to(overlayPath, {
      attr: { d: 'M 0 100 V 0 Q 50 0 100 0 V 100 z' },
      duration: 0.3,
      ease: 'power2',
      onComplete: () => {
        frame.classList.add('menu--open');
        menuWrapper.classList.add('menu--open');
      },
    })
    .to(
      [contentTitleMain, contentTitleSub],
      { y: -200, duration: 0.8, ease: 'power3.in', stagger: 0.05 },
      0.2
    )
    .set(overlayPath, {
      attr: { d: 'M 0 0 V 100 Q 50 100 100 100 V 0 z' },
    })
    .set(menuItems, { opacity: 0, y: 150 })
    .to(overlayPath, {
      attr: { d: 'M 0 0 V 50 Q 50 0 100 50 V 0 z' },
      duration: 0.3,
      ease: 'power2.in',
    })
    .to(overlayPath, {
      attr: { d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z' },
      duration: 0.8,
      ease: 'power4',
    })
    .to(
      menuItems,
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        stagger: 0.05,
        ease: 'power4',
      },
      '>-=1.1'
    );
};

const onLeave = () => {
  const tl = gsap.timeline();

  tl.set(overlayPath, {
    attr: { d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z' },
  })
    .to(
      overlayPath,
      {
        attr: { d: 'M 0 0 V 50 Q 50 100 100 50 V 0 z' },
        duration: 0.8,
        ease: 'power4.in',
      },
      0
    )
    .to(overlayPath, {
      attr: { d: 'M 0 0 V 100 Q 50 100 100 100 V 0 z' },
      duration: 0.3,
      ease: 'power2',
      onComplete: () => {
        frame.classList.remove('menu--open');
        menuWrapper.classList.remove('menu--open');
      },
    })
    .set(overlayPath, {
      attr: { d: 'M 0 100 V 0 Q 50 0 100 0 V 100 z' },
    })
    .to(overlayPath, {
      attr: { d: 'M 0 100 V 50 Q 50 100 100 50 V 100 z' },
      duration: 0.3,
      ease: 'power4.in',
    })
    .to(overlayPath, {
      duration: 0.8,
      ease: 'power4',
      attr: { d: 'M 0 100 V 100 Q 50 100 100 100 V 100 z' },
    })
    .to(
      [contentTitleMain, contentTitleSub],
      { y: 0, duration: 1.1, ease: 'power4', stagger: -0.05 },
      '>-=1.1'
    )
    .to(
      menuItems,
      { opacity: 0, y: 100, duration: 0.8, stagger: -0.05, ease: 'power2.in' },
      0
    );
};

openButton.addEventListener('click', onEnter);

closeButton.addEventListener('click', onLeave);
