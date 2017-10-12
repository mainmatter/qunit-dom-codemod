assert.equal(node.textContent, 'bar');

assert.equal(node.textContent, 'bar', 'custom message');

assert.equal(node.textContent, '  bar\n     baz   ');

let bar = 'bar';
assert.equal(node.textContent, bar);

assert.equal(node, 'bar');

assert.equal(true);