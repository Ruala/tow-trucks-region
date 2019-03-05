$(document).ready(function () {
    'use strict';

    /*Is mobile*/
    (function () {
        if (!isMobileDevice()) {
            return;
        }

        $('body').addClass('is-mobile');

        function isMobileDevice() {
            return 'orientation' in window || navigator.userAgent.indexOf('IEMobile') !== -1;
        }
    })();

    /*Yandex map*/
    (function(){
        const $mapWrapper = $('.map-wrapper');

        if (!$mapWrapper.length) return;

        /*const $mapInfo = $mapWrapper.find('.map__info');
        const $mapInfoList = $mapInfo.find('.map__list');*/
        const $map = $('#map');
        const placemarksData = $map.attr('data-services') && JSON.parse($map.attr('data-services'));

        const $firstScript = $('script').eq(0);
        const script = document.createElement('script');
        const $script = $(script);

        script.async = true;
        $firstScript.before($script);
        $script.on('load', function () {
            ymaps.ready(init);
        });
        script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';

        function init(){
            const myMap = new ymaps.Map('map', {
                center: [55.7207,37.6110], //[55.7207,37.6234],
                zoom: 12
            }, {
                searchControlProvider: 'yandex#search'
            });

            myMap.behaviors.disable('scrollZoom');

            for (const placemarkData of placemarksData) {
                const placemark = new ymaps.Placemark(placemarkData.coords, {
                        hintContent: placemarkData.hintContent,
                        balloonContent: '<div class="uk-text-center">\n' +
                            '                <div class="uk-margin-small-bottom">\n' +
                            '                    <div class="uk-visible@s"><b>Hyundai HD78, 4.0т.</b></div>\n' +
                            '                    <div><b>сдвижная платформа</b></div>\n' +
                            '                    <div>+7 (777) 77-77-77</div>\n' +
                            '                </div>\n' +
                            '                <div>\n' +
                            '                    <a href="#form-call-reverse" class="js-button-toggle uk-button uk-button-small uk-button-primary" uk-toggle>Заказать</a>\n' +
                            '                    <a href="tel:+7777777777" class="js-button-call uk-button uk-button-small uk-button-primary">Позвонить</a>\n' +
                            '                </div>\n' +
                            '            </div>'
                    },
                    {
                        iconLayout: 'default#image',
                        iconImageHref: 'images/baloon.png',
                        iconImageSize: [30, 21],
                        iconImageOffset: [-15, -10]
                    });

                /*const $li = $(`<li>${placemarkData.title}</li>`);*/

                /*$mapInfoList.append($li);
                $li.on('click', e => {
                    e.preventDefault();

                    placemark.balloon.open();
                });*/

                myMap.geoObjects.add(placemark);
            }
        }

    })();

});
