assert.dom('.foo').exists();
assert.dom('.foo').exists();

assert.dom('.foo').exists('custom message');
assert.dom('.foo').exists('custom message');

assert.dom('.foo', '.parent-scope').exists();
assert.dom('.foo', '.parent-scope').exists();

assert.ok(find('input:first'));
assert.ok(find('input:contains(foo)'));

assert.dom('.foo').exists();
assert.dom('.foo').exists();

assert.dom('.foo').exists('custom message');
assert.dom('.foo').exists('custom message');

assert.dom('.foo', '.parent-scope').exists();
assert.dom('.foo', '.parent-scope').exists();

assert.equal(find('.foo'));

assert.ok(true);

assert.equal(foo(), true);
