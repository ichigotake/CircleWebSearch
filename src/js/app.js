
$(document).ready(function(){

  var renderer;
  var isTablet = window.innerWidth > 800;
  if (isTablet) {
    renderer = new TabletRenderer();
  } else {
    renderer = new MobileRenderer();
  }

  var $circles = $('#circles');
  var $circlesBodyRows = [];

  circles.forEach(function(circle, index) {
    $circles.append(renderer.renderCircle(circle));
    $circlesBodyRows[circle.id] = $('#circle-' + circle.id);
  });

  var $toolbar = $('#toolbar');
  var $circlesHeader = $('#circles-header-row');
  $circlesHeader.append(renderer.renderHeader());
  $circlesHeader.css('display', 'table-row');

  var $header = $('#header');
  var $searchKeyword = $('#circles-search-form-keyword');
  $searchKeyword.keypress(function(e){
    return !((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13));  });

  if (!isTablet) {
    $searchKeyword.focus(function () {
      $header.css('top', 0);
      $circles.css('margin-top', parseInt($circles.css('margin-top')) - $header.height());
    });
    $searchKeyword.blur(function () {
      $header.css('top', $toolbar.height());
      $circles.css('margin-top', parseInt($circles.css('margin-top')) + $header.height());
    });
  }

  Rx.Observable.fromEvent($searchKeyword, 'keyup')
    .map(function(e){ return e.target.value; })
    .distinctUntilChanged()
    .throttleWithTimeout(300)
    .subscribe(function(keyword){
      circles.forEach(function(circle, index){
        var displayed = circle.pen_name.indexOf(keyword) >= 0 || circle.circle_name.indexOf(keyword) >= 0;
        $circlesBodyRows[circle.id].css('display', displayed ? 'table-row' : 'none');
      });
    });

});
