assert.dom('.foo').isChecked();
assert.dom('.foo').isChecked();
assert.dom('.foo').isChecked();
assert.dom('.foo').isNotChecked();
assert.dom('.foo').isNotChecked();
assert.dom('.foo').isNotChecked();

assert.dom('input[type=checkbox]', formDiv).isChecked('There is value in checkbox');
assert.dom('input[type=checkbox]').isNotChecked();
