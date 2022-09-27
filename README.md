
qunit-dom-codemod
==============================================================================

Basic codemod to automatically convert your assertions to
[qunit-dom](https://github.com/Mainmatter/qunit-dom) assertions


Installation
------------------------------------------------------------------------------

`qunit-dom-codemod` itself doesn't need to be installed, but you need to
install [`jscodeshift`](https://github.com/facebook/jscodeshift) to run the
codemod script:

```
npm install -g jscodeshift
```


Usage
------------------------------------------------------------------------------

```
jscodeshift -t https://raw.githubusercontent.com/Mainmatter/qunit-dom-codemod/master/qunit-dom-codemod.js ./tests
```


License
------------------------------------------------------------------------------

qunit-dom-codemod is developed by and &copy;
[Mainmatter GmbH](http://mainmatter.com) and contributors. It is released under the
[MIT License](https://github.com/Mainmatter/qunit-dom/blob/master/LICENSE.md).
