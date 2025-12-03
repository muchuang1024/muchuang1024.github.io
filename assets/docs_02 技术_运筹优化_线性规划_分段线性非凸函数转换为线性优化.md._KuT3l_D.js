import{_ as a,c as s,o as n,a4 as p}from"./chunks/framework.4aTu-Nia.js";const m=JSON.parse('{"title":"区间选择","description":"","frontmatter":{},"headers":[],"relativePath":"docs/02 技术/运筹优化/线性规划/分段线性非凸函数转换为线性优化.md","filePath":"docs/02 技术/运筹优化/线性规划/分段线性非凸函数转换为线性优化.md"}'),l={name:"docs/02 技术/运筹优化/线性规划/分段线性非凸函数转换为线性优化.md"},e=p(`<h2 id="一、问题描述" tabindex="-1">一、问题描述 <a class="header-anchor" href="#一、问题描述" aria-label="Permalink to &quot;一、问题描述&quot;">​</a></h2><p>目标函数：最小化 𝑧 = 𝑓（𝑥 ）</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20250305191216.png" alt=""></p><p>约束条件：𝑥≥0​​</p><h2 id="二、线性化" tabindex="-1">二、线性化 <a class="header-anchor" href="#二、线性化" aria-label="Permalink to &quot;二、线性化&quot;">​</a></h2><p>目标函数：𝑧 = （1 −𝑥1）+ （𝑥2− 1 ) + （1 / 2 ）（𝑥3）</p><p>x1 、x2、x3 的系数分别是分段线性函数的 x 范围</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20250305191552.png" alt=""></p><h1 id="区间选择" tabindex="-1">区间选择 <a class="header-anchor" href="#区间选择" aria-label="Permalink to &quot;区间选择&quot;">​</a></h1><p>关键实现：将分段线性函数转换为线性目标函数，分段转移到约束中实现</p><ul><li>左边是上界约束，右边是下界约束</li><li>通过二进制变量 y 确保 x 只能落在一个区间</li><li>通过下界和上界约束 确保 x 符合相应的区间范围</li></ul><p>problem += 0 * y1 &lt;= x1 &lt;= 1 * y1 problem += 1 * y2 &lt;= x2 &lt;= 2 * y2 problem += 2 * y3 &lt;= x3 &lt;= 3 * y3</p><p>y1 = 1 时，0 &lt;= x1 &lt;= 1, 此时 y2 和 y3 均为0，所以 x2 和 x3 = 0 y2 = 1 时，1 &lt;= x2 &lt;= 2, 此时 y1 和 y3 均为0，所以 x1 和 x3 = 0 y3 = 1 时，2 &lt;= x3 &lt;= 3, 此时 y1 和 y1 均为0，所以 x1 和 x2 = 0</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import pulp</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 创建一个最小化线性规划问题</span></span>
<span class="line"><span>problem = pulp.LpProblem(&quot;Maximization_Problem&quot;, pulp.LpMaximize)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 定义变量</span></span>
<span class="line"><span>x1 = pulp.LpVariable(&#39;x1&#39;, lowBound=0)</span></span>
<span class="line"><span>x2 = pulp.LpVariable(&#39;x2&#39;, lowBound=0)</span></span>
<span class="line"><span>x3 = pulp.LpVariable(&#39;x3&#39;, lowBound=0)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>y1 = pulp.LpVariable(&#39;y1&#39;, cat=&#39;Binary&#39;)</span></span>
<span class="line"><span>y2 = pulp.LpVariable(&#39;y2&#39;, cat=&#39;Binary&#39;)</span></span>
<span class="line"><span>y3 = pulp.LpVariable(&#39;y3&#39;, cat=&#39;Binary&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 目标函数（x 转换为 3 个 x1、x2、x3）</span></span>
<span class="line"><span># y = 1-x</span></span>
<span class="line"><span># y = x-1</span></span>
<span class="line"><span># y = 1/2 * x</span></span>
<span class="line"><span>problem += (1 - x1) + (x2 - 1) + (1/2) * x3</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 区间选择约束条件（关键代码！！！）</span></span>
<span class="line"><span>problem += 0 &lt;= x1 &lt;= 1*y1</span></span>
<span class="line"><span>problem += 1*y2 &lt;= x2 &lt;= 2*y2</span></span>
<span class="line"><span>problem += 2*y3 &lt;= x3 &lt;= 3*y3</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 分段约束</span></span>
<span class="line"><span>problem += y1 + y2 + y3 == 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 求解问题</span></span>
<span class="line"><span>problem.solve()</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 输出结果</span></span>
<span class="line"><span>print(&quot;Status:&quot;, pulp.LpStatus[problem.status])</span></span>
<span class="line"><span>print(&quot;Optimal Value:&quot;, pulp.value(problem.objective))</span></span>
<span class="line"><span>print(&quot;x1 =&quot;, pulp.value(x1))</span></span>
<span class="line"><span>print(&quot;x2 =&quot;, pulp.value(x2))</span></span>
<span class="line"><span>print(&quot;x3 =&quot;, pulp.value(x3))</span></span>
<span class="line"><span>print(&quot;y1 =&quot;, pulp.value(y1))</span></span>
<span class="line"><span>print(&quot;y2 =&quot;, pulp.value(y2))</span></span>
<span class="line"><span>print(&quot;y3 =&quot;, pulp.value(y3))</span></span></code></pre></div>`,14),t=[e];function i(o,c,u,r,x,y){return n(),s("div",null,t)}const d=a(l,[["render",i]]);export{m as __pageData,d as default};
