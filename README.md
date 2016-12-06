[@xslet/window][repo-url] [![Github.io][io-image]][io-url] [![NPM version][npm-image]][npm-url] [![MIT License][mit-image]][mit-url] [![Coverage Status][coverage-image]][coverage-url]
=============

Gets window informations and provide operations related to window.

Install
-------

### Install from npm

Executes following command to install this package from npm.

```sh
$ npm install --save @xslet/window
```

### Load this pakage in a browser

```js
<script src="xslet.window.min.js"></script>
```

Usage
-----

### .unitOfSize

```js
xslet.window.unitOfSize = 'rem'
```

This property can be set only once before it is used.

### .rootFontSize

```js
xslet.window.rootFontSize = '3.51mm'
xslet.window.rootFontSize // => about 13 [px]

xslet.window.rootFontSize = 13  // = 13 [px]
document.getElementById('id2').style.fontSize = '2rem' // The element's font size is 26px 
```

This property is a number, but can be set a string which consists of a number and a unit (like '2.5mm'). The unit can be set: `px`, `mm` or `rem`.

### .convertUnit

```js
xslet.window.rootFontSize = 13
xslet.window.convertUnit(2, 'rem', 'px') // => 26px
```

### .scrollbarWidth

```js
xslet.window.scrollbarWidth // => 17, on IE11
```

Since this property uses `.unitOfSize` as the unit, this value is also determined with `.unitOfSize`.

Some browsers changes its scroll bar width by zooming (to keep appearance width of its scroll bar). This property solves the change by re-calculating when window contents are re-layouted.

### .addRelayoutListener

```js
xslet.window.addRelayoutListener(function(event) {
  console.log('re-layout window contents! : (' + event.width + ', ' + event.height + ')');
})
```

The listener function is called everytime the browser is resized, but the times of calling are much less than the number of resize events.

A re-layout listener function is passed an argument of which properties are `.width` and `.height`, which is inner width and height of a window.
For the unit of these values, `.unitOfSize` is used. 

### .relayout

```js
xslet.window.relayout()
```

This code calls re-layout listener functions manually.

APIs
----

### Properties

#### <u>.unitOfSize</u>

Is used in whole of xslet modules.
This value allowed are `'px'`, `'mm'` and `'rem'` and can be set only once.

**Type:** string

#### <u>.rootFontSize</u>

Is assigned to the HTML element.
This value is a number and the unit is `'px'`, but can be set in unit either
`'px'` or `'mm'` with a string like `'10px'` or `'2mm'`.

**Type:** number

#### <u>.scrollbarWidth</u>

Is the scroll bar width.
The unit of this value is `xslet.window.unitOfSize`.
This value is re-calculated when window contents are re-layouted, because some browsers change their scroll bar widths by zooming.

**Type:** number

#### <u>.relayoutDelay</u>

Is the delay time of re-layouting against resize events.
The unit of this value is milli-second.

**Type:** number

### Methods

#### <u>.convertUnit(value, fromUnit, toUnit)</u>

Converts a value between specified units.
The units can be specified among `'px'`, `'mm'` and `'rem'`.

**Parameters:**

   * **value** {number} : A value to be converted.
   * **fromUnit** {string} : A unit of a value before conversion.
   * **toUnit** {string} : A unit of a value after conversion.

**Return:**

   * {number} : A value after conversion.

#### <u>.addRelayoutListener(listener)</u>

Adds a listener function to be called when window contents are re-layouted.
Re-layouting window contents are made done at the times of first viewing, window resizing, changing a part of view, and so on. 

**Parameters:**

* **listener** {function} : A listener function.
    This function has an *event* object as an argument of which properties are follows:
    
    * <i>event</i>**.width** {number} : Inner width of a window. 
        The unit of this value is `xslet.window.unitOfSize`.
    * <i>event</i>**.height** {number} : Inner height of a window.
        The unit of this value is `xslet.window.unitOfSize`. 

#### <u>.removeRelayoutListener(listener)</u>

Removes a listener function for re-layout.

**Parameters:**

* **listener** {function} : A listener function.

#### <u>.relayout()</u>

Executes re-layout event listener functions manually.

Behavior checks on browsers
---------------------------

Show this page: [test/web/index.html](test/web/index.html).

License
-------

Copyright (C) 2016 Takayuki Sato

This program is free software under [MIT][mit-url] License.
See the file LICENSE in this distribution for more details.

[repo-url]: https://github.com/xslet/window/
[io-image]: http://img.shields.io/badge/HP-github.io-ffbbbb.svg
[io-url]: https://xslet.github.io/window/
[npm-image]: http://img.shields.io/badge/npm-v0.2.0-blue.svg
[npm-url]: https://www.npmjs.org/package/@xslet/window/
[mit-image]: http://img.shields.io/badge/license-MIT-green.svg
[mit-url]: https://opensource.org/licenses/MIT
[coverage-image]: https://coveralls.io/repos/github/xslet/window/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/xslet/window?branch=master
