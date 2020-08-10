// Very simple example.
// Probably you would want to use a 
// full-featured plugin like
// https://github.com/infinite-scroll/infinite-scroll/blob/master/jquery.infinitescroll.js
$(document).ready(function(){
  
    // Check every 300ms the scroll position
    $(document).on('scroll', _.throttle(function(){
      check_if_needs_more_content();
    }, 300));
  
    function check_if_needs_more_content() {     
      pixelsFromWindowBottomToBottom = 0 + $(document).height() - $(window).scrollTop() -$(window).height();
      
    // console.log($(document).height());
    // console.log($(window).scrollTop());
    // console.log($(window).height());
    //console.log(pixelsFromWindowBottomToBottom);
      
      
      if (pixelsFromWindowBottomToBottom < 200){
        // Here it would go an ajax request
        $('body').append($('.item').clone()); 
        
      }
    }
  });

