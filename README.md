# pure-animation

Animation Library which understands animation as a function of time. It has many helpers to work with such animations.

## Glossary

**Animation** - it's a function from time to some value.

```javascript
type Animation<AnimatedValue> = (time: number) => AnimatedValue;
```

**Animated Value** - value return by function

**Time** - any numeric value. You can use for it different possible numbers:

- index of element in array
- ammount of milliseconds after start of the animation
- current frame index

## API

### always

```javascript
function always<T>(constant: T): Animation<T>
```

Given some `constant` returns animation that always returns this `constant`.

Example:

```javascript
const always10 = always(10);
always10(0); // 10
always10(1); // 10
always10(2); // 10
```

### bounded

```javascript
bounded<R>(minTime: number, maxTime: number, animation: Animation<R>): Animation<R>
```

Creates new animation that:

- will return `animation(minTime)` if `time <= minTime`.
- will return `animation(maxTime)` if `time >= maxTime`
- will return `animation(time)` otherwise

Example:

```javascript
const opacityAnimation = (time) => time / 100;
const appearAnimation = bounded(0, 100, opacityAnimation);

appearAnimation(-10); // 0
appearAnimation(0); // 0
appearAnimation(5); // 0.05
appearAnimation(100); // 1
appearAnimation(120); // 120
```

### chain

```javascript
function chain<T>([t0, animation0], [t1, animation1], ...): Animation<T>
```

You can use this function to create chains of the different animations.

```javascript
// frameIndex should be from 0 to 100
const opacityFrom0To1 = (frameIndex: number) => frameIndex / 100;
const opacityFrom1To0 = (frameIndex: number) => 1 - frameIndex / 100;

const notificationAnimation = chain(
  [0, opacityFrom0To1], // from frame 0 to 100 (exclusive) it will appear
  [100, () => 1], // after frame 100 to 200 (exclusive) it will return 1
  [200, opacityFrom1To0] // after frame 200 it will fade out.
);

notificationAnimation(-10); // 0, since -10 < 0 chained function will return opacityFrom0To1(0).
notificationAnimation(5); // 0.05, since opacityFrom0To1(5) => 0.05
notificationAnimation(120); // 1, since () => 1 always returns 1
notificationAnimation(210); // 0.9, since opacityFrom1To0(210 - 200) => 0.9
```

### map

```

map<T, R>(transform: (value: T) => R, animation: Animation<T>): Animation<R>

```

Creates animation which will return `transform(animation(time))` for each `time`.

Example:

```javascript
const offsetAnimation = (time: number) => time * 10 + 10;
const offsetPixelAnimation = map((offset) => `${offset}px`, offsetAnimation);

offsetPixelAnimation(100); // '1010px'
```

### mapTime

```javascript
mapTime<T>(transformTime: (newTime: number) => number, animation: Animation<T>): Animation<T>
```

Transforms `newTime` parameter before passing to the animation.

You can use it in order to create slow-mo effects. Example:

```javascript
const opacityAnimation = (time) => time / 100 + 0.1;
const slowMoOpacityAnimation = mapTime(
  (fastTime) => fastTime / 100,
  opacityAnimation
);
```
