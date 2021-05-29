let node = {};

assert.notOk(node.classList.contains('bar'));

assert.notOk(node.classList.contains('bar'), 'custom message');

assert.equal(node.classList.contains('bar'), false);
assert.strictEqual(node.classList.contains('bar'), false);

assert.equal(node.classList.contains('bar'), false, 'custom message');
assert.strictEqual(node.classList.contains('bar'), false, 'custom message');