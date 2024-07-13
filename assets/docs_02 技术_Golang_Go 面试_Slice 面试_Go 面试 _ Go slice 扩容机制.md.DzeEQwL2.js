import{_ as a,c as s,o as n,a4 as p}from"./chunks/framework.4aTu-Nia.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/02 技术/Golang/Go 面试/Slice 面试/Go 面试 | Go slice 扩容机制.md","filePath":"docs/02 技术/Golang/Go 面试/Slice 面试/Go 面试 | Go slice 扩容机制.md"}'),c={name:"docs/02 技术/Golang/Go 面试/Slice 面试/Go 面试 | Go slice 扩容机制.md"},e=p(`<p>扩容会发生在 slice append 的时候，当 slice 的 cap 不足以容纳新元素，就会进行扩容，扩容规则如下：</p><p>1、如果新申请容量比两倍原有容量大，那么扩容后容量大小为新申请容量</p><p>2、如果原有 slice 长度小于 1024， 那么每次就扩容为原来的 2 倍</p><p>3、如果原 slice 长度大于等于 1024， 那么每次扩容就扩为原来的 1.25 倍</p><p>代码示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func main() {</span></span>
<span class="line"><span>  slice1 := []int{1, 2, 3}</span></span>
<span class="line"><span>  for i := 0; i &lt; 16; i++ {</span></span>
<span class="line"><span>    slice1 = append(slice1, 1)</span></span>
<span class="line"><span>    fmt.Printf(&quot;addr: %p, len: %v, cap: %v\\n&quot;, slice1, len(slice1), cap(slice1))</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>addr: 0xc00001a120, len: 4, cap: 6</span></span>
<span class="line"><span>addr: 0xc00001a120, len: 5, cap: 6</span></span>
<span class="line"><span>addr: 0xc00001a120, len: 6, cap: 6</span></span>
<span class="line"><span>addr: 0xc000060060, len: 7, cap: 12</span></span>
<span class="line"><span>addr: 0xc000060060, len: 8, cap: 12</span></span>
<span class="line"><span>addr: 0xc000060060, len: 9, cap: 12</span></span>
<span class="line"><span>addr: 0xc000060060, len: 10, cap: 12</span></span>
<span class="line"><span>addr: 0xc000060060, len: 11, cap: 12</span></span>
<span class="line"><span>addr: 0xc000060060, len: 12, cap: 12</span></span>
<span class="line"><span>addr: 0xc00007c000, len: 13, cap: 24</span></span>
<span class="line"><span>addr: 0xc00007c000, len: 14, cap: 24</span></span>
<span class="line"><span>addr: 0xc00007c000, len: 15, cap: 24</span></span>
<span class="line"><span>addr: 0xc00007c000, len: 16, cap: 24</span></span>
<span class="line"><span>addr: 0xc00007c000, len: 17, cap: 24</span></span>
<span class="line"><span>addr: 0xc00007c000, len: 18, cap: 24</span></span>
<span class="line"><span>addr: 0xc00007c000, len: 19, cap: 24</span></span></code></pre></div>`,8),l=[e];function i(d,t,o,r,_,h){return n(),s("div",null,l)}const g=a(c,[["render",i]]);export{u as __pageData,g as default};
