# install

```
pnpm i
npm run build
```

npm run build 会 compile source files in src directory to dist

then make a hardlink to dist/index.cjs by run

```
ln $(pwd)/dist/index.cjs ~/.phoenix.js
```

tips: do not run phoenix first, or it will create a phoenix.js at ~/.phoenix.js, witch make ln fail with file exists

# develop

```
npm run dev:watch
```

this will start a watch mode develop environment, compile to ~/.phoenix.js when source file has change.
