
// jQuery for About Page
$(function(){
  $('#aboutbutton').on('click', function(){
    $('#about').toggle(500)
      $('html, body').animate({
        scrollTop: $('#about').offset().top
      },1000)
  })

})



// jQuery for Save Button
$(function(){
  $('#savebutton').on('click', function(){
    $('#savebutton').fadeOut(200);
  })


})


// Scrolling Button
$(function(){
 
    $(document).on( 'scroll', function(){
 
        if ($(window).scrollTop() > 100) {
            $('.scroll-top-wrapper').addClass('show');
        } else {
            $('.scroll-top-wrapper').removeClass('show');
        }
    });
 
    $('.scroll-top-wrapper').on('click', scrollToTop);
});
 
function scrollToTop() {
    verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
    element = $('body');
    offset = element.offset();
    offsetTop = offset.top;
    $('html, body').animate({scrollTop: offsetTop}, 500, 'linear');
}



// Displaying pictures
$(document).ready(function() {
    $(".fancybox").fancybox({
      openEffect  : 'fade',
      closeEffect : 'fade',
      helpers: {
      	overlay: {
      		css: {
      			'background' : 'rgba(58, 48, 48, 0.95)'
      		}
      	},
      },
       nextEffect: 'fade',
       prevEffect: 'fade',
       closeClick: true,
    });
});











