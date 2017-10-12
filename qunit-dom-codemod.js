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

  return root.toSource(printOptions);
}