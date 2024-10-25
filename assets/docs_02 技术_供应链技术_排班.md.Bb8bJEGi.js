import{_ as e,c as o,o as t,a4 as a}from"./chunks/framework.4aTu-Nia.js";const f=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/02 技术/供应链技术/排班.md","filePath":"docs/02 技术/供应链技术/排班.md"}'),r={name:"docs/02 技术/供应链技术/排班.md"},c=a('<h2 id="目标函数" tabindex="-1">目标函数 <a class="header-anchor" href="#目标函数" aria-label="Permalink to &quot;目标函数&quot;">​</a></h2><p>履约分：时段产能缺口最少，履约分越高</p><p>实现方式：通过约束的方式，实现确保时段的产能缺口越少，履约分越高</p><ol><li><strong>创建一个约束</strong>，要求某个计算值（由 履约分<code>performScoreVar</code> 和 时段产能缺口<code>orderLackVar</code> 决定）等于 <code>0</code>。</li><li><strong>将履约分的系数设置为负值</strong>，这表明履约分越高，越容易满足约束。</li><li><strong>遍历每个部分（如订单）</strong>，如果该部分的原始订单数量不为零，则增加订单缺失的影响，促进模型在优化时考虑如何降低订单缺失。</li></ol><p>分单量差异</p>',5),s=[c];function _(n,d,i,l,p,h){return t(),o("div",null,s)}const g=e(r,[["render",_]]);export{f as __pageData,g as default};
