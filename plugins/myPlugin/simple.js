/**
 * export default function(babel) {
    const { types:t, template } = babel
    return {
      visitor: {
        Identifier(path, state) {
          // content
        },
      }
    }
  };
  babel插件就是一个函数，接受一个babel参数
  babel参数中可以解构出 types、template两个属性
  types --- babel-types
  template ---  @babel/template
  函数返回一个对象，其中visitor对象的函数接受两个参数path和state，state可以接收用户传给插件的参数
  
 */

module.exports = ({ types: t, template }) => {
  let paramName
  return {
    visitor: {
      // Identifier：变量声明描述
      Identifier(path, state, scope) {
        console.log("Visiting Identifier" + path.node.name)
        // 当遍历到 node name 与 paramName 相同时，更新变量名
        if (path.node.name === paramName) {
          path.node.name = 'n'
        }
      },

      // ReturnStatement: return 标识符描述
      ReturnStatement(path, state) {
        const { whenFalse = 'false_statement' } = state.opts
        
        // 修改函数体
        const buildRequire = template(`
          if(n) {
            BODY_STATEMENT
          } else {
            return WHEN_FALSE
          }
        `)

        // 获取当前节点
        const body = path.getSibling(0).node
        console.log(1111, body)

        const body_ast = buildRequire({
          BODY_STATEMENT: body,
          WHEN_FALSE: t.stringLiteral(whenFalse)
        })

        if (t.isFunctionDeclaration(path.parentPath.parentPath.node)) {
          path.replaceWith(body_ast)
        }
      },

      // FunctionDeclaration 函数的声明描述
      FunctionDeclaration(path, state) {
        path.node.id = t.Identifier('foo')
        paramName = path.node.params[0].name

        // state.opts 接受插件参数
        const { whenFalse = 'hhhhhh' } = state.opts
        // 修改函数体
        const buildRequire = template(`
          if (n) {
            BODY_STATEMENT
          } else {
            return '${whenFalse}'
          }
        `);
        
        const body = path.node.body.body[0]
        console.log('body--', body)

        const body_ast = buildRequire({
          BODY_STATEMENT: body,
        });

        path.node.body.body[0] = body_ast
      }
    }
  }
}