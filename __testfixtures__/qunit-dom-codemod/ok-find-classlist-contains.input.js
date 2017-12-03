assert.ok(find('.foo').classList.contains('bar'));

assert.ok(find('.foo').classList.contains('bar'), 'custom message');

assert.ok(find('.foo', '.parent-scope').classList.contains('bar'));

assert.equal(find('.foo').classList.contains('bar'), true);

assert.equal(find('.foo').classList.contains('bar'), true, 'custom message');

assert.equal(find('.foo', '.parent-scope').classList.contains('bar'), true);
