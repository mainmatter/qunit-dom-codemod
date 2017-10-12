assert.notOk(find('.foo'));

assert.notOk(find('.foo'), 'custom message');

assert.notOk(find('.foo', '.parent-scope'));

assert.equal(find('.foo'));

assert.notOk(true);