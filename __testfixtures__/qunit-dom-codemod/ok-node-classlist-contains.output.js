let node = {};

assert.dom(node).hasClass('bar');

assert.dom(node).hasClass('bar', 'custom message');

assert.dom(node).hasClass('bar');
assert.dom(node).hasClass('bar');

assert.dom(node).hasClass('bar', 'custom message');
assert.dom(node).hasClass('bar', 'custom message');
