import{_ as a,c as s,o as n,a4 as p}from"./chunks/framework.4aTu-Nia.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/02 工作/物流调度/调度 case.md","filePath":"docs/02 工作/物流调度/调度 case.md"}'),t={name:"docs/02 工作/物流调度/调度 case.md"},e=p(`<h2 id="一、即时单时长不应该在目标函数中" tabindex="-1">一、即时单时长不应该在目标函数中 <a class="header-anchor" href="#一、即时单时长不应该在目标函数中" aria-label="Permalink to &quot;一、即时单时长不应该在目标函数中&quot;">​</a></h2><p>考虑该因素侯，会导致优先分配即时单多的区域，线下无法理解</p><p>延伸：避免只考虑部分订单（比如即时单）的因素</p><p>比如 19:46的订单没有分配，反而分配了20:12的订单，因为 20:12 所在区域有2单即时单，19:46 只有 1 单，导致先分配了 20:12</p><p><img src="https://fastly.jsdelivr.net/gh/muchuang1024/imgcdn/20240422141439.png" alt="image.png"></p><p><img src="https://fastly.jsdelivr.net/gh/muchuang1024/imgcdn/20240422141458.png" alt="image.png"></p><p><img src="https://fastly.jsdelivr.net/gh/muchuang1024/imgcdn/20240422141514.png" alt="image.png"></p><h2 id="二、骑手等单数口径不合理" tabindex="-1">二、骑手等单数口径不合理 <a class="header-anchor" href="#二、骑手等单数口径不合理" aria-label="Permalink to &quot;二、骑手等单数口径不合理&quot;">​</a></h2><p>会优先分配不包含分拣任务的区域给驻店骑手，但包含分拣任务的区域可能还有其它紧急的配送任务</p><p>延伸：避免目标 bug，其它目标不变的情况下，该目标越好，但并不代表效果越好，则表明有 bug，该目标设计可能有问题</p><p>目标函数设计如下：WaitOrderCount 越小越好</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 驻店骑手等分拣中任务（分拣任务倾向指派返程骑手）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 配送任务等回店中骑手（配送任务倾向指派驻店骑手）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if r.Rider.Status == alg.RIDER_STAT_AT_STATION {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	if job.Type == alg.SORT {</span></span>
<span class="line"><span>	</span></span>
<span class="line"><span>		cost.WaitOrderCount += 1</span></span>
<span class="line"><span>	</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>} else {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	if job.Type == alg.DELIVERY {</span></span>
<span class="line"><span>	</span></span>
<span class="line"><span>		cost.WaitOrderCount += 1</span></span>
<span class="line"><span>	</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre></div><p>比如按照上面的口径：</p><p>方案一：WaitOrderCount = 0+1=1</p><p>驻店徐杨分配107：分拣任务（0单） 回店赵泽东分配106：配送任务（1单）</p><p>方案二：WaitOrderCount = 2+1=3</p><p>驻店徐杨分配106：分拣任务（2单） 回店赵泽东分配107：配送任务（1单）</p><p>按照等单越少越好，则选择了方案一，实际上方案二更好</p><p><img src="https://fastly.jsdelivr.net/gh/muchuang1024/imgcdn/20240422173128.png" alt="image.png"></p><p>优化的目标函数：真实分配订单数 = 分配给驻店骑手的配送任务数</p><p>方案一：object = 1</p><p>驻店徐杨分配107：配送任务（1单）</p><p>方案二：object = 1</p><p>驻店徐杨分配106：配送任务（1单）</p><p>两个方案该项目标相同，则通过其它目标区分</p><p>该目标可以保证：同小区超上限的情况下，优先分配给配送任务给小哥，而不是分拣任务，缩短骑手等单时间</p><h2 id="二、跨区域和超时" tabindex="-1">二、跨区域和超时 <a class="header-anchor" href="#二、跨区域和超时" aria-label="Permalink to &quot;二、跨区域和超时&quot;">​</a></h2><p><img src="https://fastly.jsdelivr.net/gh/muchuang1024/imgcdn/20240329110525.png" alt=""></p><p><img src="https://fastly.jsdelivr.net/gh/muchuang1024/imgcdn/20240329110538.png" alt="方案一"></p><p><img src="https://fastly.jsdelivr.net/gh/muchuang1024/imgcdn/20240329110549.png" alt="方案二"></p>`,30),l=[e];function i(c,r,o,g,d,h){return n(),s("div",null,l)}const _=a(t,[["render",i]]);export{u as __pageData,_ as default};
