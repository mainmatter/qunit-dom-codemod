assert.dom(node).exists({ count: 1 });

assert.dom(node).exists({ count: 1 }, 'custom message');

assert.dom(node).doesNotExist();

assert.dom(node).doesNotExist('custom message');

assert.equal(node, 'bar');

assert.equal(true);
