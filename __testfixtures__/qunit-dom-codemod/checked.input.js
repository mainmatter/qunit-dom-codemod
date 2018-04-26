assert.ok(find('.foo').checked);
assert.ok(find('.foo')[0].checked);
assert.equal(find('.foo').checked, true);
assert.notOk(find('.foo').checked);
assert.notOk(find('.foo')[0].checked);
assert.equal(find('.foo').checked, false);
