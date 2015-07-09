const $window = $(window);
const $document = $(document);
let windowHeight = $window.height();
let windowWidth = $window.width();
const $containers = $('.container');
const random = new Random(Random.engines.mt19937().autoSeed());
const colors = ['#e51d3a', '#f58f23', '#f4ec25', '#57ad48', '#1d60ae', '#5b429d'];

function generateRect(){
  let $rect = $('<div></div>');
  let size = random.integer(50, 150);
  let x = random.integer(-windowWidth, windowWidth);
  let y = random.integer(-windowHeight, windowHeight);
  let pixelToTravelVertical = random.integer(-200, 200);
  let pixelToTravelHorizontal = random.integer(-200, 200);

  $rect.addClass('center rect');
  $rect.data('pixels-to-travel-vertical', pixelToTravelVertical);
  $rect.data('pixels-to-travel-horizontal', pixelToTravelHorizontal);

  $rect.css({
    width: size,
    height: size,
    top:y,
    left: x,
    //transform: `translate(${pixelToTravelVertical}px, ${pixelToTravelHorizontal}px)`
  });

  return $rect;

}

function init(){

  //add colors
  colors.forEach(function(item, index){

    $($containers[index]).css('background', item);

  });

  $containers.each(function(index, item){

    let $container = $(item);

    for (let i = 0; i < 10; i++) {
      $container.append(generateRect());
    };

  });

}

function updateParallax(){

  let scrollPosition = $window.scrollTop();

  $containers.each(function(index, item){

    let $container = $(item);
    let offset = $container.offset();
    let $rects;

    if(scrollPosition + windowHeight > offset.top &&  offset.top + $container.height() > scrollPosition){

      $rects = $container.children('.rect');

      $rects.each(function(index, item){
        let $item = $(item);
        let height = $item.height();
        let elementPosition = $item.offset();
        let percentageinViewPort = Math.max(0, Math.min(100, ((elementPosition.top + height) - scrollPosition) / (windowHeight + height) * 100));

        let halfPercentage = percentageinViewPort - 50;
        let per = (halfPercentage / 50) * 100;

        //performance improvement, the rectangles pop out when appears on screen. but it's kinda cool
        //if(Math.abs(per) < 100){
          $item.css('transform', `translate(${(per / 100) * parseInt($item.data('pixels-to-travel-horizontal')) }px, ${(per / 100) * parseInt($item.data('pixels-to-travel-vertical')) }px)`);
        //}

      });

    }


  });



}

$window.on('resize scroll load', updateParallax);


init();
