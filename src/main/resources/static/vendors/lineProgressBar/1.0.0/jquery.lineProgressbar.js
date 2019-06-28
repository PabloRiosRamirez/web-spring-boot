/**
 * jQuery Line Progressbar
 * Author: KingRayhan<rayhan095@gmail.com>
 * Author URL: http://rayhan.info
 * Version: 1.0.0
 */

(function ($) {
    'use strict';
    $.fn.LineProgressbar = function (options) {

         options = $.extend({
            percentage: null,
            title: '',
            ShowProgressCount: true,
            duration: 1000,

            // Styling Options
            fillBackgroundColor: '#3498db',
            backgroundColor: '#EEEEEE',
            radius: '0px',
            height: '10px',
            width: '100%'
        }, options);

        $.options = options;
        return this.each(function (index, el) {
            // Markup
            $(el).html(
                    '<div class="row">'+
                        '<div class="col-lg-12">'+
                            '<h6 class="text-uppercase title_bar"><span class="percentCount"></span></h6>'+
                        '</div>'+
                        '<div class="col-lg-12">'+
                            '<div class="progressbar">'+
                                '<div class="proggress">'+
                                '</div>'+
                            '</div>'+
                        '</div>'+                        
                    '</div>');



            var progressFill = $(el).find('.proggress');
            var progressBar = $(el).find('.progressbar');
            var titleBar = $(el).find('.title_bar');


            progressFill.css({
                backgroundColor: options.fillBackgroundColor,
                height: options.height,
                borderRadius: options.radius
            });
            progressBar.css({
                width: options.width,
                backgroundColor: options.backgroundColor,
                borderRadius: options.radius
            });
            titleBar.prepend(options.title);

            // Progressing
            progressFill.animate(
                {
                    width: options.percentage + "%"
                },
                {
                    step: function (x) {
                        if (options.ShowProgressCount) {
                            $(el).find(".percentCount").text(Math.round(x) + "%");
                        }
                    },
                    duration: options.duration
                }
            );
            ////////////////////////////////////////////////////////////////////
        });
    }
    $.fn.progressTo = function (next) {

        let options = $.options;

        return this.each(function (index, el) {

            var progressFill = $(el).find('.proggress');
            var progressBar = $(el).find('.progressbar');

            progressFill.animate(
                {
                    width: next + "%"
                },
                {
                    step: function (x) {
                        if (options.ShowProgressCount) {
                            $(el).find(".percentCount").text(Math.round(x) + "%");
                        }
                    },
                    duration: options.duration
                }
            );
            ////////////////////////////////////////////////////////////////////
        });
    }

})(jQuery);