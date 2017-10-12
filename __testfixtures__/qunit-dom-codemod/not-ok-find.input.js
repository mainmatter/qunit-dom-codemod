assert.notOk(find('.foo'));
assert.notOk(find('.foo')[0]);

assert.notOk(find('.foo'), 'custom message');
assert.notOk(find('.foo')[0], 'custom message');

assert.notOk(find('.foo', '.parent-scope'));
assert.notOk(find('.foo', '.parent-scope')[0]);

assert.equal(find('.foo'));

assert.notOk(true);