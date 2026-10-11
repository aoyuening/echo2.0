# GitHub Pages 部署说明

## 上传位置（重要）
把“项目源代码”文件夹里面的内容上传到 GitHub 仓库根目录，不要把“项目源代码”本身作为外层目录上传。
仓库首页必须直接看到 package.json、index.html、src 和 .github。

需要上传：
- src/（含全部图片）
- .github/workflows/deploy.yml（隐藏目录，不要遗漏）
- package.json、package-lock.json
- vite.config.ts、tsconfig.json、index.html
- .gitignore、.env.example、metadata.json、本说明文件

不要上传：node_modules/、dist/、任何真实 .env 文件、私钥、.npmrc、日志或编辑器临时文件。
GitHub 网页上传不会自动遵守 .gitignore，请手动排除这些文件。

## GitHub 网页操作
1. 右上角 + → New repository，填写仓库名（例如 qingjiang-echo），选择 Public → Create repository。
2. 点击 uploading an existing file（已有仓库使用 Add file → Upload files）。按上述清单上传到根目录，提交到 main 分支，点击 Commit changes。
3. 检查仓库中有 .github/workflows/deploy.yml。如网页上传遗漏隐藏目录，用 Add file → Create new file，文件名填写 .github/workflows/deploy.yml，复制本地同名文件的全部内容，点击 Commit changes。
4. 仓库 Settings → Pages → Build and deployment → Source 选择 GitHub Actions。
5. 打开 Actions → Deploy to GitHub Pages → Run workflow → 选择 main → Run workflow。
   第一次上传若在开启 Pages 之前触发而失败，完成第 4 步后重新运行即可。
6. 等待任务变绿，在部署任务的 github-pages 链接或 Settings → Pages → Visit site 打开网站。
7. 以后向默认分支 main（也支持 master）提交修改会自动部署。

普通仓库的网址是 https://你的用户名.github.io/仓库名/ 。以 .github.io 命名的用户主页仓库使用根地址。
请使用部署后的 HTTPS 地址访问；不要双击 dist/index.html 作为验证方式。

## 本次配置与检查
- React 19 + TypeScript + Vite 6 + Tailwind CSS 4 + Motion；纯浏览器交互，不依赖后端。
- vite.config.ts 使用 base: './'，构建出的脚本、样式、导入图片使用相对路径，兼容仓库子路径，无需填写仓库名称。
- 章节切换使用 React 状态，没有 BrowserRouter 或 history 路由，因此不需要 404.html 回退。
- index.html 内 /src/main.tsx 是 Vite 的开发入口，生产构建会自动替换，不应手动改成 dist 路径。
- GitHub Actions 使用 Node 22、npm ci、TypeScript 检查、Vite 构建与官方 Pages 部署动作，只发布 dist。
- 无需手动填写部署 Token；工作流使用 GitHub 自动提供的 GITHUB_TOKEN。
- npm install 完成，已生成依赖锁文件；npm run lint 和 npm run build 通过，npm 审计报告 0 个已知漏洞。
- 未发现真实密钥、私钥文件或源码中的后端调用。原 .env.example 只有未使用的模板占位值，已改为无需密钥的说明；.gitignore 已补充私钥和本地 npm 配置排除规则。
- 原 src/、index.html、页面设计、章节、动画、声音合成和业务交互保持不变。
- Google Fonts 外链保留原样；网络不可达时使用现有系统字体回退，字体外观可能有所不同。
- 构建有单个 JS 超过 500 kB 的体积提示（约 583 kB，gzip 162 kB），不是构建失败；为保持现有加载与动画行为未额外拆包。

## 本地运行
使用 Node.js 22.12+（推荐 Node 22 LTS），在本文件所在目录执行：

```sh
npm ci
npm run dev
```

检查正式构建：

```sh
npm run lint
npm run build
npm run preview
```

线上最终结果仍需上传仓库、开启 Pages 并等待 GitHub 工作流成功后确认。

浏览器验证：在严格静态服务器 /pages-check/ 子路径下，封面、进入老屋、打开信件、收下线索与手记计数更新通过；12 个打包资源全部 HTTP 200，JS/CSS MIME 类型正确。未发现项目脚本异常；浏览器扩展有自身异常，已通过堆栈区分。未逐一通关全部章节，也尚未进行真实 GitHub 线上验证。
