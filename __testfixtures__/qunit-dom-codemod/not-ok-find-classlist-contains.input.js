assert.notOk(find('.foo').classList.contains('bar'));

assert.notOk(find(foo).classList.contains('bar'));

assert.notOk(find(foo.bar).classList.contains('bar'));

assert.notOk(find('.foo').classList.contains('bar'), 'custom message');

assert.notOk(find('.foo', '.parent-scope').classList.contains('bar'));

assert.equal(find('.foo').classList.contains('bar'), false);
assert.strictEqual(find('.foo').classList.contains('bar'), false);

assert.equal(find('.foo').classList.contains('bar'), false, 'custom message');
assert.strictEqual(find('.foo').classList.contains('bar'), false, 'custom message');

assert.equal(find('.foo', '.parent-scope').classList.contains('bar'), false);
assert.strictEqual(find('.foo', '.parent-scope').classList.contains('bar'), false);
