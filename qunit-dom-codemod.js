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
  }).filter(p => j.match(p.get('arguments').get('0'), {
    type: 'CallExpression',
    callee: { name: 'find' },
  })).forEach(p => {
    let findNode = p.node.arguments[0];
    let customMessage = p.node.arguments[1];

    p.replace(domAssertion(findNode.arguments, 'exists', customMessage ? [customMessage] : []));
  });

  // assert.ok(find('.foo')[0], 'bar') -> assert.dom('.foo').exists('bar')

  root.find(j.CallExpression, {
    callee: {
      type: 'MemberExpression',
      object: { name: 'assert' },
      property: { name: 'ok' },
    },
  }).filter(p => j.match(p.get('arguments').get('0'), {
    type: 'MemberExpression',
    object: {
      type: 'CallExpression',
      callee: {name: 'find'},
    },
    property: {
      type: 'Literal',
      value: 0,
    },
  })).forEach(p => {
    let findNode = p.node.arguments[0].object;
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
  }).filter(p => j.match(p.get('arguments').get('0'), {
    type: 'CallExpression',
    callee: { name: 'find' },
  })).forEach(p => {
    let findNode = p.node.arguments[0];
    let customMessage = p.node.arguments[1];

    p.replace(domAssertion(findNode.arguments, 'doesNotExist', customMessage ? [customMessage] : []));
  });

  // assert.notOk(find('.foo')[0], 'bar') -> assert.dom('.foo').doesNotExist('bar')

  root.find(j.CallExpression, {
    callee: {
      type: 'MemberExpression',
      object: { name: 'assert' },
      property: { name: 'notOk' },
    },
  }).filter(p => j.match(p.get('arguments').get('0'), {
    type: 'MemberExpression',
    object: {
      type: 'CallExpression',
      callee: { name: 'find' },
    },
    property: {
      type: 'Literal',
      value: 0,
    },
  })).forEach(p => {
    let findNode = p.node.arguments[0].object;
    let customMessage = p.node.arguments[1];

    p.replace(domAssertion(findNode.arguments, 'doesNotExist', customMessage ? [customMessage] : []));
  });

  // assert.equal(find('.passenger-dialog').length, 0) -> assert.dom('.passenger-dialog').doesNotExist()
  // assert.equal(find('.passenger-dialog').length, 2) -> assert.dom('.passenger-dialog').exists({ count: 2 })
  // assert.equal(findAll('.passenger-dialog').length, 0) -> assert.dom('.passenger-dialog').doesNotExist()
  // assert.equal(findAll('.passenger-dialog').length, 2) -> assert.dom('.passenger-dialog').exists({ count: 2 })

  root.find(j.CallExpression, {
    callee: {
      type: 'MemberExpression',
      object: { name: 'assert' },
      property: { name: 'equal' },
    },
  }).filter(p => j.match(p.get('arguments').get('0'), {
    type: 'MemberExpression',
    object: {
      type: 'CallExpression',
      callee: { name: (name) => name === 'find' || name === 'findAll' },
    },
    property: {
      name: 'length',
    },
  }) && j.match(p.get('arguments').get('1'), {
    type: 'Literal',
  })).forEach(p => {
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

  // assert.equal(find('.foo').value, 'bar') -> assert.dom('.foo').hasValue('bar')

  root.find(j.CallExpression, {
    callee: {
      type: 'MemberExpression',
      object: { name: 'assert' },
      property: { name: 'equal' },
    },
  }).filter(p => j.match(p.get('arguments').get('0'), {
    type: 'MemberExpression',
    object: {
      type: 'CallExpression',
      callee: { name: 'find' },
    },
    property: {
      name: 'value',
    },
  })).forEach(p => {
    let findNode = p.node.arguments[0].object;
    let valueNode = p.node.arguments[1];
    let customMessage = p.node.arguments[2];

    p.replace(domAssertion(findNode.arguments, 'hasValue',
      customMessage ? [valueNode, customMessage] : [valueNode]));
  });

  // assert.equal(find('.foo').val(), 'bar') -> assert.dom('.foo').hasValue('bar')

  root.find(j.CallExpression, {
    callee: {
      type: 'MemberExpression',
      object: { name: 'assert' },
      property: { name: 'equal' },
    },
  }).filter(p => j.match(p.get('arguments').get('0'), {
    type: 'CallExpression',
    callee: {
      type: 'MemberExpression',
      object: {
        type: 'CallExpression',
        callee: {name: 'find'},
      },
      property: {
        name: 'val',
      },
    }
  })).forEach(p => {
    let findNode = p.node.arguments[0].callee.object;
    let valueNode = p.node.arguments[1];
    let customMessage = p.node.arguments[2];

    p.replace(domAssertion(findNode.arguments, 'hasValue',
      customMessage ? [valueNode, customMessage] : [valueNode]));
  });

  // assert.equal(find('.foo').textContent, 'bar') -> assert.dom('.foo').hasText('bar')

  root.find(j.CallExpression, {
    callee: {
      type: 'MemberExpression',
      object: { name: 'assert' },
      property: { name: 'equal' },
    },
  }).filter(p => j.match(p.get('arguments').get('0'), {
    type: 'MemberExpression',
    object: {
      type: 'CallExpression',
      callee: { name: 'find' },
    },
    property: {
      name: 'textContent',
    },
  })).forEach(p => {
    let findNode = p.node.arguments[0].object;
    let valueNode = p.node.arguments[1];
    let customMessage = p.node.arguments[2];

    let newValueNode = valueNode.type === 'Literal' && typeof valueNode.value === 'string'
      ? j.literal(collapseWhitespace(valueNode.value))
      : valueNode;

    p.replace(domAssertion(findNode.arguments, 'hasText',
      customMessage ? [newValueNode, customMessage] : [newValueNode]));
  });

  // assert.equal(find('.foo').text(), 'bar') -> assert.dom('.foo').hasText('bar')

  root.find(j.CallExpression, {
    callee: {
      type: 'MemberExpression',
      object: { name: 'assert' },
      property: { name: 'equal' },
    },
  }).filter(p => j.match(p.get('arguments').get('0'), {
    type: 'CallExpression',
    callee: {
      type: 'MemberExpression',
      object: {
        type: 'CallExpression',
        callee: {name: 'find'},
      },
      property: {
        name: 'text',
      },
    }
  })).forEach(p => {
    let findNode = p.node.arguments[0].callee.object;
    let valueNode = p.node.arguments[1];
    let customMessage = p.node.arguments[2];

    let newValueNode = valueNode.type === 'Literal' && typeof valueNode.value === 'string'
      ? j.literal(collapseWhitespace(valueNode.value))
      : valueNode;

    p.replace(domAssertion(findNode.arguments, 'hasText',
      customMessage ? [newValueNode, customMessage] : [newValueNode]));
  });

  // assert.equal(find('.foo').textContent.trim(), 'bar') -> assert.dom('.foo').hasText('bar')

  root.find(j.CallExpression, {
    callee: {
      type: 'MemberExpression',
      object: { name: 'assert' },
      property: { name: 'equal' },
    },
  }).filter(p => j.match(p.get('arguments').get('0'), {
    type: 'CallExpression',
    callee: {
      type: 'MemberExpression',
      object: {
        type: 'MemberExpression',
        object: {
          type: 'CallExpression',
          callee: {name: 'find'},
        },
        property: {
          name: 'textContent',
        },
      },
      property: {
        name: 'trim',
      },
    },
  })).forEach(p => {
    let findNode = p.node.arguments[0].callee.object.object;
    let valueNode = p.node.arguments[1];
    let customMessage = p.node.arguments[2];

    let newValueNode = valueNode.type === 'Literal' && typeof valueNode.value === 'string'
      ? j.literal(collapseWhitespace(valueNode.value))
      : valueNode;

    p.replace(domAssertion(findNode.arguments, 'hasText',
      customMessage ? [newValueNode, customMessage] : [newValueNode]));
  });

  // assert.equal(find('.foo').text().trim(), 'bar') -> assert.dom('.foo').hasText('bar')

  root.find(j.CallExpression, {
    callee: {
      type: 'MemberExpression',
      object: { name: 'assert' },
      property: { name: 'equal' },
    },
  }).filter(p => j.match(p.get('arguments').get('0'), {
    type: 'CallExpression',
    callee: {
      type: 'MemberExpression',
      object: {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          object: {
            type: 'CallExpression',
            callee: {name: 'find'},
          },
          property: {
            name: 'text',
          },
        }
      },
      property: {
        name: 'trim',
      },
    },
  })).forEach(p => {
    let findNode = p.node.arguments[0].callee.object.callee.object;
    let valueNode = p.node.arguments[1];
    let customMessage = p.node.arguments[2];

    let newValueNode = valueNode.type === 'Literal' && typeof valueNode.value === 'string'
      ? j.literal(collapseWhitespace(valueNode.value))
      : valueNode;

    p.replace(domAssertion(findNode.arguments, 'hasText',
      customMessage ? [newValueNode, customMessage] : [newValueNode]));
  });

  // assert.ok(find('.foo').classList.contains('bar')) -> assert.dom('.foo').hasClass('bar')

  root.find(j.CallExpression, {
    callee: {
      type: 'MemberExpression',
      object: { name: 'assert' },
      property: { name: 'ok' },
    },
  }).filter(p => j.match(p.get('arguments').get('0'), {
    type: 'CallExpression',
    callee: {
      type: 'MemberExpression',
      object: {
        type: 'MemberExpression',
        object: {
          type: 'CallExpression',
          callee: {name: 'find'},
        },
        property: {
          name: 'classList',
        },
      },
      property: {
        name: 'contains',
      },
    },
  })).forEach(p => {
    let findNode = p.node.arguments[0].callee.object.object;
    let classNode = p.node.arguments[0].arguments[0];
    let customMessage = p.node.arguments[1];

    p.replace(domAssertion(findNode.arguments, 'hasClass',
      customMessage ? [classNode, customMessage] : [classNode]));
  });

  // assert.ok(node.classList.contains('bar')) -> assert.dom(node).hasClass('bar')

  root.find(j.CallExpression, {
    callee: {
      type: 'MemberExpression',
      object: { name: 'assert' },
      property: { name: 'ok' },
    },
  }).filter(p => j.match(p.get('arguments').get('0'), {
    type: 'CallExpression',
    callee: {
      type: 'MemberExpression',
      object: {
        type: 'MemberExpression',
        property: {
          name: 'classList',
        },
      },
      property: {
        name: 'contains',
      },
    },
  })).forEach(p => {
    let targetNode = p.node.arguments[0].callee.object.object;
    let classNode = p.node.arguments[0].arguments[0];
    let customMessage = p.node.arguments[1];

    p.replace(domAssertion([targetNode], 'hasClass',
      customMessage ? [classNode, customMessage] : [classNode]));
  });

  // assert.notOk(find('.foo').classList.contains('bar')) -> assert.dom('.foo').hasNoClass('bar')

  root.find(j.CallExpression, {
    callee: {
      type: 'MemberExpression',
      object: { name: 'assert' },
      property: { name: 'notOk' },
    },
  }).filter(p => j.match(p.get('arguments').get('0'), {
    type: 'CallExpression',
    callee: {
      type: 'MemberExpression',
      object: {
        type: 'MemberExpression',
        object: {
          type: 'CallExpression',
          callee: {name: 'find'},
        },
        property: {
          name: 'classList',
        },
      },
      property: {
        name: 'contains',
      },
    },
  })).forEach(p => {
    let findNode = p.node.arguments[0].callee.object.object;
    let classNode = p.node.arguments[0].arguments[0];
    let customMessage = p.node.arguments[1];

    p.replace(domAssertion(findNode.arguments, 'hasNoClass',
      customMessage ? [classNode, customMessage] : [classNode]));
  });

  // assert.notOk(node.classList.contains('bar')) -> assert.dom(node).hasNoClass('bar')

  root.find(j.CallExpression, {
    callee: {
      type: 'MemberExpression',
      object: { name: 'assert' },
      property: { name: 'notOk' },
    },
  }).filter(p => j.match(p.get('arguments').get('0'), {
    type: 'CallExpression',
    callee: {
      type: 'MemberExpression',
      object: {
        type: 'MemberExpression',
        property: {
          name: 'classList',
        },
      },
      property: {
        name: 'contains',
      },
    },
  })).forEach(p => {
    let targetNode = p.node.arguments[0].callee.object.object;
    let classNode = p.node.arguments[0].arguments[0];
    let customMessage = p.node.arguments[1];

    p.replace(domAssertion([targetNode], 'hasNoClass',
      customMessage ? [classNode, customMessage] : [classNode]));
  });

  return root.toSource(printOptions);
}

function collapseWhitespace(string) {
  return string
    .replace(/[\t\r\n]/g, ' ')
    .replace(/ +/g, ' ')
    .replace(/^ /, '')
    .replace(/ $/, '');
}
