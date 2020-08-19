/**
 * npm i babylon
 * npm i babel-traverse
 * npm i babel-core
 * npm i babel-presets-env
 * 解析AST语法树
 */
const fs = require('fs');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const { transformFromAst } = require('babel-core');

module.exports = {
    getAST: (path)=>{
        const sourceCode = fs.readFileSync(path, 'utf-8');

        return babylon.parse(sourceCode,{
            sourceType: 'module'
        });
    },
    getDependence: (ast)=>{
        const dependencies = [];

        traverse(ast, {
            ImportDeclaration: ({ node })=>{
                dependencies.push(node.source.value);
            }
        });

        return dependencies;
    },
    transform: (ast)=>{
        const { code } = transformFromAst(ast, null, {
            presets: ['env']
        })

        return code;
    }
}