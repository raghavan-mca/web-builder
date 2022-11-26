  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems);
  });

  // Or with jQuery

  $(document).ready(function(){
    $('.carousel').carousel();
    setInterval(() => {
	    $('.carousel').carousel('next');
    }, 4000);


  });
function toggleNav(e) {
  $('.abc-lnks').toggleClass('mnav-open');
}
// The debounce function receives our function as a parameter
const debounce = (fn) => {

  // This holds the requestAnimationFrame reference, so we can cancel it if we wish
  let frame;

  // The debounce function returns a new function that can receive a variable number of arguments
  return (...params) => {
    
    // If the frame variable has been defined, clear it now, and queue for next frame
    if (frame) { 
      cancelAnimationFrame(frame);
    }

    // Queue our function call for the next frame
    frame = requestAnimationFrame(() => {
      
      // Call our function and pass any params we received
      fn(...params);
    });

  } 
};


// Reads out the scroll position and stores it in the data attribute
// so we can use it in our stylesheets
const storeScroll = () => {
  document.documentElement.dataset.scroll = window.scrollY;
}

// Listen for new scroll events, here we debounce our `storeScroll` function
document.addEventListener('scroll', debounce(storeScroll), { passive: true });

// Update scroll position for first time
storeScroll();
      

// function anim() {

// if($('#abc_hero_image').hasClass('abc-hero-scroll') === true) {
// 	setTimeout(() => {
// 		$('#abc_hero_image').removeClass('abc-hero-scroll');
// 		anim();
// 	}, 2000)
// }
// else if($('#abc_hero_image').hasClass('abc-hero-scroll') === false){
// 	setTimeout(() => {
// 		$('#abc_hero_image').addClass('abc-hero-scroll');
// 		anim();
// 	}, 2000)
// }

// }

// anim();