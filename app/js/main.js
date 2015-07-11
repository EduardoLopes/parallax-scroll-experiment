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
    left: x
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

    let height = $container.height();
    let percentageinViewPort = Math.max(0, Math.min(100, ((offset.top + height) - scrollPosition) / (windowHeight + height) * 100));

    let halfPercentage = percentageinViewPort - 50;
    let per = (halfPercentage / 50) * 100;

    if(scrollPosition + windowHeight > offset.top &&  offset.top + $container.height() > scrollPosition){

      $rects = $container.children('.rect');

      let $canvas = $container.children('.canvas');

      $canvas.css('transform', `translate(0, ${(per / 100) * 400}px)`);

      $rects.each(function(index, item){

        let $item = $(item);
        $item.css('transform', `translate(${(per / 100) * parseInt($item.data('pixels-to-travel-horizontal')) }px, ${(per / 100) * parseInt($item.data('pixels-to-travel-vertical')) }px)`);

      });

    }

  });

}

$window.on('resize scroll load', updateParallax);


init();
