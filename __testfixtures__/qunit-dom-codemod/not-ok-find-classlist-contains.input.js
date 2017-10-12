assert.notOk(find('.foo').classList.contains('bar'));

assert.notOk(find('.foo').classList.contains('bar'), 'custom message');

assert.notOk(find('.foo', '.parent-scope').classList.contains('bar'));
