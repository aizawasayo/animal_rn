module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["import", { libraryName: "@ant-design/react-native" }], // 与 Web 平台的区别是不需要设置 style
    ["module-resolver", {
      "root": ["./src"], // 表示从哪个目录开始设置绝对路径
      "extensions": ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
      "alias": {
        //"@": "./src",
        "@store": "./src/store",
        "@components": "./src/components",
        "@router": "./src/router",
        "@utils": "./src/utils",
        "@api": "./src/api",
        "@assets": "./src/assets"
      }
    }] 
  ]
};
