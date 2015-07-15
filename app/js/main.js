import {COLORS} from "./colors";
import {AnimationOne} from "./animation-one";
import {AnimationTwo} from "./animation-two";
import {AnimationThree} from "./animation-three";
import {AnimationFour} from "./animation-four";
import {AnimationFive} from "./animation-five";
import {AnimationSix} from "./animation-six";
import TWEEN from "tween.js";

const $window = $(window);
const $document = $(document);
let windowHeight = $window.height();
let windowWidth = $window.width();
const $containers = $('.container');

const random = new Random(Random.engines.mt19937().autoSeed());

const canvasAnimations = [
  new AnimationOne,
  new AnimationTwo,
  new AnimationThree,
  new AnimationFour,
  new AnimationFive,
  new AnimationSix
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
    background: `hsl(${COLORS[containerIndex].h},${COLORS[containerIndex].s + 20}%,${COLORS[containerIndex].l + 10}%)`,
    opacity: 0.5
  });

  return $rect;

}

function init(){

  //add COLORS
  COLORS.forEach(function(item, index){

    $($containers[index]).css('background', COLORS[index].toString());

  });

  $containers.each(function(index, item){

    let $container = $(item);
    let $canvas = $container.children('.canvas');

    $canvas.css({
      border: `hsl(${COLORS[index].h},${COLORS[index].s + 20}%,${COLORS[index].l + 10}%) solid 10px`,
      background: `hsl(${COLORS[index].h},${COLORS[index].s - 5}%,${COLORS[index].l - 15}%)`
    });

    for (let i = 0; i < 10; i++) {
      $container.append(generateRect(index));
    };

  });

}

$containers.on('click', function(){

  let $this = $(this);

   var tween = new TWEEN.Tween( { scrollTo: $window.scrollTop() } )
            .to( { scrollTo: $this.offset().top }, 400 )
            .easing( TWEEN.Easing.Quartic.InOut )
            .onUpdate( function () {

              $window.scrollTop(this.scrollTo);

            } )
            .start();

});

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
      canvasAnimations[index].onScreen = true;
      canvasAnimations[index].scrollPosition = per;
      $rects = $container.children('.rect');

      let $canvas = $container.children('.canvas');

      $canvas.css('transform', `translate(0, ${(per / 100) * 400}px)`);

      $rects.each(function(index, item){

        let $item = $(item);
        $item.css('transform', `translate(${(per / 100) * parseInt($item.data('pixels-to-travel-horizontal')) }px, ${(per / 100) * parseInt($item.data('pixels-to-travel-vertical')) }px)`);

      });

    } else {
      canvasAnimations[index].onScreen = false;

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

  TWEEN.update();

  requestAnimationFrame(update);
}

requestAnimationFrame(update);




init();
