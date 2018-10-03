assert.dom('.foo').hasAttribute('bar', 'baz');

assert.dom('.foo').hasAttribute('bar', 'baz', 'custom message');

assert.dom('.foo', '.parent-scope').hasAttribute('bar', 'baz');

assert.equal(find('.foo'), 'bar');

assert.equal(true);
