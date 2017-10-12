let node = {};

assert.notOk(node.classList.contains('bar'));

assert.notOk(node.classList.contains('bar'), 'custom message');
