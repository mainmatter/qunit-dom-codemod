assert.equal(find('.foo').length, 0);
assert.strictEqual(find('.foo').length, 0);
assert.equal(find(foo).length, 0);
assert.strictEqual(find(foo).length, 0);
assert.equal(find(foo.bar).length, 0);
assert.strictEqual(find(foo.bar).length, 0);
assert.equal(findAll('.foo').length, 0);
assert.strictEqual(findAll('.foo').length, 0);
assert.equal(findAll(foo).length, 0);
assert.strictEqual(findAll(foo).length, 0);
assert.equal(findAll(foo.bar).length, 0);
assert.strictEqual(findAll(foo.bar).length, 0);

assert.equal(find('.foo').length, 0, 'custom message');
assert.strictEqual(find('.foo').length, 0, 'custom message');

assert.equal(find('.foo', '.parent-scope').length, 0);
assert.strictEqual(find('.foo', '.parent-scope').length, 0);

assert.equal(find('input:first').length, 0);
assert.strictEqual(find('input:first').length, 0);

assert.equal(find('.foo').length, 2);
assert.strictEqual(find('.foo').length, 2);
assert.equal(findAll('.foo').length, 2);
assert.strictEqual(findAll('.foo').length, 2);

assert.equal(find('.foo').length, 2, 'custom message');
assert.strictEqual(find('.foo').length, 2, 'custom message');

assert.equal(find('.foo', '.parent-scope').length, 2);
assert.strictEqual(find('.foo', '.parent-scope').length, 2);

assert.equal(find('.foo'), 'bar');
assert.strictEqual(find('.foo'), 'bar');

assert.equal(true);
assert.strictEqual(true);