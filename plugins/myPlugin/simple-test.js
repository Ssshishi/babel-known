const babel = require("babel-core")
const simplePlugin = require("./simple")

const code = `function code(x){
  return x * x
};
`;

const result = babel.transform(code, {
  plugins: [[simplePlugin, { whenFalse: 'iiiiii'}]]
})

console.log('result', result.code)

const f = new Function('return ' + result.code);
console.log(222, f()())


// 编译文件
babel.transformFile('demo.js', {}, function (err, result) {
  console.log(result.code, 3333);
})