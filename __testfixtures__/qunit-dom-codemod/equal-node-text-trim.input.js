assert.equal(node.textContent.trim(), 'bar');
assert.strictEqual(node.textContent.trim(), 'bar');

assert.equal(node.textContent.trim(), 'bar', 'custom message');
assert.strictEqual(node.textContent.trim(), 'bar', 'custom message');

assert.equal(node.textContent.trim(), '  bar\n     baz   ');
assert.strictEqual(node.textContent.trim(), '  bar\n     baz   ');

assert.equal(node, 'bar');
assert.strictEqual(node, 'bar');

assert.equal(true);
assert.strictEqual(true);