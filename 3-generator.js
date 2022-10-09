// 生成

const parser = require('@babel/parser')
const trasverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;

// ============= 解析 =============

const code = `
  function square(n) {
    return n * n
  }
`
let ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'] })


// ============= 遍历 =============

const visitor = {
  FunctionDeclaration: function(path) {
    path.node.id.name = 'yyy'
  },
  Identifier: function (path) {
    // path.node.name = 'm'
  } 
}

trasverse(ast, visitor)

console.dir(ast, { depth: null })

/**
 * Node {
        type: 'FunctionDeclaration',
        start: 3,
        end: 44,
        loc: SourceLocation {
          start: Position { line: 2, column: 2, index: 3 },
          end: Position { line: 4, column: 3, index: 44 },
          filename: undefined,
          identifierName: undefined
        },
        id: Node {
          type: 'Identifier',
          start: 12,
          end: 18,
          loc: SourceLocation {
            start: Position { line: 2, column: 11, index: 12 },
            end: Position { line: 2, column: 17, index: 18 },
            filename: undefined,
            identifierName: 'square'
          },
          name: 'yyy'
        },
        generator: false,
        async: false,
        params: [...],
        body: Node {...}
 */

// ============= 生成 =============

const result = generator(ast, { compact: true }, code)
console.log('result===', result.code)
// result=== function yyy(n){return n*n;}

const f = new Function('return ' + result.code);
console.log(f()(2))