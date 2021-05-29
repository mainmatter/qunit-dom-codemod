assert.equal(find('.foo').textContent, 'bar');
assert.strictEqual(find('.foo').textContent, 'bar');
assert.equal(find('.foo').text(), 'bar');
assert.strictEqual(find('.foo').text(), 'bar');

assert.equal(find(foo).textContent, 'bar');
assert.strictEqual(find(foo).textContent, 'bar');
assert.equal(find(foo).text(), 'bar');
assert.strictEqual(find(foo).text(), 'bar');

assert.equal(find(foo.bar).textContent, 'bar');
assert.strictEqual(find(foo.bar).textContent, 'bar');
assert.equal(find(foo.bar).text(), 'bar');
assert.strictEqual(find(foo.bar).text(), 'bar');

assert.equal(find('.foo').textContent, 'bar', 'custom message');
assert.strictEqual(find('.foo').textContent, 'bar', 'custom message');
assert.equal(find('.foo').text(), 'bar', 'custom message');
assert.strictEqual(find('.foo').text(), 'bar', 'custom message');

assert.equal(find('.foo', '.parent-scope').textContent, 'bar');
assert.strictEqual(find('.foo', '.parent-scope').textContent, 'bar');
assert.equal(find('.foo', '.parent-scope').text(), 'bar');
assert.strictEqual(find('.foo', '.parent-scope').text(), 'bar');

assert.equal(find('.foo').textContent, '  bar\n     baz   ');
assert.strictEqual(find('.foo').textContent, '  bar\n     baz   ');
assert.equal(find('.foo').text(), '  bar\n     baz   ');
assert.strictEqual(find('.foo').text(), '  bar\n     baz   ');

assert.equal(find('input:first').text(), 'bar');
assert.strictEqual(find('input:first').text(), 'bar');

let bar = 'bar';
assert.equal(find('.foo').textContent, bar);
assert.strictEqual(find('.foo').textContent, bar);
assert.equal(find('.foo').text(), bar);
assert.strictEqual(find('.foo').text(), bar);

assert.equal(find('.foo'), 'bar');
assert.strictEqual(find('.foo'), 'bar');

assert.equal(true);
assert.strictEqual(true);