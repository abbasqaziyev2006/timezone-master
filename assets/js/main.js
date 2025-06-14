/**
 * Chronosfera - Premium Watches eCommerce
 * Enhanced Main JavaScript File
 */

(function ($) {
  "use strict";

  // ===== PRELOADER =====
  $(window).on('load', function () {
      $('#preloader-active').delay(450).fadeOut('slow');
      $('body').delay(450).css({ 'overflow': 'visible' });
  });

  // ===== MOBILE MENU =====
  var menu = $('ul#navigation');
  if (menu.length) {
      menu.slicknav({
          prependTo: ".mobile_menu",
          closedSymbol: '<i class="ti-plus"></i>',
          openedSymbol: '<i class="ti-minus"></i>',
          label: ''
      });
  }

  // ===== MAIN SLIDER WITH VIDEO SUPPORT =====
  function initMainSlider() {
      var $slider = $('.slider-active');
      
      if (!$slider.length) return;

      $slider.on('init', function (e, slick) {
          animateSlideElements($('.single-slider:first-child'));
          
          // Initialize first video if exists
          var $firstVideo = $('.single-slider:first-child').find('video');
          if ($firstVideo.length) {
              tryPlayVideo($firstVideo[0]);
          }
      });

      $slider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
          // Pause current video
          var $currentVideo = $(slick.$slides.get(currentSlide)).find('video');
          if ($currentVideo.length) {
              $currentVideo[0].pause();
          }
      });

      $slider.on('afterChange', function (e, slick, currentSlide) {
          animateSlideElements($(slick.$slides.get(currentSlide)));
          
          // Play new slide video
          var $nextVideo = $(slick.$slides.get(currentSlide)).find('video');
          if ($nextVideo.length) {
              tryPlayVideo($nextVideo[0]);
          }
      });

      $slider.slick({
          autoplay: true,
          autoplaySpeed: 7000,
          dots: false,
          fade: true,
          arrows: false,
          responsive: [
              {
                  breakpoint: 991,
                  settings: { arrows: false }
              }
          ]
      });

      function animateSlideElements($slide) {
          var $animElements = $slide.find('[data-animation]');
          var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
          
          $animElements.each(function () {
              var $el = $(this);
              var animClass = 'animated ' + $el.data('animation');
              var animDelay = $el.data('delay') || 0;
              
              $el.css({
                  'animation-delay': animDelay,
                  '-webkit-animation-delay': animDelay
              }).addClass(animClass).one(animationEnd, function () {
                  $el.removeClass(animClass);
              });
          });
      }

      function tryPlayVideo(videoEl) {
          var playPromise = videoEl.play();
          
          if (playPromise !== undefined) {
              playPromise.catch(error => {
                  // Autoplay was prevented, show fallback
                  $(videoEl).closest('.video-container').find('.video-fallback').show();
              });
          }
      }
  }
  initMainSlider();

  // ===== TESTIMONIAL SLIDER =====
  function initTestimonialSlider() {
      var $testimonial = $('.h1-testimonial-active');
      
      if ($testimonial.length) {
          $testimonial.slick({
              dots: true,
              arrows: false,
              infinite: true,
              speed: 800,
              slidesToShow: 1,
              adaptiveHeight: true,
              autoplay: true,
              autoplaySpeed: 5000
          });
      }
  }
  initTestimonialSlider();

  // ===== PRODUCT GALLERY =====
  function initProductGallery() {
      var $productGallery = $('.product_img_slide');
      
      if ($productGallery.length) {
          $productGallery.owlCarousel({
              items: 1,
              loop: true,
              dots: false,
              nav: true,
              navText: ['<i class="ti-angle-left"></i>', '<i class="ti-angle-right"></i>'],
              smartSpeed: 500
          });
      }
  }
  initProductGallery();

  // ===== STICKY HEADER =====
  $(window).on('scroll', function () {
      var scroll = $(window).scrollTop();
      var $header = $(".header-sticky");
      
      if (scroll > 245) {
          $header.addClass("sticky-bar sticky");
      } else {
          $header.removeClass("sticky-bar sticky");
      }
  });

  // ===== BACK TO TOP =====
  $.scrollUp({
      scrollName: 'scrollUp',
      scrollDistance: 300,
      scrollSpeed: 500,
      easingType: 'easeInOutCubic',
      animation: 'fade',
      animationInSpeed: 200,
      animationOutSpeed: 200,
      scrollText: '<i class="ti-arrow-up"></i>',
      activeOverlay: false
  });

  // ===== SEARCH FUNCTIONALITY =====
  $('.search-switch').on('click', function () {
      $('.search-model-box').fadeIn(300);
      $('#search-input').focus();
  });

  $('.search-close-btn').on('click', function () {
      $('.search-model-box').fadeOut(300);
  });

  // ===== PRODUCT QUANTITY =====
  $('.qty button').on('click', function () {
      var $button = $(this);
      var $input = $button.parent().find('input');
      var oldValue = parseInt($input.val());
      var newVal;
      
      if ($button.hasClass('inc')) {
          newVal = oldValue + 1;
      } else {
          newVal = Math.max(oldValue - 1, 1);
      }
      
      $input.val(newVal).trigger('change');
  });

  // ===== WOW ANIMATIONS =====
  new WOW().init();

  // ===== MAGNIFIC POPUP =====
  $('.popup-image').magnificPopup({
      type: 'image',
      gallery: { enabled: true }
  });

  $('.popup-video').magnificPopup({
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 300
  });

  // ===== PRODUCT VIEW TOGGLE =====
  $('#list-view').click(function(e) {
      e.preventDefault();
      $('.product-view').removeClass('grid-view').addClass('list-view');
  });

  $('#grid-view').click(function(e) {
      e.preventDefault();
      $('.product-view').removeClass('list-view').addClass('grid-view');
  });

  // ===== COUNTDOWN TIMER =====
  function initCountdown() {
      var endDate = new Date();
      endDate.setDate(endDate.getDate() + 15); // 15 days from now
      
      $('[data-countdown]').each(function() {
          var $this = $(this);
          var finalDate = new Date($this.data('countdown') || endDate);
          
          function updateCountdown() {
              var now = new Date().getTime();
              var distance = finalDate - now;
              
              var days = Math.floor(distance / (1000 * 60 * 60 * 24));
              var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
              var seconds = Math.floor((distance % (1000 * 60)) / 1000);
              
              $this.find('.days').text(days);
              $this.find('.hours').text(hours.toString().padStart(2, '0'));
              $this.find('.minutes').text(minutes.toString().padStart(2, '0'));
              $this.find('.seconds').text(seconds.toString().padStart(2, '0'));
              
              if (distance < 0) {
                  clearInterval(countdownTimer);
                  $this.html('<div class="expired-message">Offer Expired</div>');
              }
          }
          
          updateCountdown();
          var countdownTimer = setInterval(updateCountdown, 1000);
      });
  }
  initCountdown();

  // ===== PRODUCT FILTERS =====
  $('.product-filter-toggle').on('click', function() {
      $(this).toggleClass('active');
      $('.product-filter-sidebar').toggleClass('active');
  });

  // ===== ADD TO CART/WISHLIST =====
  $('.add-to-cart').on('click', function(e) {
      e.preventDefault();
      var $this = $(this);
      
      $this.addClass('loading').html('<i class="fas fa-spinner fa-spin"></i> Adding...');
      
      // Simulate AJAX call
      setTimeout(function() {
          $this.removeClass('loading').html('<i class="fas fa-check"></i> Added');
          updateCartCount(1);
          
          // Reset button after 2 seconds
          setTimeout(function() {
              $this.html('<i class="fas fa-shopping-cart"></i> Add to Cart');
          }, 2000);
      }, 800);
  });

  $('.add-to-wishlist').on('click', function(e) {
      e.preventDefault();
      var $this = $(this);
      
      $this.toggleClass('active');
      $this.find('i').toggleClass('far fas');
  });

  function updateCartCount(quantityChange) {
      var $cartCount = $('.cart-count');
      var currentCount = parseInt($cartCount.text()) || 0;
      $cartCount.text(currentCount + quantityChange).addClass('pulse');
      
      setTimeout(function() {
          $cartCount.removeClass('pulse');
      }, 500);
  }

  // ===== RESPONSIVE VIDEO EMBEDS =====
  $('iframe[src*="youtube"], iframe[src*="vimeo"]').each(function() {
      $(this).wrap('<div class="video-container"></div>');
  });

  // ===== INITIALIZE NICE SELECT =====
  $('select').niceSelect();

  // ===== DATA BACKGROUND IMAGES =====
  $('[data-background]').each(function() {
      $(this).css('background-image', 'url(' + $(this).data('background') + ')');
  });

})(jQuery);