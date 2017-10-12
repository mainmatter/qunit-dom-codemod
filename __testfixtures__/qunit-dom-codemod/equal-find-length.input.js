assert.equal(find('.foo').length, 0);
assert.equal(findAll('.foo').length, 0);

assert.equal(find('.foo').length, 0, 'custom message');

assert.equal(find('.foo', '.parent-scope').length, 0);

assert.equal(find('.foo').length, 2);
assert.equal(findAll('.foo').length, 2);

assert.equal(find('.foo').length, 2, 'custom message');

assert.equal(find('.foo', '.parent-scope').length, 2);

assert.equal(find('.foo'), 'bar');

assert.equal(true);