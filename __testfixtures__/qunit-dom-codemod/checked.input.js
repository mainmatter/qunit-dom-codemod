assert.ok(find('.foo').checked);
assert.ok(find('.foo')[0].checked);
assert.equal(find('.foo').checked, true);
assert.strictEqual(find('.foo').checked, true);
assert.notOk(find('.foo').checked);
assert.notOk(find('.foo')[0].checked);
assert.equal(find('.foo').checked, false);
assert.strictEqual(find('.foo').checked, false);

assert.ok(find('input[type=checkbox]', formDiv).is(':checked'), 'There is value in checkbox');
assert.equal(find('input[type=checkbox]')[0].is(':checked'), false);
assert.strictEqual(find('input[type=checkbox]')[0].is(':checked'), false);

assert.ok(find('.checkbox-appointments input:checked'), 'Appointments checkbox is checked');
assert.notOk(find('.checkbox-appointments input:checked'), 'Appointments checkbox is not checked');

assert.equal(find('.checkbox-appointments input:checked').length, 0, 'Appointments checkbox is not checked');
assert.strictEqual(find('.checkbox-appointments input:checked').length, 0, 'Appointments checkbox is not checked');
assert.equal(find('.checkbox-appointments input:checked').length, 1, 'Appointments checkbox is checked');
assert.strictEqual(find('.checkbox-appointments input:checked').length, 1, 'Appointments checkbox is checked');
