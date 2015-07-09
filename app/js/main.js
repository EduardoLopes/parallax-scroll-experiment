const $window = $(window);
const $document = $(document);
let windowHeight = $window.height();
const $containers = $('.container');

//set colors and height
$containers.each(function(index, item){

  let $item = $(item);
  $item.height(windowHeight);
  $item.css('background', `hsl(${index * (360 / $containers.length)}, 50%, 50%)`);

});

function updateHeight(){

  $containers.each(function(index, item){

    let $item = $(item);
    $item.height(windowHeight);
    $item.css('background', `hsl(${index * (360 / $containers.length)}, 50%, 50%)`);

  });

}

//update size of the view port when window is resized and update height of the sections
$window.on('resize scroll', function(){

  windowHeight = $window.height();
  updateHeight();

});

