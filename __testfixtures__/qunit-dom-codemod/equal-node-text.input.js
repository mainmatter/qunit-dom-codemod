assert.equal(node.textContent, 'bar');
assert.strictEqual(node.textContent, 'bar');

assert.equal(node.textContent, 'bar', 'custom message');
assert.strictEqual(node.textContent, 'bar', 'custom message');

assert.equal(node.textContent, '  bar\n     baz   ');
assert.strictEqual(node.textContent, '  bar\n     baz   ');

let bar = 'bar';
assert.equal(node.textContent, bar);
assert.strictEqual(node.textContent, bar);

assert.equal(node, 'bar');
assert.strictEqual(node, 'bar');

assert.equal(true);
assert.strictEqual(true);