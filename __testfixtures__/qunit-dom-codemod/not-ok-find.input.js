assert.notOk(find('.foo'));
assert.notOk(find('.foo')[0]);
assert.notOk(find(foo));
assert.notOk(find(foo.bar));

assert.notOk(find('.foo'), 'custom message');
assert.notOk(find('.foo')[0], 'custom message');

assert.notOk(find('.foo', '.parent-scope'));
assert.notOk(find('.foo', '.parent-scope')[0]);

assert.equal(find('.foo'), false);
assert.equal(find('.foo')[0], false);

assert.equal(find('.foo'), false, 'custom message');
assert.equal(find('.foo')[0], false, 'custom message');

assert.equal(find('.foo', '.parent-scope'), false);
assert.equal(find('.foo', '.parent-scope')[0], false);

assert.equal(find('.foo'));

assert.notOk(true);