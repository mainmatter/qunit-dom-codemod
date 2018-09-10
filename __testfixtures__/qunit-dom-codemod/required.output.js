assert.dom('.foo').isRequired();
assert.dom(foo).isRequired();
assert.dom(foo.bar).isRequired();
assert.dom('.foo').isRequired();
assert.dom('.foo').isRequired();
assert.dom('.foo').isNotRequired();
assert.dom('.foo').isNotRequired();
assert.dom('.foo').isNotRequired();

assert.dom('.foo', formDiv).isRequired('custom message');
assert.dom('.foo').isNotRequired();

assert.dom('.foo').isRequired();
assert.dom('.foo').isNotRequired();

assert.dom('.foo').isNotRequired();
assert.dom('.foo').isRequired();
