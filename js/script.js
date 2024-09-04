$(document).ready(function()
{
    const windowHeight = $(window).height();
    const sectionFirstHeight = $('section:nth-child(2)').height();

    let scroll = window.scrollY;
    let start = false;

    // counter
    function counter(el, numbers)
    {
        const count = setInterval(() =>
        {
            $(el).html(numbers++);
            if(numbers === $(el).data('max')) clearInterval(count);
        }, 6)
    }

    if(sectionFirstHeight < windowHeight)
    {
        start = true;
        $('.counter').each(function() {counter(this, 0); });
        animate();
    }
    
    // slider
    if($('.slider').length)
    {
        $('.slider').slick
        ({
            prevArrow: false,
            nextArrow: false,
            dots: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            responsive:
            [{
                breakpoint: 1024,
                settings:
                {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            }]
        });
    
        $('.slider > div')
          .on('mousedown', function(){ $(this).css('cursor', 'grabbing'); });
        $('.slider > div')
          .on('mouseup', function(){ $(this).css('cursor', 'grab'); });
    }

    // pop-up -> cookie
    $(window).on('load', function()
    {
        if(Cookies.get('cookie') === null)
          $('.pop-up').slideDown();
    });

    $('.pop-up button.accept').click(function()
    {
        $('.pop-up').slideUp();
        Cookies.set('cookie', true, { expires: 7 }, { path: '' });
    });

    //animation
    function animate() 
    {
      $('.animated').each(function() 
      {
          const elementTop = $(this)[0].getBoundingClientRect().top;
          if (elementTop < windowHeight - 120)
              $(this).addClass("active");
      });
    }

    if(scroll > 0) 
      animate();

    // scroll
    $(window).scroll(() => 
    {
        animate();

        if(!start)
        {
            $('.counter').each(function() { counter(this, 0); });
            start = true;
        }

        if(scroll > 55)
        {
            if(scroll < window.scrollY)
            {
                $('body > header')
                  .removeClass('scrolled-up')
                  .addClass('scrolled-down');
            }
            else
            {
                $('body > header')
                  .removeClass('scrolled-down')
                  .addClass('scrolled-up');
            }
        }
        scroll = window.scrollY;
    });
});

