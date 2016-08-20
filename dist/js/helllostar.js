/**
 * Helllo Star v1.0.0 (http://hellostar.github.io/)
 * Copyright 2015-2016 Zafree
 * Licensed under the MIT license
 */
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

+function ($) {
  'use strict';

    // Bio

    var maxLength = $('#bio').attr("maxlength");

    $('#bio + .counter').html(maxLength);

    $('#bio').keyup(function() {
        var textLength = $(this).val().length;
        var textRemaining = maxLength - textLength;

        $('#bio + .counter').html(textRemaining);
    });

    // Workshop Overview

    var maxLengthDescription = $('#workshop-description').attr("maxlength");
    $('#workshop-description + .counter').html(maxLengthDescription);
    $('#workshop-description').keyup(function() {
        var textLengthDescription = $(this).val().length;
        var textRemainingDescription = maxLengthDescription - textLengthDescription;
        $('#workshop-description + .counter').html(textRemainingDescription);
    });

}(jQuery);


;(function() {
    'use strict';

    // var target = document.querySelector('.hello');
    // var nextSmallImage = target.nextElementSibling;
    //
    // console.log(nextSmallImage);

    // set progressive image loading
    var processImages = document.querySelectorAll('img');
    for (var i = 0; i < processImages.length; i++) {
        loadImage(processImages[i]);
    }

    // global function
    function loadImage(processImage) {

        if (processImage.dataset.width && processImage.dataset.height) {

            if (processImage.nextElementSibling) {
                var nextSmallImage = processImage.nextElementSibling;
                var smallImgSrc = nextSmallImage.getAttribute('src');

                //cancel load
                nextSmallImage.src = '';
            }

            // get width and height
            var imgSrc = processImage.getAttribute('src'),
            width = processImage.dataset.width,
            height = processImage.dataset.height;

            // console.log(width);

            //cancel load
            processImage.src = '';

            function appendHtml(el, str) {
              var div = document.createElement('div');
              div.innerHTML = str;
              while (div.children.length > 0) {
                // el.appendChild(div.children[0]);
                el.parentNode.appendChild(div.children[0]);
              }
            }
            var html = '<figure class="graf-figure">'+
                          '<div class="aspectRatioPlaceholder">'+
                            '<div class="aspectRatioPlaceholder-fill"></div>'+
                            '<div class="progressiveMedia" data-width="'+width+'" data-height="'+height+'">'+
                              '<img class="progressiveMedia-thumbnail" src="'+smallImgSrc+'" />'+
                              '<canvas class="progressiveMedia-canvas"></canvas>'+
                              '<img class="progressiveMedia-image" data-src="'+imgSrc+'" />'+
                            '</div>'+
                          '</div>'+
                        '</figure>';
            appendHtml(processImage, html);

            processImage.parentNode.removeChild(processImage);
            nextSmallImage.parentNode.removeChild(nextSmallImage);

        }

    }

    // var processImage = document.querySelector('img');

    // if (processImage.dataset.width && processImage.dataset.height) {
    //
    //     // get width and height
    //     var imgSrc = processImage.getAttribute('src'),
    //     width = processImage.dataset.width,
    //     height = processImage.dataset.height;
    //
    //     // console.log(width);
    //
    //     //cancel load
    //     processImage.src = '';
    //
    //     function appendHtml(el, str) {
    //       var div = document.createElement('div');
    //       div.innerHTML = str;
    //       while (div.children.length > 0) {
    //         // el.appendChild(div.children[0]);
    //         el.parentNode.appendChild(div.children[0]);
    //       }
    //     }
    //     var html = '<figure class="graf-figure">'+
    //                   '<div class="aspectRatioPlaceholder">'+
    //                     '<div class="aspectRatioPlaceholder-fill"></div>'+
    //                     '<div class="progressiveMedia" data-width="'+width+'" data-height="'+height+'">'+
    //                       '<img class="progressiveMedia-thumbnail" src="img-path" />'+
    //                       '<canvas class="progressiveMedia-canvas"></canvas>'+
    //                       '<img class="progressiveMedia-image" data-src="img-path" />'+
    //                     '</div>'+
    //                   '</div>'+
    //                 '</figure>';
    //     appendHtml(processImage, html);
    //
    //     processImage.parentNode.removeChild(processImage );
    //
    // }


})();

;(function() {
    'use strict';

    // set progressive image loading 
    var progressiveMedias = document.querySelectorAll('.progressiveMedia');
    for (var i = 0; i < progressiveMedias.length; i++) {
        loadImage(progressiveMedias[i]);
    }

    // global function
    function loadImage(progressiveMedia) {

        // calculate aspect ratio
        // for the aspectRatioPlaceholder-fill
        // that helps to set a fixed fill for loading images
        var width = progressiveMedia.dataset.width,
        height = progressiveMedia.dataset.height,
        fill = height / width * 100,
        placeholderFill = progressiveMedia.previousElementSibling;

        placeholderFill.setAttribute('style', 'padding-bottom:'+fill+'%;');


        // set max-height and max-width to aspectRatioPlaceholder
        // that is fun
        var aspectRatioPlaceholder = progressiveMedia.parentElement,
        maxWidth = aspectRatioPlaceholder.offsetWidth,
        maxHeight = aspectRatioPlaceholder.offsetHeight;

        aspectRatioPlaceholder.setAttribute('style', 'max-width:'+maxWidth+'px; max-height:'+maxHeight+'px;');


        // get thumbnail height wight
        // make canvas fun part
        var thumbnail = progressiveMedia.querySelector('.progressiveMedia-thumbnail'),
        smImageWidth = thumbnail.width,
        smImageheight = thumbnail.height,

        canvas = progressiveMedia.querySelector('.progressiveMedia-canvas'),
        context = canvas.getContext('2d');

        canvas.height = smImageheight;
        canvas.width = smImageWidth;

        var img = new Image();
        img.src = thumbnail.src;

        img.onload = function () {
            // context.drawImage(img, 0, 0);
            // draw canvas
            var canvasImage = new CanvasImage(canvas, img);
            canvasImage.blur(2);

            // load canvas visible
            progressiveMedia.classList.add('is-canvasLoaded');
        };


        // grab data-src from original image
        // from progressiveMedia-image
        var lgImage = progressiveMedia.querySelector('.progressiveMedia-image');
        lgImage.src = lgImage.dataset.src;

        // onload image visible
        lgImage.onload = function() {
            progressiveMedia.classList.add('is-imageLoaded');
        }
    }

})();

// canvas blur function
CanvasImage = function (e, t) {
    this.image = t;
    this.element = e;
    e.width = t.width;
    e.height = t.height;
    this.context = e.getContext('2d');
    this.context.drawImage(t, 0, 0);
};

CanvasImage.prototype = {
    blur:function(e) {
        this.context.globalAlpha = 0.5;
        for(var t = -e; t <= e; t += 2) {
            for(var n = -e; n <= e; n += 2) {
                this.context.drawImage(this.element, n, t);
                var blob = n >= 0 && t >= 0 && this.context.drawImage(this.element, -(n -1), -(t-1));
            }
        }
    }
};
