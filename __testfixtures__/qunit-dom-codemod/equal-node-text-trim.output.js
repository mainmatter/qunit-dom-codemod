assert.dom(node).hasText('bar');
assert.dom(node).hasText('bar');

assert.dom(node).hasText('bar', 'custom message');
assert.dom(node).hasText('bar', 'custom message');

assert.dom(node).hasText('bar baz');
assert.dom(node).hasText('bar baz');

assert.equal(node, 'bar');
assert.strictEqual(node, 'bar');

assert.equal(true);
assert.strictEqual(true);