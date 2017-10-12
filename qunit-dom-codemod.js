export default function(file, api, options) {
  const j = api.jscodeshift;

  const printOptions = options.printOptions || {quote: 'single'};
  const root = j(file.source);

  function dom(args) {
    return j.callExpression(
      j.memberExpression(
        j.identifier('assert'),
        j.identifier('dom')
      ),
      args
    );
  }

  function domAssertion(domArgs, name, assertionArgs = []) {
    return j.callExpression(
      j.memberExpression(
        dom(domArgs),
        j.identifier(name)
      ),
      assertionArgs
    )
  }

  function countObject(count) {
    // building with j.objectExpression() creates a multiline object so we'll have to use this hack...
    return j(`x({ count: ${count} })`).find(j.ObjectExpression).paths()[0].node;
  }

  // assert.ok(find('.foo'), 'bar') -> assert.dom('.foo').exists('bar')

  root.find(j.CallExpression, {
    callee: {
      type: 'MemberExpression',
      object: { name: 'assert' },
      property: { name: 'ok' },
    },
  }).filter(p => {
    let firstArg = p.node.arguments[0];
    return firstArg && firstArg.type === 'CallExpression' && firstArg.callee.name === 'find';
  }).forEach(p => {
    let findNode = p.node.arguments[0];
    let customMessage = p.node.arguments[1];

    p.replace(domAssertion(findNode.arguments, 'exists', customMessage ? [customMessage] : []));
  });

  // assert.notOk(find('.foo'), 'bar') -> assert.dom('.foo').doesNotExist('bar')

  root.find(j.CallExpression, {
    callee: {
      type: 'MemberExpression',
      object: { name: 'assert' },
      property: { name: 'notOk' },
    },
  }).filter(p => {
    let firstArg = p.node.arguments[0];
    return firstArg && firstArg.type === 'CallExpression' && firstArg.callee.name === 'find';
  }).forEach(p => {
    let findNode = p.node.arguments[0];
    let customMessage = p.node.arguments[1];

    p.replace(domAssertion(findNode.arguments, 'doesNotExist', customMessage ? [customMessage] : []));
  });

  // assert.equal(find('.passenger-dialog').length, 0) -> assert.dom('.passenger-dialog').doesNotExist()
  // assert.equal(find('.passenger-dialog').length, 2) -> assert.dom('.passenger-dialog').exists({ count: 2 })

  root.find(j.CallExpression, {
    callee: {
      type: 'MemberExpression',
      object: { name: 'assert' },
      property: { name: 'equal' },
    },
  }).filter(p => {
    let firstArg = p.node.arguments[0];
    let secondArg = p.node.arguments[1];
    return firstArg && firstArg.type === 'MemberExpression' &&
      firstArg.object.type === 'CallExpression' &&
      firstArg.object.callee.name === 'find' &&
      firstArg.property.name === 'length' &&
      secondArg.type === 'Literal';
  }).forEach(p => {
    let findNode = p.node.arguments[0].object;
    let count = p.node.arguments[1].value;
    let customMessage = p.node.arguments[2];

    if (count === 0) {
      p.replace(domAssertion(findNode.arguments, 'doesNotExist',
        customMessage ? [customMessage] : []));
    } else {
      p.replace(domAssertion(findNode.arguments, 'exists',
        customMessage ? [countObject(count), customMessage] : [countObject(count)]));
    }
  });

  return root.toSource(printOptions);
}