import{_ as t,c as e,o as d,a4 as a}from"./chunks/framework.4aTu-Nia.js";const g=JSON.parse('{"title":"vscode","description":"","frontmatter":{},"headers":[],"relativePath":"docs/03 博客/效率提升/编程开发/vscode.md","filePath":"docs/03 博客/效率提升/编程开发/vscode.md"}'),s={name:"docs/03 博客/效率提升/编程开发/vscode.md"},n=a(`<h1 id="vscode" tabindex="-1">vscode <a class="header-anchor" href="#vscode" aria-label="Permalink to &quot;vscode&quot;">​</a></h1><h2 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h2><h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h2><h2 id="配置" tabindex="-1">配置 <a class="header-anchor" href="#配置" aria-label="Permalink to &quot;配置&quot;">​</a></h2><h3 id="主题" tabindex="-1">主题 <a class="header-anchor" href="#主题" aria-label="Permalink to &quot;主题&quot;">​</a></h3><p>颜色主题：Monokai Pro (Filter Machine)</p><p>文件图标主题：Material Theme Icons</p><p>产品图标主题：默认</p><h3 id="字体" tabindex="-1">字体 <a class="header-anchor" href="#字体" aria-label="Permalink to &quot;字体&quot;">​</a></h3><p>cascadia-code： <a href="https://github.com/microsoft/cascadia-code" target="_blank" rel="noreferrer">https://github.com/microsoft/cascadia-code</a></p><p>在 vscode 配置中搜索<code>Editor: Font Family</code> 并设置以下值</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&#39;Cascadia Code&#39;, &#39;JetBrains Mono&#39;,&#39;Fira Code&#39;,Menlo,Monaco, &#39;Courier New&#39;, monospace</span></span></code></pre></div><p>需要在配置中将连字打开（设置中搜索<code>fontLigatures</code>关键词）</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&quot;editor.fontFamily&quot;: &quot;&#39;Fira Code&#39;,&#39;JetBrains Mono&#39;&quot;,</span></span>
<span class="line"><span>&quot;editor.fontLigatures&quot;: true,</span></span></code></pre></div><h3 id="截屏模式" tabindex="-1">截屏模式 <a class="header-anchor" href="#截屏模式" aria-label="Permalink to &quot;截屏模式&quot;">​</a></h3><p>该模式可以将按钮与鼠标操作在屏幕上显示，非常适合讲解使用</p><p>开启方式：<code>ctrl+shift+p</code> 后选择 <code>screen</code></p><p><img src="https://fastly.jsdelivr.net/gh/caijinlin/imgcdn/image-20230530165847266.png" alt=""></p><p>效果：实时显示屏幕按键</p><h3 id="滚动缩放" tabindex="-1">滚动缩放 <a class="header-anchor" href="#滚动缩放" aria-label="Permalink to &quot;滚动缩放&quot;">​</a></h3><p>开启方式：vscode -&gt; 文本编辑器 &gt; 勾选 Editor: Mouse Wheel Zoom</p><p><img src="https://fastly.jsdelivr.net/gh/caijinlin/imgcdn/image-20230530170530925.png" alt=""></p><p>效果：按住 ctrl+滚轮达到放大的效果</p><h3 id="平滑移动" tabindex="-1">平滑移动 <a class="header-anchor" href="#平滑移动" aria-label="Permalink to &quot;平滑移动&quot;">​</a></h3><ol><li><p>vscode 设置开启 <code>&quot;editor.cursorSmoothCaretAnimation&quot;: true</code></p></li><li><p>修改 Mac <code>系统偏好设置 &gt; 键盘</code> 更改 <strong>按键重复</strong> 与 <strong>重复前延迟</strong></p></li></ol><p><img src="https://fastly.jsdelivr.net/gh/caijinlin/imgcdn/image-20230530172150452.png" alt=""></p><ol start="3"><li>在终端执行以下命令</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># For VSCode</span></span>
<span class="line"><span>defaults write com.microsoft.VSCode ApplePressAndHoldEnabled -bool false</span></span>
<span class="line"><span></span></span>
<span class="line"><span># For VSCode Insiders</span></span>
<span class="line"><span>defaults write com.microsoft.VSCodeInsiders ApplePressAndHoldEnabled -bool false</span></span></code></pre></div><h3 id="滚动置顶" tabindex="-1">滚动置顶 <a class="header-anchor" href="#滚动置顶" aria-label="Permalink to &quot;滚动置顶&quot;">​</a></h3><ol><li>开启方式：vscode -&gt; 文本编辑器 &gt; 勾选 Sticky Scroll: Enabled</li></ol><p><img src="https://fastly.jsdelivr.net/gh/caijinlin/imgcdn/image-20230531211518173.png" alt=""></p><h3 id="括号配对" tabindex="-1">括号配对 <a class="header-anchor" href="#括号配对" aria-label="Permalink to &quot;括号配对&quot;">​</a></h3><p>勾选 Bracket Pairs 相关设置</p><p><img src="https://fastly.jsdelivr.net/gh/caijinlin/imgcdn/image-20230624065106652.png" alt=""></p><h3 id="终端命令" tabindex="-1">终端命令 <a class="header-anchor" href="#终端命令" aria-label="Permalink to &quot;终端命令&quot;">​</a></h3><p>命令面板安装 <code>code</code> 命令，就可以在终端中使用 Visual Studio Code 打开文件或目录</p><h2 id="插件" tabindex="-1">插件 <a class="header-anchor" href="#插件" aria-label="Permalink to &quot;插件&quot;">​</a></h2><h3 id="通用插件" tabindex="-1">通用插件 <a class="header-anchor" href="#通用插件" aria-label="Permalink to &quot;通用插件&quot;">​</a></h3><table><thead><tr><th>插件</th><th>功能</th><th>设置</th></tr></thead><tbody><tr><td>Dyno File Utils</td><td>新建/重命名文件</td><td></td></tr><tr><td>CodeGeeX</td><td>AI 编程</td><td></td></tr><tr><td>Tabnine AI</td><td>AI 编程</td><td></td></tr><tr><td>Continue</td><td>AI 编程</td><td></td></tr><tr><td>Open in Finder</td><td>使用 Finder 打开</td><td></td></tr><tr><td>GitLens</td><td>Git 版本历史</td><td></td></tr><tr><td>Bracket Pair Colorization Toggler</td><td>括号匹配</td><td></td></tr><tr><td><code>expand-region</code></td><td>扩大选择代码区域</td><td></td></tr><tr><td>tabnine</td><td>AI 代码自动补全</td><td></td></tr></tbody></table><h3 id="go-插件" tabindex="-1">Go 插件 <a class="header-anchor" href="#go-插件" aria-label="Permalink to &quot;Go 插件&quot;">​</a></h3><table><thead><tr><th>插件</th><th>功能</th><th>设置</th></tr></thead><tbody><tr><td>Go</td><td>Go 语言支持</td><td>Go: Test File：设置快捷键 Command + Shift + T;<br>Go: Benchmark File: 设置快捷键 Command + Shift + B</td></tr><tr><td>go-run</td><td>在终端中执行 go run filename 指令</td><td>设置快捷键 Command + Shift + R</td></tr></tbody></table><p>Notice: 在 Visual Studio Code 中，通过将 &quot;go.buildFlags&quot;: [&quot;-mod=mod&quot;] 添加到设置中，你告诉 Go 扩展在构建和执行代码时使用模块模式，这样就可以在代码跳转到 replace 指令对应的目录而不是 vendor 目录。</p><h3 id="python-插件" tabindex="-1">Python 插件 <a class="header-anchor" href="#python-插件" aria-label="Permalink to &quot;Python 插件&quot;">​</a></h3><table><thead><tr><th>插件</th><th>功能</th><th>设置</th></tr></thead><tbody><tr><td>Python</td><td>Python 语言支持</td><td></td></tr><tr><td>black</td><td>python 代码格式化</td><td>右键格式化文档选择 black 作为默认格式化程序</td></tr><tr><td>Pylance</td><td>代码自动完成、类型检查、重构等功能</td><td></td></tr><tr><td>python snippets</td><td>python 代码片段</td><td></td></tr></tbody></table><h3 id="前端插件" tabindex="-1">前端插件 <a class="header-anchor" href="#前端插件" aria-label="Permalink to &quot;前端插件&quot;">​</a></h3><table><thead><tr><th>插件</th><th>功能</th><th>设置</th></tr></thead><tbody><tr><td>vscode-element-helper</td><td></td><td></td></tr><tr><td>Volar</td><td>vue3 支持插件</td><td></td></tr><tr><td>TypeScript Vue Plugin</td><td>volar 的 typescript 类型支持插件</td><td></td></tr><tr><td>Prettier</td><td>代码格式化</td><td>prettier</td></tr><tr><td>ESLint</td><td>代码规范检查</td><td></td></tr><tr><td>Highlight Matching Tag</td><td>高亮匹配标签\\选择匹配标签的内容</td><td>选择</td></tr><tr><td>Live Server</td><td>浏览器自动刷新</td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td>unplugin-auto-import</td><td></td><td></td></tr><tr><td>CSS PEEK</td><td></td><td></td></tr><tr><td>Emmet</td><td>Faster HTML &amp; CSS Workflow</td><td></td></tr><tr><td>Vue VSCode Snippets</td><td></td><td></td></tr><tr><td>Vue 3 Support - All In One</td><td></td><td></td></tr><tr><td>Import Cost</td><td>显示包大小</td><td></td></tr></tbody></table><h3 id="sql-插件" tabindex="-1">Sql 插件 <a class="header-anchor" href="#sql-插件" aria-label="Permalink to &quot;Sql 插件&quot;">​</a></h3><table><thead><tr><th>插件</th><th>功能</th><th>设置</th></tr></thead><tbody><tr><td>Sql Formatter</td><td>sql 格式化</td><td></td></tr></tbody></table><h3 id="vim-插件" tabindex="-1">Vim 插件 <a class="header-anchor" href="#vim-插件" aria-label="Permalink to &quot;Vim 插件&quot;">​</a></h3><table><thead><tr><th>插件</th><th>功能</th><th>设置</th></tr></thead><tbody><tr><td>vim-sneak</td><td></td><td></td></tr><tr><td>im-select</td><td></td><td></td></tr></tbody></table><h2 id="使用" tabindex="-1">使用 <a class="header-anchor" href="#使用" aria-label="Permalink to &quot;使用&quot;">​</a></h2><p>vim Keyboard shortcuts for Mac</p><p><a href="https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf" target="_blank" rel="noreferrer">https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf</a></p><p>Ctrl: 低频操作（切换）</p><p>Command：高频操作（编辑）</p><h3 id="页面管理" tabindex="-1">页面管理 <a class="header-anchor" href="#页面管理" aria-label="Permalink to &quot;页面管理&quot;">​</a></h3><table><thead><tr><th style="text-align:left;">指令</th><th>标题</th><th>源</th></tr></thead><tbody><tr><td style="text-align:left;">Command + Shift + P</td><td>打开命令看板</td><td>vscode 默认</td></tr><tr><td style="text-align:left;">Command + Shift + D</td><td>打开调试面板</td><td>vscode 默认</td></tr><tr><td style="text-align:left;">Command + Shift + X</td><td>打开插件安装</td><td>vscode 默认</td></tr><tr><td style="text-align:left;">Command + Shift + U</td><td>显示输出面板 Show Output panel</td><td>vscode 默认</td></tr><tr><td style="text-align:left;">Command + K Command + S</td><td>打开快捷键设置</td><td>vscode 默认</td></tr><tr><td style="text-align:left;">Command + ,</td><td>打开软件设置</td><td>vscode 默认</td></tr><tr><td style="text-align:left;">Command + B</td><td>切换左侧菜单</td><td>vscode 默认</td></tr><tr><td style="text-align:left;">Command + J</td><td>切换下侧菜单</td><td>vscode 默认</td></tr><tr><td style="text-align:left;">Command + +</td><td>放大</td><td>vscode 默认</td></tr><tr><td style="text-align:left;">Command + -</td><td>缩小</td><td>vscode 默认</td></tr></tbody></table><h3 id="文件管理" tabindex="-1">文件管理 <a class="header-anchor" href="#文件管理" aria-label="Permalink to &quot;文件管理&quot;">​</a></h3><table><thead><tr><th style="text-align:left;">指令</th><th>标题</th><th>源</th></tr></thead><tbody><tr><td style="text-align:left;">Option + N</td><td>New Items</td><td>Dyno File Utils 插件</td></tr><tr><td style="text-align:left;">Shift + Option + N</td><td>New Items At Root</td><td>Dyno File Utils 插件</td></tr><tr><td style="text-align:left;">Option + R</td><td>Rename File</td><td>Dyno File Utils 插件</td></tr><tr><td style="text-align:left;">Option + D</td><td>Duplicate File</td><td>Dyno File Utils 插件</td></tr><tr><td style="text-align:left;">Option + M</td><td>Move File</td><td>Dyno File Utils 插件</td></tr><tr><td style="text-align:left;">Option + Del</td><td>Delete File</td><td>Dyno File Utils 插件</td></tr><tr><td style="text-align:left;">Shift + Option + Del</td><td>Delete Folder</td><td>Dyno File Utils 插件</td></tr></tbody></table><h3 id="代码导航" tabindex="-1">代码导航 <a class="header-anchor" href="#代码导航" aria-label="Permalink to &quot;代码导航&quot;">​</a></h3><table><thead><tr><th style="text-align:left;">指令</th><th>标题</th><th>源</th></tr></thead><tbody><tr><td style="text-align:left;">Ctrl + W</td><td>切换窗口</td><td>vscode 默认</td></tr><tr><td style="text-align:left;">Ctrl + R</td><td>切换项目</td><td>vscode 默认</td></tr><tr><td style="text-align:left;">Ctrl + \`</td><td>切换终端</td><td>vscode 默认</td></tr><tr><td style="text-align:left;">Option + Command + 方向键</td><td>在打开的文件之间切换</td><td>vscode 默认</td></tr><tr><td style="text-align:left;">Command + P</td><td>搜索文件</td><td>vscode 默认</td></tr><tr><td style="text-align:left;">Command + O</td><td>打开目录</td><td>vscode 默认</td></tr><tr><td style="text-align:left;">Command + Shift + O</td><td>搜索函数</td><td>vscode 默认</td></tr><tr><td style="text-align:left;">Command + T</td><td>搜索结构体</td><td>vscode 默认</td></tr></tbody></table><h3 id="代码跳转" tabindex="-1">代码跳转 <a class="header-anchor" href="#代码跳转" aria-label="Permalink to &quot;代码跳转&quot;">​</a></h3><table><thead><tr><th style="text-align:left;">指令</th><th>标题</th><th>源</th></tr></thead><tbody><tr><td style="text-align:left;">Ctrl + ]</td><td>转到定义</td><td>Go 插件修改快捷键, 默认 F12</td></tr><tr><td style="text-align:left;">Ctrl + shift + ]</td><td>转到实现</td><td>Go 插件修改快捷键, 默认 Command+F12</td></tr><tr><td style="text-align:left;">Ctrl + [</td><td>返回上一级</td><td>vscode 修改快捷键, 默认 Ctrl + -</td></tr></tbody></table><h3 id="代码运行" tabindex="-1">代码运行 <a class="header-anchor" href="#代码运行" aria-label="Permalink to &quot;代码运行&quot;">​</a></h3><table><thead><tr><th style="text-align:left;">指令</th><th>标题</th><th>源</th></tr></thead><tbody><tr><td style="text-align:left;">Command + R</td><td>开始调试</td><td>vscode 默认，默认 F5</td></tr><tr><td style="text-align:left;">Command + Shift + T</td><td>单元测试 （go test)</td><td>Go 插件</td></tr><tr><td style="text-align:left;">Command + Shift + R</td><td>运行 go 文件（go run)</td><td>Go 插件</td></tr><tr><td style="text-align:left;">Command + Shift + B</td><td>压力测试 (go benchmark)</td><td>Go 插件</td></tr><tr><td style="text-align:left;">Shift + T</td><td>测试</td><td>leetcode 插件（修改快捷键）</td></tr><tr><td style="text-align:left;">Shift + S</td><td>提交</td><td>leetcode 插件（修改快捷键）</td></tr></tbody></table><h3 id="移动" tabindex="-1">移动 <a class="header-anchor" href="#移动" aria-label="Permalink to &quot;移动&quot;">​</a></h3><table><thead><tr><th style="text-align:left;">指令</th><th>标题</th><th>源</th></tr></thead><tbody><tr><td style="text-align:left;">Ctrl + G</td><td>定位行号</td><td>vscode 默认</td></tr><tr><td style="text-align:left;">Ctrl + A</td><td>移动到行首</td><td>vscode 默认</td></tr><tr><td style="text-align:left;">Ctrl + E</td><td>移动到行尾</td><td>vscode 默认</td></tr><tr><td style="text-align:left;">Ctrl + I</td><td>上移</td><td>系统更改方向键</td></tr><tr><td style="text-align:left;">Ctrl + K</td><td>下移</td><td>系统更改方向键</td></tr><tr><td style="text-align:left;">Ctrl + J</td><td>左移</td><td>系统更改方向键</td></tr><tr><td style="text-align:left;">Ctrl + L</td><td>右移</td><td>系统更改方向键</td></tr><tr><td style="text-align:left;">Command + ↑</td><td>移动到页面顶部</td><td>系统更改方向键</td></tr><tr><td style="text-align:left;">Command + ↓</td><td>移动到页面末尾</td><td>系统更改方向键</td></tr></tbody></table><h3 id="查找选择" tabindex="-1">查找选择 <a class="header-anchor" href="#查找选择" aria-label="Permalink to &quot;查找选择&quot;">​</a></h3><table><thead><tr><th style="text-align:left;">指令</th><th>标题</th><th>源</th></tr></thead><tbody><tr><td style="text-align:left;">Command + E</td><td>查找指定内容</td><td>vscode 默认</td></tr><tr><td style="text-align:left;">Command + F</td><td>查找搜索内容</td><td>vscode 默认</td></tr><tr><td style="text-align:left;">Command + Shift + F</td><td>多个文件中查找搜索内容</td><td>vscode 默认</td></tr><tr><td style="text-align:left;">Command + Shift + H</td><td>查找替换</td><td>vscode 默认</td></tr><tr><td style="text-align:left;">Command + G</td><td>选中下一个与当前关闭处相同的单词</td><td>vscode 默认</td></tr><tr><td style="text-align:left;">Command + Shift + G</td><td>选中上一个与当前关闭处相同的单词</td><td>vscode 默认</td></tr><tr><td style="text-align:left;">Command + D</td><td>增加选中下一个与当前关闭处相同的单词</td><td>vscode 默认</td></tr><tr><td style="text-align:left;">Command + Shift + L</td><td>选中所有与当前光标处相同的单词</td><td>vscode 默认</td></tr><tr><td style="text-align:left;">Command + L</td><td>展开行选择</td><td>vscode 默认</td></tr><tr><td style="text-align:left;">Shift + ↑</td><td>向上选择多行</td><td>系统更改方向键</td></tr><tr><td style="text-align:left;">Shift + ↓</td><td>向下选择多行</td><td>系统更改方向键</td></tr><tr><td style="text-align:left;">Shift + &lt;-</td><td>向左选择多个单词</td><td>系统更改方向键</td></tr><tr><td style="text-align:left;">Shift + -&gt;</td><td>向右选择多个单词</td><td>系统更改方向键</td></tr><tr><td style="text-align:left;"><code>Ctrl + W</code></td><td>将选择范围扩展到单词、引号、方括号、函数体等</td><td>expand-region 插件</td></tr><tr><td style="text-align:left;"><code>Ctrl + U</code></td><td>选择标签内的内容（不包括标签）</td><td>Highlight Matching Tag 插件</td></tr><tr><td style="text-align:left;"><code>Ctrl + shift + U</code></td><td>选择标签内的内容（包括标签）</td><td>Highlight Matching Tag 插件</td></tr></tbody></table><h3 id="代码编辑" tabindex="-1">代码编辑 <a class="header-anchor" href="#代码编辑" aria-label="Permalink to &quot;代码编辑&quot;">​</a></h3><table><thead><tr><th style="text-align:left;">指令</th><th>说明</th><th>源</th></tr></thead><tbody><tr><td style="text-align:left;">Command + C</td><td>复制</td><td>vscode 默认</td></tr><tr><td style="text-align:left;">Command + V</td><td>粘贴</td><td>vscode 默认</td></tr><tr><td style="text-align:left;">Command + Z</td><td>撤销</td><td>vscode 默认</td></tr><tr><td style="text-align:left;">Command + Shift + Z</td><td>恢复撤销</td><td>vscode 默认</td></tr><tr><td style="text-align:left;">Command + /</td><td>切换行注释</td><td>vscode 默认</td></tr><tr><td style="text-align:left;">Command + X</td><td>剪切删除</td><td>vscode 默认</td></tr><tr><td style="text-align:left;">Command + ]</td><td>行缩进</td><td>vscode 修改快捷键, 默认 Ctrl + ]</td></tr><tr><td style="text-align:left;">Command + [</td><td>行减少缩进</td><td>vscode 修改快捷键, 默认 Ctrl + [</td></tr><tr><td style="text-align:left;">Alt + ↑</td><td>向上移动行 Move line up</td><td>vscode 默认</td></tr><tr><td style="text-align:left;">Alt + ↓</td><td>向下移动行 Move line down</td><td>vscode 默认</td></tr><tr><td style="text-align:left;"><code>Ctrl + D</code></td><td>向后删除 deleteRight</td><td>vscode 默认（编辑引号的内容）</td></tr><tr><td style="text-align:left;"><code>Ctrl + H</code></td><td>向前删除 deleteLeft</td><td>vscode 默认</td></tr><tr><td style="text-align:left;"><code>Ctrl + O</code></td><td>lineBreakInsert</td><td>vscode 默认</td></tr></tbody></table><h2 id="eslint" tabindex="-1">eslint <a class="header-anchor" href="#eslint" aria-label="Permalink to &quot;eslint&quot;">​</a></h2><p>代码格式校验工具，配合项目中的校验规则</p><p>配置</p><p>在 setting.json 中添加，可以参考一下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>  {</span></span>
<span class="line"><span>    &quot;editor.codeActionsOnSave&quot;: {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      &quot;source.fixAll&quot;: true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    &quot;eslint.validate&quot;: [</span></span>
<span class="line"><span>    	&quot;javascript&quot;, &quot;javascriptreact&quot;, &quot;vue&quot;, &quot;typescript&quot;, &quot;typescriptreact&quot;</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>  }</span></span></code></pre></div><h2 id="prettier" tabindex="-1">prettier <a class="header-anchor" href="#prettier" aria-label="Permalink to &quot;prettier&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>## 安装插件</span></span>
<span class="line"><span></span></span>
<span class="line"><span>vscode 搜索插件安装 https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 配置文件</span></span>
<span class="line"><span></span></span>
<span class="line"><span>官网 https://prettier.io/ 设置选项配置，然后导出</span></span>
<span class="line"><span></span></span>
<span class="line"><span>在项目根目录创建.prettierrc 文件，将内容复制进去</span></span></code></pre></div><p>{ &quot;arrowParens&quot;: &quot;always&quot;, &quot;bracketSameLine&quot;: true, &quot;bracketSpacing&quot;: true, &quot;embeddedLanguageFormatting&quot;: &quot;auto&quot;, &quot;htmlWhitespaceSensitivity&quot;: &quot;css&quot;, &quot;insertPragma&quot;: false, &quot;jsxSingleQuote&quot;: false, &quot;printWidth&quot;: 120, &quot;proseWrap&quot;: &quot;never&quot;, &quot;quoteProps&quot;: &quot;as-needed&quot;, &quot;requirePragma&quot;: false, &quot;semi&quot;: false, &quot;singleQuote&quot;: true, &quot;tabWidth&quot;: 2, &quot;trailingComma&quot;: &quot;all&quot;, &quot;useTabs&quot;: false, &quot;vueIndentScriptAndStyle&quot;: false, &quot;singleAttributePerLine&quot;: false }</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>## 解决冲突</span></span>
<span class="line"><span></span></span>
<span class="line"><span>当 eslint 的规则和 prettier 的规则相冲突时，就会发现一个尴尬的问题，用其中一种来格式化代码，另一种就会报错</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解决思路：eslint 只用来进行代码质量检查（主要指 bug），prettier 用来做代码格式化</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### 解决方式</span></span>
<span class="line"><span></span></span>
<span class="line"><span>安装 eslint-config-prettier 插件配置集，把其配置到 eslintrc 规则的尾部；执行 ESLint 命令，会禁用那些和 Prettier 配置有冲突的规则，再使用 Prettier 来替代 ESLint 的格式化功能</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### 安装依赖</span></span></code></pre></div><p>npm install --save-dev eslint-config-prettier npm install --save-dev eslint-plugin-prettier</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>### 修改.eslintrc.js 文件</span></span>
<span class="line"><span></span></span>
<span class="line"><span>在 extends 尾部加入上面安装的依赖</span></span></code></pre></div><p>module.exports = { root: true, env: { node: true, }, plugins: [&#39;prettier&#39;], extends: [ &#39;plugin:vue/vue3-essential&#39;, &#39;@vue/typescript/recommended&#39;, &#39;prettier&#39;, ], parserOptions: { ecmaVersion: 2020, }, rules: { &#39;no-console&#39;: process.env.NODE_ENV === &#39;production&#39; ? &#39;warn&#39; : &#39;off&#39;, &#39;no-debugger&#39;: process.env.NODE_ENV === &#39;production&#39; ? &#39;warn&#39; : &#39;off&#39;, }, }</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 最佳实践</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- 在终端中使用 \`code\` 命令来打开 Visual Studio Code</span></span>
<span class="line"><span>- 切换项目：Ctrl + R</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- 隐藏左侧菜单：Command + B</span></span>
<span class="line"><span>- 隐藏下侧菜单：Command + J</span></span>
<span class="line"><span>- 开始调试：Command + R</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- 将插件支持的命令（标题） 在快捷方式中搜索，然后设置快捷键，方便快捷操作</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- Git 查看文件历史记录</span></span></code></pre></div>`,84),l=[n];function o(r,i,p,h,c,u){return d(),e("div",null,l)}const f=t(s,[["render",o]]);export{g as __pageData,f as default};
