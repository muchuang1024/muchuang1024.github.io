import{_ as n,c as s,o as a,a4 as p}from"./chunks/framework.4aTu-Nia.js";const m=JSON.parse('{"title":"一、什么是 goroutine 泄露","description":"","frontmatter":{},"headers":[],"relativePath":"docs/01 学习/专栏/Golang/Go 面试/Goroutine 面试/Go 面试 | Go goroutine 泄露的场景.md","filePath":"docs/01 学习/专栏/Golang/Go 面试/Goroutine 面试/Go 面试 | Go goroutine 泄露的场景.md"}'),e={name:"docs/01 学习/专栏/Golang/Go 面试/Goroutine 面试/Go 面试 | Go goroutine 泄露的场景.md"},t=p(`<h1 id="一、什么是-goroutine-泄露" tabindex="-1">一、什么是 goroutine 泄露 <a class="header-anchor" href="#一、什么是-goroutine-泄露" aria-label="Permalink to &quot;一、什么是 goroutine 泄露&quot;">​</a></h1><p>在 Go 中，goroutine 泄露是指创建的 goroutine 没有被正确地关闭或管理，导致它们在程序运行过程中无法被回收，最终导致资源浪费和潜在的性能问题。以下是一些常见的导致 goroutine 泄露的场景</p><p>常见泄露原因如下：</p><ul><li>Goroutine 内进行 channel/mutex 等读写操作被一直阻塞。</li><li>Goroutine 内的业务逻辑进入死循环，资源一直无法释放。</li><li>Goroutine 内的业务逻辑进入长时间等待，有不断新增的 Goroutine 进入等待</li></ul><h1 id="二、泄露场景" tabindex="-1">二、泄露场景 <a class="header-anchor" href="#二、泄露场景" aria-label="Permalink to &quot;二、泄露场景&quot;">​</a></h1><p>如果输出的 goroutines 数量是在不断增加的，就说明存在泄漏</p><h2 id="nil-channel" tabindex="-1">nil channel <a class="header-anchor" href="#nil-channel" aria-label="Permalink to &quot;nil channel&quot;">​</a></h2><p>channel 如果忘记初始化，那么无论你是读，还是写操作，都会造成阻塞。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func block1() {</span></span>
<span class="line"><span>	var ch chan int</span></span>
<span class="line"><span>	for i := 0; i &lt; 10; i++ {</span></span>
<span class="line"><span>		go func() {</span></span>
<span class="line"><span>			&lt;-ch</span></span>
<span class="line"><span>		}()</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	fmt.Println(&quot;before goroutines: &quot;, runtime.NumGoroutine())</span></span>
<span class="line"><span>	block1()</span></span>
<span class="line"><span>	time.Sleep(time.Second * 1)</span></span>
<span class="line"><span>	fmt.Println(&quot;after goroutines: &quot;, runtime.NumGoroutine())</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出结果：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>before goroutines:  1</span></span>
<span class="line"><span>after goroutines:  11</span></span></code></pre></div><h2 id="channel-发送未接收" tabindex="-1">channel 发送未接收 <a class="header-anchor" href="#channel-发送未接收" aria-label="Permalink to &quot;channel 发送未接收&quot;">​</a></h2><p>channel 发送数量 超过 channel 接收数量，就会造成阻塞</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func block2() {</span></span>
<span class="line"><span>	ch := make(chan int)</span></span>
<span class="line"><span>	for i := 0; i &lt; 10; i++ {</span></span>
<span class="line"><span>		go func() {</span></span>
<span class="line"><span>			ch &lt;- 1</span></span>
<span class="line"><span>		}()</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	fmt.Println(&quot;before goroutines: &quot;, runtime.NumGoroutine())</span></span>
<span class="line"><span>	block2()</span></span>
<span class="line"><span>	time.Sleep(time.Second * 1)</span></span>
<span class="line"><span>	fmt.Println(&quot;after goroutines: &quot;, runtime.NumGoroutine())</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出结果：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>before goroutines:  1</span></span>
<span class="line"><span>after goroutines:  11</span></span></code></pre></div><h2 id="channel-接收未发送" tabindex="-1">channel 接收未发送 <a class="header-anchor" href="#channel-接收未发送" aria-label="Permalink to &quot;channel 接收未发送&quot;">​</a></h2><p>channel 接收数量 超过 channel 发送数量，也会造成阻塞</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func block3() {</span></span>
<span class="line"><span>	ch := make(chan int)</span></span>
<span class="line"><span>	for i := 0; i &lt; 10; i++ {</span></span>
<span class="line"><span>		go func() {</span></span>
<span class="line"><span>			&lt;-ch</span></span>
<span class="line"><span>		}()</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	fmt.Println(&quot;before goroutines: &quot;, runtime.NumGoroutine())</span></span>
<span class="line"><span>	block3()</span></span>
<span class="line"><span>	time.Sleep(time.Second * 1)</span></span>
<span class="line"><span>	fmt.Println(&quot;after goroutines: &quot;, runtime.NumGoroutine())</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出结果：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>before goroutines:  1</span></span>
<span class="line"><span>after goroutines:  11</span></span></code></pre></div><h2 id="资源连接未关闭" tabindex="-1">资源连接未关闭 <a class="header-anchor" href="#资源连接未关闭" aria-label="Permalink to &quot;资源连接未关闭&quot;">​</a></h2><p>比如文件打开或 http 连接未正常关闭，比如 http 未调用<code>resp.Body.Close()</code> ，goroutine 不会退出</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func requestWithNoClose() {</span></span>
<span class="line"><span>	_, err := http.Get(&quot;https://www.baidu.com&quot;)</span></span>
<span class="line"><span>	if err != nil {</span></span>
<span class="line"><span>		fmt.Println(&quot;error occurred while fetching page, error: %s&quot;, err.Error())</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func requestWithClose() {</span></span>
<span class="line"><span>	resp, err := http.Get(&quot;https://www.baidu.com&quot;)</span></span>
<span class="line"><span>	if err != nil {</span></span>
<span class="line"><span>		fmt.Println(&quot;error occurred while fetching page, error: %s&quot;, err.Error())</span></span>
<span class="line"><span>		return</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	defer resp.Body.Close()</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func block4() {</span></span>
<span class="line"><span>	for i := 0; i &lt; 10; i++ {</span></span>
<span class="line"><span>		wg.Add(1)</span></span>
<span class="line"><span>		go func() {</span></span>
<span class="line"><span>				defer wg.Done()</span></span>
<span class="line"><span>				requestWithNoClose()</span></span>
<span class="line"><span>		}()</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var wg = sync.WaitGroup{}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	fmt.Println(&quot;before goroutines: &quot;, runtime.NumGoroutine())</span></span>
<span class="line"><span>	block4()</span></span>
<span class="line"><span>	wg.Wait()</span></span>
<span class="line"><span>	fmt.Println(&quot;after goroutines: &quot;, runtime.NumGoroutine())</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出结果：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>before goroutines:  1</span></span>
<span class="line"><span>after goroutines:  21</span></span></code></pre></div><p>一般发起 http 请求时，需要确保关闭 body</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">defer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> resp.Body.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Close</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span></code></pre></div><h2 id="互斥锁忘记解锁" tabindex="-1">互斥锁忘记解锁 <a class="header-anchor" href="#互斥锁忘记解锁" aria-label="Permalink to &quot;互斥锁忘记解锁&quot;">​</a></h2><p>第一个协程获取 <code>sync.Mutex</code> 加锁了，但是他可能在处理业务逻辑，又或是忘记 <code>Unlock</code> 了。 因此导致后面的协程想加锁，却因锁未释放被阻塞了</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;fmt&quot;</span></span>
<span class="line"><span>	&quot;runtime&quot;</span></span>
<span class="line"><span>	&quot;sync&quot;</span></span>
<span class="line"><span>	&quot;time&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func block5() {</span></span>
<span class="line"><span>	var mutex sync.Mutex</span></span>
<span class="line"><span>	for i := 0; i &lt; 10; i++ {</span></span>
<span class="line"><span>		go func() {</span></span>
<span class="line"><span>			mutex.Lock()</span></span>
<span class="line"><span>		}()</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	fmt.Println(&quot;before goroutines: &quot;, runtime.NumGoroutine())</span></span>
<span class="line"><span>	block5()</span></span>
<span class="line"><span>	time.Sleep(1 * time.Second)</span></span>
<span class="line"><span>	fmt.Println(&quot;after goroutines: &quot;, runtime.NumGoroutine())</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出结果：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>before goroutines:  1</span></span>
<span class="line"><span>after goroutines:  11</span></span></code></pre></div><h2 id="sync-waitgroup-使用不当" tabindex="-1">sync.WaitGroup 使用不当 <a class="header-anchor" href="#sync-waitgroup-使用不当" aria-label="Permalink to &quot;sync.WaitGroup 使用不当&quot;">​</a></h2><p>由于 <code>wg.Add</code> 的数量与 <code>wg.Done</code> 数量并不匹配，因此在调用 <code>wg.Wait</code> 方法后，触发死锁检测器并导致程序崩溃</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;fmt&quot;</span></span>
<span class="line"><span>	&quot;sync&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	var wg sync.WaitGroup</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	wg.Add(1) // 增加计数器</span></span>
<span class="line"><span>	go func() {</span></span>
<span class="line"><span>		// 注意：没有调用 wg.Done()</span></span>
<span class="line"><span>		fmt.Println(&quot;Goroutine executed&quot;)</span></span>
<span class="line"><span>	}()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 主程序等待，但计数器没有被适当减少，触发死锁检测</span></span>
<span class="line"><span>	wg.Wait()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	fmt.Println(&quot;Main function exiting&quot;)</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>在这个示例中，Add 增加了计数器，但在 goroutine 中没有调用 Done 减少计数器，因此计数器永远不会减少到零，这会触发死锁检测器并导致程序崩溃。</p><p>为了避免这种情况，确保在每个启动的 goroutine 中都使用 Done 减少计数器，以便计数器最终减少到零，并允许程序正常退出。这是一种良好的并发编程实践。</p><h2 id="无限循环" tabindex="-1">无限循环 <a class="header-anchor" href="#无限循环" aria-label="Permalink to &quot;无限循环&quot;">​</a></h2><p>如果一个 goroutine 进入无限循环而没有退出的机制，它会一直运行下去，直到程序结束。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func block7() {</span></span>
<span class="line"><span>	for i := 0; i &lt; 10; i++ {</span></span>
<span class="line"><span>		go func() {</span></span>
<span class="line"><span>			for {</span></span>
<span class="line"><span>				// 无限循环</span></span>
<span class="line"><span>			}</span></span>
<span class="line"><span>		}()</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	fmt.Println(&quot;before goroutines: &quot;, runtime.NumGoroutine())</span></span>
<span class="line"><span>	block7()</span></span>
<span class="line"><span>	time.Sleep(1 * time.Second)</span></span>
<span class="line"><span>	fmt.Println(&quot;after goroutines: &quot;, runtime.NumGoroutine())</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出结果:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>before goroutines:  1</span></span>
<span class="line"><span>after goroutines:  11</span></span></code></pre></div><h1 id="三、如何排查" tabindex="-1">三、如何排查 <a class="header-anchor" href="#三、如何排查" aria-label="Permalink to &quot;三、如何排查&quot;">​</a></h1><p>单个函数：调用 <code>runtime.NumGoroutine</code> 方法来打印 执行代码前后 Goroutine 的运行数量，进行前后比较，就能知道有没有泄露了。</p><p>生产/测试环境：使用<code>PProf</code>实时监测 Goroutine 的数量</p>`,46),l=[t];function i(o,c,r,u,h,d){return a(),s("div",null,l)}const b=n(e,[["render",i]]);export{m as __pageData,b as default};
