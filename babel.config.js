module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-flow',
    '@babel/preset-typescript' // Suporte ao TypeScript
  ],
  plugins: [
    '@babel/plugin-syntax-flow' // Suporte à sintaxe Flow usada por alguns pacotes
  ]
};