$(document).ready(function () {
    'use strict';

    /*Yandex map*/
    (function(){
        const $mapWrapper = $('.map-wrapper');

        if (!$mapWrapper.length) return;

        /*const $mapInfo = $mapWrapper.find('.map__info');
        const $mapInfoList = $mapInfo.find('.map__list');*/
        const placemarksData = [
            {
                title: 'Адрес сервиса',
                coords: [55.7385,37.4821],
                hintContent: 'Сервис!'
            },
            {
                title: 'Адрес сервиса',
                coords: [55.7129,37.4855],
                hintContent: 'Сервис!'
            },
            {
                title: 'Адрес сервиса',
                coords: [55.7323,37.5447],
                hintContent: 'Сервис!'
            },
            {
                title: 'Адрес сервиса',
                coords: [55.7012,37.5568],
                hintContent: 'Сервис!'
            },
            {
                title: 'Адрес сервиса',
                coords: [55.7181,37.5732],
                hintContent: 'Сервис!'
            },
            {
                title: 'Адрес сервиса',
                coords: [55.7225,37.6090],
                hintContent: 'Сервис!'
            },
            {
                title: 'Адрес сервиса',
                coords: [55.7193,37.6467],
                hintContent: 'Сервис!'
            },
            {
                title: 'Адрес сервиса',
                coords: [55.7025,37.6695],
                hintContent: 'Сервис!'
            },
            {
                title: 'Адрес сервиса',
                coords: [55.7378,37.6953],
                hintContent: 'Сервис!'
            },
            {
                title: 'Адрес сервиса',
                coords: [55.7253,37.7431],
                hintContent: 'Сервис!'
            }
        ];

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
                        balloonContent: '<div>\n' +
                            '                <div><b>Тип эвакуатора</b></div>\n' +
                            '                <div class="uk-margin-small-bottom">+7 (777) 77-77-77</div>\n' +
                            '                <div>\n' +
                            '                    <a href="#form-call-reverse" class="uk-button uk-button-small uk-button-primary" uk-toggle>Заказать</a>\n' +
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
