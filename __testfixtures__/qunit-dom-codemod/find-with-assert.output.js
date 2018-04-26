assert.dom('.foo').exists();

findWithAssert('input:first');

let x = findWithAssert('.foo').bar;

findWithAssert(x);
