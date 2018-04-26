assert.ok(find('.foo').checked);
assert.ok(find('.foo')[0].checked);
assert.equal(find('.foo').checked, true);
assert.notOk(find('.foo').checked);
assert.notOk(find('.foo')[0].checked);
assert.equal(find('.foo').checked, false);

assert.ok(find('input[type=checkbox]', formDiv).is(':checked'), 'There is value in checkbox');
assert.equal(find('input[type=checkbox]')[0].is(':checked'), false);
