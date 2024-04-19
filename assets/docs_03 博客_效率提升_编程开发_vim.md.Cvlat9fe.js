import{_ as a,c as e,o as l,a4 as i}from"./chunks/framework.4aTu-Nia.js";const m=JSON.parse('{"title":"Vim","description":"","frontmatter":{},"headers":[],"relativePath":"docs/03 博客/效率提升/编程开发/vim.md","filePath":"docs/03 博客/效率提升/编程开发/vim.md"}'),s={name:"docs/03 博客/效率提升/编程开发/vim.md"},d=i(`<h1 id="vim" tabindex="-1">Vim <a class="header-anchor" href="#vim" aria-label="Permalink to &quot;Vim&quot;">​</a></h1><h2 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h2><p>Vim是从vi发展出来的一个文本编辑器。其代码补完、编译及错误跳转等方便编程的功能特别丰富，在程序员中被广泛使用</p><p>Neovim 是基于 vim 的速度更快的编辑器，也是 vim 的良好替代品，官网：<a href="https://neovim.io/" target="_blank" rel="noreferrer">https://neovim.io/</a></p><p>vim包含</p><p>vim 具有多种模式，每种模式下可以执行不同的操作。分别是普通模式、插入模式、命令模式和可视化模式，各模式的功能区分如下：</p><h3 id="普通模式" tabindex="-1">普通模式 <a class="header-anchor" href="#普通模式" aria-label="Permalink to &quot;普通模式&quot;">​</a></h3><p>vim默认模式，其它模式下按 <code>esc</code> 即可进入普通模式，控制屏幕光标的移动、字符、字或行的删除、移动复制某区段</p><h3 id="插入模式" tabindex="-1">插入模式 <a class="header-anchor" href="#插入模式" aria-label="Permalink to &quot;插入模式&quot;">​</a></h3><p>在普通模式下，按下<code>i</code>键进入插入模式，用于直接输入文本，并进行编辑</p><table><thead><tr><th>指令</th><th>说明</th><th>助记</th></tr></thead><tbody><tr><td>i</td><td>在当前光标字符前插入</td><td>insert</td></tr><tr><td>a</td><td>在当前光标字符后插入</td><td>append</td></tr><tr><td>I</td><td>在当前行首插入</td><td>Insert</td></tr><tr><td>A</td><td>在当前行尾插入</td><td>Append</td></tr><tr><td>o</td><td>在下方开一新行插入</td><td>open</td></tr><tr><td>O</td><td>在上方开一新行插入</td><td>Open</td></tr><tr><td>gi</td><td>上一次插入地方插入</td><td></td></tr></tbody></table><h3 id="命令模式" tabindex="-1">命令模式 <a class="header-anchor" href="#命令模式" aria-label="Permalink to &quot;命令模式&quot;">​</a></h3><p>在普通模式下按<code>:</code>进入，用于搜索、替换、保存退出等操作</p><table><thead><tr><th>指令</th><th>说明</th></tr></thead><tbody><tr><td>:w</td><td>保存</td></tr><tr><td>:w file</td><td>另存为文件</td></tr><tr><td>:q</td><td>退出</td></tr><tr><td>:q!</td><td>放弃修改退出</td></tr><tr><td>:wq</td><td>保存修改并退出</td></tr><tr><td>:e file</td><td>打开文件file</td></tr></tbody></table><h3 id="可视化模式" tabindex="-1">可视化模式 <a class="header-anchor" href="#可视化模式" aria-label="Permalink to &quot;可视化模式&quot;">​</a></h3><p>在普通模式下按<code>v</code>进入可视模式</p><table><thead><tr><th>指令</th><th>说明</th></tr></thead><tbody><tr><td>v</td><td>字符可视化模式，文本选择是以字符为单位</td></tr><tr><td>V</td><td>行可视化模式，文本选择是以行为单位</td></tr><tr><td>ctrl-V</td><td>块可视化模式，可以选择一个矩形内的文本</td></tr></tbody></table><h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>brew install vim</span></span></code></pre></div><h2 id="使用" tabindex="-1">使用 <a class="header-anchor" href="#使用" aria-label="Permalink to &quot;使用&quot;">​</a></h2><h3 id="移动跳转" tabindex="-1">移动跳转 <a class="header-anchor" href="#移动跳转" aria-label="Permalink to &quot;移动跳转&quot;">​</a></h3><ul><li><p><code>hjkl</code> 上下左右</p></li><li><p><code>0/^/$</code> 移动到行首、行中第1个不为空的字符、行尾</p></li><li><p><code>b/B</code> 跳转到上一个单词开头</p></li><li><p><code>w/W</code> 跳转到下一个单词开头</p></li><li><p><code>e/E</code> 跳转到下一个单词结尾</p></li><li><p><code>fx</code> 向前移动到字符 x 上</p></li><li><p><code>Fx</code> 向后移动到字符 x 上</p></li><li><p><code>tx</code> 向前移动到字符 x 前</p></li><li><p><code>Tx</code> 向后移动到字符 x 前</p></li><li><p><code>nb</code> 向前移动n个词</p></li><li><p><code>nw</code> 向后移动n个词</p></li><li><p><code>(</code> 到段首</p></li><li><p><code>)</code> 到段尾</p></li><li><p><code>{</code> 到段首</p></li><li><p><code>}</code> 到段尾</p></li><li><p><code>%</code> 跳转到匹配的块如 }、)、]</p></li><li><p><code>gg</code> 移动到文件结尾</p></li><li><p><code>G</code> 移动到文件结尾</p></li><li><p><code>:n</code> 移动到第n行</p></li><li><p><code>nG</code> 移动到第n行</p></li><li><p><code>nk</code> 向上移动n行</p></li><li><p><code>nj</code> 向下移动n行</p></li><li><p><code>H/M/L</code> 屏幕开头、中间、结尾</p></li><li><p><code>ctrl+d</code> 向下翻半页</p></li><li><p><code>ctrl+u</code> 向上翻半页</p></li><li><p><code>ctrl+f</code> 向下翻页</p></li><li><p><code>ctrl+b</code> 向上翻页</p></li><li><p><code>zt/zz/zb</code> 把当前行设置到顶部、中部、底部</p></li><li><p><code>ctrl-o</code> 移动到上次编辑位置，可以跨文件操作</p></li><li><p><code>ctrl-i</code> 回到最新编辑位置</p></li><li><p><code>shift+*</code> 向下跳转到同名单词位置</p></li><li><p><code>shift+#</code> 向上跳转到同名单词位置</p></li></ul><h3 id="选择" tabindex="-1">选择 <a class="header-anchor" href="#选择" aria-label="Permalink to &quot;选择&quot;">​</a></h3><ul><li><code>vt]</code> 选择到]，不包含]</li><li><code>va]</code> 选择到]， 包含]</li><li><code>*</code>命令：按下<code>*</code>命令会向下查找光标所在位置的下一个相同单词，并将其选中</li><li><code>#</code>命令：按下<code>#</code>命令会向上查找光标所在位置的上一个相同单词，并将其选中</li><li><code>g*n</code>命令：按下<code>g*n</code>命令会向下查找所有相同的单词，并将其一次性选中</li><li><code>g#n</code>命令：按下<code>g#n</code>命令会向上查找所有相同的单词，并将其一次性选中</li><li>Ctrl + d: 选择相同单词</li></ul><h3 id="剪切" tabindex="-1">剪切 <a class="header-anchor" href="#剪切" aria-label="Permalink to &quot;剪切&quot;">​</a></h3><ul><li><code>x</code> 删除当前光标所在处的字符</li><li><code>X</code> 删除当前光标左边的字符</li><li><code>d</code> 删除单词</li><li><code>dd</code> 删除当前行并鼠标移动到下一行；</li><li><code>5dd</code> 删除从光标开始处的 5 行代码</li><li><code>dgg</code> 删除从光标到文本开头</li><li><code>dG</code> 删除从光标到文本结尾</li><li><code>nx</code> 删除n个字符</li><li><code>nd</code> 删除n行</li><li><code>dnw</code> 删除n个单词</li><li><code>d0</code> 删除到行首</li><li><code>d$</code> 删除到行尾</li><li><code>dw/db/de</code> 反向删除单词、正向删除单词</li><li><code>ggdG</code> 删除全部</li><li><code>D</code> 删除当前行并鼠标在当前行</li><li><code>dfa</code> 删除从当前光标到光标后面的第一个a字符之间的内容</li><li><code>d%</code> 删除函数体</li><li><code>dt{char}</code> 删除光标到字符中间内容</li><li><code>d2t{char}</code> 删除直到遇到第2个字符</li><li><code>diw</code> 正向删除整个单词</li><li><code>daw</code> 正向删除整个单词，包含左右空格边界</li><li><code>di{</code> 删除花扩号内容,不包含}</li><li><code>dit</code> 删除 HTML 标签内容</li></ul><h3 id="删除修改" tabindex="-1">删除修改 <a class="header-anchor" href="#删除修改" aria-label="Permalink to &quot;删除修改&quot;">​</a></h3><ul><li><code>cw</code> 正向删除从光标处到单词结尾并进入插入模式</li><li><code>ce</code> 正向删除从光标处到单词结尾并进入插入模式</li><li><code>cb</code> 反向删除单词并进入插入模式</li><li><code>cc</code> 删除一整行并进入插入模式</li><li><code>C</code> 删除当前行并鼠标在当前行，进入插入模式</li><li><code>R</code> 进入替换模式</li><li><code>c0</code> 删除到行首，并进入插入模式</li><li><code>c$</code> 删除到行尾，并进入插入模式</li><li><code>ct{char}</code> 删除光标到字符中间内容，并进入插入模式</li><li><code>ciw</code> 正向删除整个单词并进入插入模式</li><li><code>caw</code> 正向删除整个单词并进入编辑，包含左右空格边界</li><li><code>ci{</code> 删除花扩号内容,不包含}</li><li><code>cit</code> 删除 HTML 标签内容，并进入插入模式</li></ul><h3 id="编辑修改" tabindex="-1">编辑修改 <a class="header-anchor" href="#编辑修改" aria-label="Permalink to &quot;编辑修改&quot;">​</a></h3><ul><li><code>ysiw&#39;</code> 单词加引号</li><li><code>ysiwt h2</code> 添加h2标签</li><li><code>dst</code> 删除标签</li><li><code>yss&#39;</code> 整行加引号</li><li><code>ds&#39;</code> 删除引号</li><li><code>cs&quot;&#39;</code> 替换双引号为单引号</li><li><code>cS&quot;&#39;</code> 整行替换双引号为单引号</li><li><code>shift+i</code> 批量编辑</li></ul><h3 id="查找" tabindex="-1">查找 <a class="header-anchor" href="#查找" aria-label="Permalink to &quot;查找&quot;">​</a></h3><ul><li><code>t/F/f{char}</code> 行内搜索，;查找下一个，,查找上一个</li><li><code>2f{char}</code> 向右查找第2个字符</li><li><code>2F{char}</code> 向左查找第2个字符</li><li><code>/xx</code> 可以查找某个单词xx，n查找下一个，N查找上一个</li><li><code>?xx</code> 可以反向查找</li><li><code>%</code> 跳转到匹配的块如 }、)、]</li></ul><h3 id="替换" tabindex="-1">替换 <a class="header-anchor" href="#替换" aria-label="Permalink to &quot;替换&quot;">​</a></h3><ul><li><code>:%s/xx/xx</code> 替换第一个</li><li><code>:%s/xx/xx/g</code> 替换当前行</li><li><code>:%s/xx/xx/g</code> 替换全部</li><li><code>:1,6 s/xx/xx/g</code> 替换1~6行的xx</li><li><code>:%s/old/new/gc</code> 替换全部，并提示是否进行替换</li><li><code>xp</code> 交换当前字母与后一个字母的位置</li><li><code>u/U</code> 将可视模式下选择的字母全改成大写/小写字母</li><li><code>r{char}</code> 修改光标字符</li><li><code>R{chars}</code> 修改多个光标字符</li><li><code>ddp</code> 调换当前行和下一行</li></ul><h3 id="复制" tabindex="-1">复制 <a class="header-anchor" href="#复制" aria-label="Permalink to &quot;复制&quot;">​</a></h3><ul><li><code>y</code> 复制</li><li><code>yfa</code> 拷贝从当前光标到光标后面的第一个a字符之间的内容.</li><li><code>y%</code> 复制函数体</li><li><code>nyy</code> 复制多行</li><li><code>ggyG</code> 拷贝全部</li></ul><h3 id="粘贴" tabindex="-1">粘贴 <a class="header-anchor" href="#粘贴" aria-label="Permalink to &quot;粘贴&quot;">​</a></h3><ul><li><code>p</code> 粘贴</li><li><code>yyp</code>复制当前行并粘贴</li></ul><h3 id="撤销" tabindex="-1">撤销 <a class="header-anchor" href="#撤销" aria-label="Permalink to &quot;撤销&quot;">​</a></h3><ul><li><code>u</code> 撤销命令</li><li><code>ctrl + r</code> 重做撤销命令</li></ul><h3 id="窗口管理" tabindex="-1">窗口管理 <a class="header-anchor" href="#窗口管理" aria-label="Permalink to &quot;窗口管理&quot;">​</a></h3><ul><li><code>vim -On file1 file2</code> 左右分屏打开文件</li><li><code>:vsp file</code> 左右分屏打开文件</li><li><code>:sp file</code> 上下分屏打开文件</li><li><code>ctrl +w v</code> 左右分屏当前文件</li><li><code>ctrl +w s</code> 上下分屏当前文件</li><li><code>ctrl +w c</code> 关闭当前窗口</li><li><code>ctrl +w o</code> 关闭其它窗口</li><li><code>ctrl +w l/j/k/w</code> 切换窗口</li><li><code>ctrl +w w</code> 窗口间循环切换</li><li><code>ctrl +w x</code> 窗口互换</li><li><code>ctrl +w H</code> 从水平布局到垂直布局</li><li><code>ctrl +w J</code> 从垂直布局到水平布局</li><li><code>:vertical resize 80</code> 设置宽度 80%</li><li><code>:resize 80</code> 设置高度 80%</li></ul><p>可以在配置文件中定义热键，来简化窗口操作操作</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&quot;分屏热键</span></span>
<span class="line"><span>nmap sl :set splitright&lt;CR&gt;:vsplit&lt;CR&gt;</span></span>
<span class="line"><span>nmap sh :set nosplitright&lt;CR&gt;:vsplit&lt;CR&gt;</span></span>
<span class="line"><span>nmap sk :set nosplitbelow&lt;CR&gt;:split&lt;CR&gt;</span></span>
<span class="line"><span>nmap sj :set splitbelow&lt;CR&gt;:split&lt;CR&gt;</span></span></code></pre></div><h3 id="标签页管理" tabindex="-1">标签页管理 <a class="header-anchor" href="#标签页管理" aria-label="Permalink to &quot;标签页管理&quot;">​</a></h3><ul><li><code>vim -p file1 file2</code> tab标签打开文件</li><li><code>:tabnew</code> 打开新的tab</li><li><code>:tabclose</code> 关闭当前的tab</li><li><code>:tabonly</code> 关闭所有其他的tab</li><li><code>:tabprev</code> 前一个tab</li><li><code>:tabnext</code> 后一个tab</li></ul><p>修改配置文件来定义键盘映射会让操作变得方便</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&quot;============标签管理============</span></span>
<span class="line"><span>map tt :tabe&lt;CR&gt;</span></span>
<span class="line"><span>map tj :-tabnext&lt;CR&gt;</span></span>
<span class="line"><span>map tk :+tabnext&lt;CR&gt;</span></span></code></pre></div><h3 id="多行注释" tabindex="-1">多行注释 <a class="header-anchor" href="#多行注释" aria-label="Permalink to &quot;多行注释&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>1. 进入命令行模式，按ctrl + v进入 visual block模式（可视快模式），然后按j, 或者k选中多行，把需要注释的行标记起来</span></span>
<span class="line"><span>2. 按大写字母I，再插入注释符，例如//</span></span>
<span class="line"><span>3. 按esc键过会儿就会全部注释了</span></span></code></pre></div><h3 id="取消多行注释" tabindex="-1">取消多行注释 <a class="header-anchor" href="#取消多行注释" aria-label="Permalink to &quot;取消多行注释&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>1. 进入命令行模式，按ctrl + v进入 visual block模式（可视快模式），按小写字母l横向选中列的个数，例如 // 需要选中2列</span></span>
<span class="line"><span>2. 按字母j，或者k选中注释符号</span></span>
<span class="line"><span>3. 按d键就可全部取消注释</span></span></code></pre></div><h3 id="缩进" tabindex="-1">缩进 <a class="header-anchor" href="#缩进" aria-label="Permalink to &quot;缩进&quot;">​</a></h3><ul><li><code>:m,n &gt;</code> 指定行缩进</li><li><code>:m,n &lt;</code> 指定行反缩进</li><li><code>gg&lt;G</code> 全部缩进</li><li><code>gg&gt;G</code> 全部反缩进</li></ul><h3 id="折叠" tabindex="-1">折叠 <a class="header-anchor" href="#折叠" aria-label="Permalink to &quot;折叠&quot;">​</a></h3><ul><li><code>zc</code> 折叠代码块</li><li><code>zo</code> 展开代码块</li><li><code>zC</code> 折叠所有代码块</li><li><code>zO</code> 展开所有代码块</li></ul><h2 id="插件" tabindex="-1">插件 <a class="header-anchor" href="#插件" aria-label="Permalink to &quot;插件&quot;">​</a></h2><h3 id="对齐" tabindex="-1">对齐 <a class="header-anchor" href="#对齐" aria-label="Permalink to &quot;对齐&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>,a=</span></span></code></pre></div><h2 id="键盘映射" tabindex="-1">键盘映射 <a class="header-anchor" href="#键盘映射" aria-label="Permalink to &quot;键盘映射&quot;">​</a></h2><p>可以对按键布局进行自定义设置</p><p>nmap 为 normal 模式 imap 为 insert 模式</p><p><code>&lt;LEADER&gt;</code>为前缀键，let mapleader=&quot; &quot; 将 LEADER 定义为空格 C 为 ctrl 键如 <code>&lt;C-b&gt;</code> 指 ctrl+b&quot;</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&quot; ============ 键盘映射</span></span>
<span class="line"><span>let mapleader=&quot; &quot;</span></span>
<span class="line"><span>nmap ge :CocCommand explorer</span></span>
<span class="line"><span>nmap S :w &lt;CR&gt;</span></span>
<span class="line"><span>nmap Q :q &lt;CR&gt;</span></span>
<span class="line"><span>nmap &lt;C-p&gt; :FZF &lt;CR&gt;</span></span>
<span class="line"><span>nmap H &lt;Home&gt;</span></span>
<span class="line"><span>nmap L &lt;End&gt;</span></span>
<span class="line"><span>imap jj &lt;Esc&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&quot; ============ 分屏</span></span>
<span class="line"><span>nmap &lt;LEADER&gt;vh :vsplit&lt;CR&gt;</span></span>
<span class="line"><span>nmap &lt;LEADER&gt;vj :split&lt;CR&gt;</span></span>
<span class="line"><span>nmap &lt;LEADER&gt;w &lt;C-w&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&quot; ============ 文件树</span></span>
<span class="line"><span>nmap &lt;C-b&gt; ge &lt;CR&gt;</span></span></code></pre></div><h2 id="实战" tabindex="-1">实战 <a class="header-anchor" href="#实战" aria-label="Permalink to &quot;实战&quot;">​</a></h2><h3 id="如何快速编辑" tabindex="-1">如何快速编辑 <a class="header-anchor" href="#如何快速编辑" aria-label="Permalink to &quot;如何快速编辑&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>var r = alg.Rider{</span></span>
<span class="line"><span>            ID         string \`xlsx:&quot;id&quot;\`</span></span>
<span class="line"><span>            Name       string \`xlsx:&quot;name&quot;\`</span></span>
<span class="line"><span>            Type       int    \`xlsx:&quot;type&quot;\`</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var r = alg.Rider{</span></span>
<span class="line"><span>            ID: data.ID,         </span></span>
<span class="line"><span>            Name: data.Name,</span></span>
<span class="line"><span>            Type: data.Type</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>// 单词部分修改</span></span>
<span class="line"><span>TimeSeqSorters</span></span>
<span class="line"><span>TimeSeqSorters</span></span>
<span class="line"><span></span></span>
<span class="line"><span>timeSeqSorters</span></span>
<span class="line"><span>timeSeqSorters</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 单词增加引号</span></span></code></pre></div><h3 id="如何快速填充" tabindex="-1">如何快速填充 <a class="header-anchor" href="#如何快速填充" aria-label="Permalink to &quot;如何快速填充&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>return alg.Job{</span></span>
<span class="line"><span>		OrderID: task.OrderID,</span></span>
<span class="line"><span>		IsSoonArrival: task.IsSoonArrival,</span></span>
<span class="line"><span>		IsShareOrder: task.IsShareOrder,</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="我的配置" tabindex="-1">我的配置 <a class="header-anchor" href="#我的配置" aria-label="Permalink to &quot;我的配置&quot;">​</a></h2><p><a href="https://github.com/caijinlin/dotfiles/blob/master/vim/vimrc" target="_blank" rel="noreferrer">vimrc</a></p>`,71),t=[d];function n(o,c,p,r,h,u){return l(),e("div",null,t)}const g=a(s,[["render",n]]);export{m as __pageData,g as default};
