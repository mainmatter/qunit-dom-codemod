assert.dom('.foo').doesNotExist();
assert.dom('.foo').doesNotExist();
assert.dom(foo).doesNotExist();
assert.dom(foo.bar).doesNotExist();

assert.dom('.foo').doesNotExist('custom message');
assert.dom('.foo').doesNotExist('custom message');

assert.dom('.foo', '.parent-scope').doesNotExist();
assert.dom('.foo', '.parent-scope').doesNotExist();

assert.dom('.foo').doesNotExist();
assert.dom('.foo').doesNotExist();

assert.dom('.foo').doesNotExist('custom message');
assert.dom('.foo').doesNotExist('custom message');

assert.dom('.foo', '.parent-scope').doesNotExist();
assert.dom('.foo', '.parent-scope').doesNotExist();

assert.equal(find('.foo'));

assert.notOk(true);