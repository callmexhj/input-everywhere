# Input-Everywhere

### Gitgub 地址
[https://github.com/callmexhj/input-everywhere](https://github.com/callmexhj/input-everywhere)

### NPM包地址
[https://www.npmjs.com/package/input-everywhere](https://www.npmjs.com/package/input-everywhere)

## 快速上手
### 安装
npm
```
npm i input-everywhere
```
yarn
```
yarn add input-everywhere
```

### 引入组件
```js
import {InputEverywhere} from 'input-everywhere'
import 'input-everywhere/style'
```

### 示例
```js
import {InputEverywhere} from 'input-everywhere'
import 'input-everywhere/style'

const App = () => {
  return <InputEverywhere />
}

export default App
```


### 虚拟键盘组件参数说明

|  属性   | 说明  |类型|默认值|
|  ----  | ----  |---|---|
| size  | 设置输入框大小 |big/default/small|'big'|
| keyboardMode  | 设置键盘模式 |number/alphabet/numAlphabet/licensePlate/verificationCode|number|
|showHide   |设置是否展示键盘顶部的标题和缩小键盘按键|boolean|true|
| keyBoardTitle  | 键盘顶部标题的文本（仅当showHide为true时生效） |string|传化安全键盘|
| showButton  | 是否右下角的操作按钮（点击时触发onSubmit事件） |boolean|true|
| buttonText  | 键盘右下角操作按钮的文本（仅当showButton为true时生效） |string|确认|
| theme  | 键盘主题 |string|#1677FF|
| licenseType  | 车牌类型(绿牌8位，常规车牌7位) |green/default|default|
|className,  |传入组件的样式类|string|-|
|style|传入组件的样式|object|-|
|disOrder|是否乱序显示数字键盘（仅当mode为number时生效）|boolean|false|
|regular|传入一个正则表达式，在blur时触发校验onBlur事件|object|null|
|cursorConfig|光标配置项|CursorConfig||
|verificationCodeConfig|验证码模式配置项（仅在mode为verificationCode时生效）|VerificationCodeConfig||
| onFocus  | 输入框聚焦事件 |( ) => void|-|
| onBlur  | 输入框失焦事件 |( ) => void|-|
| onSubmit  | 提交事件 |(value: string) => void|-|
| onRegular  | 正则校验结果（需要首先传入正则表达式regular） |(boolean: boolean) => void|-|

### CursorConfig

|  属性   | 说明  |类型|默认值|
|  ----  | ----  |---|---|
| show  | 控制是否展示光标 |boolean|true|
| blink  | 控制光标是否闪动 |boolean|true|

### VerificationCodeConfig

|  属性   | 说明  |类型|默认值|
|  ----  | ----  |---|---|
| mode  | 控制验证码模式下支持的键盘类型 |['number']/['alphabet']/ ['number','alphabet']|['number','alphabet']|
| length  | 控制验证码输入框的长度 |number|6|
| onlyCapitalized  | 控制字母键盘仅支持输入大写（仅当mode中包含alphabet时生效） |number|6|
| autocommit  | 当输入的位数超过最大长度时候，自动触发onSubmit事件 |boolean|false|
| autoclose  | 当autocommit时，收起键盘 |boolean|true|

