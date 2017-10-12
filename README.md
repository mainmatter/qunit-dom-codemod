
qunit-dom-codemod
==============================================================================

Installation
------------------------------------------------------------------------------

`ember-mocha-codemods` itself doesn't need to be installed, but you need to
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
qunit-dom-codemod is licensed under the [MIT License](LICENSE).
