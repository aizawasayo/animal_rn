module.exports = {
  root: true,
  "extends": '@react-native-community',
  "plugins": [
    "react-hooks"
  ],
  "rules": {
    "indent": ["error", 4],
    "semi": ["error","always"],
    "quotes": ["error", "double"],
    "eqeqeq": ["error", "always"],
    "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
    "react-hooks/exhaustive-deps": "warn" // 检查 effect 的依赖
  }
};
