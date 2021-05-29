assert.dom('.foo').doesNotExist();
assert.dom('.foo').doesNotExist();
assert.dom(foo).doesNotExist();
assert.dom(foo).doesNotExist();
assert.dom(foo.bar).doesNotExist();
assert.dom(foo.bar).doesNotExist();
assert.dom('.foo').doesNotExist();
assert.dom('.foo').doesNotExist();
assert.dom(foo).doesNotExist();
assert.dom(foo).doesNotExist();
assert.dom(foo.bar).doesNotExist();
assert.dom(foo.bar).doesNotExist();

assert.dom('.foo').doesNotExist('custom message');
assert.dom('.foo').doesNotExist('custom message');

assert.dom('.foo', '.parent-scope').doesNotExist();
assert.dom('.foo', '.parent-scope').doesNotExist();

assert.equal(find('input:first').length, 0);
assert.strictEqual(find('input:first').length, 0);

assert.dom('.foo').exists({ count: 2 });
assert.dom('.foo').exists({ count: 2 });
assert.dom('.foo').exists({ count: 2 });
assert.dom('.foo').exists({ count: 2 });

assert.dom('.foo').exists({ count: 2 }, 'custom message');
assert.dom('.foo').exists({ count: 2 }, 'custom message');

assert.dom('.foo', '.parent-scope').exists({ count: 2 });
assert.dom('.foo', '.parent-scope').exists({ count: 2 });

assert.equal(find('.foo'), 'bar');
assert.strictEqual(find('.foo'), 'bar');

assert.equal(true);
assert.strictEqual(true);