assert.dom('.foo').isChecked();
assert.dom('.foo').isChecked();
assert.dom('.foo').isChecked();
assert.dom('.foo').isNotChecked();
assert.dom('.foo').isNotChecked();
assert.dom('.foo').isNotChecked();

assert.dom('input[type=checkbox]', formDiv).isChecked('There is value in checkbox');
assert.dom('input[type=checkbox]').isNotChecked();

assert.dom('.checkbox-appointments input').isNotChecked('Appointments checkbox is not checked');
assert.dom('.checkbox-appointments input').isChecked('Appointments checkbox is checked');
