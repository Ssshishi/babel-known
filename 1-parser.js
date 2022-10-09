// parser 解析 core => ast

const parser = require('@babel/parser');

const code = `function square(n) {
  return n * n;
}`;

let ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'] })

console.dir(ast, { depth: null })
// Node {
//   type: 'File',
//   start: 0,
//   end: 38,
//   loc: SourceLocation {...},
//   errors: [],
//   program: Node {...}
//   comments: []
// }