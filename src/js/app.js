
$(document).ready(function(){

  var renderer;
//  TODO:
//  if (window.innerWidth > 490) {
    renderer = new TabletRenderer();
//  } else {
//    renderer = new MobileRenderer();
//  }


  var $circlesBody = $('#circles');
  var $circlesBodyRows = [];

  for (var i in circles) {
    var c = circles[i];
    $circlesBody.append(renderer.renderCircle(c));
    $circlesBodyRows[c.id] = $('#circle-' + c.id);
  }

  var $circlesHeader = $('#circles-header-row');
  $circlesHeader.append(renderer.renderHeader());
  $circlesHeader.css('display', 'table-row');

  var $searchKeyword = $('#circles-search-form-keyword');
  $searchKeyword.keypress(function(e){
    return !((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13));  });

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
