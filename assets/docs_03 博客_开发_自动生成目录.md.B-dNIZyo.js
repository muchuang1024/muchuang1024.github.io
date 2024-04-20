import{_ as a,c as n,o as s,a4 as p}from"./chunks/framework.4aTu-Nia.js";const g=JSON.parse('{"title":"自动生成本地文章目录","description":"","frontmatter":{},"headers":[],"relativePath":"docs/03 博客/开发/自动生成目录.md","filePath":"docs/03 博客/开发/自动生成目录.md"}'),e={name:"docs/03 博客/开发/自动生成目录.md"},l=p(`<h1 id="自动生成本地文章目录" tabindex="-1">自动生成本地文章目录 <a class="header-anchor" href="#自动生成本地文章目录" aria-label="Permalink to &quot;自动生成本地文章目录&quot;">​</a></h1><p>做一个工具，最重要的确定输入和输出，你不用关心 AI 是怎么做的？ AI 根据你的输入和输出，自动帮你写出代码</p><p>所以使用 AI 辅助做一款工具，最主要的 2 点：</p><p>1、写好提示词（主要是输入和输出）</p><p>2、运行脚本代码（掌握如何运行代码）</p><p>本文将从 0 到 1，带你实现一个 自动生成文章目录的工具</p><h2 id="一、如何提问" tabindex="-1">一、如何提问 <a class="header-anchor" href="#一、如何提问" aria-label="Permalink to &quot;一、如何提问&quot;">​</a></h2><p>写好的提示词的前提是懂得如何提问，然后设计出自己的提示词，最后根据输出结果进行迭代优化</p><p>当你不清楚该怎么提问时，可以直接向 AI 请教</p><h3 id="一-提示词" tabindex="-1">一）提示词 <a class="header-anchor" href="#一-提示词" aria-label="Permalink to &quot;一）提示词&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>现在你是一个技术专家，擅长开发各种工具，我现在需要你开发一个脚本工具，为存储在本地文件夹中的文章自动生成目录</span></span>
<span class="line"><span></span></span>
<span class="line"><span>请问我应该如何向你下达指令，你才能更好地帮助我</span></span></code></pre></div><h3 id="二-gpt-回复" tabindex="-1">二）GPT 回复 <a class="header-anchor" href="#二-gpt-回复" aria-label="Permalink to &quot;二）GPT 回复&quot;">​</a></h3><p><img src="https://raw.githubusercontent.com/muchuang1024/imgcdn/master/20231224200252.png" alt=""></p><h2 id="二、设计提示词" tabindex="-1">二、设计提示词 <a class="header-anchor" href="#二、设计提示词" aria-label="Permalink to &quot;二、设计提示词&quot;">​</a></h2><h3 id="一-提示词-1" tabindex="-1">一）提示词 <a class="header-anchor" href="#一-提示词-1" aria-label="Permalink to &quot;一）提示词&quot;">​</a></h3><p>明确上面的细节给出提示词</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>现在你是一个技术专家，擅长开发各种工具，我现在需要你写一个脚本工具，为存储在本地文件夹中的文章自动生成目录，请帮我编写代码</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>编程语言：Python</span></span>
<span class="line"><span></span></span>
<span class="line"><span>操作系统：Mac</span></span>
<span class="line"><span></span></span>
<span class="line"><span>制定脚本的工作流程：递归遍历当前文件夹，得到子文件夹和子文件，将子文件夹的名称输出到文档的标题部分（一级文件夹对应#，二级文件夹对应##，三级文件夹对应###，四级文件夹对应####)，不需要点击，但是递归遍历子文件夹，重复上述过程；将子文件的名称也输出到文档的标题部分，点击标题跳转到文件</span></span>
<span class="line"><span></span></span>
<span class="line"><span>输出格式：生成的目录应该以 Markdown 格式输出，文件名 toc.md</span></span>
<span class="line"><span></span></span>
<span class="line"><span>注意：文件夹或者文件名可能包含空格，可能需要特殊编码，保证文件链接正确</span></span></code></pre></div><h3 id="二-gpt-回复-1" tabindex="-1">二）GPT 回复 <a class="header-anchor" href="#二-gpt-回复-1" aria-label="Permalink to &quot;二）GPT 回复&quot;">​</a></h3><p><img src="https://raw.githubusercontent.com/muchuang1024/imgcdn/master/20231224201239.png" alt=""></p><h2 id="三、优化提示词" tabindex="-1">三、优化提示词 <a class="header-anchor" href="#三、优化提示词" aria-label="Permalink to &quot;三、优化提示词&quot;">​</a></h2><p>直接按照这个输出的目录格式可能不符合自己的要求，下面进行优化下，最简单有效的方式就是少样本提示，提供一个示例</p><h3 id="一-提示词-2" tabindex="-1">一）提示词 <a class="header-anchor" href="#一-提示词-2" aria-label="Permalink to &quot;一）提示词&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>现在你是一个技术专家，擅长开发各种工具，我现在需要你写一个脚本工具，为存储在本地文件夹中的文章自动生成目录，请帮我编写代码</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>编程语言：Python</span></span>
<span class="line"><span></span></span>
<span class="line"><span>操作系统：Mac</span></span>
<span class="line"><span></span></span>
<span class="line"><span>制定脚本的工作流程：递归遍历指定文件夹，得到子文件夹和子文件，将子文件夹的名称输出到文档的标题部分（一级文件夹对应#，二级文件夹对应##，三级文件夹对应###，四级文件夹对应####)，不需要点击，但是递归遍历子文件夹，重复上述过程；将子文件的名称也输出到文档的标题部分，点击标题跳转到文件</span></span>
<span class="line"><span></span></span>
<span class="line"><span>输出格式：生成的目录应该以 Markdown 格式输出，文件名 toc.md</span></span>
<span class="line"><span></span></span>
<span class="line"><span>注意：文件夹或者文件名可能包含空格，可能需要特殊编码，保证文件链接正确</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>文件结构示例：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>├── Golang</span></span>
<span class="line"><span>│ ├── 入门</span></span>
<span class="line"><span>│ │ ├── 001.md</span></span>
<span class="line"><span>│ │ └── 002.md</span></span>
<span class="line"><span>│ └── 面试</span></span>
<span class="line"><span>│ ├── 001.md</span></span>
<span class="line"><span>│ ├── 002.md</span></span>
<span class="line"><span>│ └── 基础</span></span>
<span class="line"><span>│ └── 001.md</span></span>
<span class="line"><span>└── 工具</span></span>
<span class="line"><span>├── 效率提升</span></span>
<span class="line"><span>│ ├── 001.md</span></span>
<span class="line"><span>│ └── 002.md</span></span>
<span class="line"><span>└── 编程开发</span></span>
<span class="line"><span>├── 001.md</span></span>
<span class="line"><span>└── 002.md</span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>生成的文档示例：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---</span></span>
<span class="line"><span>- Golang/</span></span>
<span class="line"><span>  - 入门/</span></span>
<span class="line"><span>    - [001.md](./Golang/入门/001.md)</span></span>
<span class="line"><span>    - [002.md](./Golang/入门/002.md)</span></span>
<span class="line"><span>  - 面试/</span></span>
<span class="line"><span>    - [001.md](./Golang/面试/001.md)</span></span>
<span class="line"><span>    - [002.md](./Golang/面试/002.md)</span></span>
<span class="line"><span>    - 基础/</span></span>
<span class="line"><span>      - [001.md](./Golang/面试/基础/001.md)</span></span>
<span class="line"><span>- 工具/</span></span>
<span class="line"><span>  - 效率提升/</span></span>
<span class="line"><span>    - [001.md](./工具/效率提升/001.md)</span></span>
<span class="line"><span>    - [002.md](./工具/效率提升/002.md)</span></span>
<span class="line"><span>  - 编程开发/</span></span>
<span class="line"><span>    - [001.md](./工具/编程开发/001.md)</span></span>
<span class="line"><span>    - [002.md](./工具/编程开发/002.md)</span></span>
<span class="line"><span>---</span></span></code></pre></div><h3 id="二-gpt-回复-2" tabindex="-1">二）GPT 回复 <a class="header-anchor" href="#二-gpt-回复-2" aria-label="Permalink to &quot;二）GPT 回复&quot;">​</a></h3><p><img src="https://raw.githubusercontent.com/muchuang1024/imgcdn/master/20231224202713.png" alt=""></p><p>得到代码如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import os</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def generate_markdown_directory(folder_path, depth=0):</span></span>
<span class="line"><span>    # 获取当前文件夹下的文件和子文件夹</span></span>
<span class="line"><span>    items = os.listdir(folder_path)</span></span>
<span class="line"><span>    toc = &quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    for item in sorted(items):</span></span>
<span class="line"><span>        item_path = os.path.join(folder_path, item)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 如果是文件夹，递归处理</span></span>
<span class="line"><span>        if os.path.isdir(item_path):</span></span>
<span class="line"><span>            # 处理文件夹名中的空格和特殊字符</span></span>
<span class="line"><span>            folder_name = item.replace(&quot; &quot;, &quot;%20&quot;)</span></span>
<span class="line"><span>            folder_name = folder_name.replace(&quot;#&quot;, &quot;%23&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            # 生成对应层级的Markdown标题</span></span>
<span class="line"><span>            toc += f&quot;{&#39;  &#39; * depth}- [{item}]({folder_name}/)\\n&quot;</span></span>
<span class="line"><span>            # 递归处理子文件夹</span></span>
<span class="line"><span>            toc += generate_markdown_directory(item_path, depth + 1)</span></span>
<span class="line"><span>        # 如果是文件，直接生成Markdown标题</span></span>
<span class="line"><span>        elif os.path.isfile(item_path):</span></span>
<span class="line"><span>            # 处理文件名中的空格和特殊字符</span></span>
<span class="line"><span>            file_name = item.replace(&quot; &quot;, &quot;%20&quot;)</span></span>
<span class="line"><span>            file_name = file_name.replace(&quot;#&quot;, &quot;%23&quot;)</span></span>
<span class="line"><span>            toc += f&quot;{&#39;  &#39; * depth}- [{item}]({file_name})\\n&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return toc</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 指定本地文件夹路径</span></span>
<span class="line"><span>folder_path = &quot;.&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 生成Markdown目录</span></span>
<span class="line"><span>markdown_directory = generate_markdown_directory(folder_path)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 生成toc.md文件</span></span>
<span class="line"><span>with open(&quot;toc.md&quot;, &quot;w&quot;) as toc_file:</span></span>
<span class="line"><span>    toc_file.write(markdown_directory)</span></span></code></pre></div><h3 id="三-运行代码" tabindex="-1">三）运行代码 <a class="header-anchor" href="#三-运行代码" aria-label="Permalink to &quot;三）运行代码&quot;">​</a></h3><p>提示词：我是个小白，没有编程基础和编程环境，如何在 Mac 上运行这个代码？</p><p><img src="https://raw.githubusercontent.com/muchuang1024/imgcdn/master/20231224203238.png" alt=""></p><p>1、按照上面的步骤安装 Python 环境</p><p>2、替换代码中 folder_path = &quot;.&quot; 即当前路径，并将代码保存到文件 generate_toc.py</p><p>3、将 generate_toc.py 拷贝到实际文章所在路径</p><p>4、在当前路径查看生成的 toc.md 文件</p><h3 id="四-运行效果" tabindex="-1">四）运行效果 <a class="header-anchor" href="#四-运行效果" aria-label="Permalink to &quot;四）运行效果&quot;">​</a></h3><p>查看 toc.md 内容：</p><p><img src="https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-20231224214419877.png" alt=""></p><p>Markdown 预览：</p><p><img src="https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-8.png" alt=""></p><h2 id="四、多轮对话优化" tabindex="-1">四、多轮对话优化 <a class="header-anchor" href="#四、多轮对话优化" aria-label="Permalink to &quot;四、多轮对话优化&quot;">​</a></h2><p>上面的运行截图中，可以发现问题：文件的链接不对，打开找不到文件</p><h3 id="一-修复文件不能正确打开" tabindex="-1">一）修复文件不能正确打开 <a class="header-anchor" href="#一-修复文件不能正确打开" aria-label="Permalink to &quot;一）修复文件不能正确打开&quot;">​</a></h3><p>发现文件打不开，看了下 toc.md 文件，没有带上路径</p><p>提示词：文件的链接不对，需要带上路径</p><p><img src="https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-11.png" alt=""></p><p>查看 toc.md 内容：</p><p><img src="https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-10.png" alt=""></p><p>如果文件仍然打不开，可以看看文件名或文件夹是否包含空格，如果包含，让 GPT 解决下</p><h3 id="二-只展示后缀名为-md-结尾的文件" tabindex="-1">二）只展示后缀名为 .md 结尾的文件 <a class="header-anchor" href="#二-只展示后缀名为-md-结尾的文件" aria-label="Permalink to &quot;二）只展示后缀名为 .md 结尾的文件&quot;">​</a></h3><p>上面可以看到 隐藏文件也被展示出来了，只展示 Markdown 文档</p><p>提示词：</p><p><img src="https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-12.png" alt=""></p><p>查看 toc.md 内容：</p><p><img src="https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-13.png" alt=""></p><p>Markdown 预览效果：</p><p><img src="https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-14.png" alt=""></p><p>以上就完成了一个自动生成目录的工具，写完文章后，执行下 <code>python generate_toc.py</code> 这可以自动生成目录，非常方便，不用手动维护目录</p><h2 id="五、完整代码" tabindex="-1">五、完整代码 <a class="header-anchor" href="#五、完整代码" aria-label="Permalink to &quot;五、完整代码&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import os</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def generate_markdown_directory(folder_path, depth=0, base_path=&quot;&quot;):</span></span>
<span class="line"><span>    # 获取当前文件夹下的文件和子文件夹</span></span>
<span class="line"><span>    items = os.listdir(folder_path)</span></span>
<span class="line"><span>    toc = &quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    for item in sorted(items):</span></span>
<span class="line"><span>        item_path = os.path.join(folder_path, item)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 如果是文件夹，递归处理</span></span>
<span class="line"><span>        if os.path.isdir(item_path):</span></span>
<span class="line"><span>            # 处理文件夹名中的空格和特殊字符并编码</span></span>
<span class="line"><span>            folder_name = item.replace(&quot; &quot;, &quot;%20&quot;)</span></span>
<span class="line"><span>            folder_name = folder_name.replace(&quot;#&quot;, &quot;%23&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            # 生成对应层级的Markdown标题</span></span>
<span class="line"><span>            toc += f&quot;{&#39;  &#39; * depth}- [{item}]({base_path}/{folder_name}/index.md)\\n&quot;</span></span>
<span class="line"><span>            # 递归处理子文件夹</span></span>
<span class="line"><span>            toc += generate_markdown_directory(</span></span>
<span class="line"><span>                item_path, depth + 1, f&quot;{base_path}/{folder_name}&quot;</span></span>
<span class="line"><span>            )</span></span>
<span class="line"><span>        # 如果是文件且以.md结尾，直接生成Markdown标题</span></span>
<span class="line"><span>        elif os.path.isfile(item_path) and item.endswith(&quot;.md&quot;):</span></span>
<span class="line"><span>            # 处理文件名中的空格和特殊字符并编码</span></span>
<span class="line"><span>            file_name = item.replace(&quot; &quot;, &quot;%20&quot;)</span></span>
<span class="line"><span>            file_name = file_name.replace(&quot;#&quot;, &quot;%23&quot;)</span></span>
<span class="line"><span>            file_path = os.path.join(base_path, file_name)</span></span>
<span class="line"><span>            toc += f&quot;{&#39;  &#39; * depth}- [{item}]({file_path})\\n&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return toc</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># 指定当前文件夹</span></span>
<span class="line"><span>folder_path = &quot;.&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 生成Markdown目录</span></span>
<span class="line"><span>markdown_directory = generate_markdown_directory(</span></span>
<span class="line"><span>    folder_path, 0, os.path.basename(folder_path)</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 生成toc.md文件</span></span>
<span class="line"><span>with open(&quot;toc.md&quot;, &quot;w&quot;) as toc_file:</span></span>
<span class="line"><span>    toc_file.write(markdown_directory)</span></span></code></pre></div>`,59),t=[l];function i(c,o,r,d,h,m){return s(),n("div",null,t)}const _=a(e,[["render",i]]);export{g as __pageData,_ as default};
