import{_ as s,c as n,o as a,a4 as p}from"./chunks/framework.4aTu-Nia.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/00 创作中/PID 调整.md","filePath":"docs/00 创作中/PID 调整.md"}'),l={name:"docs/00 创作中/PID 调整.md"},e=p(`<h2 id="一、介绍" tabindex="-1">一、介绍 <a class="header-anchor" href="#一、介绍" aria-label="Permalink to &quot;一、介绍&quot;">​</a></h2><p><strong>PID控制原理</strong>，是一种经典的控制算法，广泛用于自动控制系统中，特别是在需要调节某个系统状态（比如温度、速度、位置）时，保持系统的稳定性并减少误差。PID代表 <strong>Proportional（比例）、Integral（积分）、Derivative（微分）</strong>，它结合了三种策略来最优地调节系统行为</p><p>PID 公式通过对误差的比例（P）、历史误差的累积（I）、以及误差变化速率（D）的综合考虑，动态生成一个调整因子（<code>adjust_value</code>），从而修正预测值。</p><h2 id="二、原理" tabindex="-1">二、原理 <a class="header-anchor" href="#二、原理" aria-label="Permalink to &quot;二、原理&quot;">​</a></h2><h3 id="_1-比例-p-控制误差的即时响应" tabindex="-1">1. <strong>比例（P）</strong>：控制误差的即时响应 <a class="header-anchor" href="#_1-比例-p-控制误差的即时响应" aria-label="Permalink to &quot;1. **比例（P）**：控制误差的即时响应&quot;">​</a></h3><ul><li><p><strong>原理</strong>：比例项主要用于应对系统当前的误差。误差越大，输出调整值越大，系统会更快做出反应。</p></li><li><p><strong>作用</strong>：快速减少误差，但可能会导致系统在目标值附近震荡或过冲。</p></li></ul><h3 id="_2-积分-i-控制长期累积误差" tabindex="-1">2. <strong>积分（I）</strong>：控制长期累积误差 <a class="header-anchor" href="#_2-积分-i-控制长期累积误差" aria-label="Permalink to &quot;2. **积分（I）**：控制长期累积误差&quot;">​</a></h3><ul><li><p><strong>原理</strong>：积分项对误差进行累加，目的是消除由于比例项无法完全消除的静态误差。积分可以纠正系统长期的偏差，使系统最终达到期望值。</p></li><li><p><strong>作用</strong>：能解决持久误差，但过多的积分会使系统响应过度，导致超调或震荡。</p></li></ul><h3 id="_3-微分-d-预测误差变化趋势" tabindex="-1">3. <strong>微分（D）</strong>：预测误差变化趋势 <a class="header-anchor" href="#_3-微分-d-预测误差变化趋势" aria-label="Permalink to &quot;3. **微分（D）**：预测误差变化趋势&quot;">​</a></h3><ul><li><p><strong>原理</strong>：微分项基于误差变化的速度来调整输出，可以预测系统误差的变化趋势，并对即将发生的误差做出调整。它用于平滑系统响应，防止系统快速波动。</p></li><li><p><strong>作用</strong>：减少系统的震荡，提高响应速度，但也可能使系统对噪声过于敏感。</p></li></ul><h3 id="结合三者-pid" tabindex="-1">结合三者（PID）： <a class="header-anchor" href="#结合三者-pid" aria-label="Permalink to &quot;结合三者（PID）：&quot;">​</a></h3><ul><li><p><strong>比例</strong>快速响应当前误差，<strong>积分</strong>修正长期误差，<strong>微分</strong>则预见并缓解误差变化的趋势。</p></li><li><p>这三者结合的控制方式可以有效减小系统误差、提高稳定性、并且避免过度调整。</p></li></ul><h3 id="为什么这种原理有效" tabindex="-1">为什么这种原理有效？ <a class="header-anchor" href="#为什么这种原理有效" aria-label="Permalink to &quot;为什么这种原理有效？&quot;">​</a></h3><ul><li><p><strong>比例项</strong>可以迅速减少误差，但如果只依赖比例，系统可能会到达目标值时震荡或者无法完全消除误差。</p></li><li><p><strong>积分项</strong>通过不断累积过去的误差，确保长期误差被消除，保证系统最终达到目标。</p></li><li><p><strong>微分项</strong>可以预测误差的未来变化，使得系统能在误差加速增大时做出前瞻性的调整，避免过度修正。</p></li></ul><p>因此，PID 控制通过三种机制的有机结合，使得系统能够有效调节并保持稳定。</p><h2 id="三、-应用场景" tabindex="-1">三、 应用场景 <a class="header-anchor" href="#三、-应用场景" aria-label="Permalink to &quot;三、 应用场景&quot;">​</a></h2><p>PID 控制广泛应用于：</p><ul><li><p><strong>自动驾驶</strong>：调整车辆速度或方向。</p></li><li><p><strong>温控系统</strong>：调节加热器或空调的温度。</p></li><li><p><strong>机器人控制</strong>：在复杂环境中保持机器人稳定性。</p></li><li><p><strong>飞行控制</strong>：无人机或飞机的姿态控制。</p></li></ul><h2 id="四、代码实现" tabindex="-1">四、代码实现 <a class="header-anchor" href="#四、代码实现" aria-label="Permalink to &quot;四、代码实现&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>### 1. 参数设定</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- **PID参数**：</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    - KP（比例系数）：0.1</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>    - KI（积分系数）：0.001</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>    - KD（微分系数）：-0.005</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>- **输出限制**：</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    - output_min = 0.8</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>    - output_max = 1.2</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>- **阈值**：</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    - threshold = 3</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span></span></span>
<span class="line"><span>### 2. 处理每个\`fence\`的时间点 i+1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>对于每个时间点，依次进行如下步骤：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#### 2.1 读取前一个时间点的实际值和预测值</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- **X_i**：前一个时间点的实际值</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>- **Y_i**：前一个时间点的预测值</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span></span></span>
<span class="line"><span>#### 2.2 判断条件</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- **X_i &lt; threshold**：如果实际值小于设定的阈值（3），则直接设置调整值 \`adjust_value = 1\`，并跳过后续的计算。</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span></span></span>
<span class="line"><span>#### 2.3 计算系数 R_i</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- **如果 X_i == 0 且 Y_i &gt;= 0.8**：系数 \`R_i = Y_i / 0.8\`</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>- **如果 X_i == 0 且 Y_i &lt; 0.8**：系数 \`R_i = 1\`</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>- **如果 X_i &gt; 0**：系数 \`R_i = Y_i / X_i\`</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span></span></span>
<span class="line"><span>#### 2.4 计算误差和积分</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- **误差**：\`error = R_i - 1\`</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>- **积分**：\`integral = max(min(integral + error, INTEGRAL_MAX), INTEGRAL_MIN)\`，对积分进行限制，确保其不超过最大最小值。</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span></span></span>
<span class="line"><span>#### 2.5 计算PID控制值</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- **P**（比例项）：\`P = KP * error\`</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>- **I**（积分项）：\`I = KI * integral\`</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>- **D**（微分项）：如果\`last_error\`为\`None\`（即第一次计算），则D=0；否则：\`D = KD * (error - last_error)\`</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span></span></span>
<span class="line"><span>#### 2.6 更新误差</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- 更新 \`last_error = error\`，为下一次计算做准备。</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span></span></span>
<span class="line"><span>#### 2.7 计算调整值</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- \`adjust_value = 1 + P + I + D\`，根据PID控制计算调整值。</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span></span></span>
<span class="line"><span>#### 2.8 修正预测值</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- 计算修正后的预测值：\`Y_hat = Y_(i+1) / adjust_value\`</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span></span></span>
<span class="line"><span>#### 2.9 取整（可选）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- 如果需要对预测值进行取整（未明确给出条件），则对 \`Y_hat\` 进行取整。</span></span></code></pre></div>`,20),i=[e];function t(r,c,o,_,h,d){return a(),n("div",null,i)}const P=s(l,[["render",t]]);export{u as __pageData,P as default};
