assert.equal(find('.foo').value, 'bar');

assert.equal(find('.foo').value, 'bar', 'custom message');

assert.equal(find('.foo', '.parent-scope').value, 'bar');

assert.equal(find('.foo'), 'bar');

assert.equal(true);