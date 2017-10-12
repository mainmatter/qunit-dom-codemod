assert.ok(find('.foo').classList.contains('bar'));

assert.ok(find('.foo').classList.contains('bar'), 'custom message');

assert.ok(find('.foo', '.parent-scope').classList.contains('bar'));
