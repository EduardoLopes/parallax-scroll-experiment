import {COLORS} from "./colors";
import {AnimationOne} from "./animation-one";
import {AnimationTwo} from "./animation-two";
import {AnimationThree} from "./animation-three";
import {AnimationFour} from "./animation-four";
import {AnimationFive} from "./animation-five";
import {AnimationSix} from "./animation-six";
import {random} from "./random";

const $window = $(window);
const $document = $(document);
const $containers = $('.container');
//scroll tween
const tween = new TWEEN.Tween( scrollTo )
        .to( { scrollTo: 0 }, 1000 )
        .easing( TWEEN.Easing.Quartic.InOut )
        .onUpdate( function () {

          $window.scrollTop(this.scrollTo);

        } ).onStart(function() {

          this.scrollTo = $window.scrollTop();

        });

const canvasAnimations = [
  new AnimationOne,
  new AnimationTwo,
  new AnimationThree,
  new AnimationFour,
  new AnimationFive,
  new AnimationSix
];

let windowHeight = $window.height();
let windowWidth = $window.width();

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

  $rect.css({
    width: size,
    height: size,
    top: y,
    left: x,
    background: `hsl(${COLORS[containerIndex].h},${COLORS[containerIndex].s + 20}%,${COLORS[containerIndex].l + 10}%)`,
    opacity: 0.5
  });

  return $rect;
}

function scrollTo(coord){
  tween.stop();
  tween.to( { scrollTo: coord });
  tween.start();
}

$('.next').on('click', function(){
  let $this = $(this);
  scrollTo($this.parent().next().offset().top);
});

$('.prev').on('click', function(){
  let $this = $(this);
  scrollTo($this.parent().prev().offset().top);
});

$('.canvas').on('click', function(){
  let $this = $(this);
  scrollTo($this.parent().offset().top);
});

/*Stop scroll tweening if scroll using the mouse wheel*/
$window.on('mousewheel', function(){
  tween.stop();
});

function init(){
  let $container;
  let $canvas;

  //add COLORS to each container
  COLORS.forEach(function(item, index){

    $($containers[index]).css('background', COLORS[index].toString());

  });

  $containers.each(function(index, item){

    $container = $(item);
    $canvas = $container.children('.canvas');

    $container.children('.prev, .next').css({
      background: `hsl(${COLORS[index].h},${COLORS[index].s + 20}%,${COLORS[index].l + 15}%)`
    });

    $canvas.css({
      border: `hsl(${COLORS[index].h},${COLORS[index].s + 20}%,${COLORS[index].l + 10}%) solid 10px`,
      background: `hsl(${COLORS[index].h},${COLORS[index].s - 5}%,${COLORS[index].l - 15}%)`
    });

    for (let i = 0; i < 10; i++) {
      $container.append(generateRect(index));
    };

  });

}

function updateParallax(){

  let scrollPosition = $window.scrollTop();
  let $rects;
  let $container;
  let containerOffset;
  let $canvas;
  let height;
  let percentage;
  let halfPercentage;
  let percentageInViewPort;
  let floatPercentage;
  let $prev;
  let $next;
  let $item;

  windowHeight = $window.height();
  windowWidth = $window.width();

  $containers.each(function(index, item){

    $container = $(item);
    containerOffset = $container.offset();
    $canvas = $container.children('.canvas');
    height = $container.height();
    percentage = Math.max(0, Math.min(100, ((containerOffset.top + height) - scrollPosition) / (windowHeight + height) * 100));

    halfPercentage = percentage - 50;
    percentageInViewPort = (halfPercentage / 50) * 100;
    floatPercentage = (percentageInViewPort / 100);

    $prev = $container.children('.prev');
    $next = $container.children('.next');

    $prev.css('transform', `translate(-50%, ${-floatPercentage * 50 }px) rotate(-90deg)`);
    $next.css('transform', `translate(-50%, ${-floatPercentage * 50 }px) rotate(-90deg)`);

    if(scrollPosition + windowHeight > containerOffset.top &&  containerOffset.top + $container.height() > scrollPosition){

      $rects = $container.children('.rect');
      $canvas.css('transform', `translate(0, ${floatPercentage * 400}px)`);

      $rects.each(function(index, item){

        $item = $(item);

        if(scrollPosition + windowHeight > $item.offset().top &&  $item.offset().top + $item.height() > scrollPosition){
          $item.css('transform', `translate(${floatPercentage * parseInt($item.data('pixels-to-travel-horizontal')) }px, ${floatPercentage * parseInt($item.data('pixels-to-travel-vertical')) }px)`);
        }

      });

    }

    if(scrollPosition + windowHeight > $canvas.offset().top &&  $canvas.offset().top + $canvas.height() > scrollPosition){
      canvasAnimations[index].onScreen = true;
      canvasAnimations[index].scrollPosition = percentageInViewPort;
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
