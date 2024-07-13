import{_ as s,c as a,o as n,a4 as p}from"./chunks/framework.4aTu-Nia.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/02 技术/算法/数组/189.轮转数组.md","filePath":"docs/02 技术/算法/数组/189.轮转数组.md"}'),e={name:"docs/02 技术/算法/数组/189.轮转数组.md"},l=p(`<h2 id="一、问题描述" tabindex="-1">一、问题描述 <a class="header-anchor" href="#一、问题描述" aria-label="Permalink to &quot;一、问题描述&quot;">​</a></h2><p>给你一个数组，将数组中的元素向右轮转 <code>k</code> 个位置，其中 <code>k</code> 是非负数。</p><p><strong>示例 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>输入: nums = [1,2,3,4,5,6,7], k = 3</span></span>
<span class="line"><span>输出: [5,6,7,1,2,3,4]</span></span>
<span class="line"><span>解释:</span></span>
<span class="line"><span>向右轮转 1 步: [7,1,2,3,4,5,6]</span></span>
<span class="line"><span>向右轮转 2 步: [6,7,1,2,3,4,5]</span></span>
<span class="line"><span>向右轮转 3 步: [5,6,7,1,2,3,4]</span></span></code></pre></div><p><strong>示例 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>输入: nums = [-1,-100,3,99], k = 2</span></span>
<span class="line"><span>输出: [3,99,-1,-100]</span></span>
<span class="line"><span>解释: </span></span>
<span class="line"><span>向右轮转 1 步: [99,-1,-100,3]</span></span>
<span class="line"><span>向右轮转 2 步: [3,99,-1,-100]</span></span></code></pre></div><p><strong>提示:</strong></p><ul><li><code>1 &lt;= nums.length &lt;= 105</code></li><li><code>-231 &lt;= nums[i] &lt;= 231 - 1</code></li><li><code>0 &lt;= k &lt;= 105</code></li></ul><p><strong>进阶：</strong></p><ul><li>尽可能想出更多的解决方案，至少有三种不同的方法可以解决这个问题。</li><li>你可以使用空间复杂度为 <code>O(1)</code> 的原地算法解决这个问题吗？</li></ul><hr><h2 id="二、方案一-使用额外数组" tabindex="-1">二、方案一：使用额外数组 <a class="header-anchor" href="#二、方案一-使用额外数组" aria-label="Permalink to &quot;二、方案一：使用额外数组&quot;">​</a></h2><h3 id="_1、思路" tabindex="-1">1、思路 <a class="header-anchor" href="#_1、思路" aria-label="Permalink to &quot;1、思路&quot;">​</a></h3><p>最直接的方法是创建一个新的数组，然后根据轮转的位置将元素放置到新数组中。</p><h3 id="_2、代码实现" tabindex="-1">2、代码实现 <a class="header-anchor" href="#_2、代码实现" aria-label="Permalink to &quot;2、代码实现&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func rotate(nums []int, k int) {</span></span>
<span class="line"><span>    n := len(nums)</span></span>
<span class="line"><span>    k = k % n // 如果k大于n，只需考虑k对n的余数</span></span>
<span class="line"><span>    newNums := make([]int, n)</span></span>
<span class="line"><span>    for i := 0; i &lt; n; i++ {</span></span>
<span class="line"><span>        newNums[(i+k)%n] = nums[i]</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    copy(nums, newNums)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_3、复杂度分析" tabindex="-1">3、复杂度分析 <a class="header-anchor" href="#_3、复杂度分析" aria-label="Permalink to &quot;3、复杂度分析&quot;">​</a></h3><ul><li>时间复杂度：O(n)，因为我们需要遍历整个数组来填充新数组。</li><li>空间复杂度：O(n)，因为我们需要一个额外的数组来存储结果。</li></ul><hr><h2 id="三、方案二-多次反转" tabindex="-1">三、方案二：多次反转 <a class="header-anchor" href="#三、方案二-多次反转" aria-label="Permalink to &quot;三、方案二：多次反转&quot;">​</a></h2><h3 id="_1、思路-1" tabindex="-1">1、思路 <a class="header-anchor" href="#_1、思路-1" aria-label="Permalink to &quot;1、思路&quot;">​</a></h3><p>这个方法不需要额外的空间。我们可以通过三次反转来达到轮转的效果：</p><p>1）反转整个数组。</p><p>2）反转数组的前k个元素。</p><p>3）反转数组剩下的元素。</p><h3 id="_2、代码实现-1" tabindex="-1">2、代码实现 <a class="header-anchor" href="#_2、代码实现-1" aria-label="Permalink to &quot;2、代码实现&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func reverse(nums []int, start, end int) {</span></span>
<span class="line"><span>    for start &lt; end {</span></span>
<span class="line"><span>        nums[start], nums[end] = nums[end], nums[start]</span></span>
<span class="line"><span>        start++</span></span>
<span class="line"><span>        end--</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func rotate(nums []int, k int) {</span></span>
<span class="line"><span>    n := len(nums)</span></span>
<span class="line"><span>    k = k % n</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    reverse(nums, 0, n-1)</span></span>
<span class="line"><span>    reverse(nums, 0, k-1)</span></span>
<span class="line"><span>	reverse(nums, k, n-1)</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,27),i=[l];function t(c,o,r,d,h,u){return n(),a("div",null,i)}const k=s(e,[["render",t]]);export{_ as __pageData,k as default};
