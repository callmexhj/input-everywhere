#### 
安装依赖：
```
yarn
```


### 虚拟键盘组件参数说明

|  属性   | 说明  |类型|默认值|
|  ----  | ----  |---|---|
| mode  | 选择输入类型 |string|--|
| showHide  | 显示隐藏按钮:开启时将展示键盘标题栏 |boolean|true|
|disOrder            |纯数字键盘支持是否乱序|boolean|false|
| size  | 设置输入框大小 |string|big|
| showButton  | 展示按钮：开启时将在键盘上展示“确认”按钮 |boolean|true|
| theme  | 个性化选择主题颜色 |string|--|
| verificationCodeConfig  | 验证码配置 |object|--|
| licenseType  | 验证码类型 |string|--|
|isCapitalized,  |仅大写：仅在输入类型为验证码且选择字母键盘后生效|boolean|false|
|onSubmit|是否在长度达标后自动提交|boolean|true|
|aotoClose|是否在自动提交后收起键盘|boolean|true|
|cursorConfig|光标配置：光标是否闪烁；是否显示文本输入框光标|object|--|
|regular |正则校验:配置输入框的校验规则|string|--|
|keyBoardTitle |配置键盘标题|string|传化安全键盘|

