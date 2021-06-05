assert.dom('.foo').isDisabled();
assert.dom('.foo').isDisabled();
assert.dom('.foo').isDisabled();
assert.dom('.foo').isDisabled();
assert.dom('.foo').isNotDisabled();
assert.dom('.foo').isNotDisabled();
assert.dom('.foo').isNotDisabled();
assert.dom('.foo').isNotDisabled();

assert.dom('.foo', formDiv).isDisabled('custom message');
assert.dom('.foo').isNotDisabled();
assert.dom('.foo').isNotDisabled();

assert.dom('.foo').isDisabled();
assert.dom('.foo').isNotDisabled();

assert.dom('.foo').isNotDisabled();
assert.dom('.foo').isNotDisabled();
assert.dom('.foo').isDisabled();
assert.dom('.foo').isDisabled();
