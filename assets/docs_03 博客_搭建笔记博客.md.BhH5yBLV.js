import{_ as s,c as a,o as n,a2 as i}from"./chunks/framework.CQ12TVIp.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/03 博客/搭建笔记博客.md","filePath":"docs/03 博客/搭建笔记博客.md"}'),p={name:"docs/03 博客/搭建笔记博客.md"},e=i(`<p>VitePress 是一款<a href="https://en.wikipedia.org/wiki/Static_site_generator" target="_blank" rel="noreferrer">静态站点生成器</a>(SSG)，专为构建快速、以内容为中心的网站而设计。简而言之，VitePress 获取用<a href="https://en.wikipedia.org/wiki/Markdown" target="_blank" rel="noreferrer">Markdown</a>编写的源内容，为其应用主题，并生成可以轻松部署在任何地方的静态 HTML 页面。</p><h2 id="一、安装" tabindex="-1">一、安装 <a class="header-anchor" href="#一、安装" aria-label="Permalink to &quot;一、安装&quot;">​</a></h2><h3 id="一-创建文件夹" tabindex="-1">一）创建文件夹 <a class="header-anchor" href="#一-创建文件夹" aria-label="Permalink to &quot;一）创建文件夹&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>mkdir docsite</span></span></code></pre></div><h3 id="二-安装-vitepress-依赖" tabindex="-1">二）安装 VitePress 依赖 <a class="header-anchor" href="#二-安装-vitepress-依赖" aria-label="Permalink to &quot;二）安装 VitePress 依赖&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>yarn add -D vitepress</span></span></code></pre></div><h3 id="三-脚手架构建项目" tabindex="-1">三）脚手架构建项目 <a class="header-anchor" href="#三-脚手架构建项目" aria-label="Permalink to &quot;三）脚手架构建项目&quot;">​</a></h3><p>VitePress 附带一个脚手架，可帮助您构建基本项目</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>npx vitepress init</span></span></code></pre></div><p>输入相应设置，自动生成相关代码</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240329214827.png" alt=""></p><h3 id="四-项目目录结构" tabindex="-1">四）项目目录结构 <a class="header-anchor" href="#四-项目目录结构" aria-label="Permalink to &quot;四）项目目录结构&quot;">​</a></h3><p><code>.vitepress</code>目录： VitePress 配置 <code>package.json</code>：依赖管理 <code>*.md</code>: markdown 文件</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240329215413.png" alt=""></p><p>配置文件 ( <code>.vitepress/config.mts</code>) 允许自定义 VitePress 站点的各个配置</p><p>srcDir ：存放文档的路径（index.md 的父目录），VitePress 会基于这个目录来编译和生成静态网站；如果配置为 ., 则是对应的项目根目录，scDir 下 必须要有一个 index.md，配置主页布局</p><p>link：链接路径，这个路径应该是相对于 <code>srcDir</code> 的。比如 <code>/docs/test</code> 指向的是 <code>scDir/docs/test.md</code></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { defineConfig } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;vitepress&#39;</span></span>
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
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div><p>其中：nav 为首页右上角导航栏； sidebar 为详情页侧边栏；socialLinks 为首页右上角友情链接</p><h3 id="五-创建-markdown-目录" tabindex="-1">五）创建 markdown 目录 <a class="header-anchor" href="#五-创建-markdown-目录" aria-label="Permalink to &quot;五）创建 markdown 目录&quot;">​</a></h3><p>使用一个软链接，链接到你的文档目录</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>ln -s ../docs docs</span></span></code></pre></div><p>vitepress 默认不支持软链接，解决存放文档的路径是个软链接时，页面显示 404 的问题：</p><p><a href="https://github.com/vuejs/vitepress/pull/2780" target="_blank" rel="noreferrer">https://github.com/vuejs/vitepress/pull/2780</a><a href="https://github.com/vuejs/vitepress/issues/1496#issuecomment-1282493417" target="_blank" rel="noreferrer">https://github.com/vuejs/vitepress/issues/1496#issuecomment-1282493417</a></p><p><code>.vitepress/config.mts</code> 文件添加如下设置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>export default defineConfig ({</span></span>
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
<span class="line"><span>]</span></span></code></pre></div><p>如果文章很多，都需要手动配置，很耗费时间，并且修改后还需要手动同步。所以推荐安装插件，自动配置侧边栏</p><p>安装侧边栏插件</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vite-plugin-vitepress-auto-sidebar</span></span></code></pre></div><p>在 <code>.vitepress/config.mts</code> 文件中使用插件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import AutoSidebar from &#39;vite-plugin-vitepress-auto-sidebar&#39;</span></span></code></pre></div><h2 id="二、运行" tabindex="-1">二、运行 <a class="header-anchor" href="#二、运行" aria-label="Permalink to &quot;二、运行&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>yarn docs:dev</span></span></code></pre></div><h2 id="三、部署" tabindex="-1">三、部署 <a class="header-anchor" href="#三、部署" aria-label="Permalink to &quot;三、部署&quot;">​</a></h2>`,37),l=[e];function t(h,c,k,r,d,o){return n(),a("div",null,l)}const u=s(p,[["render",t]]);export{g as __pageData,u as default};
