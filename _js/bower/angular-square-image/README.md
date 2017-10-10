# AngularJS directive angular-square-image

Directive angular-square-image reads image URL, loads it to HTML5 canvas, and
crops it to square-sized image. The width and height are taken from original
image's width or height, from which is smaller.

## Usage

    <square-image image="{{ myCoolScopeVar }}">
    ...or
    <square-image image="http://someserver/some/path/image.jpg">

See `index.html` in source repository or
http://plnkr.co/edit/ZRigKiP7IH9gMQmiygtj?p=preview for a complete example.

## Repository

    git@github.com:jussikinnula/angular-square-image.git

## Installation

    bower install angular-square-image --save
