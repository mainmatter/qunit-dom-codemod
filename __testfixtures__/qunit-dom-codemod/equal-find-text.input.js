assert.equal(find('.foo').textContent, 'bar');
assert.equal(find('.foo').text(), 'bar');

assert.equal(find('.foo').textContent, 'bar', 'custom message');
assert.equal(find('.foo').text(), 'bar', 'custom message');

assert.equal(find('.foo', '.parent-scope').textContent, 'bar');
assert.equal(find('.foo', '.parent-scope').text(), 'bar');

assert.equal(find('.foo').textContent, '  bar\n     baz   ');
assert.equal(find('.foo').text(), '  bar\n     baz   ');

assert.equal(find('.foo'), 'bar');

assert.equal(true);