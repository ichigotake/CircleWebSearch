
$(document).ready(function(){

  var $circlesBody = $('#circles');
  var $circlesBodyRows = [];

  for (var i in circles) {
    var c = circles[i];
    $circlesBody.append(
        '<div id="circle-' + c.id + '" class="circle-body-row">' +
          '<div class="circle-space circle-body-column">' + c.space + '</div>' +
          '<div class="circle-pen-name circle-body-column">' + c.pen_name + '</div>' +
          '<div class="circle-name circle-body-column">' + c.circle_name + '</div>' +
          '<div class="circle-url circle-body-column"><a target="_blank" href="' + c.circle_url + '">' + c.circle_url + '</a></div>' +
        '</div>');
    $circlesBodyRows[c.id] = $('#circle-' + c.id);
  }

  var $circlesHeader = $('#circles-header-row');
  $circlesHeader.css('display', 'table-row');
  $circlesHeader.find('th').each(function(i, val){
    var $row = $(val);
    $row.css('width', $row.css('width'));
  });

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
