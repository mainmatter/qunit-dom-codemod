assert.equal(find('.foo').value, 'bar');
assert.strictEqual(find('.foo').value, 'bar');
assert.equal(find('.foo').val(), 'bar');
assert.strictEqual(find('.foo').val(), 'bar');

assert.equal(find(foo).value, 'bar');
assert.strictEqual(find(foo).value, 'bar');
assert.equal(find(foo).val(), 'bar');
assert.strictEqual(find(foo).val(), 'bar');

assert.equal(find(foo.bar).value, 'bar');
assert.strictEqual(find(foo.bar).value, 'bar');
assert.equal(find(foo.bar).val(), 'bar');
assert.strictEqual(find(foo.bar).val(), 'bar');

assert.equal(find('.foo').value, 'bar', 'custom message');
assert.strictEqual(find('.foo').value, 'bar', 'custom message');
assert.equal(find('.foo').val(), 'bar', 'custom message');
assert.strictEqual(find('.foo').val(), 'bar', 'custom message');

assert.equal(find('.foo', '.parent-scope').value, 'bar');
assert.strictEqual(find('.foo', '.parent-scope').value, 'bar');
assert.equal(find('.foo', '.parent-scope').val(), 'bar');
assert.strictEqual(find('.foo', '.parent-scope').val(), 'bar');

assert.equal(find('input:first').value, 'bar');
assert.strictEqual(find('input:first').value, 'bar');

assert.equal(find('.foo'), 'bar');
assert.strictEqual(find('.foo'), 'bar');

assert.equal(true);
assert.strictEqual(true);