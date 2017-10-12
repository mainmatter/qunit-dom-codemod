assert.equal(find('.foo').textContent.trim(), 'bar');
assert.equal(find('.foo').text().trim(), 'bar');

assert.equal(find('.foo').textContent.trim(), 'bar', 'custom message');
assert.equal(find('.foo').text().trim(), 'bar', 'custom message');

assert.equal(find('.foo', '.parent-scope').textContent.trim(), 'bar');
assert.equal(find('.foo', '.parent-scope').text().trim(), 'bar');

assert.equal(find('.foo').textContent.trim(), '  bar\n     baz   ');
assert.equal(find('.foo').text().trim(), '  bar\n     baz   ');

assert.equal(find('.foo'), 'bar');

assert.equal(true);