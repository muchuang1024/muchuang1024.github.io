import{_ as n,c as a,o as s,a4 as p}from"./chunks/framework.4aTu-Nia.js";const _=JSON.parse('{"title":"一、什么是死锁","description":"","frontmatter":{},"headers":[],"relativePath":"docs/01 学习/课程/Golang/Go 面试/Channel 面试/Go channel 发送和接收什么情况下会死锁.md","filePath":"docs/01 学习/课程/Golang/Go 面试/Channel 面试/Go channel 发送和接收什么情况下会死锁.md"}'),l={name:"docs/01 学习/课程/Golang/Go 面试/Channel 面试/Go channel 发送和接收什么情况下会死锁.md"},e=p(`<h1 id="一、什么是死锁" tabindex="-1">一、什么是死锁 <a class="header-anchor" href="#一、什么是死锁" aria-label="Permalink to &quot;一、什么是死锁&quot;">​</a></h1><ul><li>单个协程永久阻塞</li><li>两个或两个以上的协程的执行过程中，由于竞争资源或由于彼此通信而造成的一种阻塞的现象。</li></ul><h1 id="二、channel-死锁场景" tabindex="-1">二、channel 死锁场景 <a class="header-anchor" href="#二、channel-死锁场景" aria-label="Permalink to &quot;二、channel 死锁场景&quot;">​</a></h1><ul><li>无缓冲 channel 只写不读</li><li>无缓冲 channel 读在写后面</li><li>有缓冲 channel 写入超过缓冲区数量</li><li>空读</li><li>多个协程互相等待</li></ul><h2 id="一-无缓冲-channel-只写不读" tabindex="-1">一）无缓冲 channel 只写不读 <a class="header-anchor" href="#一-无缓冲-channel-只写不读" aria-label="Permalink to &quot;一）无缓冲 channel 只写不读&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func deadlock1() {</span></span>
<span class="line"><span>	ch := make(chan int)</span></span>
<span class="line"><span>	ch &lt;- 3 //  这里会发生一直阻塞的情况，执行不到下面一句</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="二-无缓冲-channel-读在写后面" tabindex="-1">二）无缓冲 channel 读在写后面 <a class="header-anchor" href="#二-无缓冲-channel-读在写后面" aria-label="Permalink to &quot;二）无缓冲 channel 读在写后面&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func deadlock2() {</span></span>
<span class="line"><span>	ch := make(chan int)</span></span>
<span class="line"><span>	ch &lt;- 3  //  这里会发生一直阻塞的情况，执行不到下面一句</span></span>
<span class="line"><span>	num := &lt;-ch</span></span>
<span class="line"><span>	fmt.Println(&quot;num=&quot;, num)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func deadlock2() {</span></span>
<span class="line"><span>	ch := make(chan int)</span></span>
<span class="line"><span>	ch &lt;- 100 //  这里会发生一直阻塞的情况，执行不到下面一句</span></span>
<span class="line"><span>	go func() {</span></span>
<span class="line"><span>		num := &lt;-ch</span></span>
<span class="line"><span>		fmt.Println(&quot;num=&quot;, num)</span></span>
<span class="line"><span>	}()</span></span>
<span class="line"><span>	time.Sleep(time.Second)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="三-缓存-channel-写入超过缓冲区数量" tabindex="-1">三）缓存 channel 写入超过缓冲区数量 <a class="header-anchor" href="#三-缓存-channel-写入超过缓冲区数量" aria-label="Permalink to &quot;三）缓存 channel 写入超过缓冲区数量&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func deadlock3() {</span></span>
<span class="line"><span>	ch := make(chan int, 3)</span></span>
<span class="line"><span>	ch &lt;- 3</span></span>
<span class="line"><span>	ch &lt;- 4</span></span>
<span class="line"><span>	ch &lt;- 5</span></span>
<span class="line"><span>	ch &lt;- 6  //  这里会发生一直阻塞的情况</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="四-空读" tabindex="-1">四）空读 <a class="header-anchor" href="#四-空读" aria-label="Permalink to &quot;四）空读&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func deadlock4() {</span></span>
<span class="line"><span>	ch := make(chan int)</span></span>
<span class="line"><span>	fmt.Println(&lt;-ch)  //  这里会发生一直阻塞的情况</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="五-多个协程互相等待" tabindex="-1">五）多个协程互相等待 <a class="header-anchor" href="#五-多个协程互相等待" aria-label="Permalink to &quot;五）多个协程互相等待&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func deadlock5() {</span></span>
<span class="line"><span>	ch1 := make(chan int)</span></span>
<span class="line"><span>	ch2 := make(chan int)</span></span>
<span class="line"><span>	// 互相等对方造成死锁</span></span>
<span class="line"><span>	go func() {</span></span>
<span class="line"><span>		for {</span></span>
<span class="line"><span>			select {</span></span>
<span class="line"><span>			case num := &lt;-ch1:</span></span>
<span class="line"><span>				fmt.Println(&quot;num=&quot;, num)</span></span>
<span class="line"><span>				ch2 &lt;- 100</span></span>
<span class="line"><span>			}</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	for {</span></span>
<span class="line"><span>		select {</span></span>
<span class="line"><span>		case num := &lt;-ch2:</span></span>
<span class="line"><span>			fmt.Println(&quot;num=&quot;, num)</span></span>
<span class="line"><span>			ch1 &lt;- 300</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,14),t=[e];function c(i,h,o,d,r,u){return s(),a("div",null,t)}const k=n(l,[["render",c]]);export{_ as __pageData,k as default};
