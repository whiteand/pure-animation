# pure-animation

Animation Library which understands animation as a function of time. It has many helpers to work with such animations.

## Example of usage

[Codesandbox with block animation that can be paused and reversed](https://codesandbox.io/s/green-monad-6clpt?file=/src/App.js)

## Contents

- [Example of usage](#example-of-usage)
- [Glossary](#glossary)
- [API](#api)
  - [always](#always)
  - [bounded](#bounded)
  - [chain](#chain)
  - [cos](#cos)
  - [fromArray](#fromarray)
  - [identity](#identity)
  - [linear](#linear)
  - [map](#map)
  - [mapTime](#maptime)
  - [mergeMap](#mergemap)
  - [switchMap](#switchmap)

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
notificationAnimation(210); // 0.9, ince opacityFrom1To0(210 - 200) => 0.9
```

**RESTRICTION** values passed to `chain` function should be in order of time increasing. Next function will **NOT** work correctly:

```javascript
const notificationAnimation = chain(
  [200, opacityFrom1To0],
  [0, opacityFrom0To1],
  [100, () => 1]
);
```

### cos

```javascript
function cos(startTime: number, endTime: number, minValue: number, maxValue: number): Animation<number>;
```

This function returns animation simmilar to `ease-in-out` animation that changes from `minValue` to `maxValue`, when time changes from `startTime` to `maxTime`.

Example:

```javascript
const opacityAnimation = cos(
  0, // animation start from time 0
  60, // animation finishes when time is 60
  0, // animation will equal to 0 when time <= startTime
  1 // animation will equal to 1 when time >= endTime.
); // animation will return values from 0 to 1 when startTime < time < endTime

opacityAnimation(-1); // 0
opacityAnimation(0); // 0
opacityAnimation(1); // 0.000685
opacityAnimation(30); // 0.5
opacityAnimation(55); // 0.9829
opacityAnimation(60); // 1
opacityAnimation(61); // 1
```

### fromArray

```javascript
function fromArray<T>(array: T[]): Animation<T>
```

You can use this function to create animation of array items. Index of array is treated as a time.

```javascript
const daysAnimation = fromArray([
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]);

daysAnimation(-1); // 'monday'
daysAnimation(0); // 'monday'
daysAnimation(0.5); // 'monday'
daysAnimation(1); // 'tuesday'
daysAnimation(6); // 'sunday'
daysAnimation(6.5); // 'sunday'
daysAnimation(25); // 'sunday'
```

### identity

```javascript
identity: Animation<number>
```

This is animation that returns time.

Same as:

```javascript
const identity = (time) => time;
```

You can use it as parameter to create other functions that will be more useful.

```javascript
const boundedTimeAnimation = bounded(0, 20, identity);

boundedTimeAnimation(-10); // 0
boundedTimeAnimation(0); // 0
boundedTimeAnimation(5); // 5
boundedTimeAnimation(20); // 20
boundedTimeAnimation(25); // 25
```

### linear

```javascript
function linear(x0: number, x1: number, y0: number, y1: number, x: number): number;
```

Returns `y` coordinate of the point on the line that passes `(x0, y0)` and `(x1, y1)` and has x coordinate equal to `x`.

```javascript
const celsiusToFahrenheit = (celsius) => linear(0, 10, 32, 50, ceilsius);
celsiusToFahrenheit(0); // 32
celsiusToFahrenheit(10); // 50
celsiusToFahrenheit(36.6); // 97.88
```

### map

```javascript
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

### mergeMap

```javascript
function mergeMap<A, B, ...Rest>(
  merge: (a: A, b: B, ...restAnimatedValues) => R
  aAnimation: Animation<A>,
  bAnimation: Animation<B>,
  ...restAnimations,
): Animation<R>
```

You can create animation by combining of values of other animations

Example:

```javascript
const temperatureAnimation = (year) => {
  switch (year) {
    case 2021:
      return 60;
    case 2025:
      return 40;
    case 2030:
      return 30;
    default:
      return 25;
  }
};
const populationAnimation = (year) => {
  return 7_500_000_000 + year * 100_000_000;
};

const temperatureAndPopulationAnimation = mergeMap(
  (temperature, population) => ({ temperature, population }),
  temperatureAnimation,
  populationAnimation
);

temperatureAndPopulationAnimation(2021); // { temperature: 60, population: 7500000000}
temperatureAndPopulationAnimation(2022); // { temperature: 25, population: 7600000000}
```

### switchMap

```javascript
switchMap<T, R>(
  createAnimation: (value: T) => Animation<R>,
  animation: Animation<T>
): Animation<R>
```

You can use animated value to create new animation and apply it. See example below:

```javascript
const scrollAnimation = () => window.scrollY;
const scrolledBasedPosition = switchMap((scroll) => {
  if (scroll < 100) return () => 1000;
  if (scroll > 200) return () => -1000;
  return (time) => time / 100;
}, scrollAnimation);
scrolledBasedPosition(10); // will return 1000 if scroll < 100
scrolledBasedPosition(250); // will return -1000 if scroll > 200
scrolledBasedPosition(150); // will return 1.5
```
