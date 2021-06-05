assert.ok(find('.foo').required);
assert.ok(find(foo).required);
assert.ok(find(foo.bar).required);
assert.ok(find('.foo')[0].required);
assert.equal(find('.foo').required, true);
assert.strictEqual(find('.foo').required, true);
assert.notOk(find('.foo').required);
assert.notOk(find('.foo')[0].required);
assert.equal(find('.foo').required, false);
assert.strictEqual(find('.foo').required, false);

assert.ok(find('.foo', formDiv).is(':required'), 'custom message');
assert.equal(find('.foo')[0].is(':required'), false);
assert.strictEqual(find('.foo')[0].is(':required'), false);

assert.ok(find('.foo:required'));
assert.notOk(find('.foo:required'));

assert.equal(find('.foo:required').length, 0);
assert.strictEqual(find('.foo:required').length, 0);
assert.equal(find('.foo:required').length, 1);
assert.strictEqual(find('.foo:required').length, 1);
