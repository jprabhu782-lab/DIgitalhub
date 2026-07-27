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

/* ---------- Meteors ---------- */

const meteors=[];

function createMeteor(){

meteors.push({

x:Math.random()*canvas.width,

y:-200,

len:220+Math.random()*150,

speed:12+Math.random()*12,

});

}

setInterval(createMeteor,2500);

/* ---------- Rocket ---------- */

const rocket={

x:-200,

y:canvas.height*0.75,

angle:-0.4

};

/* ---------- Planets ---------- */

const planets=[

{

orbit:120,

size:45,

color:"#ff4d4d",

speed:.004,

angle:0

},

{

orbit:210,

size:28,

color:"#4f8cff",

speed:.003,

angle:1

},

{

orbit:320,

size:38,

color:"#7c3aed",

speed:.002,

angle:2

},

{

orbit:430,

size:25,

color:"#f59e0b",

speed:.0015,

angle:3

},

{

orbit:520,

size:52,

color:"#2563eb",

speed:.001,

angle:5

}

];

function drawStars(){

ctx.save();

for(let s of stars){

ctx.globalAlpha=s.a;

ctx.fillStyle="#fff";

ctx.beginPath();

ctx.arc(s.x,s.y,s.r,0,Math.PI*2);

ctx.fill();

s.a+=Math.random()*0.04-0.02;

if(s.a<0.15)s.a=0.15;

if(s.a>1)s.a=1;

}

ctx.restore();

}

function drawSun(){

ctx.beginPath();

ctx.arc(canvas.width/2,canvas.height/2,60,0,Math.PI*2);

let g=ctx.createRadialGradient(canvas.width/2,canvas.height/2,5,canvas.width/2,canvas.height/2,100);

g.addColorStop(0,"#fff799");

g.addColorStop(.4,"#ff7b00");

g.addColorStop(1,"rgba(255,0,0,.1)");

ctx.fillStyle=g;

ctx.fill();

}

function drawPlanets(){

for(let p of planets){

ctx.strokeStyle="rgba(255,255,255,.08)";

ctx.beginPath();

ctx.arc(canvas.width/2,canvas.height/2,p.orbit,0,Math.PI*2);

ctx.stroke();

p.angle+=p.speed;

let x=canvas.width/2+Math.cos(p.angle)*p.orbit;

let y=canvas.height/2+Math.sin(p.angle)*p.orbit;

ctx.beginPath();

ctx.arc(x,y,p.size,0,Math.PI*2);

ctx.fillStyle=p.color;

ctx.shadowBlur=30;

ctx.shadowColor=p.color;

ctx.fill();

ctx.shadowBlur=0;

}

}

function drawRocket(){

rocket.x+=3;

rocket.y-=1.3;

if(rocket.x>canvas.width+200){

rocket.x=-200;

rocket.y=canvas.height*.75;

}

ctx.save();

ctx.translate(rocket.x,rocket.y);

ctx.rotate(-0.5);

ctx.font="55px serif";

ctx.fillText("🚀",0,0);

ctx.restore();

}

function drawMeteor(){

for(let i=meteors.length-1;i>=0;i--){

let m=meteors[i];

ctx.beginPath();

ctx.strokeStyle="white";

ctx.lineWidth=2;

ctx.moveTo(m.x,m.y);

ctx.lineTo(m.x-m.len,m.y-m.len/2);

ctx.stroke();

m.x+=m.speed;

m.y+=m.speed*.6;

if(m.x>canvas.width+500){

meteors.splice(i,1);

}

}

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

drawMeteor();

drawRocket();

requestAnimationFrame(animate);

}

animate();
