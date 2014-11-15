
$(document).ready(function(){

  var renderer;
  var isTablet = window.innerWidth > 480;
  if (isTablet) {
    renderer = new TabletRenderer();
  } else {
    renderer = new MobileRenderer();
  }

  var $circlesBody = $('#circles');
  var $circlesBodyRows = [];

  for (var i in circles) {
    var c = circles[i];
    $circlesBody.append(renderer.renderCircle(c));
    $circlesBodyRows[c.id] = $('#circle-' + c.id);
  }

  var $toolbar = $('#toolbar');
  var $circlesHeader = $('#circles-header-row');
  $circlesHeader.append(renderer.renderHeader());
  $circlesHeader.css('display', 'table-row');

  var $header = $('#header');
  var $searchKeyword = $('#circles-search-form-keyword');
  $searchKeyword.keypress(function(e){
    return !((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13));  });

  $searchKeyword.focus(function () {
    $header.css('top', 0);
    $circles.css('margin-top', parseInt($circles.css('margin-top')) - $header.height());
  });
  $searchKeyword.blur(function () {
    $header.css('top', $toolbar.height());
    $circles.css('margin-top', parseInt($circles.css('margin-top')) + $header.height());
  });

  Rx.Observable.fromEvent($searchKeyword, 'keyup')
    .map(function(e){ return e.target.value; })
    .distinctUntilChanged()
    .throttleWithTimeout(300)
    .subscribe(function(keyword){
      console.log(keyword);
      for (var i in circles) {
        var c = circles[i];
        var displayed = c.pen_name.indexOf(keyword) >= 0 || c.circle_name.indexOf(keyword) >= 0;
        $circlesBodyRows[c.id].css('display', displayed ? 'table-row' : 'none');
      }
    });

});
