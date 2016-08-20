
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
