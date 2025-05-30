module.exports = {
  presets: [
    '@babel/preset-env',
<<<<<<< HEAD
    '@babel/preset-react',
    '@babel/preset-flow',
    '@babel/preset-typescript' // Suporte ao TypeScript
  ],
  plugins: [
    '@babel/plugin-syntax-flow' // Suporte à sintaxe Flow usada por alguns pacotes
=======
    '@babel/preset-react' // ← Isso é essencial para testar JSX!
>>>>>>> cc0815755e25fd386b0ae745d164bd5f43c21f5d
  ]
};