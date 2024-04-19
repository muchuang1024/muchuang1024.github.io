import{_ as s,c as a,o as n,a4 as p}from"./chunks/framework.4aTu-Nia.js";const g=JSON.parse('{"title":"四、自动更新","description":"","frontmatter":{},"headers":[],"relativePath":"docs/03 博客/教程/VitePress 教程.md","filePath":"docs/03 博客/教程/VitePress 教程.md"}'),e={name:"docs/03 博客/教程/VitePress 教程.md"},i=p(`<p>VitePress 是一款<a href="https://en.wikipedia.org/wiki/Static_site_generator" target="_blank" rel="noreferrer">静态站点生成器</a>(SSG)，专为构建快速、以内容为中心的网站而设计。简而言之，VitePress 获取用<a href="https://en.wikipedia.org/wiki/Markdown" target="_blank" rel="noreferrer">Markdown</a>编写的源内容，为其应用主题，并生成可以轻松部署在任何地方的静态 HTML 页面。</p><h2 id="一、安装" tabindex="-1">一、安装 <a class="header-anchor" href="#一、安装" aria-label="Permalink to &quot;一、安装&quot;">​</a></h2><h3 id="一-创建文件夹" tabindex="-1">一）创建文件夹 <a class="header-anchor" href="#一-创建文件夹" aria-label="Permalink to &quot;一）创建文件夹&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>mkdir docsite</span></span></code></pre></div><h3 id="二-安装-vitepress-依赖" tabindex="-1">二）安装 VitePress 依赖 <a class="header-anchor" href="#二-安装-vitepress-依赖" aria-label="Permalink to &quot;二）安装 VitePress 依赖&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>yarn add -D vitepress</span></span></code></pre></div><h3 id="三-脚手架构建项目" tabindex="-1">三）脚手架构建项目 <a class="header-anchor" href="#三-脚手架构建项目" aria-label="Permalink to &quot;三）脚手架构建项目&quot;">​</a></h3><p>VitePress 附带一个脚手架，可帮助您构建基本项目</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>npx vitepress init</span></span></code></pre></div><p>输入相应设置，自动生成相关代码</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240329214827.png" alt=""></p><h3 id="四-项目目录结构" tabindex="-1">四）项目目录结构 <a class="header-anchor" href="#四-项目目录结构" aria-label="Permalink to &quot;四）项目目录结构&quot;">​</a></h3><p><code>.vitepress</code>目录： VitePress 配置 <code>package.json</code>：依赖管理 <code>*.md</code>: markdown 文件</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240329215413.png" alt=""></p><p>配置文件 ( <code>.vitepress/config.mts</code>) 允许自定义 VitePress 站点的各个配置</p><p>srcDir ：存放文档的路径（index.md 的父目录），VitePress 会基于这个目录来编译和生成静态网站；如果配置为 ., 则是对应的项目根目录，scDir 下 必须要有一个 index.md，配置主页布局</p><p>link：链接路径，这个路径应该是相对于 <code>srcDir</code> 的。比如 <code>/docs/test</code> 指向的是 <code>scDir/docs/test.md</code></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { defineConfig } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;vitepress&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// https://vitepress.dev/reference/site-config</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> defineConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">title: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;木川的在线文档网站&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">description: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;个人知识库&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">srcDir: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;.&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">themeConfig: {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// https://vitepress.dev/reference/default-theme-config</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">nav: [</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{ text: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Home&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, link: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> },</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{ text: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Examples&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, link: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/markdown-examples&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">sidebar: [</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">text: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Examples&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">items: [</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{ text: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Markdown Examples&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, link: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/markdown-examples&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> },</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{ text: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Runtime API Examples&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, link: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/api-examples&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">socialLinks: [{ icon: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;github&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, link: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;https://github.com/vuejs/vitepress&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div><p>其中：nav 为首页右上角导航栏； sidebar 为详情页侧边栏；socialLinks 为首页右上角友情链接</p><h3 id="五-创建-markdown-目录" tabindex="-1">五）创建 markdown 目录 <a class="header-anchor" href="#五-创建-markdown-目录" aria-label="Permalink to &quot;五）创建 markdown 目录&quot;">​</a></h3><p>文档和 vitepress 网站分开管理，使用一个软链接，链接到你的本地文档目录 docs</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>ln -s ../docs docs</span></span></code></pre></div><p>vitepress 默认不支持软链接，解决存放文档的路径是个软链接时，页面显示 404 的问题：</p><p><a href="https://github.com/vuejs/vitepress/pull/2780" target="_blank" rel="noreferrer">https://github.com/vuejs/vitepress/pull/2780</a><a href="https://github.com/vuejs/vitepress/issues/1496#issuecomment-1282493417" target="_blank" rel="noreferrer">https://github.com/vuejs/vitepress/issues/1496#issuecomment-1282493417</a></p><p><code>.vitepress/config.mts</code> 文件添加如下设置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>export default defineConfig ({</span></span>
<span class="line"><span></span></span>
<span class="line"><span>vite: {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>resolve: {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>preserveSymlinks: true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>})</span></span></code></pre></div><h3 id="六-自动生成侧边栏" tabindex="-1">六）自动生成侧边栏 <a class="header-anchor" href="#六-自动生成侧边栏" aria-label="Permalink to &quot;六）自动生成侧边栏&quot;">​</a></h3><p>侧边栏默认通过 sidebar 字段配置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>sidebar: [</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>text: &#39;Examples&#39;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>items: [</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{ text: &#39;Markdown Examples&#39;, link: &#39;/markdown-examples&#39; },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{ text: &#39;Runtime API Examples&#39;, link: &#39;/api-examples&#39; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>]</span></span></code></pre></div><p>如果文章很多，都需要手动配置，很耗费时间，并且修改后还需要手动同步。所以推荐安装插件，自动配置侧边栏</p><p>安装侧边栏插件</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vite-plugin-vitepress-auto-sidebar</span></span></code></pre></div><p>在 <code>.vitepress/config.mts</code> 文件中使用插件，将会根据文章目录生成侧边栏</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import AutoSidebar from &#39;vite-plugin-vitepress-auto-sidebar&#39;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>export default defineConfig({</span></span>
<span class="line"><span></span></span>
<span class="line"><span>vite: {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>plugins: [</span></span>
<span class="line"><span></span></span>
<span class="line"><span>AutoSidebar({</span></span>
<span class="line"><span></span></span>
<span class="line"><span>path: &#39;.&#39;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>collapsed: false,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ignoreList: [&#39;.obsidian&#39;, &#39;.git&#39;, &#39;node_modules&#39;]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>})</span></span></code></pre></div><h2 id="二、运行" tabindex="-1">二、运行 <a class="header-anchor" href="#二、运行" aria-label="Permalink to &quot;二、运行&quot;">​</a></h2><p>通过 执行 dev 命令，可以在本地预览</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>yarn docs:dev</span></span></code></pre></div><p>通过执行 build 命令，生成构建好的 dist 文件，存放在 .vitepress/dist 下面</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>yarn docs:build</span></span></code></pre></div><h2 id="三、部署" tabindex="-1">三、部署 <a class="header-anchor" href="#三、部署" aria-label="Permalink to &quot;三、部署&quot;">​</a></h2><h3 id="一-安装-gh-pages" tabindex="-1">一）安装 <code>gh-pages</code> <a class="header-anchor" href="#一-安装-gh-pages" aria-label="Permalink to &quot;一）安装 \`gh-pages\`&quot;">​</a></h3><p>在您的项目中，安装 <code>gh-pages</code> 包，它可以帮助您将构建的文件推送到 <code>gh-pages</code> 分支</p><h3 id="二-配置-gh-pages" tabindex="-1">二）配置 <code>gh-pages</code> <a class="header-anchor" href="#二-配置-gh-pages" aria-label="Permalink to &quot;二）配置 \`gh-pages\`&quot;">​</a></h3><p>在 <code>package.json</code> 中添加一个脚本，用于部署到 <code>gh-pages</code> 分支</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;scripts&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;deploy&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;gh-pages -d dist&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="三-部署到-github" tabindex="-1">三）部署到 Github <a class="header-anchor" href="#三-部署到-github" aria-label="Permalink to &quot;三）部署到 Github&quot;">​</a></h3><p>运行部署脚本，这将自动将 <code>dist</code> 目录（或您在 VitePress 配置中指定的其他输出目录）中的文件推送到 <code>gh-pages</code> 分支</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">yarn deploy</span></span></code></pre></div><h3 id="四-配置-github-pages" tabindex="-1">四）配置 GitHub Pages <a class="header-anchor" href="#四-配置-github-pages" aria-label="Permalink to &quot;四）配置 GitHub Pages&quot;">​</a></h3><p>在 GitHub 仓库的设置（Settings）中，找到“GitHub Pages”部分。 在“Source”下拉菜单中选择 <code>gh-pages</code> 分支</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240330232655.png" alt=""></p><h3 id="五-访问网站" tabindex="-1">五）访问网站 <a class="header-anchor" href="#五-访问网站" aria-label="Permalink to &quot;五）访问网站&quot;">​</a></h3><p>稍等片刻，您的 VitePress 网站应该可以通过 <code>username.github.io</code> 访问了，其中 <code>username</code> 是您的 GitHub 用户名</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240330232725.png" alt=""></p><h1 id="四、自动更新" tabindex="-1">四、自动更新 <a class="header-anchor" href="#四、自动更新" aria-label="Permalink to &quot;四、自动更新&quot;">​</a></h1><p>为了保证文档目录的纯净，所以文档和 vitepress 网站分开管理，使用分开的 2 个 Git 仓库管理；并且希望在文档仓库更新的时候，网站仓库也能自动更新（网站仓库主要是构建后的静态页面）</p><h3 id="一-添加-submodule" tabindex="-1">一）添加 subModule <a class="header-anchor" href="#一-添加-submodule" aria-label="Permalink to &quot;一）添加 subModule&quot;">​</a></h3><p>在 vitepress 仓库添加文档子项目 docs</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># 添加子项目</span></span>
<span class="line"><span>git submodule add &lt;git-repo-url&gt; &lt;submodule-local-path&gt;</span></span>
<span class="line"><span># 拉取到本地</span></span>
<span class="line"><span>git submodule update --init --recursive</span></span></code></pre></div><h3 id="二-子项目添加-actions" tabindex="-1">二）子项目添加 Actions <a class="header-anchor" href="#二-子项目添加-actions" aria-label="Permalink to &quot;二）子项目添加 Actions&quot;">​</a></h3><p>子项目 markdown 文档更新时，同步推送到父项目</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>name: Send submodule updates to parent repo</span></span>
<span class="line"><span></span></span>
<span class="line"><span>on:</span></span>
<span class="line"><span>  workflow_dispatch:</span></span>
<span class="line"><span>  push:</span></span>
<span class="line"><span>    branches: </span></span>
<span class="line"><span>      - master</span></span>
<span class="line"><span></span></span>
<span class="line"><span>jobs:</span></span>
<span class="line"><span>  update:</span></span>
<span class="line"><span>    runs-on: ubuntu-latest</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    steps:</span></span>
<span class="line"><span>      - uses: actions/checkout@v3</span></span>
<span class="line"><span>        with: </span></span>
<span class="line"><span>          repository: muchuang1024/muchuang1024.github.io</span></span>
<span class="line"><span>          token: \${{ secrets.PRIVATE_TOKEN_GITHUB }}</span></span>
<span class="line"><span>          submodules: true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      - name: Pull &amp; update submodules recursively</span></span>
<span class="line"><span>        run: |</span></span>
<span class="line"><span>          git submodule update --init --recursive</span></span>
<span class="line"><span>          git submodule update --recursive --remote</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      - name: Commit</span></span>
<span class="line"><span>        run: |</span></span>
<span class="line"><span>          git config user.email &quot;actions@github.com&quot;</span></span>
<span class="line"><span>          git config user.name &quot;GitHub Actions - update submodules&quot;</span></span>
<span class="line"><span>          git add --all</span></span>
<span class="line"><span>          git commit -m &quot;Update submodules&quot; || echo &quot;No changes to commit&quot;</span></span>
<span class="line"><span>          git push</span></span></code></pre></div><p>上面的配置中，需要用到 PRIVATE_TOKEN_GITHUB，这样 Actions 才能推送代码到 Github 仓库</p><p>那如何设置 PRIVATE_TOKEN_GITHUB 呢？</p><p>1、前往个人中心 <a href="https://github.com/settings/tokens" target="_blank" rel="noreferrer">https://github.com/settings/tokens</a> 创建 accees_token</p><p>2、前往子项目<a href="https://github.com/muchuang1024/docs/settings/secrets/actions/new" target="_blank" rel="noreferrer">https://github.com/muchuang1024/docs/settings/secrets/actions/new</a> 设置 accees_token ，Name = PRIVATE_TOKEN_GITHUB， Secret 为上一步 accees_token 的值</p><p>运行上面的 Actions，没有报错则代表正常</p><h3 id="三-父项目添加-actions" tabindex="-1">三）父项目添加 Actions <a class="header-anchor" href="#三-父项目添加-actions" aria-label="Permalink to &quot;三）父项目添加 Actions&quot;">​</a></h3><p>更新后，立即更新 vitepress 站点</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>name: Deploy</span></span>
<span class="line"><span>on:</span></span>
<span class="line"><span>  workflow_dispatch: {}</span></span>
<span class="line"><span>  push:</span></span>
<span class="line"><span>    branches:</span></span>
<span class="line"><span>      - gh-pages</span></span>
<span class="line"><span>jobs:</span></span>
<span class="line"><span>  deploy:</span></span>
<span class="line"><span>    runs-on: ubuntu-latest</span></span>
<span class="line"><span>    permissions:</span></span>
<span class="line"><span>      pages: write</span></span>
<span class="line"><span>      id-token: write</span></span>
<span class="line"><span>    environment:</span></span>
<span class="line"><span>      name: github-pages</span></span>
<span class="line"><span>      url: \${{ steps.deployment.outputs.page_url }}</span></span>
<span class="line"><span>    steps:</span></span>
<span class="line"><span>      - uses: actions/checkout@v3</span></span>
<span class="line"><span>        with:</span></span>
<span class="line"><span>          fetch-depth: 0</span></span>
<span class="line"><span>          submodules: true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      - uses: pnpm/action-setup@v2</span></span>
<span class="line"><span>        with:</span></span>
<span class="line"><span>          version: 7.26.3</span></span>
<span class="line"><span>      - uses: actions/setup-node@v3</span></span>
<span class="line"><span>        with:</span></span>
<span class="line"><span>          node-version: 16</span></span>
<span class="line"><span>          cache: pnpm</span></span>
<span class="line"><span>      - run: pnpm install</span></span>
<span class="line"><span>      - name: Build</span></span>
<span class="line"><span>        run: pnpm run docs:build</span></span>
<span class="line"><span>      - uses: actions/configure-pages@v2</span></span>
<span class="line"><span>      - uses: actions/upload-pages-artifact@v1</span></span>
<span class="line"><span>        with:</span></span>
<span class="line"><span>          path: .vitepress/dist</span></span>
<span class="line"><span>      - name: Deploy</span></span>
<span class="line"><span>        id: deployment</span></span>
<span class="line"><span>        uses: actions/deploy-pages@v1</span></span></code></pre></div><p>同上前往父项目设置 accees_token ，Name = PRIVATE_TOKEN_GITHUB， Secret 为上一步 accees_token 的值</p><p>运行上面的 Actions，没有报错则代表正常</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>name: Deploy to GitHub Pages</span></span>
<span class="line"><span></span></span>
<span class="line"><span>on:</span></span>
<span class="line"><span>  push:</span></span>
<span class="line"><span>    branches:</span></span>
<span class="line"><span>      - main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>jobs:</span></span>
<span class="line"><span>  deploy:</span></span>
<span class="line"><span>    runs-on: ubuntu-latest</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    steps:</span></span>
<span class="line"><span>      - uses: actions/checkout@v3</span></span>
<span class="line"><span>        with:</span></span>
<span class="line"><span>          fetch-depth: 0</span></span>
<span class="line"><span>	  - uses: pnpm/action-setup@v2</span></span>
<span class="line"><span>        with:</span></span>
<span class="line"><span>          version: 7.26.3</span></span>
<span class="line"><span>      - uses: actions/setup-node@v3</span></span>
<span class="line"><span>        with:</span></span>
<span class="line"><span>          node-version: 16</span></span>
<span class="line"><span>          cache: pnpm</span></span>
<span class="line"><span>      - name: Install dependencies</span></span>
<span class="line"><span>        run: pnpm install</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      - name: Build the documentation</span></span>
<span class="line"><span>        run: pnpm run docs:build</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      - name: Deploy to GitHub Pages</span></span>
<span class="line"><span>        uses: peaceiris/actions-gh-pages@v3</span></span>
<span class="line"><span>        with:</span></span>
<span class="line"><span>          github_token: \${{ secrets.PRIVATE_TOKEN_GITHUB }}</span></span>
<span class="line"><span>          publish_dir: .vitepress/dist</span></span>
<span class="line"><span>          ref: gh-pages</span></span></code></pre></div>`,74),l=[i];function t(c,h,o,d,r,k){return n(),a("div",null,l)}const E=s(e,[["render",t]]);export{g as __pageData,E as default};
