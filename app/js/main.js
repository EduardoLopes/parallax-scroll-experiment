import {HSL} from "./hsl";
import {AnimationOne} from "./animation-one";

const $window = $(window);
const $document = $(document);
let windowHeight = $window.height();
let windowWidth = $window.width();

const $containers = $('.container');

const random = new Random(Random.engines.mt19937().autoSeed());
const colors = [
    new HSL(351, 51, 51), //#e51d3a
    new HSL(31, 91, 55), //#f58f23
    new HSL(58, 90, 55), //#f4ec25
    new HSL(111, 41, 48), //#57ad48
    new HSL(212, 71, 40), //#1d60ae
    new HSL(256, 41, 44)  //#5b429d
  ];

const canvasAnimations = [
  new AnimationOne,
  //new AnimationTwo,
  //new AnimationThree,
  //new AnimationFour,
  //new AnimationFive,
  //new AnimationSix
];

function generateRect(containerIndex){
  let $rect = $('<div></div>');
  let size = random.integer(50, 150);
  let x = random.integer(-windowWidth, windowWidth);
  let y = random.integer(-windowHeight, windowHeight);
  let pixelToTravelVertical = random.integer(-200, 200);
  let pixelToTravelHorizontal = random.integer(-200, 200);

  $rect.addClass('center rect');
  $rect.data('pixels-to-travel-vertical', pixelToTravelVertical);
  $rect.data('pixels-to-travel-horizontal', pixelToTravelHorizontal);

  containerIndex

  $rect.css({
    width: size,
    height: size,
    top:y,
    left: x,
    background: `hsl(${colors[containerIndex].h},${colors[containerIndex].s + 20}%,${colors[containerIndex].l + 10}%)`,
    opacity: 0.5
  });

  return $rect;

}

function init(){

  //add colors
  colors.forEach(function(item, index){

    $($containers[index]).css('background', colors[index].toString());

  });

  $containers.each(function(index, item){

    let $container = $(item);

    for (let i = 0; i < 10; i++) {
      $container.append(generateRect(index));
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
      if(typeof canvasAnimations[index] !== 'undefined') canvasAnimations[index].onScreen = true;
      $rects = $container.children('.rect');

      let $canvas = $container.children('.canvas');

      $canvas.css('transform', `translate(0, ${(per / 100) * 400}px)`);

      $rects.each(function(index, item){

        let $item = $(item);
        $item.css('transform', `translate(${(per / 100) * parseInt($item.data('pixels-to-travel-horizontal')) }px, ${(per / 100) * parseInt($item.data('pixels-to-travel-vertical')) }px)`);

      });

    } else {
      if(typeof canvasAnimations[index] !== 'undefined') canvasAnimations[index].onScreen = false;
    }

  });

}

$window.on('resize scroll load', updateParallax);

function update(){

  for (let i = 0; i < canvasAnimations.length; i++) {
    if(canvasAnimations[i].onScreen){
      canvasAnimations[i].update();
      canvasAnimations[i].draw();
    }
  };

  requestAnimationFrame(update);
}

requestAnimationFrame(update);




init();
