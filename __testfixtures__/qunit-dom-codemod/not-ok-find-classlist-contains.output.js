assert.dom('.foo').hasNoClass('bar');

assert.dom(foo).hasNoClass('bar');

assert.dom(foo.bar).hasNoClass('bar');

assert.dom('.foo').hasNoClass('bar', 'custom message');

assert.dom('.foo', '.parent-scope').hasNoClass('bar');

assert.dom('.foo').hasNoClass('bar');

assert.dom('.foo').hasNoClass('bar', 'custom message');

assert.dom('.foo', '.parent-scope').hasNoClass('bar');
