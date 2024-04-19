import{_ as s,c as a,o as n,a4 as p}from"./chunks/framework.4aTu-Nia.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/01 学习/专栏/Golang/Go 面试/Map 面试/Go 面试 | Go map 遍历为什么是无序的.md","filePath":"docs/01 学习/专栏/Golang/Go 面试/Map 面试/Go 面试 | Go map 遍历为什么是无序的.md"}'),e={name:"docs/01 学习/专栏/Golang/Go 面试/Map 面试/Go 面试 | Go map 遍历为什么是无序的.md"},t=p(`<p>使用 range 多次遍历 map 时输出的 key 和 value 的顺序可能不同，这是 Go 语言的设计者们有意为之，旨在提示开发者们，Go 底层实现并不保证 map 遍历顺序稳定，请大家不要依赖 range 遍历结果顺序</p><p><strong>1、主要原因如下</strong></p><p>map 在遍历时，并不是从固定的 0 号 bucket 开始遍历的，每次遍历，都会从一个随机值序号的 bucket，再从其中随机的 cell 开始遍历</p><p>map 遍历时，是按序遍历 bucket，同时按需遍历 bucket 中和其 overflow bucket 中的 cell。但是 map 在扩容后，会发生 key 的搬迁，这造成原来落在一个 bucket 中的 key，搬迁后，有可能会落到其他 bucket 中了，从这个角度看，遍历 map 的结果就不可能是按照原来的顺序了</p><p><strong>2、如何有序遍历 map</strong></p><p>map 本身是无序的，且遍历时顺序还会被随机化，如果想顺序遍历 map，需要对 map key 先排序，再按照 key 的顺序遍历 map。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func TestMapRange(t *testing.T) {</span></span>
<span class="line"><span>  m := map[int]string{1: &quot;a&quot;, 2: &quot;b&quot;, 3: &quot;c&quot;}</span></span>
<span class="line"><span>  t.Log(&quot;first range:&quot;)</span></span>
<span class="line"><span>  for i, v := range m {</span></span>
<span class="line"><span>    t.Logf(&quot;m[%v]=%v &quot;, i, v)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  t.Log(&quot;\\nsecond range:&quot;)</span></span>
<span class="line"><span>  for i, v := range m {</span></span>
<span class="line"><span>    t.Logf(&quot;m[%v]=%v &quot;, i, v)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>  // 实现有序遍历</span></span>
<span class="line"><span>  var sl []int</span></span>
<span class="line"><span>  // 把 key 单独取出放到切片</span></span>
<span class="line"><span>  for k := range m {</span></span>
<span class="line"><span>    sl = append(sl, k)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  // 排序切片</span></span>
<span class="line"><span>  sort.Ints(sl)</span></span>
<span class="line"><span>  // 以切片中的 key 顺序遍历 map 就是有序的了</span></span>
<span class="line"><span>  for _, k := range sl {</span></span>
<span class="line"><span>    t.Log(k, m[k])</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,7),o=[t];function l(c,i,_,r,m,u){return n(),a("div",null,o)}const k=s(e,[["render",l]]);export{d as __pageData,k as default};
