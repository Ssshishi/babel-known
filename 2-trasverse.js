// 遍历
// 对 ast节点 增 删 改

const parser = require('@babel/parser')
const trasverse = require('@babel/traverse').default

// ============= 解析 =============

const code = `
  function square(n) {
    return n * n
  }
`
let ast = parser.parse(code, {sourceType: 'module', plugins: ['jsx']})


// ============= 遍历 =============

const visitor = {
  FunctionDeclaration: function(path) {
    path.node.id.name = 'yyy'
  },
  Identifier: function (path) {
    path.node.name = 'x'
  } 
}

trasverse(ast, visitor)

console.dir(ast, { depth: null })

/**
 * 
 * Node {
  type: 'File',
  start: 0,
  end: 45,
  loc: SourceLocation {
    start: Position { line: 1, column: 0, index: 0 },
    end: Position { line: 5, column: 0, index: 45 },
    filename: undefined,
    identifierName: undefined
  },
  errors: [],
  program: Node {
    type: 'Program',
    start: 0,
    end: 45,
    loc: SourceLocation {
      start: Position { line: 1, column: 0, index: 0 },
      end: Position { line: 5, column: 0, index: 45 },
      filename: undefined,
      identifierName: undefined
    },
    sourceType: 'module',
    interpreter: null,
    body: [
      Node {
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
          name: 'x'
        },
        generator: false,
        async: false,
        params: [
          Node {
            type: 'Identifier',
            start: 19,
            end: 20,
            loc: SourceLocation {
              start: Position { line: 2, column: 18, index: 19 },
              end: Position { line: 2, column: 19, index: 20 },
              filename: undefined,
              identifierName: 'n'
            },
            name: 'x'
          }
        ],
        body: Node {
          type: 'BlockStatement',
          start: 22,
          end: 44,
          loc: SourceLocation {
            start: Position { line: 2, column: 21, index: 22 },
            end: Position { line: 4, column: 3, index: 44 },
            filename: undefined,
            identifierName: undefined
          },
          body: [
            Node {
              type: 'ReturnStatement',
              start: 28,
              end: 40,
              loc: SourceLocation {
                start: Position { line: 3, column: 4, index: 28 },
                end: Position { line: 3, column: 16, index: 40 },
                filename: undefined,
                identifierName: undefined
              },
              argument: Node {
                type: 'BinaryExpression',
                start: 35,
                end: 40,
                loc: SourceLocation {
                  start: Position { line: 3, column: 11, index: 35 },
                  end: Position { line: 3, column: 16, index: 40 },
                  filename: undefined,
                  identifierName: undefined
                },
                left: Node {
                  type: 'Identifier',
                  start: 35,
                  end: 36,
                  loc: SourceLocation {
                    start: Position { line: 3, column: 11, index: 35 },
                    end: Position { line: 3, column: 12, index: 36 },
                    filename: undefined,
                    identifierName: 'n'
                  },
                  name: 'x'
                },
                operator: '*',
                right: Node {
                  type: 'Identifier',
                  start: 39,
                  end: 40,
                  loc: SourceLocation {
                    start: Position { line: 3, column: 15, index: 39 },
                    end: Position { line: 3, column: 16, index: 40 },
                    filename: undefined,
                    identifierName: 'n'
                  },
                  name: 'x'
                }
              }
            }
          ],
          directives: []
        }
      }
    ],
    directives: []
  },
  comments: []
}
 */