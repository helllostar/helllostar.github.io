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
