import{_ as s,c as a,o as n,a4 as p}from"./chunks/framework.4aTu-Nia.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/02 技术/Golang/Go 面试/基础面试/Go 面试 | Go 函数返回局部变量的指针是否安全.md","filePath":"docs/02 技术/Golang/Go 面试/基础面试/Go 面试 | Go 函数返回局部变量的指针是否安全.md"}'),e={name:"docs/02 技术/Golang/Go 面试/基础面试/Go 面试 | Go 函数返回局部变量的指针是否安全.md"},o=p(`<p>一般来说，局部变量会在函数返回后被销毁，因此被返回的引用就成为了&quot;无所指&quot;的引用，程序会进入未知状态。</p><p>但这在 Go 中是安全的，Go 编译器将会对每个局部变量进行逃逸分析。如果发现局部变量的作用域超出该函数，则不会将内存分配在栈上，而是分配在堆上，因为他们不在栈区，即使释放函数，其内容也不会受影响。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>import &quot;fmt&quot;</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>func add(x, y int) *int {</span></span>
<span class="line"><span>  res := 0</span></span>
<span class="line"><span>  res = x + y</span></span>
<span class="line"><span>  return &amp;res</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>  fmt.Println(add(1, 2))</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这个例子中，函数 add 局部变量 res 发生了逃逸。res 作为返回值，在 main 函数中继续使用，因此 res 指向的内存不能够分配在栈上，随着函数结束而回收，只能分配在堆上。</p><p>编译时可以借助选项 -gcflags=-m，查看变量逃逸的情况</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>./main.go:6:2: res escapes to heap:</span></span>
<span class="line"><span>./main.go:6:2: &amp;nbsp; flow: ~r2 = &amp;res:</span></span>
<span class="line"><span>./main.go:6:2: &amp;nbsp; &amp;nbsp; from &amp;res (address-of) at ./main.go:8:9</span></span>
<span class="line"><span>./main.go:6:2: &amp;nbsp; &amp;nbsp; from return &amp;res (return) at ./main.go:8:2</span></span>
<span class="line"><span>./main.go:6:2: moved to heap: res</span></span>
<span class="line"><span>./main.go:12:13: ... argument does not escape</span></span>
<span class="line"><span>0xc0000ae008</span></span></code></pre></div><p>res escapes to heap 即表示 res 逃逸到堆上了。</p>`,7),t=[o];function l(i,c,r,_,d,m){return n(),a("div",null,t)}const h=s(e,[["render",l]]);export{u as __pageData,h as default};
