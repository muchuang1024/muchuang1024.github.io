import{_ as n,c as s,o as a,a4 as p}from"./chunks/framework.4aTu-Nia.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/01 学习/专栏/Golang/Go 面试/Channel 面试/Go 面试 | Go channel 如何控制 goroutine 并发执行顺序.md","filePath":"docs/01 学习/专栏/Golang/Go 面试/Channel 面试/Go 面试 | Go channel 如何控制 goroutine 并发执行顺序.md"}'),t={name:"docs/01 学习/专栏/Golang/Go 面试/Channel 面试/Go 面试 | Go channel 如何控制 goroutine 并发执行顺序.md"},e=p(`<p>多个 goroutine 并发执行时，每一个 goroutine 抢到处理器的时间点不一致，gorouine 的执行本身不能保证顺序。即代码中先写的 gorouine 并不能保证先执行</p><p>思路：使用 channel 进行通信通知，用 channel 去传递信息，从而控制并发执行顺序</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;fmt&quot;</span></span>
<span class="line"><span>	&quot;sync&quot;</span></span>
<span class="line"><span>	&quot;time&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var wg sync.WaitGroup</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	ch1 := make(chan struct{}, 1)</span></span>
<span class="line"><span>	ch2 := make(chan struct{}, 1)</span></span>
<span class="line"><span>	ch3 := make(chan struct{}, 1)</span></span>
<span class="line"><span>	ch1 &lt;- struct{}{}</span></span>
<span class="line"><span>	wg.Add(3)</span></span>
<span class="line"><span>	start := time.Now().Unix()</span></span>
<span class="line"><span>	go print(&quot;gorouine1&quot;, ch1, ch2)</span></span>
<span class="line"><span>	go print(&quot;gorouine2&quot;, ch2, ch3)</span></span>
<span class="line"><span>	go print(&quot;gorouine3&quot;, ch3, ch1)</span></span>
<span class="line"><span>	wg.Wait()</span></span>
<span class="line"><span>	end := time.Now().Unix()</span></span>
<span class="line"><span>	fmt.Printf(&quot;duration:%d\\n&quot;, end-start)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func print(gorouine string, inputchan chan struct{}, outchan chan struct{}) {</span></span>
<span class="line"><span>	// 模拟内部操作耗时</span></span>
<span class="line"><span>	time.Sleep(1 * time.Second)</span></span>
<span class="line"><span>	select {</span></span>
<span class="line"><span>	case &lt;-inputchan:</span></span>
<span class="line"><span>		fmt.Printf(&quot;%s\\n&quot;, gorouine)</span></span>
<span class="line"><span>		outchan &lt;- struct{}{}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	wg.Done()</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,3),c=[e];function l(o,i,r,u,_,h){return a(),s("div",null,c)}const m=n(t,[["render",l]]);export{d as __pageData,m as default};
