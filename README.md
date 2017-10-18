
qunit-dom-codemod
==============================================================================

Basic codemod to automatically convert your assertions to
[qunit-dom](https://github.com/simplabs/qunit-dom) assertions


Installation
------------------------------------------------------------------------------

`qunit-dom-codemods` itself doesn't need to be installed, but you need to
install [`jscodeshift`](https://github.com/facebook/jscodeshift) to run the
codemod script:

```
npm install -g jscodeshift
```


Usage
------------------------------------------------------------------------------

```
jscodeshift -t https://raw.githubusercontent.com/simplabs/qunit-dom-codemod/master/qunit-dom-codemod.js PATH
```


License
------------------------------------------------------------------------------

qunit-dom is developed by and &copy;
[simplabs GmbH](http://simplabs.com) and contributors. It is released under the
[MIT License](https://github.com/simplabs/qunit-dom/blob/master/LICENSE.md).
