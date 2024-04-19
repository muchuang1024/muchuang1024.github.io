import{_ as s,c as n,o as a,a4 as p}from"./chunks/framework.4aTu-Nia.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/01 学习/专栏/Golang/Go 面试/Goroutine 面试/Go 面试 | Go 如何查看正在执行的 goroutine 数量.md","filePath":"docs/01 学习/专栏/Golang/Go 面试/Goroutine 面试/Go 面试 | Go 如何查看正在执行的 goroutine 数量.md"}'),e={name:"docs/01 学习/专栏/Golang/Go 面试/Goroutine 面试/Go 面试 | Go 如何查看正在执行的 goroutine 数量.md"},t=p(`<p>1、程序中引入 pprof pakage</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import _ &quot;net/http/pprof&quot;</span></span></code></pre></div><p>2、程序中开启 HTTP 监听服务</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>  &quot;net/http&quot;</span></span>
<span class="line"><span>  _ &quot;net/http/pprof&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>  for i := 0; i &lt; 100; i++ {</span></span>
<span class="line"><span>    go func() {</span></span>
<span class="line"><span>      select {}</span></span>
<span class="line"><span>    }()</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>  go func() {</span></span>
<span class="line"><span>    http.ListenAndServe(&quot;localhost:6060&quot;, nil)</span></span>
<span class="line"><span>  }()</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>  select {}</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>3、分析 goroutine 文件</p><p>shell 执行如下命令</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>go tool pprof -http=:1248 http://127.0.0.1:6060/debug/pprof/goroutine</span></span></code></pre></div><p>会自动打开浏览器页面如下图所示</p><p><img src="https://cdn.jsdelivr.net/gh/caijinlin/imgcdn/pprof.png#id=QRpMk&amp;originHeight=861&amp;originWidth=1818&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt=""></p><p>在图中可以清晰的看到 goroutine 的数量以及调用关系，可以看到有 103 个 goroutine</p>`,10),o=[t];function i(l,c,r,_,d,g){return a(),n("div",null,o)}const m=s(e,[["render",i]]);export{h as __pageData,m as default};
