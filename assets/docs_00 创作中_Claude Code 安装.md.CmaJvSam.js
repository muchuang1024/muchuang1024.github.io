import{_ as s,c as a,o as n,a4 as p}from"./chunks/framework.4aTu-Nia.js";const m=JSON.parse('{"title":"一、安装 Node.js","description":"","frontmatter":{},"headers":[],"relativePath":"docs/00 创作中/Claude Code 安装.md","filePath":"docs/00 创作中/Claude Code 安装.md"}'),e={name:"docs/00 创作中/Claude Code 安装.md"},l=p(`<h1 id="一、安装-node-js" tabindex="-1">一、安装 Node.js <a class="header-anchor" href="#一、安装-node-js" aria-label="Permalink to &quot;一、安装 Node.js&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>curl -fsSL https://gitee.com/edazh/nvm/raw/master/install.sh | bash​</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#安装完成后刷新环境变量：​</span></span>
<span class="line"><span></span></span>
<span class="line"><span>source ~/.bashrc # 或 source ~/.zshrc（取决于 Shell 类型）​</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#配置国内镜像源​</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#修改环境变量，指定淘宝或阿里云镜像源：​</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export NVM_NODEJS_ORG_MIRROR=&quot;https://npmmirror.com/mirrors/node&quot;​</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;export NVM_NODEJS_ORG_MIRROR=&quot;https://npmmirror.com/mirrors/node&quot;&#39; &gt;&gt; ~/.bashrc​</span></span>
<span class="line"><span></span></span>
<span class="line"><span>source ~/.bashrc​</span></span>
<span class="line"><span></span></span>
<span class="line"><span>nvm install --lts​</span></span>
<span class="line"><span></span></span>
<span class="line"><span>node -v # 查看 Node.js 版本​</span></span>
<span class="line"><span></span></span>
<span class="line"><span>npm -v # 查看 npm 版本</span></span></code></pre></div><h1 id="二、安装-claude-code" tabindex="-1">二、安装 Claude Code <a class="header-anchor" href="#二、安装-claude-code" aria-label="Permalink to &quot;二、安装 Claude Code&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>### 复制指令输入到终端，安装Claude​</span></span>
<span class="line"><span></span></span>
<span class="line"><span>npm install -g @anthropic-ai/claude-code​</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 查看版本​</span></span>
<span class="line"><span></span></span>
<span class="line"><span>claude --version​</span></span></code></pre></div><h1 id="三、获取令牌" tabindex="-1">三、获取令牌 <a class="header-anchor" href="#三、获取令牌" aria-label="Permalink to &quot;三、获取令牌&quot;">​</a></h1><h1 id="四、设置环境变量" tabindex="-1">四、设置环境变量 <a class="header-anchor" href="#四、设置环境变量" aria-label="Permalink to &quot;四、设置环境变量&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># 下面的代码不懂，也不要问，反正都是官网给的指南，一行行执行就好了​</span></span>
<span class="line"><span></span></span>
<span class="line"><span>vim  ~/.bash_profile</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export ANTHROPIC_AUTH_TOKEN=换成你的令牌</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export ANTHROPIC_BASE_URL=https://anyrouter.top</span></span>
<span class="line"><span></span></span>
<span class="line"><span>source ~/.bash_profile</span></span></code></pre></div><h1 id="五、进入" tabindex="-1">五、进入 <a class="header-anchor" href="#五、进入" aria-label="Permalink to &quot;五、进入&quot;">​</a></h1><p>选择你喜欢的主题 + Enter 确认安全须知 + Enter 使用默认 Terminal 配置 + Enter 信任工作目录 + Enter</p>`,9),t=[l];function i(c,o,r,d,h,u){return n(),a("div",null,t)}const b=s(e,[["render",i]]);export{m as __pageData,b as default};
