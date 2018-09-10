assert.dom('.foo').hasClass('bar');

assert.dom(foo).hasClass('bar');

assert.dom(foo.bar).hasClass('bar');

assert.dom('.foo').hasClass('bar', 'custom message');

assert.dom('.foo', '.parent-scope').hasClass('bar');

assert.dom('.foo').hasClass('bar');

assert.dom('.foo').hasClass('bar', 'custom message');

assert.dom('.foo', '.parent-scope').hasClass('bar');
