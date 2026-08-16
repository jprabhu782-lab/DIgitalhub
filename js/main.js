(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            992:{
                items:2
            }
        }
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
})(jQuery);

    const canvas=document.createElement("canvas");
    document.body.prepend(canvas);
    
    canvas.style.position="fixed";
    canvas.style.top="0";
    canvas.style.left="0";
    canvas.style.width="100%";
    canvas.style.height="100%";
    canvas.style.zIndex="-999";
    canvas.style.pointerEvents="none";
    
    const ctx=canvas.getContext("2d");
    
    function resize(){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    }
    
    resize();
    window.addEventListener("resize",resize);
    
    /* ---------- Stars ---------- */
    
    const stars=[];
    
    for(let i=0;i<900;i++){
    
    stars.push({
    
    x:Math.random()*canvas.width,
    
    y:Math.random()*canvas.height,
    
    r:Math.random()*2,
    
    a:Math.random(),
    
    s:Math.random()*0.25+0.05
    
    });
    
    }
    
    function nebula(){
    
    let g=ctx.createRadialGradient(
    
    canvas.width*.25,
    
    canvas.height*.3,
    
    0,
    
    canvas.width*.25,
    
    canvas.height*.3,
    
    500
    
    );
    
    g.addColorStop(0,"rgba(124,58,237,.25)");
    
    g.addColorStop(1,"transparent");
    
    ctx.fillStyle=g;
    
    ctx.fillRect(0,0,canvas.width,canvas.height);
    
    let g2=ctx.createRadialGradient(
    
    canvas.width*.8,
    
    canvas.height*.7,
    
    0,
    
    canvas.width*.8,
    
    canvas.height*.7,
    
    500
    
    );
    
    g2.addColorStop(0,"rgba(37,99,235,.18)");
    
    g2.addColorStop(1,"transparent");
    
    ctx.fillStyle=g2;
    
    ctx.fillRect(0,0,canvas.width,canvas.height);
    
    }
    
    function animate(){
    
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    nebula();
    
    drawStars();
    
    drawSun();
    
    drawPlanets();
    
    drawRocket();
    
    requestAnimationFrame(animate);
    
    }
