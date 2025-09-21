import{_ as a,c as s,o as n,a4 as p}from"./chunks/framework.4aTu-Nia.js";const m=JSON.parse('{"title":"一、安装 Node.js","description":"","frontmatter":{},"headers":[],"relativePath":"docs/00 创作中/Claude Code 安装.md","filePath":"docs/00 创作中/Claude Code 安装.md"}'),e={name:"docs/00 创作中/Claude Code 安装.md"},i=p(`<h1 id="一、安装-node-js" tabindex="-1">一、安装 Node.js <a class="header-anchor" href="#一、安装-node-js" aria-label="Permalink to &quot;一、安装 Node.js&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>curl -fsSL https://gitee.com/edazh/nvm/raw/master/install.sh | bash​</span></span>
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
<span class="line"><span>npm install -g @anthropic-ai/claude-code --registry=https://registry.npmmirror.com</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 查看版本​</span></span>
<span class="line"><span></span></span>
<span class="line"><span>claude --version​</span></span></code></pre></div><h1 id="三、获取令牌" tabindex="-1">三、获取令牌 <a class="header-anchor" href="#三、获取令牌" aria-label="Permalink to &quot;三、获取令牌&quot;">​</a></h1><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20250720165406.png" alt=""></p><h1 id="四、设置环境变量" tabindex="-1">四、设置环境变量 <a class="header-anchor" href="#四、设置环境变量" aria-label="Permalink to &quot;四、设置环境变量&quot;">​</a></h1><p>⚠️upload failed, check dev console</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># 下面的代码不懂，也不要问，反正都是官网给的指南，一行行执行就好了​</span></span>
<span class="line"><span></span></span>
<span class="line"><span>vim  ~/.bash_profile</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export ANTHROPIC_AUTH_TOKEN=换成你的令牌</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export ANTHROPIC_BASE_URL=https://anyrouter.top</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export ANTHROPIC_AUTH_TOKEN=sk-acw-7bdc8c72-b2508af1431baaa3</span></span>
<span class="line"><span>export ANTHROPIC_BASE_URL=https://api.aicodewith.com</span></span>
<span class="line"><span></span></span>
<span class="line"><span>source ~/.bash_profile</span></span></code></pre></div><h1 id="五、进入" tabindex="-1">五、进入 <a class="header-anchor" href="#五、进入" aria-label="Permalink to &quot;五、进入&quot;">​</a></h1><p>选择你喜欢的主题 + Enter 确认安全须知 + Enter 使用默认 Terminal 配置 + Enter 信任工作目录 + Enter</p><p>符号说明： $$ \\begin{array}{l} I：司机可以卸车的候选点位集合, i \\in I 表示一个候选点位 \\[6pt] Q：目标卸车数 \\[6pt] x_{i} \\in {0,1} : 是否选中点位 i \\[6pt] q_{i}: 点位 i 的卸车数量 \\[6pt] d(i​,j​): 两点 i 和 j​ 之间的距离 \\[6pt] p_{driver}: 司机当前位置 \\[6pt] p_{i}: 点位 i 位置 \\[6pt] T_{i}: 点位 i 周转 \\[6pt] L_{i}: 点位 i 缺口 \\[6pt] N_{max}: 访问点位数量的最大限制 \\end{array} $$</p><p>决策变量：</p><p>$$ \\begin{array}{l} x_{i}: 表示点位 i 是否被选中作为卸车点，选中为1， x_{i} \\in {0, 1} \\[6pt] q_{i}: 点位 i 卸车数 \\[6pt] \\end{array} $$ 目标函数：</p><p>$$ \\begin{array}{l} \\textbf{主目标：最大化调度收益} \\max f = \\sum_{i \\in I} x_i \\cdot T_i \\cdot q_{i} \\[6pt] \\textbf{次目标1：最小化调度成本} \\min g = D({\\text{Location}(p_{driver})}, \\text{Location}(p_1)) + \\sum_{j=1}^{k-1} D(\\text{Location}(p_j), \\text{Location}(p_{j+1})) \\[6pt] \\textbf{次目标2：最小化点位数量} \\min h = \\sum_{i \\in I} x_i \\[6pt] 惩罚项: P_1 \\cdot \\max\\left(0, \\sum_{i \\in I} x_i - 3\\right) \\end{array} $$</p><p>约束条件：</p><p>$$ \\begin{array}{l} \\textbf{访问点位数量约束: } \\sum_{i \\in I} x_i \\le N_{\\max_visit} \\[6pt] \\textbf{单点位卸车数量约束: } q_i \\le Q_{\\text{available}_i} \\cdot x_i \\quad \\forall i \\in I \\[6pt] \\textbf{总卸车数量约束: } \\sum_{i \\in I} q_i = Q_{\\text{target}} \\[6pt] \\end{array} $$</p>`,17),t=[i];function l(c,o,r,d,_,h){return n(),s("div",null,t)}const b=a(e,[["render",l]]);export{m as __pageData,b as default};
