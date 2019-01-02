
// see https://api.jquery.com/category/selectors/jquery-selector-extensions/
const JQUERY_SELECTOR_EXTENSIONS = [
  ':animated',
  ':button',
  ':checkbox',
  ':contains(',
  ':eq(',
  ':even',
  ':file',
  ':first',
  ':gt(',
  ':has(',
  ':header',
  ':hidden',
  ':image',
  ':input',
  ':last',
  ':lt(',
  ':odd',
  ':parent',
  ':password',
  ':radio',
  ':reset',
  ':selected',
  ':submit',
  ':text',
  ':visible',
];

module.exports = function(file, api, options) {
  const j = api.jscodeshift;

  const printOptions = options.printOptions || {quote: 'single'};
  const root = j(file.source);

  const assertOkOrNotOk = {
    callee: {
      type: 'MemberExpression',
      object: { name: 'assert' },
      property: { name: (name) => name === 'ok' || name === 'notOk' },
    },
  };

  const assertEqual = {
    callee: {
      type: 'MemberExpression',
      object: { name: 'assert' },
      property: { name: 'equal' },
    },
  };

  const assertEqualBoolean = {
    callee: {
      type: 'MemberExpression',
      object: { name: 'assert' },
      property: { name: 'equal' },
    },
    arguments(args) {
      return args.length >= 2 && j.match(args[1], {
        type: 'Literal',
        value: v => typeof v === 'boolean'
      });
    }
  };

  const findWithAssertExpression = {
    expression: {
      type: 'CallExpression',
      callee: {
        type: 'Identifier',
        name: 'findWithAssert',
      },
    },
  };

  function assertBoolean(p) {
    return j.match(p, assertEqualBoolean) || j.match(p, assertOkOrNotOk);
  }

  function isTruthyAssertion(p) {
    return p.node.callee.property.name === 'equal' ? p.node.arguments[1].value : p.node.callee.property.name === 'ok';
  }

  function getCustomMessageOfTruthyAssertion(p) {
    return p.node.callee.property.name === 'equal' ? p.node.arguments[2] : p.node.arguments[1];
  }

  function isSelector(node) {
    return node.type === 'Literal';
  }

  function isJQuerySelector(node) {
    if (!isSelector(node)) return false;
    return JQUERY_SELECTOR_EXTENSIONS.some(selector => node.value.indexOf(selector) !== -1);
  }

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

  const PROPERTY_ASSERTIONS = [{
    property: 'checked',
    selector: ':checked',
    positiveAssertion: 'isChecked',
    negativeAssertion: 'isNotChecked',
  }, {
    property: 'disabled',
    selector: ':disabled',
    positiveAssertion: 'isDisabled',
    negativeAssertion: 'isNotDisabled',
  }, {
    property: 'required',
    selector: ':required',
    positiveAssertion: 'isRequired',
    negativeAssertion: 'isNotRequired',
  }];

  for (let propertyAssertion of PROPERTY_ASSERTIONS) {
    // assert.ok(find('input:checked')) -> assert.dom('input:checked').isChecked()
    // assert.notOk(find('input:checked')) -> assert.dom('input:checked').isNotChecked()

    root.find(j.CallExpression, assertBoolean)
      .filter(p => j.match(p.get('arguments').get('0'), {
        type: 'CallExpression',
        callee: {name: 'find'},
      }) || j.match(p.get('arguments').get('0'), {
        type: 'MemberExpression',
        object: {
          type: 'CallExpression',
          callee: {name: 'find'},
        },
        property: {
          type: 'Literal',
          value: 0,
        },
      }))
      .forEach(p => {
        let findNode = p.node.arguments[0];
        if (findNode.type === 'MemberExpression') {
          findNode = findNode.object;
        }

        let selector = findNode.arguments[0];
        if (isSelector(selector) && selector.value.endsWith(propertyAssertion.selector)) {
          let customMessage = getCustomMessageOfTruthyAssertion(p);
          let assertion = isTruthyAssertion(p)
            ? propertyAssertion.positiveAssertion
            : propertyAssertion.negativeAssertion;

          selector.value = selector.value.substr(0, selector.value.length - propertyAssertion.selector.length);

          p.replace(domAssertion(findNode.arguments, assertion, customMessage ? [customMessage] : []));
        }
      });


    // assert.equal(find('input:checked').length, 1) -> assert.dom('input:checked').isChecked()
    // assert.equal(find('input:checked').length, 0) -> assert.dom('input:checked').isNotChecked()

    root.find(j.CallExpression, assertEqual)
      .filter(p => isLengthWithFind(p.get('arguments').get('0')) && j.match(p.get('arguments').get('1'), {
        type: 'Literal',
      }))
      .forEach(p => {
        let findNode = p.node.arguments[0].object;
        let count = p.node.arguments[1].value;
        let customMessage = p.node.arguments[2];
        let selector = findNode.arguments[0];

        if (isSelector(selector) && selector.value.endsWith(propertyAssertion.selector)) {
          let assertion = count === 0
            ? propertyAssertion.negativeAssertion
            : propertyAssertion.positiveAssertion;

          selector.value = selector.value.substr(0, selector.value.length - propertyAssertion.selector.length);

          p.replace(domAssertion(findNode.arguments, assertion, customMessage ? [customMessage] : []));
        }
      });

    // assert.ok(find('.foo').checked) -> assert.dom('.foo').isChecked()
    // assert.ok(find('.foo')[0].checked) -> assert.dom('.foo').isChecked()
    // assert.notOk(find('.foo').checked) -> assert.dom('.foo').isNotChecked()
    // assert.notOk(find('.foo')[0].checked) -> assert.dom('.foo').isNotChecked()

    root.find(j.CallExpression, assertBoolean)
      .filter(p => j.match(p.get('arguments').get('0'), {
        type: 'MemberExpression',
        property: {name: propertyAssertion.property},
      }))
      .filter(p => j.match(p.get('arguments').get('0').get('object'), {
        type: 'CallExpression',
        callee: {name: 'find'},
      }) || j.match(p.get('arguments').get('0').get('object'), {
        type: 'MemberExpression',
        object: {
          type: 'CallExpression',
          callee: {name: 'find'},
        },
        property: {
          type: 'Literal',
          value: 0,
        },
      }))
      .forEach(p => {
        let findNode = p.get('arguments').get('0').get('object').node;
        if (findNode.type === 'MemberExpression') {
          findNode = findNode.object;
        }

        if (!isJQuerySelector(findNode.arguments[0])) {
          let customMessage = getCustomMessageOfTruthyAssertion(p);
          let assertion = isTruthyAssertion(p)
            ? propertyAssertion.positiveAssertion
            : propertyAssertion.negativeAssertion;

          p.replace(domAssertion(findNode.arguments, assertion, customMessage ? [customMessage] : []));
        }
      });

    // assert.ok(find('.foo').is(':checked')) -> assert.dom('.foo').isChecked()
    // assert.notOk(find('.foo').is(':checked')) -> assert.dom('.foo').isNotChecked()

    root.find(j.CallExpression, assertBoolean)
      .filter(p => j.match(p.get('arguments').get('0'), {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          property: {name: 'is'},
        },
        arguments: [{value: propertyAssertion.selector}],
      }))
      .filter(p => j.match(p.get('arguments').get('0').get('callee').get('object'), {
        type: 'CallExpression',
        callee: {name: 'find'},
      }) || j.match(p.get('arguments').get('0').get('callee').get('object'), {
        type: 'MemberExpression',
        object: {
          type: 'CallExpression',
          callee: {name: 'find'},
        },
        property: {
          type: 'Literal',
          value: 0,
        },
      }))
      .forEach(p => {
        let findNode = p.get('arguments').get('0').get('callee').get('object').node;
        if (findNode.type === 'MemberExpression') {
          findNode = findNode.object;
        }

        if (!isJQuerySelector(findNode.arguments[0])) {
          let customMessage = getCustomMessageOfTruthyAssertion(p);
          let assertion = isTruthyAssertion(p)
            ? propertyAssertion.positiveAssertion
            : propertyAssertion.negativeAssertion;

          p.replace(domAssertion(findNode.arguments, assertion, customMessage ? [customMessage] : []));
        }
      });
  }

  // assert.ok(find('.foo'), 'bar') -> assert.dom('.foo').exists('bar')
  // assert.ok(find('.foo')[0], 'bar') -> assert.dom('.foo').exists('bar')
  // assert.notOk(find('.foo'), 'bar') -> assert.dom('.foo').doesNotExist('bar')
  // assert.notOk(find('.foo')[0], 'bar') -> assert.dom('.foo').doesNotExist('bar')

  root.find(j.CallExpression, assertBoolean)
    .filter(p => j.match(p.get('arguments').get('0'), {
      type: 'CallExpression',
      callee: { name: 'find' },
    }) || j.match(p.get('arguments').get('0'), {
      type: 'MemberExpression',
      object: {
        type: 'CallExpression',
        callee: { name: 'find' },
      },
      property: {
        type: 'Literal',
        value: 0,
      },
    }))
    .forEach(p => {
      let findNode = p.node.arguments[0];
      if (findNode.type === 'MemberExpression') {
        findNode = findNode.object;
      }

      if (!isJQuerySelector(findNode.arguments[0])) {
        let customMessage = getCustomMessageOfTruthyAssertion(p);
        let assertion = isTruthyAssertion(p) ? 'exists' : 'doesNotExist';

        p.replace(domAssertion(findNode.arguments, assertion, customMessage ? [customMessage] : []));
      }
    });

  // assert.equal(find('.passenger-dialog').length, 0) -> assert.dom('.passenger-dialog').doesNotExist()
  // assert.equal(find('.passenger-dialog').length, 2) -> assert.dom('.passenger-dialog').exists({ count: 2 })
  // assert.equal(findAll('.passenger-dialog').length, 0) -> assert.dom('.passenger-dialog').doesNotExist()
  // assert.equal(findAll('.passenger-dialog').length, 2) -> assert.dom('.passenger-dialog').exists({ count: 2 })

  function isLengthWithFind(node) {
    return j.match(node, {
      type: 'MemberExpression',
      object: {
        type: 'CallExpression',
        callee: { name: (name) => name === 'find' || name === 'findAll' },
      },
      property: {
        name: 'length',
      },
    })
  }

  root.find(j.CallExpression, assertEqual)
    .filter(p => isLengthWithFind(p.get('arguments').get('0')) && j.match(p.get('arguments').get('1'), {
      type: 'Literal',
    }))
    .forEach(p => {
      let findNode = p.node.arguments[0].object;
      let count = p.node.arguments[1].value;
      let customMessage = p.node.arguments[2];

      if (!isJQuerySelector(findNode.arguments[0])) {
        if (count === 0) {
          p.replace(domAssertion(findNode.arguments, 'doesNotExist',
            customMessage ? [customMessage] : []));
        } else {
          p.replace(domAssertion(findNode.arguments, 'exists',
            customMessage ? [countObject(count), customMessage] : [countObject(count)]));
        }
      }
    });

  // assert.equal(find('.foo').getAttribute('type'), 'bar') -> assert.dom('.foo').hasAttribute('type', 'bar')

  function isGetAttributeWithFind(node) {
    return j.match(node, {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        object: {
          type: 'CallExpression',
          callee: { name: 'find' },
        },
        property: {
          name: 'getAttribute',
        },
      }
    });
  }

  root.find(j.CallExpression, assertEqual)
    .filter(p => isGetAttributeWithFind(p.get('arguments').get('0')))
    .forEach(p => {
      let findNode = p.node.arguments[0].callee.object;
      let attributeName = p.node.arguments[0].arguments[0];

      let valueNode = p.node.arguments[1];
      let customMessage = p.node.arguments[2];

      if (!isJQuerySelector(findNode.arguments[0])) {
        p.replace(domAssertion(findNode.arguments, 'hasAttribute',
          customMessage ? [attributeName, valueNode, customMessage] : [attributeName, valueNode]));
      }
    });

  // assert.equal(find('.foo').value, 'bar') -> assert.dom('.foo').hasValue('bar')
  // assert.equal(find('.foo').val(), 'bar') -> assert.dom('.foo').hasValue('bar')

  function isValueWithFind(node) {
    return j.match(node, {
      type: 'MemberExpression',
      object: {
        type: 'CallExpression',
        callee: { name: 'find' },
      },
      property: {
        name: 'value',
      },
    }) || j.match(node, {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        object: {
          type: 'CallExpression',
          callee: { name: 'find' },
        },
        property: {
          name: 'val',
        },
      }
    });
  }

  root.find(j.CallExpression, assertEqual)
    .filter(p => isValueWithFind(p.get('arguments').get('0')))
    .forEach(p => {
      let findNode = p.node.arguments[0].type === 'MemberExpression'
        ? p.node.arguments[0].object
        : p.node.arguments[0].callee.object;

      let valueNode = p.node.arguments[1];
      let customMessage = p.node.arguments[2];

      if (!isJQuerySelector(findNode.arguments[0])) {
        p.replace(domAssertion(findNode.arguments, 'hasValue',
          customMessage ? [valueNode, customMessage] : [valueNode]));
      }
    });

  // assert.equal(find('.foo').textContent, 'bar') -> assert.dom('.foo').hasText('bar')
  // assert.equal(find('.foo').text(), 'bar') -> assert.dom('.foo').hasText('bar')

  function isTextWithFind(node) {
    return j.match(node, {
      type: 'MemberExpression',
      object: {
        type: 'CallExpression',
        callee: { name: 'find' },
      },
      property: {
        name: 'textContent',
      },
    }) || j.match(node, {
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
    });
  }

  root.find(j.CallExpression, assertEqual)
    .filter(p => isTextWithFind(p.get('arguments').get('0')))
    .forEach(p => {
      let findNode = p.node.arguments[0].type === 'MemberExpression'
        ? p.node.arguments[0].object
        : p.node.arguments[0].callee.object;

      let valueNode = p.node.arguments[1];
      let customMessage = p.node.arguments[2];

      if (!isJQuerySelector(findNode.arguments[0])) {
        let newValueNode = valueNode.type === 'Literal' && typeof valueNode.value === 'string'
          ? j.literal(collapseWhitespace(valueNode.value))
          : valueNode;

        p.replace(domAssertion(findNode.arguments, 'hasText',
          customMessage ? [newValueNode, customMessage] : [newValueNode]));
      }
    });

  // assert.equal(node.textContent, 'bar') -> assert.dom(node).hasText('bar')

  function isTextContent(node) {
    return j.match(node, {
      type: 'MemberExpression',
      property: {
        name: 'textContent',
      },
    })
  }

  root.find(j.CallExpression, assertEqual)
    .filter(p => isTextContent(p.get('arguments').get('0')))
    .forEach(p => {
      let targetNode = p.node.arguments[0].object;
      let valueNode = p.node.arguments[1];
      let customMessage = p.node.arguments[2];

      let newValueNode = valueNode.type === 'Literal' && typeof valueNode.value === 'string'
        ? j.literal(collapseWhitespace(valueNode.value))
        : valueNode;

      p.replace(domAssertion([targetNode], 'hasText',
        customMessage ? [newValueNode, customMessage] : [newValueNode]));
    });

  // assert.equal(find('.foo').textContent.trim(), 'bar') -> assert.dom('.foo').hasText('bar')
  // assert.equal(find('.foo').text().trim(), 'bar') -> assert.dom('.foo').hasText('bar')

  function isTextTrimWithFind(node) {
    return j.match(node, {
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
    }) || j.match(node, {
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
    })
  }

  root.find(j.CallExpression, assertEqual)
    .filter(p => isTextTrimWithFind(p.get('arguments').get('0')))
    .forEach(p => {
      let findNode = p.node.arguments[0].callee.object.type === 'MemberExpression'
        ? p.node.arguments[0].callee.object.object
        : p.node.arguments[0].callee.object.callee.object;

      let valueNode = p.node.arguments[1];
      let customMessage = p.node.arguments[2];

      if (!isJQuerySelector(findNode.arguments[0])) {
        let newValueNode = valueNode.type === 'Literal' && typeof valueNode.value === 'string'
          ? j.literal(collapseWhitespace(valueNode.value))
          : valueNode;

        p.replace(domAssertion(findNode.arguments, 'hasText',
          customMessage ? [newValueNode, customMessage] : [newValueNode]));
      }
    });

  // assert.equal(node.textContent.trim(), 'bar') -> assert.dom(node).hasText('bar')

  function isTextContentTrim(node) {
    return j.match(node, {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        object: {
          type: 'MemberExpression',
          property: {
            name: 'textContent',
          },
        },
        property: {
          name: 'trim',
        },
      },
    })
  }

  root.find(j.CallExpression, assertEqual)
    .filter(p => isTextContentTrim(p.get('arguments').get('0')))
    .forEach(p => {
      let targetNode = p.node.arguments[0].callee.object.object;
      let valueNode = p.node.arguments[1];
      let customMessage = p.node.arguments[2];

      let newValueNode = valueNode.type === 'Literal' && typeof valueNode.value === 'string'
        ? j.literal(collapseWhitespace(valueNode.value))
        : valueNode;

      p.replace(domAssertion([targetNode], 'hasText',
        customMessage ? [newValueNode, customMessage] : [newValueNode]));
    });

  // assert.ok(find('.foo').classList.contains('bar')) -> assert.dom('.foo').hasClass('bar')
  // assert.notOk(find('.foo').classList.contains('bar')) -> assert.dom('.foo').hasNoClass('bar')

  function isClasslistContainsWithFind(node) {
    return j.match(node, {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        object: {
          type: 'MemberExpression',
          object: {
            type: 'CallExpression',
            callee: { name: 'find' },
          },
          property: {
            name: 'classList',
          },
        },
        property: {
          name: 'contains',
        },
      },
    })
  }

  root.find(j.CallExpression, assertBoolean)
    .filter(p => isClasslistContainsWithFind(p.get('arguments').get('0')))
    .forEach(p => {
      let findNode = p.node.arguments[0].callee.object.object;
      let classNode = p.node.arguments[0].arguments[0];

      let customMessage = getCustomMessageOfTruthyAssertion(p);
      let assertion = isTruthyAssertion(p) ? 'hasClass' : 'hasNoClass';

      p.replace(domAssertion(findNode.arguments, assertion,
        customMessage ? [classNode, customMessage] : [classNode]));
    });

  // assert.ok(node.classList.contains('bar')) -> assert.dom(node).hasClass('bar')
  // assert.notOk(node.classList.contains('bar')) -> assert.dom(node).hasNoClass('bar')

  function isClasslistContains(node) {
    return j.match(node, {
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
    })
  }

  root.find(j.CallExpression, assertBoolean)
    .filter(p => isClasslistContains(p.get('arguments').get('0')))
    .forEach(p => {
      let targetNode = p.node.arguments[0].callee.object.object;
      let classNode = p.node.arguments[0].arguments[0];

      let customMessage = getCustomMessageOfTruthyAssertion(p);
      let assertion = isTruthyAssertion(p) ? 'hasClass' : 'hasNoClass';

      p.replace(domAssertion([targetNode], assertion,
        customMessage ? [classNode, customMessage] : [classNode]));
    });

  // findWithAssert('.foo') -> assert.dom('.foo').exists('bar')

  root.find(j.ExpressionStatement, findWithAssertExpression)
    .forEach(p => {
      let findNode = p.node.expression;
      let findArgs = findNode.arguments;

      if (isSelector(findArgs[0]) && !isJQuerySelector(findArgs[0])) {
        p.replace(j.expressionStatement(domAssertion(findArgs, 'exists')));
      }
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
