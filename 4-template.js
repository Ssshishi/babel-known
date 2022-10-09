// template 可以作为模版

const generator = require("@babel/generator").default;
const template = require("@babel/template").default;
const t = require("babel-types");

const buildRequire = template(`
  var IMPORT_NAME = require(SOURCE);
`);

const ast = buildRequire({
  IMPORT_NAME: t.identifier("myModule"),
  SOURCE: t.stringLiteral("my-module")
});


console.dir(ast, { depth: null });
/**
 * {
  type: 'VariableDeclaration',
  kind: 'var',
  declarations: [
    {
      type: 'VariableDeclarator',
      id: { type: 'Identifier', name: 'myModule' },
      init: {
        type: 'CallExpression',
        callee: { type: 'Identifier', name: 'require', loc: undefined },
        arguments: [ { type: 'StringLiteral', value: 'my-module' } ],
        loc: undefined
      },
      loc: undefined
    }
  ],
  loc: undefined
}
 */


console.log(generator(ast).code);
// var myModule = require("my-module");