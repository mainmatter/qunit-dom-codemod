assert.ok(find('.foo').disabled);
assert.ok(find('.foo')[0].disabled);
assert.equal(find('.foo').disabled, true);
assert.notOk(find('.foo').disabled);
assert.notOk(find('.foo')[0].disabled);
assert.equal(find('.foo').disabled, false);

assert.ok(find('.foo', formDiv).is(':disabled'), 'custom message');
assert.equal(find('.foo')[0].is(':disabled'), false);

assert.ok(find('.foo:disabled'));
assert.notOk(find('.foo:disabled'));

assert.equal(find('.foo:disabled').length, 0);
assert.equal(find('.foo:disabled').length, 1);
