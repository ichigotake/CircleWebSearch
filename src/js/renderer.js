
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
