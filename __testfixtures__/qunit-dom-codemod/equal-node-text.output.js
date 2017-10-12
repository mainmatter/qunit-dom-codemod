assert.dom(node).hasText('bar');

assert.dom(node).hasText('bar', 'custom message');

assert.dom(node).hasText('bar baz');

let bar = 'bar';
assert.dom(node).hasText(bar);

assert.equal(node, 'bar');

assert.equal(true);