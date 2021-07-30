import * as $ from 'jquery';
import popper from 'popper.js';
import bootstrap from 'bootstrap';
import '@scss/main.scss'
import 'owl.carousel'

$(function () {

  $(document).ready(function () {

    //preloader
    setTimeout(function () {
      let preloader = document.body.querySelector('#page-preloader');
      if (preloader != null) {
        if (!preloader.classList.contains('done')) {
          preloader.classList.add('done');
        }
      }
    }, 1000);

    //mobile menu expand
    $('.header').on('click', '.header__nav-toggle', function () {
      let header_menu = $(this).closest('.header').find('.header-menu');
      if ($('.header').hasClass('expand')) {
        header_menu.slideUp(300);
        setTimeout(function () {
          $('.header').removeClass('expand');
        }, 300);
      } else {
        header_menu.slideDown(300);
        $('.header').addClass('expand');
      }
    });

    //upload photo
    $('.custom-file-input').on('change', function () {
      let imageUrl = 'img/photos/ava.jpg';
      $('.profile-photo').css('background-image', 'url(' + imageUrl + ')');
    });

    //custom sliders
    owlInit('.user-list-extra', {
      loop: true,
      dots: true,
      items: 1,
      margin: 17,
      autoWidth: true,
      responsive: {
        320: {
          dots: true,
          items: 2,
          margin: 12
        },
        992: {
          margin: 48
        },
        1200: {
          dots: false,
          items: 4,
          margin: 48
        },
      }
    });
    // owlInitFor('.user-list', 1, 1200, {
    //     loop: false,
    //     dots: false,
    //     items: 1,
    //     margin: 22,
    //     autoWidth: true,
    //     responsive:{
    //         768:{
    //             margin: 22
    //         },
    //         992:{
    //             margin: 22
    //         },
    //         1200:{
    //             margin: 48
    //         },
    //         1500:{
    //             margin: 48
    //         },
    //     }
    // });

    //slider (Profile gallery)
    owlInitProfile('.up-slider');
    owlInit('.user-profile-gallery', {
      loop: false,
      dots: false,
      items: 7,
      margin: 22
    });
    resizeOwlDots('.up-slider');

    //gallery on desktop
    $('.user-profile-gallery').on('click', '.user-profile-gallery__img', function () {
      let url = $(this).attr('src');
      $('.userprofile__img').attr('src', url);
    });

  });

  //resize owl dots to fit them
  function resizeOwlDots(el_class) {
    const slider = document.querySelector(el_class);
    const slides = slider.querySelectorAll('.slide');
    const dots = slider.querySelector('.owl-dots');
    if (slides.length > 7 && slides.length <= 15) {
      dots.classList.add('owl-dots_mini1');
    }
    if (slides.length > 15) {
      dots.classList.add('owl-dots_mini2');
    }
  }

  //init owl carousel for custom screen width
  function owlInitFor(el_class, compare, breakpoint, options) {
    if (compare) {
      if (window.innerWidth > breakpoint) {
        owlInit(el_class, options);
      } else {
        owlDestroy(el_class);
      }
    } else {
      if (window.innerWidth < breakpoint) {
        owlInit(el_class, options);
      } else {
        owlDestroy(el_class);
      }
    }
  }

  function owlInit(el_class, options) {
    $(el_class).addClass('owl-carousel');
    $('.owl-carousel' + el_class).owlCarousel(options);
  }

  function owlDestroy(el_class) {
    $('.owl-carousel' + el_class).owlCarousel('destroy');
    $(el_class).removeClass('owl-carousel');
  }

  function owlInitProfile(el_class) {
    $(el_class).addClass('owl-carousel');

    $('.owl-carousel' + el_class).owlCarousel({
      //loop: true,
      items: 1,
      dots: true,
      nav: false,
      navText: ['', ''],
      margin: 5,
      responsive: {
        992: {
          margin: 15,
        },
        1200: {
          items: 3,
          nav: true,
          autoWidth: true,
          margin: 29,
        },
        1500: {
          items: 3,
          nav: true,
          autoWidth: true,
          margin: 35,
        },
      }
    });
  }

  $(window).resize(function () {
    owlInitProfile('.up-slider');
    owlInit('.user-list-extra', {
      loop: true,
      dots: true,
      items: 1,
      margin: 17,
      autoWidth: true,
      responsive: {
        320: {
          dots: true,
          items: 2,
          margin: 12
        },
        992: {
          margin: 48
        },
        1200: {
          dots: false,
          items: 4,
          margin: 48
        },
      }
    });
  });

});
