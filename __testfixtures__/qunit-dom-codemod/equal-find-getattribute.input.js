assert.equal(find('.foo').getAttribute('bar'), 'baz');
assert.strictEqual(find('.foo').getAttribute('bar'), 'baz');

assert.equal(find('.foo').getAttribute('bar'), 'baz', 'custom message');
assert.strictEqual(find('.foo').getAttribute('bar'), 'baz', 'custom message');

assert.equal(find('.foo', '.parent-scope').getAttribute('bar'), 'baz');
assert.strictEqual(find('.foo', '.parent-scope').getAttribute('bar'), 'baz');

assert.equal(find('.foo'), 'bar');
assert.strictEqual(find('.foo'), 'bar');

assert.equal(true);
assert.strictEqual(true);
