import{_ as s,c as a,o as n,a4 as e}from"./chunks/framework.4aTu-Nia.js";const y=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/02 技术/机器学习/滑动窗口特征.md","filePath":"docs/02 技术/机器学习/滑动窗口特征.md"}'),t={name:"docs/02 技术/机器学习/滑动窗口特征.md"},p=e(`<p>hist_data</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>SELECT</span></span>
<span class="line"><span>*</span></span>
<span class="line"><span>, CAST((cast((unix_timestamp(&#39;$now.datekey&#39;, &#39;yyyyMMdd&#39;)) AS bigint) - cast((unix_timestamp(dt, &#39;yyyyMMdd&#39;)) AS bigint)) / (24*3600) AS int) r</span></span>
<span class="line"><span></span></span>
<span class="line"><span>FROM table</span></span>
<span class="line"><span></span></span>
<span class="line"><span>WHERE</span></span>
<span class="line"><span></span></span>
<span class="line"><span>dt BETWEEN &#39;$now.delta(30).datekey&#39; AND &#39;$now.delta(1).datekey&#39;</span></span></code></pre></div>`,2),i=[p];function c(l,d,o,_,r,m){return n(),a("div",null,i)}const u=s(t,[["render",c]]);export{y as __pageData,u as default};
