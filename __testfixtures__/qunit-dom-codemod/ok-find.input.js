assert.ok(find('.foo'));
assert.ok(find('.foo')[0]);

assert.ok(find('.foo'), 'custom message');
assert.ok(find('.foo')[0], 'custom message');

assert.ok(find('.foo', '.parent-scope'));
assert.ok(find('.foo', '.parent-scope')[0]);

assert.equal(find('.foo'));

assert.ok(true);