import{_ as s,c as a,o as n,a4 as p}from"./chunks/framework.4aTu-Nia.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/02 技术/Golang/Go 面试/并发面试/Go 面试 | Go 如何排查数据竞争问题.md","filePath":"docs/02 技术/Golang/Go 面试/并发面试/Go 面试 | Go 如何排查数据竞争问题.md"}'),e={name:"docs/02 技术/Golang/Go 面试/并发面试/Go 面试 | Go 如何排查数据竞争问题.md"},t=p(`<p>1、概念</p><p>只要有两个以上的 goroutine 并发访问同一变量，且至少其中的一个是写操作的时候就会发生数据竞争；全是读的情况下是不存在数据竞争的。</p><p>2、排查方式</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>import &quot;fmt&quot;</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>  i := 0</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>  go func() {</span></span>
<span class="line"><span>     i++; // write i</span></span>
<span class="line"><span>  }()</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>  fmt.Println(i) // read i</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>go 命令行有个参数 race 可以帮助检测代码中的数据竞争</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>$ go run -race main.go</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>WARNING: DATA RACE</span></span>
<span class="line"><span>Write at 0x00c0000ba008 by goroutine 7:</span></span>
<span class="line"><span>exit status 66</span></span></code></pre></div>`,6),i=[t];function o(l,c,_,r,d,g){return n(),a("div",null,i)}const m=s(e,[["render",o]]);export{h as __pageData,m as default};
