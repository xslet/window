[@xslet/window][repo-url] [![Github.io][io-image]][io-url] [![NPM version][npm-image]][npm-url] [![MIT License][mit-image]][mit-url] [![Coverage Status][coverage-image]][coverage-url]
=============

Gets window informations and provide operations related to window.

Build
-----

Build this module:

```sh
$ gulp build
```

Usage
-----

Load this module in a browser:

```js
<script src="xslet.window.min.js"></script>
```

Use `xslet.window.unitOfSize`:

```js
xslet.window.unitOfSize = 'rem'
document.getElementById('id1').style.width = 10 + xslet.window.unitOfSize // = '10rem'
```

Use `xslet.window.rootFontSize`:

```js
xslet.window.rootFontSize = '3.51mm'
xslet.window.rootFontSize // => about 13 [px]

xslet.window.rootFontSize = 13  // = 13 [px]
document.getElementById('id2').style.fontSize = '2rem' // The element's font size is 26px 
```

Use `xslet.window.convertUnit`:

```js
xslet.window.rootFontSize = 13
xslet.window.convertUnit(2, 'rem', 'px') // => 26px
```

APIs
----

#### <u>xslet.window.unitOfSize</u>

The unit which used in xslet modules.
This value allowed are `'px'`, `'mm'` and `'rem'` and can be set only once.

Type: string

#### <u>xslet.window.rootFontSize</u>

The font size which is assigned to the HTML element.
This value is a number and the unit of this property is `'px'`, but can be set in unit either `'px'` or `'mm'` with a string like `'10px'` or `'2mm'`.

Type: number

#### <u>xslet.window.convertUnit(value, fromUnit, toUnit)</u>

Converts `value` in `fromUnit` to new value in `toUnit`.
The units allowed are either `'px'`, `'mm'` and `'rem'`. 

**Parameter:**

* value {number} : A value to be converted.
* fromUnit {string} : The unit of `value`.
* toUnit {string} : The unit of value after converted.

**Return:**

* {number} : The value after converted.

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
[npm-image]: http://img.shields.io/badge/npm-v0.1.1-blue.svg
[npm-url]: https://www.npmjs.org/package/@xslet/window/
[mit-image]: http://img.shields.io/badge/license-MIT-green.svg
[mit-url]: https://opensource.org/licenses/MIT
[coverage-image]: https://coveralls.io/repos/github/xslet/window/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/xslet/window?branch=master
