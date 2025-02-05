# 安装

```
pnpm i
npm run build
```

npm run build 会将源码文件编译到 dist 目录，之后通过将 dist/index.cjs 创建一个硬链接指向 phoenix 的配置文件，即可完成。
创建硬链接的命令如下，注意应在当前项目根目录下执行

```
ln -f $(pwd)/dist/index.cjs ~/.phoenix.js
```

# 开发

```
npm run dev:watch
```

这会启动一个开发环境，当你更改了源码，会实时的编译到 dist 目录。
