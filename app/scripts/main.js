(function (window, document, $, Modernizr, Kinvey, skrollr) {
  /* global Modernizr */
  /* global Kinvey */
  /* global skrollr */
  'use strict';

  var init, $init, $lwbg, $luna, $olaf, backgroundclip, onSubmit;

  init = function () {
    $init();

    Modernizr.addTest('backgroundclip', backgroundclip);

    Kinvey.init({
      appKey: 'kid_W1ikbHdVc',
      appSecret: 'f025a02046b24699b8e9debe542a60f8'
    })
    .then(function () {
      Kinvey.User.login({username: 'admin', password: 'test1234'});
    });

  };

  $init = function () {
    var lunaMargingW, lunaMargingH, olafMargin, wHeight, wWidth, isMobile;

    olafMargin = -10;
    wHeight = window.innerHeight;
    wWidth = window.innerWidth;
    isMobile = wHeight / wWidth > 0.75;

    $('#content form').on('submit', onSubmit);

    $lwbg = $('#luna-with-background');
    $luna = $lwbg.find('#luna');
    $olaf = $lwbg.find('#olaf');

    if (isMobile) {
      $luna.width(wWidth);

      lunaMargingH = (wHeight - $luna.height()) / 3;
      $lwbg.css({marginTop: lunaMargingH + 'px'});

      $olaf.hide();
      $olaf.attr('data-500', $olaf.attr('data-500').replace('$right', 0));
    } else {
      $luna.height(wHeight);

      lunaMargingW = (wWidth - $luna.width()) / 2;
      $olaf.attr('data-500', $olaf.attr('data-500').replace('$right', lunaMargingW + olafMargin));
    }

    $('#address').on('click', function () {
      $(this).find('iframe').removeClass('non-clicked');
    })
    .find('iframe')
    .mouseleave(function () {
      $(this).addClass('non-clicked');
    });

    skrollr.menu.init(skrollr.init());
  };

  backgroundclip = function() {
    var div = document.createElement('div');

    if ('backgroundClip' in div.style) {return true;}

    'Webkit Moz O ms Khtml'.replace(/([A-Za-z]*)/g, function (val) {
      if (val+'BackgroundClip' in div.style) {return true;}
    });
  };

  onSubmit = function (e) {
    e.preventDefault();

    Kinvey.DataStore.save('guests', {
      name : $('#name').val(),
      plus: parseInt($('#plus-guests').val()) || 0
    })
    .then(function () {
      $('#content form').hide();
    });
  };

  $(init);
})(this, this.document, jQuery, Modernizr, Kinvey, skrollr);
