assert.ok(find('.foo'));
assert.ok(find('.foo')[0]);
assert.ok(find(foo));
assert.ok(find(foo.bar));

assert.ok(find('.foo'), 'custom message');
assert.ok(find('.foo')[0], 'custom message');

assert.ok(find('.foo', '.parent-scope'));
assert.ok(find('.foo', '.parent-scope')[0]);

assert.ok(find('input:first'));
assert.ok(find('input:contains(foo)'));

assert.equal(find('.foo'), true);
assert.equal(find('.foo')[0], true);

assert.equal(find('.foo'), true, 'custom message');
assert.equal(find('.foo')[0], true, 'custom message');

assert.equal(find('.foo', '.parent-scope'), true);
assert.equal(find('.foo', '.parent-scope')[0], true);

assert.equal(find('.foo'));

assert.ok(true);

assert.equal(foo(), true);
