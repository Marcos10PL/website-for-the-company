$(document).ready(function()
{
    let scroll = window.scrollY;
    let start = false;
    let windowHeight = $(window).height();
    let sectionFirstHeight = $('section:nth-child(2)').height()

    if(sectionFirstHeight < windowHeight)
    {
        $('.counter').each(function(){ counter(this, 0);});
        animate();
        start = true;
    }

    // counter
    function counter(el, numbers)
    {
        let count = setInterval(function()
        {
            $(el).html(numbers++);
                
            if(numbers == $(el).data('max'))
            clearInterval(count);
        }, 6)
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
    
        $('.slider > div').on('mousedown', function(){ $(this).css('cursor', 'grabbing');});
        $('.slider > div').on('mouseup', function(){ $(this).css('cursor', 'grab');});
    }

    // pop-up -> cookie
    $(window).on('load', function()
    {
        if(Cookies.get('cookie') == null)
        $('.pop-up').slideDown();
    });

    $('.pop-up button.accept').click(function()
    {
        $('.pop-up').slideUp();
        Cookies.set('cookie', true, { expires: 7 }, { path: '' });
    });

    // Cookies.remove('cookie');

    //animation
    if(scroll > 0) animate();

    function animate() 
    {
        const animated = $('.animated');
      
        for (i = 0; i < animated.length; i++) 
        {
            let elementTop = animated[i].getBoundingClientRect().top;
        
            if (elementTop < windowHeight - 150) 
            animated[i].classList.add("active");
        }
    }

    // scroll
    $(window).scroll(function() 
    {
        // animation
        animate();

        // counter
        if(start == false)
        {
            $('.counter').each(function(){ counter(this, 0);});
            start = true;
        }

        // nav
        if(scroll > 55)
        {
            if(scroll < window.scrollY)
            {
                $('body > header').removeClass('scrolled-up')
                $('body > header').addClass('scrolled-down')
            }
            else
            {
                $('body > header').removeClass('scrolled-down')
                $('body > header').addClass('scrolled-up')
            }
        }
        scroll = window.scrollY;
    })
});

