$(document).ready(function() {



  // Returns height of browser viewport

  $(window).on('resize.windowscreen', function() {
    $('.windowscreen').height($(this).height());
  });

  $(window).trigger('resize.windowscreen');

  // // progress bar
  // $('.progress').each(function() {
	// 	$(this).appear(function() {
	// 		$(this).find('.progress-bar').animate({
	// 			width : $(this).attr('data-percent')
	// 		}, 1400);
	// 	});
	// });

	autosize($('textarea'));

  // input focus dance
  var $formCanDance = $(".form-can-dance > .form-control");
  $formCanDance.on('focus', function(){
      $(this).parent().addClass("is-focused");
  });

  $formCanDance.on('blur', function() {
    if ($(this).val() === '') {
      $(this).parent().removeClass('is-focused');
    }
  });

	// $('#helloform').validator();

  // Headroom init
	var elem = document.querySelector(".headroom");
	var headroom = new Headroom(elem, {
		"offset" : 100,
		"tolerance" : 5,
		// "classes" : {
		// 	"initial" : "animated",
		// 	"pinned" : "slideDown",
		// 	"unpinned" : "slideUp"
		// }
	});
	headroom.init();

});
