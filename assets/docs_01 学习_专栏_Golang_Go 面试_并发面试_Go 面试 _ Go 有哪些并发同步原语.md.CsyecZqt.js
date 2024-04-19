import{_ as n,c as s,o as a,a4 as p}from"./chunks/framework.4aTu-Nia.js";const g=JSON.parse('{"title":"一、原子操作","description":"","frontmatter":{},"headers":[],"relativePath":"docs/01 学习/专栏/Golang/Go 面试/并发面试/Go 面试 | Go 有哪些并发同步原语.md","filePath":"docs/01 学习/专栏/Golang/Go 面试/并发面试/Go 面试 | Go 有哪些并发同步原语.md"}'),l={name:"docs/01 学习/专栏/Golang/Go 面试/并发面试/Go 面试 | Go 有哪些并发同步原语.md"},t=p(`<p>Go 是一门以并发编程见长的语言，它提供了一系列的同步原语方便开发者使用</p><h1 id="一、原子操作" tabindex="-1">一、原子操作 <a class="header-anchor" href="#一、原子操作" aria-label="Permalink to &quot;一、原子操作&quot;">​</a></h1><p>Mutex、RWMutex 等并发原语的底层实现是通过 atomic 包中的一些原子操作来实现的，原子操作是最基础的并发原语</p><p><img src="https://cdn.jsdelivr.net/gh/caijinlin/imgcdn/53d55255fe851754659d90cbee814f13.jpg#id=pah1N&amp;originHeight=1693&amp;originWidth=2250&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=#id=FSY1f&amp;originHeight=1693&amp;originWidth=2250&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt=""></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;fmt&quot;</span></span>
<span class="line"><span>	&quot;sync/atomic&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var opts int64 = 0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	add(&amp;opts, 3)</span></span>
<span class="line"><span>	load(&amp;opts)</span></span>
<span class="line"><span>	compareAndSwap(&amp;opts, 3, 4)</span></span>
<span class="line"><span>	swap(&amp;opts, 5)</span></span>
<span class="line"><span>	store(&amp;opts, 6)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func add(addr *int64, delta int64) {</span></span>
<span class="line"><span>	atomic.AddInt64(addr, delta) //加操作</span></span>
<span class="line"><span>	fmt.Println(&quot;add opts: &quot;, *addr)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func load(addr *int64) {</span></span>
<span class="line"><span>	fmt.Println(&quot;load opts: &quot;, atomic.LoadInt64(&amp;opts))</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func compareAndSwap(addr *int64, oldValue int64, newValue int64) {</span></span>
<span class="line"><span>	if atomic.CompareAndSwapInt64(addr, oldValue, newValue) {</span></span>
<span class="line"><span>		fmt.Println(&quot;cas opts: &quot;, *addr)</span></span>
<span class="line"><span>		return</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func swap(addr *int64, newValue int64) {</span></span>
<span class="line"><span>	atomic.SwapInt64(addr, newValue)</span></span>
<span class="line"><span>	fmt.Println(&quot;swap opts: &quot;, *addr)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func store(addr *int64, newValue int64) {</span></span>
<span class="line"><span>	atomic.StoreInt64(addr, newValue)</span></span>
<span class="line"><span>	fmt.Println(&quot;store opts: &quot;, *addr)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h1 id="二、channel" tabindex="-1">二、Channel <a class="header-anchor" href="#二、channel" aria-label="Permalink to &quot;二、Channel&quot;">​</a></h1><p><code>channel</code> 管道，高级同步原语，goroutine 之间通信的桥梁</p><p>使用场景：消息队列、数据传递、信号通知、任务编排、锁</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;fmt&quot;</span></span>
<span class="line"><span>	&quot;time&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	c := make(chan struct{}, 1)</span></span>
<span class="line"><span>	for i := 0; i &lt; 10; i++ {</span></span>
<span class="line"><span>		go func() {</span></span>
<span class="line"><span>			c &lt;- struct{}{}</span></span>
<span class="line"><span>			time.Sleep(1 * time.Second)</span></span>
<span class="line"><span>			fmt.Println(&quot;通过ch访问临界区&quot;)</span></span>
<span class="line"><span>			&lt;-c</span></span>
<span class="line"><span>		}()</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	for {</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre></div><h1 id="三、基本并发原语" tabindex="-1">三、基本并发原语 <a class="header-anchor" href="#三、基本并发原语" aria-label="Permalink to &quot;三、基本并发原语&quot;">​</a></h1><p>Go 语言在 <code>sync</code>包中提供了用于同步的一些基本原语，这些基本原语提供了较为基础的同步功能，但是它们是一种相对原始的同步机制，在多数情况下，我们都应该使用抽象层级更高的 Channel 实现同步。</p><p>常见的并发原语如下：<code>sync.Mutex</code>、<code>sync.RWMutex</code>、<code>sync.WaitGroup</code>、<code>sync.Cond</code>、<code>sync.Once</code>、<code>sync.Pool</code>、<code>sync.Context</code></p><h2 id="sync-mutex" tabindex="-1">sync.Mutex <a class="header-anchor" href="#sync-mutex" aria-label="Permalink to &quot;sync.Mutex&quot;">​</a></h2><p><code>sync.Mutex</code> （互斥锁） 可以限制对临界资源的访问，保证只有一个 goroutine 访问共享资源</p><p>使用场景：大量读写，比如多个 goroutine 并发更新同一个资源，像计数器</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;fmt&quot;</span></span>
<span class="line"><span>	&quot;sync&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	// 封装好的计数器</span></span>
<span class="line"><span>	var counter Counter</span></span>
<span class="line"><span>	var wg sync.WaitGroup</span></span>
<span class="line"><span>	var gNum = 1000</span></span>
<span class="line"><span>	wg.Add(gNum)</span></span>
<span class="line"><span>	// 启动10个goroutine</span></span>
<span class="line"><span>	for i := 0; i &lt; gNum; i++ {</span></span>
<span class="line"><span>		go func() {</span></span>
<span class="line"><span>			defer wg.Done()</span></span>
<span class="line"><span>			counter.Incr() // 受到锁保护的方法</span></span>
<span class="line"><span>		}()</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	wg.Wait()</span></span>
<span class="line"><span>	fmt.Println(counter.Count())</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 线程安全的计数器类型</span></span>
<span class="line"><span>type Counter struct {</span></span>
<span class="line"><span>	mu    sync.Mutex</span></span>
<span class="line"><span>	count uint64</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 加1的方法，内部使用互斥锁保护</span></span>
<span class="line"><span>func (c *Counter) Incr() {</span></span>
<span class="line"><span>	c.mu.Lock()</span></span>
<span class="line"><span>	c.count++</span></span>
<span class="line"><span>	c.mu.Unlock()</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 得到计数器的值，也需要锁保护</span></span>
<span class="line"><span>func (c *Counter) Count() uint64 {</span></span>
<span class="line"><span>	c.mu.Lock()</span></span>
<span class="line"><span>	defer c.mu.Unlock()</span></span>
<span class="line"><span>	return c.count</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="sync-rwmutex" tabindex="-1">sync.RWMutex <a class="header-anchor" href="#sync-rwmutex" aria-label="Permalink to &quot;sync.RWMutex&quot;">​</a></h2><p><code>sync.RWMutex</code> （读写锁） 可以限制对临界资源的访问，保证只有一个 goroutine 写共享资源，可以有多个 goroutine 读共享资源</p><p>使用场景：大量并发读，少量并发写，有强烈的性能要求</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;fmt&quot;</span></span>
<span class="line"><span>	&quot;sync&quot;</span></span>
<span class="line"><span>	&quot;time&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	// 封装好的计数器</span></span>
<span class="line"><span>	var counter Counter</span></span>
<span class="line"><span>	var gNum = 1000</span></span>
<span class="line"><span>	// 启动10个goroutine</span></span>
<span class="line"><span>	for i := 0; i &lt; gNum; i++ {</span></span>
<span class="line"><span>		go func() {</span></span>
<span class="line"><span>			counter.Count() // 受到锁保护的方法</span></span>
<span class="line"><span>		}()</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	for { // 一个writer</span></span>
<span class="line"><span>		counter.Incr() // 计数器写操作</span></span>
<span class="line"><span>		fmt.Println(&quot;incr&quot;)</span></span>
<span class="line"><span>		time.Sleep(time.Second)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 线程安全的计数器类型</span></span>
<span class="line"><span>type Counter struct {</span></span>
<span class="line"><span>	mu    sync.RWMutex</span></span>
<span class="line"><span>	count uint64</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 加1的方法，内部使用互斥锁保护</span></span>
<span class="line"><span>func (c *Counter) Incr() {</span></span>
<span class="line"><span>	c.mu.Lock()</span></span>
<span class="line"><span>	c.count++</span></span>
<span class="line"><span>	c.mu.Unlock()</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 得到计数器的值，也需要锁保护</span></span>
<span class="line"><span>func (c *Counter) Count() uint64 {</span></span>
<span class="line"><span>	c.mu.RLock()</span></span>
<span class="line"><span>	defer c.mu.RUnlock()</span></span>
<span class="line"><span>	return c.count</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="sync-waitgroup" tabindex="-1">sync.WaitGroup <a class="header-anchor" href="#sync-waitgroup" aria-label="Permalink to &quot;sync.WaitGroup&quot;">​</a></h2><p><code>sync.WaitGroup</code> 可以等待一组 Goroutine 的返回</p><p>使用场景：并发等待，任务编排，一个比较常见的使用场景是批量发出 RPC 或者 HTTP 请求</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>requests := []*Request{...}</span></span>
<span class="line"><span>wg := &amp;sync.WaitGroup{}</span></span>
<span class="line"><span>wg.Add(len(requests))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>for _, request := range requests {</span></span>
<span class="line"><span>    go func(r *Request) {</span></span>
<span class="line"><span>        defer wg.Done()</span></span>
<span class="line"><span>        // res, err := service.call(r)</span></span>
<span class="line"><span>    }(request)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>wg.Wait()</span></span></code></pre></div><h2 id="sync-cond" tabindex="-1">sync.Cond <a class="header-anchor" href="#sync-cond" aria-label="Permalink to &quot;sync.Cond&quot;">​</a></h2><p><code>sync.Cond</code> 可以让一组的 Goroutine 都在满足特定条件时被唤醒</p><p>使用场景：利用等待 / 通知机制实现阻塞或者唤醒</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;fmt&quot;</span></span>
<span class="line"><span>	&quot;sync&quot;</span></span>
<span class="line"><span>	&quot;sync/atomic&quot;</span></span>
<span class="line"><span>	&quot;time&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var status int64</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	c := sync.NewCond(&amp;sync.Mutex{})</span></span>
<span class="line"><span>	for i := 0; i &lt; 10; i++ {</span></span>
<span class="line"><span>		go listen(c)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	time.Sleep(1 * time.Second)</span></span>
<span class="line"><span>	go broadcast(c)</span></span>
<span class="line"><span>	time.Sleep(1 * time.Second)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func broadcast(c *sync.Cond) {</span></span>
<span class="line"><span>	c.L.Lock()</span></span>
<span class="line"><span>	atomic.StoreInt64(&amp;status, 1)</span></span>
<span class="line"><span>	c.Signal()</span></span>
<span class="line"><span>	c.L.Unlock()</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func listen(c *sync.Cond) {</span></span>
<span class="line"><span>	c.L.Lock()</span></span>
<span class="line"><span>	for atomic.LoadInt64(&amp;status) != 1 {</span></span>
<span class="line"><span>		c.Wait()</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	fmt.Println(&quot;listen&quot;)</span></span>
<span class="line"><span>	c.L.Unlock()</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="sync-once" tabindex="-1">sync.Once <a class="header-anchor" href="#sync-once" aria-label="Permalink to &quot;sync.Once&quot;">​</a></h2><p><code>sync.Once</code> 可以保证在 Go 程序运行期间的某段代码只会执行一次</p><p>使用场景：常常用于单例对象的初始化场景</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;fmt&quot;</span></span>
<span class="line"><span>	&quot;sync&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	o := &amp;sync.Once{}</span></span>
<span class="line"><span>	for i := 0; i &lt; 10; i++ {</span></span>
<span class="line"><span>		o.Do(func() {</span></span>
<span class="line"><span>			fmt.Println(&quot;only once&quot;)</span></span>
<span class="line"><span>		})</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="sync-pool" tabindex="-1">sync.Pool <a class="header-anchor" href="#sync-pool" aria-label="Permalink to &quot;sync.Pool&quot;">​</a></h2><p><code>sync.Pool</code>可以将暂时将不用的对象缓存起来，待下次需要的时候直接使用，不用再次经过内存分配，复用对象的内存，减轻 GC 的压力，提升系统的性能（频繁地分配、回收内存会给 GC 带来一定的负担，严重的时候会引起 CPU 的毛刺）</p><p>使用场景：对象池化， TCP 连接池、数据库连接池、Worker Pool</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;fmt&quot;</span></span>
<span class="line"><span>	&quot;sync&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	pool := sync.Pool{</span></span>
<span class="line"><span>		New: func() interface{} {</span></span>
<span class="line"><span>			return 0</span></span>
<span class="line"><span>		},</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	for i := 0; i &lt; 10; i++ {</span></span>
<span class="line"><span>		v := pool.Get().(int)</span></span>
<span class="line"><span>		fmt.Println(v) // 取出来的值是put进去的，对象复用；如果是新建对象，则取出来的值为0</span></span>
<span class="line"><span>		pool.Put(i)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="sync-map" tabindex="-1">sync.Map <a class="header-anchor" href="#sync-map" aria-label="Permalink to &quot;sync.Map&quot;">​</a></h2><p><code>sync.Map</code> 线程安全的 map</p><p>使用场景：map 并发读写</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;fmt&quot;</span></span>
<span class="line"><span>	&quot;sync&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	var scene sync.Map</span></span>
<span class="line"><span>	// 将键值对保存到sync.Map</span></span>
<span class="line"><span>	scene.Store(&quot;1&quot;, 1)</span></span>
<span class="line"><span>	scene.Store(&quot;2&quot;, 2)</span></span>
<span class="line"><span>	scene.Store(&quot;3&quot;, 3)</span></span>
<span class="line"><span>	// 从sync.Map中根据键取值</span></span>
<span class="line"><span>	fmt.Println(scene.Load(&quot;1&quot;))</span></span>
<span class="line"><span>	// 根据键删除对应的键值对</span></span>
<span class="line"><span>	scene.Delete(&quot;1&quot;)</span></span>
<span class="line"><span>	// 遍历所有sync.Map中的键值对</span></span>
<span class="line"><span>	scene.Range(func(k, v interface{}) bool {</span></span>
<span class="line"><span>		fmt.Println(&quot;iterate:&quot;, k, v)</span></span>
<span class="line"><span>		return true</span></span>
<span class="line"><span>	})</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="sync-context" tabindex="-1">sync.Context <a class="header-anchor" href="#sync-context" aria-label="Permalink to &quot;sync.Context&quot;">​</a></h2><p><code>sync.Context</code> 可以进行上下文信息传递、提供超时和取消机制、控制子 goroutine 的执行</p><p>使用场景：取消一个 goroutine 的执行</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;context&quot;</span></span>
<span class="line"><span>	&quot;fmt&quot;</span></span>
<span class="line"><span>	&quot;time&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	ctx, cancel := context.WithCancel(context.Background())</span></span>
<span class="line"><span>	go func() {</span></span>
<span class="line"><span>		defer func() {</span></span>
<span class="line"><span>			fmt.Println(&quot;goroutine exit&quot;)</span></span>
<span class="line"><span>		}()</span></span>
<span class="line"><span>		for {</span></span>
<span class="line"><span>			select {</span></span>
<span class="line"><span>			case &lt;-ctx.Done():</span></span>
<span class="line"><span>				fmt.Println(&quot;receive cancel signal!&quot;)</span></span>
<span class="line"><span>				return</span></span>
<span class="line"><span>			default:</span></span>
<span class="line"><span>				fmt.Println(&quot;default&quot;)</span></span>
<span class="line"><span>				time.Sleep(time.Second)</span></span>
<span class="line"><span>			}</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}()</span></span>
<span class="line"><span>	time.Sleep(time.Second)</span></span>
<span class="line"><span>	cancel()</span></span>
<span class="line"><span>	time.Sleep(2 * time.Second)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h1 id="四、扩展并发原语" tabindex="-1">四、扩展并发原语 <a class="header-anchor" href="#四、扩展并发原语" aria-label="Permalink to &quot;四、扩展并发原语&quot;">​</a></h1><h2 id="errgroup" tabindex="-1">ErrGroup <a class="header-anchor" href="#errgroup" aria-label="Permalink to &quot;ErrGroup&quot;">​</a></h2><p><code>errgroup</code> 可以在一组 Goroutine 中提供了同步、错误传播以及上下文取消的功能</p><p>使用场景：只要一个 goroutine 出错我们就不再等其他 goroutine 了，减少资源浪费，并且返回错误</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;fmt&quot;</span></span>
<span class="line"><span>	&quot;net/http&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&quot;golang.org/x/sync/errgroup&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	var g errgroup.Group</span></span>
<span class="line"><span>	var urls = []string{</span></span>
<span class="line"><span>		&quot;http://www.baidu.com/&quot;,</span></span>
<span class="line"><span>		&quot;https://www.sina.com.cn/&quot;,</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	for i := range urls {</span></span>
<span class="line"><span>		url := urls[i]</span></span>
<span class="line"><span>		g.Go(func() error {</span></span>
<span class="line"><span>			resp, err := http.Get(url)</span></span>
<span class="line"><span>			if err == nil {</span></span>
<span class="line"><span>				resp.Body.Close()</span></span>
<span class="line"><span>			}</span></span>
<span class="line"><span>			return err</span></span>
<span class="line"><span>		})</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	err := g.Wait()</span></span>
<span class="line"><span>	if err == nil {</span></span>
<span class="line"><span>		fmt.Println(&quot;Successfully fetched all URLs.&quot;)</span></span>
<span class="line"><span>	} else {</span></span>
<span class="line"><span>		fmt.Println(&quot;fetched error:&quot;, err.Error())</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="semaphore" tabindex="-1">Semaphore <a class="header-anchor" href="#semaphore" aria-label="Permalink to &quot;Semaphore&quot;">​</a></h2><p><code>Semaphore</code>带权重的信号量，控制多个 goroutine 同时访问资源</p><p>使用场景：控制 goroutine 的阻塞和唤醒</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;context&quot;</span></span>
<span class="line"><span>	&quot;fmt&quot;</span></span>
<span class="line"><span>	&quot;log&quot;</span></span>
<span class="line"><span>	&quot;runtime&quot;</span></span>
<span class="line"><span>	&quot;time&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&quot;golang.org/x/sync/semaphore&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var (</span></span>
<span class="line"><span>	maxWorkers = runtime.GOMAXPROCS(0)</span></span>
<span class="line"><span>	sema       = semaphore.NewWeighted(int64(maxWorkers)) //信号量</span></span>
<span class="line"><span>	task       = make([]int, maxWorkers*4)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 任务数，是worker的四</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	ctx := context.Background()</span></span>
<span class="line"><span>	for i := range task {</span></span>
<span class="line"><span>		// 如果没有worker可用，会阻塞在这里，直到某个worker被释放</span></span>
<span class="line"><span>		if err := sema.Acquire(ctx, 1); err != nil {</span></span>
<span class="line"><span>			break</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>		// 启动worker goroutine</span></span>
<span class="line"><span>		go func(i int) {</span></span>
<span class="line"><span>			defer sema.Release(1)</span></span>
<span class="line"><span>			time.Sleep(100 * time.Millisecond) // 模拟一个耗时操作</span></span>
<span class="line"><span>			task[i] = i + 1</span></span>
<span class="line"><span>		}(i)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	// 请求所有的worker,这样能确保前面的worker都执行完</span></span>
<span class="line"><span>	if err := sema.Acquire(ctx, int64(maxWorkers)); err != nil {</span></span>
<span class="line"><span>		log.Printf(&quot;获取所有的worker失败: %v&quot;, err)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	fmt.Println(maxWorkers, task)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="singleflight" tabindex="-1">SingleFlight <a class="header-anchor" href="#singleflight" aria-label="Permalink to &quot;SingleFlight&quot;">​</a></h2><p>用于抑制对下游的重复请求</p><p>使用场景：访问缓存、数据库等场景，缓存过期时只有一个请求去更新数据库</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;fmt&quot;</span></span>
<span class="line"><span>	&quot;sync&quot;</span></span>
<span class="line"><span>	&quot;sync/atomic&quot;</span></span>
<span class="line"><span>	&quot;time&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&quot;golang.org/x/sync/singleflight&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 模拟从数据库读取</span></span>
<span class="line"><span>func getArticle(id int) (article string, err error) {</span></span>
<span class="line"><span>	// 假设这里会对数据库进行调用, 模拟不同并发下耗时不同</span></span>
<span class="line"><span>	atomic.AddInt32(&amp;count, 1)</span></span>
<span class="line"><span>	time.Sleep(time.Duration(count) * time.Millisecond)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	return fmt.Sprintf(&quot;article: %d&quot;, id), nil</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 模拟优先读缓存，缓存不存在读取数据库，并且只有一个请求读取数据库，其它请求等待</span></span>
<span class="line"><span>func singleflightGetArticle(sg *singleflight.Group, id int) (string, error) {</span></span>
<span class="line"><span>	v, err, _ := sg.Do(fmt.Sprintf(&quot;%d&quot;, id), func() (interface{}, error) {</span></span>
<span class="line"><span>		return getArticle(id)</span></span>
<span class="line"><span>	})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	return v.(string), err</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var count int32</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	time.AfterFunc(1*time.Second, func() {</span></span>
<span class="line"><span>		atomic.AddInt32(&amp;count, -count)</span></span>
<span class="line"><span>	})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	var (</span></span>
<span class="line"><span>		wg  sync.WaitGroup</span></span>
<span class="line"><span>		now = time.Now()</span></span>
<span class="line"><span>		n   = 1000</span></span>
<span class="line"><span>		sg  = &amp;singleflight.Group{}</span></span>
<span class="line"><span>	)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	for i := 0; i &lt; n; i++ {</span></span>
<span class="line"><span>		wg.Add(1)</span></span>
<span class="line"><span>		go func() {</span></span>
<span class="line"><span>			res, _ := singleflightGetArticle(sg, 1)</span></span>
<span class="line"><span>			// res, _ := getArticle(1)</span></span>
<span class="line"><span>			if res != &quot;article: 1&quot; {</span></span>
<span class="line"><span>				panic(&quot;err&quot;)</span></span>
<span class="line"><span>			}</span></span>
<span class="line"><span>			wg.Done()</span></span>
<span class="line"><span>		}()</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	wg.Wait()</span></span>
<span class="line"><span>	fmt.Printf(&quot;同时发起 %d 次请求，耗时: %s&quot;, n, time.Since(now))</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,57),e=[t];function i(c,o,r,u,d,m){return a(),s("div",null,e)}const q=n(l,[["render",i]]);export{g as __pageData,q as default};
