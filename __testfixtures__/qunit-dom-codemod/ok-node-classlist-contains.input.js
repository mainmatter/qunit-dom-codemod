let node = {};

assert.ok(node.classList.contains('bar'));

assert.ok(node.classList.contains('bar'), 'custom message');

assert.equal(node.classList.contains('bar'), true);
assert.strictEqual(node.classList.contains('bar'), true);

assert.equal(node.classList.contains('bar'), true, 'custom message');
assert.strictEqual(node.classList.contains('bar'), true, 'custom message');
