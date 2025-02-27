$(document).ready(function(){
    // $('.carousel__inner').slick({
    //     speed: 1200,
    //     prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
    //     nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
    //     responsive: [
    //         {
    //             breakpoint: 768,
    //             settings: {
    //                 dots: true,
    //                 arrows: false
    //             }
    //         }
    //     ]
    // });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass
          ('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //Modal 

    $('[data-modal="consultation"]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('[data-modal="thanks"]').on('click', function() {
        $('.overlay, #thanks').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });
    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    //Validation

    function validateForms(form) {
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Будь ласка, введіть ваше ім'я",
                phone: "Будь ласка, введіть ваш номер телефона",
                email: {
                    required: "Будь ласка, введіть ваш email",
                    email: "Ваш адрес має бути в форматі example@domain.com"
                }
            }
        });
    }

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    //phone mask

    $('input[name=phone]').mask("+38(999) 999-99-99");

    //sending email

    $('form').submit(function(e) {
        e.preventDefault();

        if(!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    //pageup

    $(window).scroll(function() {
        if($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });
  });