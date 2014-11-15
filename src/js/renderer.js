
var TabletRenderer = function() {

  this.renderHeader = function() {
    return '' +
      '<div class="circles-header-column">配置</div>' +
      '<div class="circles-header-column">ペンネーム</div>' +
      '<div class="circles-header-column">サークル名</div>' +
      '<div class="circles-header-column">ホームページ</div>' +
      ''
      ;
  };

  this.renderCircle = function(circle) {
    return '' +
      '<div id="circle-' + circle.id + '" class="circle-body-row">' +
      '<div class="circle-space circle-body-column">' + circle.space + '</div>' +
      '<div class="circle-pen-name circle-body-column">' + circle.pen_name + '</div>' +
      '<div class="circle-name circle-body-column">' + circle.circle_name + '</div>' +
      '<div class="circle-url circle-body-column"><a target="_blank" href="' + circle.circle_url + '">' + circle.circle_url + '</a></div>' +
      '</div>' +
      '';
  };
};

var MobileRenderer = function () {

  this.renderHeader = function () {
    return '' +
      '<div class="circles-header-column">配置</div>' +
      '<div class="circles-header-column">サークル名 / ペンネーム</div>' +
      ''
      ;
  };

  this.renderCircle = function(circle) {
    var hasHomepage = circle.circle_url != '';
    var linkStart = hasHomepage ? '<a target="_blank" href="' + circle.circle_url + '">' : '';
    var linkEnd = hasHomepage ? '</a>' : '';
    var homepageIcon = hasHomepage ? '<div class="circle-url-mobile">【HP】</div>' : '';
    return '' +
      '<div id="circle-' + circle.id + '" class="circle-body-row">' +
        '<div class="circle-space circle-body-column">' + circle.space + '</div>' +
        '<div class="circle-name circle-body-column">' + linkStart +
          '<div>' + circle.circle_name + '</div>' +
          homepageIcon +
          '<div>' + circle.pen_name + '</div>' +
        linkEnd + '</div>' +
      '</div>' +
      '';
  };
};

var ZebraStriped = function(){

  var index = 0;

  this.apply = function (obj) {
    if (index % 2 == 0) {
      obj.addClass('zebra-striped');
    } else {
      obj.removeClass('zebra-striped');
    }
    index++;
  };

};
