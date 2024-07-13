import{_ as s,c as n,o as a,a4 as p}from"./chunks/framework.4aTu-Nia.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/02 技术/算法/数组/88.合并两个有序数组.md","filePath":"docs/02 技术/算法/数组/88.合并两个有序数组.md"}'),e={name:"docs/02 技术/算法/数组/88.合并两个有序数组.md"},l=p(`<p>直接合并后排序 双指针 逆向双指针</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>class Solution {</span></span>
<span class="line"><span>public:</span></span>
<span class="line"><span>    void merge(vector&lt;int&gt;&amp; nums1, int m, vector&lt;int&gt;&amp; nums2, int n) {</span></span>
<span class="line"><span>        int p1 = m - 1, p2 = n - 1;</span></span>
<span class="line"><span>        int tail = m + n - 1;</span></span>
<span class="line"><span>        int cur;</span></span>
<span class="line"><span>        while (p1 &gt;= 0 || p2 &gt;= 0) {</span></span>
<span class="line"><span>            if (p1 == -1) {</span></span>
<span class="line"><span>                cur = nums2[p2--];</span></span>
<span class="line"><span>            } else if (p2 == -1) {</span></span>
<span class="line"><span>                cur = nums1[p1--];</span></span>
<span class="line"><span>            } else if (nums1[p1] &gt; nums2[p2]) {</span></span>
<span class="line"><span>                cur = nums1[p1--];</span></span>
<span class="line"><span>            } else {</span></span>
<span class="line"><span>                cur = nums2[p2--];</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            nums1[tail--] = cur;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>};</span></span></code></pre></div>`,2),t=[l];function c(i,o,_,r,u,m){return a(),n("div",null,t)}const g=s(e,[["render",c]]);export{h as __pageData,g as default};
