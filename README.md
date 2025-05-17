# 飞书表格便捷打印
基于 Vue 3 + TypeScript + Vite 的飞书多维表格插件 —— 便捷打印

## 项目简介

本项目是一个用于飞书多维表格的便捷打印插件，支持自定义字段顺序、单行/多行显示、图片字段展示等功能，助力高效打印排班表。  
主要技术栈：Vue 3、TypeScript、Vite、Element Plus、飞书多维表格 JS SDK。

## 功能特性

- 选择多维表格中的记录并打印
- 字段顺序可拖拽调整
- 字段支持单行/多行显示切换
- 附件字段支持图片展示
- 打印配置持久化保存
- 简洁的设置面板（支持拖拽排序和开关切换）

## 目录结构

```
├── src/
│   ├── App.vue                # 主界面与功能入口
│   ├── main.ts                # 入口文件
│   ├── components/
│   │   └── settingsPanel.vue  # 字段设置面板（拖拽排序/单行切换）
│   ├── hooks/
│   │   └── usePrint.ts        # 打印核心逻辑与数据处理
│   ├── types.ts               # 类型定义
│   └── assets/                # 静态资源
├── public/                    # 公共资源
├── package.json               # 项目信息与依赖
├── vite.config.ts             # Vite 配置
```

## 安装与运行

1. 安装依赖
   ```bash
   npm install
   ```

2. 本地开发
   ```bash
   npm run start
   ```

3. 打包构建
   ```bash
   npm run build
   ```

## 依赖说明

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Element Plus](https://element-plus.org/)
- [@lark-base-open/js-sdk](https://open.feishu.cn/document/ukTMukTMukTM/ugTNz4COzUzM14CO1MTN)
- [vue-draggable-plus](https://github.com/caoxiemeihao/vue-draggable-plus)

## 使用说明

1. 在飞书多维表格中安装插件
2. 选择需要打印的记录
3. 点击"打印"按钮即可
4. 可通过"设置"按钮自定义字段顺序和显示方式

## License

MIT
