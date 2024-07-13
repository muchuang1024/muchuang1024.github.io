import{_ as n,c as s,o as a,a4 as p}from"./chunks/framework.4aTu-Nia.js";const m=JSON.parse('{"title":"一、为什么要控制 goroutine 并发的数量？","description":"","frontmatter":{},"headers":[],"relativePath":"docs/02 技术/Golang/Go 面试/Goroutine 面试/Go 面试 | Go 如何控制并发的 goroutine 数量.md","filePath":"docs/02 技术/Golang/Go 面试/Goroutine 面试/Go 面试 | Go 如何控制并发的 goroutine 数量.md"}'),e={name:"docs/02 技术/Golang/Go 面试/Goroutine 面试/Go 面试 | Go 如何控制并发的 goroutine 数量.md"},l=p(`<h1 id="一、为什么要控制-goroutine-并发的数量" tabindex="-1">一、为什么要控制 goroutine 并发的数量？ <a class="header-anchor" href="#一、为什么要控制-goroutine-并发的数量" aria-label="Permalink to &quot;一、为什么要控制 goroutine 并发的数量？&quot;">​</a></h1><p>在开发过程中，如果不对 goroutine 加以控制而进行滥用的话，可能会导致服务整体崩溃。比如耗尽系统资源导致程序崩溃，或者 CPU 使用率过高导致系统忙不过来。</p><h1 id="二、用什么方法控制-goroutine-并发的数量" tabindex="-1">二、用什么方法控制 goroutine 并发的数量？ <a class="header-anchor" href="#二、用什么方法控制-goroutine-并发的数量" aria-label="Permalink to &quot;二、用什么方法控制 goroutine 并发的数量？&quot;">​</a></h1><h2 id="一-有缓冲-channel" tabindex="-1">一）有缓冲 channel <a class="header-anchor" href="#一-有缓冲-channel" aria-label="Permalink to &quot;一）有缓冲 channel&quot;">​</a></h2><p>利用缓冲满时发送阻塞的特性</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;fmt&quot;</span></span>
<span class="line"><span>	&quot;runtime&quot;</span></span>
<span class="line"><span>	&quot;time&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var wg = sync.WaitGroup{}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	// 模拟用户请求数量</span></span>
<span class="line"><span>	requestCount := 10</span></span>
<span class="line"><span>	fmt.Println(&quot;goroutine_num&quot;, runtime.NumGoroutine())</span></span>
<span class="line"><span>	// 管道长度即最大并发数</span></span>
<span class="line"><span>	ch := make(chan bool, 3)</span></span>
<span class="line"><span>	for i := 0; i &lt; requestCount; i++ {</span></span>
<span class="line"><span>		wg.Add(1)</span></span>
<span class="line"><span>		ch &lt;- true</span></span>
<span class="line"><span>		go Read(ch, i)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	 wg.Wait()</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func Read(ch chan bool, i int) {</span></span>
<span class="line"><span>	fmt.Printf(&quot;goroutine_num: %d, go func: %d\\n&quot;, runtime.NumGoroutine(), i)</span></span>
<span class="line"><span>	&lt;-ch</span></span>
<span class="line"><span>	wg.Done()</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出结果：默认最多不超过 3（4-1）个 goroutine 并发执行</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>goroutine_num 1</span></span>
<span class="line"><span>goroutine_num: 4, go func: 1</span></span>
<span class="line"><span>goroutine_num: 4, go func: 3</span></span>
<span class="line"><span>goroutine_num: 4, go func: 2</span></span>
<span class="line"><span>goroutine_num: 4, go func: 0</span></span>
<span class="line"><span>goroutine_num: 4, go func: 4</span></span>
<span class="line"><span>goroutine_num: 4, go func: 5</span></span>
<span class="line"><span>goroutine_num: 4, go func: 6</span></span>
<span class="line"><span>goroutine_num: 4, go func: 8</span></span>
<span class="line"><span>goroutine_num: 4, go func: 9</span></span>
<span class="line"><span>goroutine_num: 4, go func: 7</span></span></code></pre></div><h2 id="二-无缓冲-channel" tabindex="-1">二）无缓冲 channel <a class="header-anchor" href="#二-无缓冲-channel" aria-label="Permalink to &quot;二）无缓冲 channel&quot;">​</a></h2><p>任务发送和执行分离，指定消费者并发协程数</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>&quot;fmt&quot;</span></span>
<span class="line"><span>&quot;runtime&quot;</span></span>
<span class="line"><span>&quot;sync&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var wg = sync.WaitGroup{}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;fmt&quot;</span></span>
<span class="line"><span>	&quot;runtime&quot;</span></span>
<span class="line"><span>	&quot;sync&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var wg = sync.WaitGroup{}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	// 模拟用户请求数量</span></span>
<span class="line"><span>	requestCount := 10</span></span>
<span class="line"><span>	fmt.Println(&quot;goroutine_num&quot;, runtime.NumGoroutine())</span></span>
<span class="line"><span>	ch := make(chan bool)</span></span>
<span class="line"><span>	for i := 0; i &lt; 3; i++ {</span></span>
<span class="line"><span>		go Read(ch, i)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	for i := 0; i &lt; requestCount; i++ {</span></span>
<span class="line"><span>		wg.Add(1)</span></span>
<span class="line"><span>		ch &lt;- true</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	wg.Wait()</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func Read(ch chan bool, i int) {</span></span>
<span class="line"><span>	for _ = range ch {</span></span>
<span class="line"><span>		fmt.Printf(&quot;goroutine_num: %d, go func: %d\\n&quot;, runtime.NumGoroutine(), i)</span></span>
<span class="line"><span>		wg.Done()</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,11),t=[l];function i(o,c,u,r,g,h){return a(),s("div",null,t)}const _=n(e,[["render",i]]);export{m as __pageData,_ as default};
