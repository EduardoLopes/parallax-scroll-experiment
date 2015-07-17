# [Parallax Scroll](http://eduardolopes.github.io/parallax-scroll-experiment/)

Parallax scroll, we are back in 2010?? no, wish i was back there with the same knowledge i have today. I have tried parallax in videos games before and in some of my canvas experiments, but never tried to make a parallax scroll webpage!

There is lot's of plugins out there to archive the parallax effect, but i didn't use any of it. The main goal is learn how to make it and don't be limited by the plugin's features!

While programming this i realize (again), that it's possibe to extract numbers from anything and do crazy fun stuff with it. I think this is really really fun!


## Performance

I'm not animating colors, so it'll not be 'expensive' to repaint DOM stuff. I'm  using (CSS) translate to move all the rectangles. The canvas animations only runs (update and draw) if is on screen. And is not matematicaly possivel to have two canvas animations on screen at the same time! 

The rectangles on the background are updated only if it's container is on screen and if the rectangle itself is on screen, about 12 rectangles a moved each time the scroll event is trigged and no more then 20 rectangles are checked!

## Tools

ES6 ([babel](https://babeljs.io));  
[Zepto](zeptojs.com);  
[tween.js](https://github.com/tweenjs/tween.js)  
[random.js](https://github.com/ckknight/random-js)