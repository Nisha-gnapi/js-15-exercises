Ex 08: Typewriter Text Animation
◆ 1. Question Explanation (Simple)

You need to:

Show text letter by letter (typing)
Pause
Erase letter by letter
Move to next sentence
Repeat forever
Show a blinking cursor (|)

# Exercise 8: Typewriter Text Animation

## ◆ Problem

Create a typewriter animation that types, pauses, erases, and cycles through multiple phrases.

## ◆ Approach

* Use recursive setTimeout for typing and erasing
* Use slice() to control visible text
* Chain functions using callbacks
* Loop phrases using modulo

## ◆ Concepts Used

* DOM Manipulation
* setTimeout (recursive)
* Strings (slice)
* Events & animation logic

## ◆ Code Explanation

### type()

* Adds one character at a time
* Calls itself recursively

### erase()

* Removes one character at a time
* Calls itself recursively

### startCycle()

* Controls flow: type → erase → next phrase

## ◆ How to Run

1. Open index.html in browser
2. Watch animation

## ◆ Example Behavior

Hello → pause → erase → next sentence → repeat

## ◆ Notes

* Recursive setTimeout controls timing
* No loops used for animation
* Cursor blinking handled using CSS animation


## ◆ Demo

[Watch Demo](./demo_op.mp4)