assert.dom('.foo').exists();
assert.dom('.foo').exists();

assert.dom('.foo').exists('custom message');
assert.dom('.foo').exists('custom message');

assert.dom('.foo', '.parent-scope').exists();
assert.dom('.foo', '.parent-scope').exists();

assert.equal(find('.foo'));

assert.ok(true);