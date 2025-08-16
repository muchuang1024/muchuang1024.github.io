import{_ as a,c as s,o as n,a4 as p}from"./chunks/framework.4aTu-Nia.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/02 技术/运筹优化/如何描述一个运筹优化问题.md","filePath":"docs/02 技术/运筹优化/如何描述一个运筹优化问题.md"}'),e={name:"docs/02 技术/运筹优化/如何描述一个运筹优化问题.md"},l=p(`<p>向我描述运筹优化问题时，建议按以下结构来组织信息：</p><h2 id="_1-问题背景与目标" tabindex="-1">1. 问题背景与目标 <a class="header-anchor" href="#_1-问题背景与目标" aria-label="Permalink to &quot;1. 问题背景与目标&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>- 业务场景：什么业务问题需要优化？</span></span>
<span class="line"><span>- 优化目标：最大化/最小化什么？多目标时优先级如何？</span></span>
<span class="line"><span>- 约束条件：有哪些硬约束和软约束？</span></span></code></pre></div><h2 id="_2-决策变量" tabindex="-1">2. 决策变量 <a class="header-anchor" href="#_2-决策变量" aria-label="Permalink to &quot;2. 决策变量&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>- 需要决策什么？(x1, x2, ...)</span></span>
<span class="line"><span>- 变量类型：连续/整数/二进制？</span></span>
<span class="line"><span>- 变量含义：每个变量代表什么业务含义？</span></span></code></pre></div><h2 id="_3-目标函数" tabindex="-1">3. 目标函数 <a class="header-anchor" href="#_3-目标函数" aria-label="Permalink to &quot;3. 目标函数&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>- 数学表达式：f(x) = ?</span></span>
<span class="line"><span>- 目标类型：最小化成本/最大化收益/最小化时间等</span></span>
<span class="line"><span>- 多目标时：权重分配或优先级</span></span></code></pre></div><h2 id="_4-约束条件" tabindex="-1">4. 约束条件 <a class="header-anchor" href="#_4-约束条件" aria-label="Permalink to &quot;4. 约束条件&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>- 资源约束：容量、时间、预算限制</span></span>
<span class="line"><span>- 逻辑约束：业务规则、依赖关系</span></span>
<span class="line"><span>- 技术约束：技术可行性限制</span></span></code></pre></div><h2 id="_5-数据与参数" tabindex="-1">5. 数据与参数 <a class="header-anchor" href="#_5-数据与参数" aria-label="Permalink to &quot;5. 数据与参数&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>- 输入数据：成本、需求、容量等参数</span></span>
<span class="line"><span>- 数据规模：变量数量、约束数量</span></span>
<span class="line"><span>- 数据来源：历史数据/预测数据</span></span></code></pre></div><h2 id="_6-求解要求" tabindex="-1">6. 求解要求 <a class="header-anchor" href="#_6-求解要求" aria-label="Permalink to &quot;6. 求解要求&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>- 求解精度：精确解/近似解</span></span>
<span class="line"><span>- 求解时间：实时/离线</span></span>
<span class="line"><span>- 求解工具：CPLEX/Gurobi/开源工具等</span></span></code></pre></div><h2 id="示例描述格式" tabindex="-1">示例描述格式 <a class="header-anchor" href="#示例描述格式" aria-label="Permalink to &quot;示例描述格式&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>【问题背景】</span></span>
<span class="line"><span>电商仓库拣货路径优化：多个拣货员需要从不同货架拣取商品，如何安排路径使总拣货时间最短？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>【决策变量】</span></span>
<span class="line"><span>x_ijk: 拣货员i是否从货架j到货架k (0/1变量)</span></span>
<span class="line"><span>y_ij: 拣货员i是否访问货架j (0/1变量)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>【目标函数】</span></span>
<span class="line"><span>最小化总拣货时间：min Σ(i,j,k) t_ijk * x_ijk</span></span>
<span class="line"><span></span></span>
<span class="line"><span>【约束条件】</span></span>
<span class="line"><span>- 每个货架只能被一个拣货员访问</span></span>
<span class="line"><span>- 每个拣货员从起点出发，回到终点</span></span>
<span class="line"><span>- 拣货员负载不超过最大容量</span></span>
<span class="line"><span></span></span>
<span class="line"><span>【数据】</span></span>
<span class="line"><span>- 货架间距离矩阵</span></span>
<span class="line"><span>- 各货架商品需求量</span></span>
<span class="line"><span>- 拣货员数量与容量</span></span></code></pre></div><h2 id="常见运筹问题类型" tabindex="-1">常见运筹问题类型 <a class="header-anchor" href="#常见运筹问题类型" aria-label="Permalink to &quot;常见运筹问题类型&quot;">​</a></h2><ul><li><strong>线性规划 (LP)</strong>：目标函数和约束都是线性的</li><li><strong>整数规划 (IP)</strong>：部分或全部变量为整数</li><li><strong>混合整数规划 (MIP)</strong>：连续变量+整数变量</li><li><strong>网络流问题</strong>：运输、分配、路径优化</li><li><strong>调度问题</strong>：生产调度、人员排班</li><li><strong>库存问题</strong>：订货策略、安全库存</li></ul><p>按这个结构描述，我能更好地理解问题并帮你：</p><ol><li>建立数学模型</li><li>选择合适的求解方法</li><li>编写求解代码</li><li>分析结果</li></ol>`,19),i=[l];function t(c,o,d,h,r,u){return n(),s("div",null,i)}const b=a(e,[["render",t]]);export{_ as __pageData,b as default};
