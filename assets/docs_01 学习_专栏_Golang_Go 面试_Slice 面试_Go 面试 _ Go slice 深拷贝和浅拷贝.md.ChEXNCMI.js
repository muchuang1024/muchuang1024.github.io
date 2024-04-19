import{_ as s,c as n,o as a,a4 as p}from"./chunks/framework.4aTu-Nia.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/01 学习/专栏/Golang/Go 面试/Slice 面试/Go 面试 | Go slice 深拷贝和浅拷贝.md","filePath":"docs/01 学习/专栏/Golang/Go 面试/Slice 面试/Go 面试 | Go slice 深拷贝和浅拷贝.md"}'),e={name:"docs/01 学习/专栏/Golang/Go 面试/Slice 面试/Go 面试 | Go slice 深拷贝和浅拷贝.md"},l=p(`<p><strong>1、深拷贝</strong></p><p>拷贝的是数据本身，创造一个新对象，新创建的对象与原对象不共享内存，新创建的对象在内存中开辟一个新的内存地址，新对象值修改时不会影响原对象值</p><p>实现深拷贝的方式有 2 种</p><p>1、copy(slice2, slice1)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>copy(slice2, slice1)</span></span></code></pre></div><p>2、遍历 append 赋值</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func main() {</span></span>
<span class="line"><span>    slice1 := []int{1, 2, 3, 4, 5}</span></span>
<span class="line"><span>    slice2 := make([]int, 5, 5)</span></span>
<span class="line"><span>    fmt.Printf(&quot;slice1: %v, %p\\n&quot;, slice1, slice1)</span></span>
<span class="line"><span>    copy(slice2, slice1)</span></span>
<span class="line"><span>    fmt.Printf(&quot;slice2: %v, %p\\n&quot;, slice2, slice2)</span></span>
<span class="line"><span>    slice3 := make([]int, 0, 5)</span></span>
<span class="line"><span>    for \\_, v := range slice1 {</span></span>
<span class="line"><span>        slice3 = append(slice3, v)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    fmt.Printf(&quot;slice3: %v, %p\\n&quot;, slice3, slice3)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>slice1: [1 2 3 4 5], 0xc0000b0030</span></span>
<span class="line"><span>slice2: [1 2 3 4 5], 0xc0000b0060</span></span>
<span class="line"><span>slice3: [1 2 3 4 5], 0xc0000b0090</span></span></code></pre></div><p><strong>2、浅拷贝</strong></p><p>浅拷贝的是数据地址，只复制指向的对象的指针，此时新对象和老对象指向的内存地址是一样的，新对象值修改时老对象也会变化</p><p>实现浅拷贝的方式：默认复制</p><p>引用类型的变量，默认赋值操作就是浅拷贝：slice2 := slice1</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func main() {</span></span>
<span class="line"><span>  slice1 := []int{1, 2, 3, 4, 5}</span></span>
<span class="line"><span>  fmt.Printf(&quot;slice1: %v, %p\\n&quot;, slice1, slice1)</span></span>
<span class="line"><span>  slice2 := slice1</span></span>
<span class="line"><span>  fmt.Printf(&quot;slice2: %v, %p\\n&quot;, slice2, slice2)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>slice1: [1 2 3 4 5], 0xc00001a120</span></span>
<span class="line"><span>slice2: [1 2 3 4 5], 0xc00001a120</span></span></code></pre></div>`,12),i=[l];function c(t,o,_,d,r,u){return a(),n("div",null,i)}const m=s(e,[["render",c]]);export{h as __pageData,m as default};
