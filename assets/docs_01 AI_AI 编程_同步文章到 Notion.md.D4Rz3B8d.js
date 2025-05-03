import{_ as n,c as s,o as a,a4 as t}from"./chunks/framework.4aTu-Nia.js";const m=JSON.parse('{"title":"同步本地文章到 Notion","description":"","frontmatter":{},"headers":[],"relativePath":"docs/01 AI/AI 编程/同步文章到 Notion.md","filePath":"docs/01 AI/AI 编程/同步文章到 Notion.md"}'),p={name:"docs/01 AI/AI 编程/同步文章到 Notion.md"},e=t(`<h1 id="同步本地文章到-notion" tabindex="-1">同步本地文章到 Notion <a class="header-anchor" href="#同步本地文章到-notion" aria-label="Permalink to &quot;同步本地文章到 Notion&quot;">​</a></h1><h2 id="一、背景" tabindex="-1">一、背景 <a class="header-anchor" href="#一、背景" aria-label="Permalink to &quot;一、背景&quot;">​</a></h2><p>之前往 Notion 数据库页面添加一条记录，需要找到 Notion 数据库，如果层级过深，比较麻烦，所以想将本地的文章自动同步到 Notion 数据库</p><p>技术选型： Golang</p><p>介绍 Golang：使用 Go 语言来写，分享给同事用，直接把可执行文件分享给同事用就可以了</p><p>介绍 Notion 及基本使用</p><h2 id="二、编写代码" tabindex="-1">二、编写代码 <a class="header-anchor" href="#二、编写代码" aria-label="Permalink to &quot;二、编写代码&quot;">​</a></h2><p>我：你是资深技术专家，精通各种编程语言开发，帮我使用 Golang 写一个 cli 工具，往 Notion 数据库里面写入一条记录</p><p><img src="https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-20231216153319091.png" alt=""></p><h2 id="三、获取-notion-api-key" tabindex="-1">三、获取 Notion API key <a class="header-anchor" href="#三、获取-notion-api-key" aria-label="Permalink to &quot;三、获取 Notion API key&quot;">​</a></h2><p><strong>1、搜索如何获取 Notion API Key</strong></p><p>直接问 GPT 如何获取</p><p><img src="https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-20231216150222477.png" alt=""></p><p><strong>2、创建集成</strong></p><p>通过上一步获得 Notion Integrations 页面链接： <a href="https://www.notion.so/my-integrations%EF%BC%8C%E4%BD%BF%E7%94%A8%E6%B5%8F%E8%A7%88%E5%99%A8%E6%89%93%E5%BC%80" target="_blank" rel="noreferrer">https://www.notion.so/my-integrations，使用浏览器打开</a></p><p><img src="https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-20231216150324165.png" alt=""></p><p>点击 New Integration 按钮，填写集成名称</p><p><img src="https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-20231216150637672.png" alt=""></p><p>点击上面的 “Submit” 按钮，就会跳转到集成详情，点击 Show 按钮查看 Key 详情</p><p><img src="https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-20231216151459150.png" alt=""></p><p><img src="https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-20231216150939929.png" alt=""></p><p>点击 Copy 按钮复制 Key，记录下来这个 Key，后面要用</p><p><img src="https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-20231216151356758.png" alt=""></p><h2 id="四、获取-notion-数据库-id" tabindex="-1">四、获取 Notion 数据库 ID <a class="header-anchor" href="#四、获取-notion-数据库-id" aria-label="Permalink to &quot;四、获取 Notion 数据库 ID&quot;">​</a></h2><p><strong>1、搜索如何获取 Notion 数据库 ID</strong></p><p><img src="https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-20231216151741320.png" alt=""></p><p><strong>2、提取数据库 ID</strong></p><p>从浏览器的 URL 中 复制出来得到数据库 ID：41c7fac6dece48af8cf496223aafb694</p><p><img src="https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-20231216152051466.png" alt=""></p><h2 id="五、如何运行代码" tabindex="-1">五、如何运行代码 <a class="header-anchor" href="#五、如何运行代码" aria-label="Permalink to &quot;五、如何运行代码&quot;">​</a></h2><p>1、如果是 Mac 电脑，直接询问 Mac 上如何运行这段代码</p><p><img src="https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-20231216154012361.png" alt=""></p><p>2、如果是 Windows，直接就问 Window 上如何运行这段代码</p><p><img src="https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-20231216155308047.png" alt=""></p><h3 id="一-安装-go-环境" tabindex="-1">一）安装 Go 环境 <a class="header-anchor" href="#一-安装-go-环境" aria-label="Permalink to &quot;一）安装 Go 环境&quot;">​</a></h3><p>按照提示下载相应系统的安装包，点击安装即可；安装完成后，需要配置下环境变量，这样 输入 <code>go</code> 指令的时候，系统才能找到路径</p><p><strong>1、windows</strong></p><p><strong>下载</strong>：</p><ul><li>访问 Go 语言官方网站下载页面 <a href="https://golang.org/dl/" target="_blank" rel="noreferrer">golang.org/dl/</a>。</li><li>选择适合 Windows 系统的安装程序（通常是 .msi 文件）。</li></ul><p><strong>安装</strong>：</p><ul><li>双击下载的文件并遵循安装向导指示。</li><li>安装过程中，可以自定义安装路径或使用默认路径。</li></ul><p><strong>配置环境变量</strong>：</p><ul><li>安装器通常会自动设置环境变量。但你可以手动检查： <ul><li>右键点击 “我的电脑” -&gt; “属性” -&gt; “高级系统设置” -&gt; “环境变量”。</li><li>确保 Path 环境变量中包含了 Go 的安装路径，如 C:\\Go\\bin。</li></ul></li></ul><p><strong>验证安装</strong>：</p><ul><li>打开命令提示符，输入 go version，应该会显示安装的 Go 版本。</li></ul><p><strong>2、Mac</strong></p><p><strong>下载</strong>：</p><ul><li>访问 <a href="https://golang.org/dl/" target="_blank" rel="noreferrer">golang.org/dl/</a>。</li><li>选择适合 macOS 的安装包（通常是 .pkg 文件）。</li></ul><p><strong>安装</strong>：</p><ul><li>双击下载的 .pkg 文件，遵循安装指示进行安装。</li></ul><p><strong>配置环境变量</strong>：</p><ul><li>macOS 安装器通常会自动设置环境变量。</li><li>你可以在终端中运行 echo $PATH 检查是否包含 Go 的安装路径。</li></ul><p><strong>验证安装</strong>：</p><ul><li>打开终端，输入 go version，检查显示的 Go 版本。</li></ul><h3 id="二-准备代码" tabindex="-1">二） 准备代码 <a class="header-anchor" href="#二-准备代码" aria-label="Permalink to &quot;二） 准备代码&quot;">​</a></h3><p>在桌面上，使用文本編辑器（如记事本、VSCode、Subime Text）创建一个新文件，将提供的 Go 语言代码复制并粘贴到该文件中，将文件保存为 notion.cli.go</p><p>在代码中找到 <code>your_notion_api_key_here</code> 和 <code>your_database_id_here</code>，将它们分别替换为您的 Notion API 密钥和数据库 ID</p><p><img src="https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-20231216153644622.png" alt=""></p><h3 id="三-打开终端" tabindex="-1">三）打开终端 <a class="header-anchor" href="#三-打开终端" aria-label="Permalink to &quot;三）打开终端&quot;">​</a></h3><p><strong>1、windows</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>在 Windows 上，按下 Win + R 快捷键，输入 cmd 并按回车来打开命令提示符</span></span></code></pre></div><p><strong>2、Mac</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>在 Mac 上，可以在「应用程序」文件夹中找到它，或者使用「Spotlight」搜索</span></span></code></pre></div><p><img src="https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-20231216155552731.png" alt=""></p><h3 id="四-运行代码" tabindex="-1">四）运行代码 <a class="header-anchor" href="#四-运行代码" aria-label="Permalink to &quot;四）运行代码&quot;">​</a></h3><p><strong>1、windows</strong></p><p>在终端中，使用 <code>cd</code> 命令导航到包含 <code>notion_cli.go</code> 文件的目录。例如，如果文件在您的桌面上，可以输入：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>cd C:\\Users\\您的用户名\\Desktop</span></span></code></pre></div><p>运行以下命令来执行程序：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>go run notion_cli.go</span></span></code></pre></div><p><strong>2、Mac</strong></p><p>在终端中，使用 <code>cd</code> 命令导航到包含 <code>notion_cli.go</code> 文件的目录。例如，如果文件在您的桌面上，可以输入：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>cd ~/Desktop</span></span></code></pre></div><p>运行以下命令来执行程序：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>go run notion_cli.go</span></span></code></pre></div><p>然而事情并不总是一帆风顺，执行底阿妈，报错了</p><p><img src="https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-20231216160155003.png" alt=""></p><p>直接问 GPT</p><p><img src="https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-20231216160244776.png" alt=""></p><p>首先确认数据库 ID 是否正确，排查后大概率应该是权限问题，没有将 Notion 集成添加到数据库的共享列表，导致无权限访问</p><p><img src="https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-20231216160510472.png" alt=""></p><p><img src="https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-20231216160614993.png" alt=""></p><p><img src="https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-20231216160807929.png" alt=""></p><p><img src="https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-20231216160906483.png" alt=""></p><p><img src="https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-20231216165941682.png" alt=""></p><p><img src="https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-20231216170008268.png" alt=""></p><p>查看同步效果</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>	Properties: map[string]Property{</span></span>
<span class="line"><span>			&quot;标题&quot;: {</span></span>
<span class="line"><span>				Title: []Text{{Text: map[string]string{&quot;content&quot;: &quot;新记录2&quot;}}},</span></span>
<span class="line"><span>			},</span></span></code></pre></div><p><img src="https://raw.githubusercontent.com/muchuang1024/imgcdn/master/image-20231216171221411.png" alt=""></p><h2 id="六、完整代码" tabindex="-1">六、完整代码 <a class="header-anchor" href="#六、完整代码" aria-label="Permalink to &quot;六、完整代码&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;bytes&quot;</span></span>
<span class="line"><span>	&quot;encoding/json&quot;</span></span>
<span class="line"><span>	&quot;fmt&quot;</span></span>
<span class="line"><span>	&quot;io/ioutil&quot;</span></span>
<span class="line"><span>	&quot;net/http&quot;</span></span>
<span class="line"><span>	&quot;os&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const (</span></span>
<span class="line"><span>	notionVersion = &quot;2022-06-28&quot;</span></span>
<span class="line"><span>	databaseID    = &quot;41c7fac6dece48af8cf496223aafb694&quot;                   // 替换为您的数据库 ID</span></span>
<span class="line"><span>	apiKey        = &quot;secret_3bHaTYpWVZVU6e9UuAxSabtDEUAsnBK00mIcWbslNRF&quot; // 替换为您的 Notion API 密钥</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Notion API 请求的结构体</span></span>
<span class="line"><span>type NotionRequest struct {</span></span>
<span class="line"><span>	Parent     map[string]string   \`json:&quot;parent&quot;\`</span></span>
<span class="line"><span>	Properties map[string]Property \`json:&quot;properties&quot;\`</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>type Property struct {</span></span>
<span class="line"><span>	Title []Text \`json:&quot;title&quot;\`</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>type Text struct {</span></span>
<span class="line"><span>	Text map[string]string \`json:&quot;text&quot;\`</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	// 创建一个 Notion API 请求</span></span>
<span class="line"><span>	reqBody := NotionRequest{</span></span>
<span class="line"><span>		Parent: map[string]string{&quot;database_id&quot;: databaseID},</span></span>
<span class="line"><span>		Properties: map[string]Property{</span></span>
<span class="line"><span>			&quot;标题&quot;: {</span></span>
<span class="line"><span>				Title: []Text{{Text: map[string]string{&quot;content&quot;: &quot;新记录2&quot;}}},</span></span>
<span class="line"><span>			},</span></span>
<span class="line"><span>		},</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 将请求体编码为 JSON</span></span>
<span class="line"><span>	buf := new(bytes.Buffer)</span></span>
<span class="line"><span>	json.NewEncoder(buf).Encode(reqBody)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 创建 HTTP 请求</span></span>
<span class="line"><span>	req, err := http.NewRequest(&quot;POST&quot;, &quot;https://api.notion.com/v1/pages&quot;, buf)</span></span>
<span class="line"><span>	if err != nil {</span></span>
<span class="line"><span>		fmt.Println(&quot;Error creating request:&quot;, err)</span></span>
<span class="line"><span>		os.Exit(1)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 添加必要的请求头</span></span>
<span class="line"><span>	req.Header.Add(&quot;Authorization&quot;, &quot;Bearer &quot;+apiKey)</span></span>
<span class="line"><span>	req.Header.Add(&quot;Content-Type&quot;, &quot;application/json&quot;)</span></span>
<span class="line"><span>	req.Header.Add(&quot;Notion-Version&quot;, notionVersion)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 发送请求</span></span>
<span class="line"><span>	client := &amp;http.Client{}</span></span>
<span class="line"><span>	resp, err := client.Do(req)</span></span>
<span class="line"><span>	if err != nil {</span></span>
<span class="line"><span>		fmt.Println(&quot;Error sending request:&quot;, err)</span></span>
<span class="line"><span>		os.Exit(1)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	defer resp.Body.Close()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 读取响应体</span></span>
<span class="line"><span>	responseBody, err := ioutil.ReadAll(resp.Body)</span></span>
<span class="line"><span>	if err != nil {</span></span>
<span class="line"><span>		fmt.Println(&quot;Error reading response body:&quot;, err)</span></span>
<span class="line"><span>		os.Exit(1)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 打印响应</span></span>
<span class="line"><span>	if resp.StatusCode == http.StatusOK {</span></span>
<span class="line"><span>		fmt.Println(&quot;记录成功添加到 Notion 数据库&quot;)</span></span>
<span class="line"><span>	} else {</span></span>
<span class="line"><span>		fmt.Printf(&quot;添加记录失败，状态111码：%v\\n错误信息：%s\\n&quot;, resp.StatusCode, string(responseBody))</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>五、分享给别人</p><p>翻译成 Go 代码</p>`,93),o=[e];function i(l,c,r,g,u,h){return a(),s("div",null,o)}const q=n(p,[["render",i]]);export{m as __pageData,q as default};
