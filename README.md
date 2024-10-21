# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


#### 
安装依赖：npm install
注：npm install一直报proxy的错误，建议使用pnpm安装依赖
npm install -g pnpm
pnpm install

#### bug
bug:纯数字、数字字母、纯字母三种input框在切换时不会清空input框

### 虚拟键盘组件参数说明

|  属性   | 说明  |类型|默认值|
|  ----  | ----  |---|---|
| mode  | 选择输入类型 |string|--|
| showHide  | 是否显示隐藏按钮 |boolean|true|
|disOrder            |用来配置纯数字键盘是否乱序|boolean|false|
| size  | 设置输入框大小 |string|big|
| showButton  | 是否展示按钮 |boolean|true|
| theme  | 个性化选择主题颜色 |string|--|
| verificationCodeConfig  | 验证码配置 |object|--|
| licenseType  | 验证码类型 |string|--|
|isCapitalized,  |是否仅大写：仅在输入类型为验证码且选择字母键盘后生效|boolean|false|
|onSubmit|是否在长度达标后自动提交|boolean|true|
|aotoClose|是否在自动提交后收起键盘|boolean|true|
|cursorConfig|光标配置：光标是否闪烁；是否显示文本输入框光标--|--|
|regular |正则校验:配置输入框的校验规则|---|--|

