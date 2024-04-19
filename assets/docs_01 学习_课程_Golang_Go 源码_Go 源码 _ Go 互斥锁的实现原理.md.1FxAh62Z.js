import{_ as a,c as s,o as n,a4 as p}from"./chunks/framework.4aTu-Nia.js";const g=JSON.parse('{"title":"一、什么是互斥锁","description":"","frontmatter":{},"headers":[],"relativePath":"docs/01 学习/课程/Golang/Go 源码/Go 源码 | Go 互斥锁的实现原理.md","filePath":"docs/01 学习/课程/Golang/Go 源码/Go 源码 | Go 互斥锁的实现原理.md"}'),e={name:"docs/01 学习/课程/Golang/Go 源码/Go 源码 | Go 互斥锁的实现原理.md"},i=p(`<h1 id="一、什么是互斥锁" tabindex="-1">一、什么是互斥锁 <a class="header-anchor" href="#一、什么是互斥锁" aria-label="Permalink to &quot;一、什么是互斥锁&quot;">​</a></h1><p>Go 语言中的互斥锁（Mutex）是一种关键的并发控制机制，用于保护共享资源免受多个 Goroutine 的并发访问。</p><p>互斥锁的主要目标是确保一次只有一个 Goroutine 可以访问被锁定的共享资源。在 Go 语言中，互斥锁由<code>sync</code>包提供，并且具有<code>sync.Mutex</code>类型。互斥锁的基本操作包括加锁（Lock）和解锁（Unlock）。</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> mu </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sync</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Mutex</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> main</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    mu.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Lock</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 访问共享资源</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    mu.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Unlock</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>使用场景：</p><p>多个线程同时访问临界区，为保证数据的安全，锁住一些共享资源， 以防止并发访问这些共享数据时可能导致的数据不一致问题。</p><p>获取锁的线程可以正常访问临界区，未获取到锁的线程等待锁释放后可以尝试获取锁</p><p><img src="https://cdn.nlark.com/yuque/0/2023/png/12455685/1695553783489-e0a484ea-bb6f-4822-95d2-25d3064ec8cc.png#averageHue=%23f3f3ec&amp;clientId=u4649c3b5-5e65-4&amp;id=OC2Pc&amp;originHeight=549&amp;originWidth=732&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=143165&amp;status=done&amp;style=none&amp;taskId=u9cf4dac7-d4f9-41e4-b183-09a652d7254&amp;title=" alt="image.png"></p><h1 id="二、互斥锁的实现原理" tabindex="-1">二、互斥锁的实现原理 <a class="header-anchor" href="#二、互斥锁的实现原理" aria-label="Permalink to &quot;二、互斥锁的实现原理&quot;">​</a></h1><p>Go 语言的互斥锁的实现原理可以简单概括为：</p><ol><li>互斥锁的零值是未加锁状态，即初始状态下没有任何 Goroutine 拥有锁。</li><li>当一个 Goroutine 尝试获取锁时，如果锁处于未加锁状态，它会立即获得锁，将锁状态置为已加锁，并继续执行。</li><li>如果锁已经被其他 Goroutine 持有，那么当前 Goroutine 将被阻塞，直到锁被释放。</li><li>当一个 Goroutine 释放锁时，锁的状态将被设置为未加锁，此时等待的 Goroutine 中的一个将被唤醒并获得锁。</li></ol><h2 id="一-底层实现结构" tabindex="-1">一）底层实现结构 <a class="header-anchor" href="#一-底层实现结构" aria-label="Permalink to &quot;一）底层实现结构&quot;">​</a></h2><p>互斥锁对应的是底层结构是 sync.Mutex 结构体，，位于 src/sync/mutex.go 中</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>type Mutex struct {</span></span>
<span class="line"><span>	 state int32</span></span>
<span class="line"><span>	 sema  uint32</span></span>
<span class="line"><span> }</span></span></code></pre></div><p>state 表示锁的状态，有锁定、被唤醒、饥饿模式等，并且是用 state 的二进制位来标识的，不同模式下会有不同的处理方式</p><p><img src="https://cdn.nlark.com/yuque/0/2023/png/12455685/1695553822987-30630fbe-14a3-48d4-9cdb-1e78c3bb887e.png#averageHue=%23f2f0f0&amp;clientId=u4649c3b5-5e65-4&amp;id=t7xM0&amp;originHeight=346&amp;originWidth=685&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=51339&amp;status=done&amp;style=none&amp;taskId=u9dc41ecf-ef73-4d32-90ae-13d7a933f1c&amp;title=" alt="image.png"></p><p>sema 表示信号量，mutex 阻塞队列的定位是通过这个变量来实现的，从而实现 goroutine 的阻塞和唤醒</p><p><img src="https://cdn.nlark.com/yuque/0/2023/png/12455685/1695553822949-4987d145-a4d0-41e2-92ca-866edbc11ed6.png#averageHue=%23f6f6f6&amp;clientId=u4649c3b5-5e65-4&amp;id=GLg99&amp;originHeight=420&amp;originWidth=645&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=38454&amp;status=done&amp;style=none&amp;taskId=u95408ebd-ce31-4be1-b279-5822b2c5dc1&amp;title=" alt="image.png"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>addr = &amp;sema</span></span>
<span class="line"><span>func semroot(addr *uint32) *semaRoot {</span></span>
<span class="line"><span>   return &amp;semtable[(uintptr(unsafe.Pointer(addr))&gt;&gt;3)%semTabSize].root</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>root := semroot(addr)</span></span>
<span class="line"><span>root.queue(addr, s, lifo)</span></span>
<span class="line"><span>root.dequeue(addr)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var semtable [251]struct {</span></span>
<span class="line"><span>   root semaRoot</span></span>
<span class="line"><span>   ...</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>type semaRoot struct {</span></span>
<span class="line"><span>  lock  mutex</span></span>
<span class="line"><span>  treap *sudog // root of balanced tree of unique waiters.</span></span>
<span class="line"><span>  nwait uint32 // Number of waiters. Read w/o the lock.</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>type sudog struct {</span></span>
<span class="line"><span>	g *g</span></span>
<span class="line"><span>	next *sudog</span></span>
<span class="line"><span>	prev *sudog</span></span>
<span class="line"><span>	elem unsafe.Pointer // 指向sema变量</span></span>
<span class="line"><span>	waitlink *sudog // g.waiting list or semaRoot</span></span>
<span class="line"><span>	waittail *sudog // semaRoot</span></span>
<span class="line"><span>	...</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="二-加锁" tabindex="-1">二）加锁 <a class="header-anchor" href="#二-加锁" aria-label="Permalink to &quot;二）加锁&quot;">​</a></h2><p>通过原子操作 cas 加锁，如果加锁不成功，根据不同的场景选择自旋重试加锁或者阻塞等待被唤醒后加锁</p><p><img src="https://cdn.nlark.com/yuque/0/2023/png/12455685/1695553822816-2aaa04f9-6f52-413b-9aa2-9c841526da1c.png#averageHue=%23f8f8f7&amp;clientId=u4649c3b5-5e65-4&amp;id=O8ufq&amp;originHeight=310&amp;originWidth=1342&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=55935&amp;status=done&amp;style=none&amp;taskId=u75b4faac-2198-4bc9-91da-e522795423f&amp;title=" alt="image.png"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func (m *Mutex) Lock() {</span></span>
<span class="line"><span>	// Fast path: 幸运之路，一下就获取到了锁</span></span>
<span class="line"><span>	if atomic.CompareAndSwapInt32(&amp;m.state, 0, mutexLocked) {</span></span>
<span class="line"><span>		return</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	// Slow path：缓慢之路，尝试自旋或阻塞获取锁</span></span>
<span class="line"><span>	m.lockSlow()</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="三-解锁" tabindex="-1">三）解锁 <a class="header-anchor" href="#三-解锁" aria-label="Permalink to &quot;三）解锁&quot;">​</a></h2><p>通过原子操作 add 解锁，如果仍有 goroutine 在等待，唤醒等待的 goroutine</p><p><img src="https://cdn.nlark.com/yuque/0/2023/png/12455685/1695553822983-8f122e47-3c2b-4a84-9683-3364a27ce9ce.png#averageHue=%23f7f7f6&amp;clientId=u4649c3b5-5e65-4&amp;id=jkszt&amp;originHeight=238&amp;originWidth=1024&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=41005&amp;status=done&amp;style=none&amp;taskId=ue122c36e-1fc1-4c9e-8669-9b386c37d29&amp;title=" alt="image.png"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func (m *Mutex) Unlock() {</span></span>
<span class="line"><span>   // Fast path: 幸运之路，解锁</span></span>
<span class="line"><span>   new := atomic.AddInt32(&amp;m.state, -mutexLocked)</span></span>
<span class="line"><span>   if new != 0 {</span></span>
<span class="line"><span> 			// Slow path：如果有等待的goroutine，唤醒等待的goroutine</span></span>
<span class="line"><span>			m.unlockSlow()</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这种实现原理保证了只有一个 Goroutine 能够同时访问临界区，从而确保了并发访问的安全性。</p><h1 id="三、互斥锁的注意事项" tabindex="-1">三、互斥锁的注意事项 <a class="header-anchor" href="#三、互斥锁的注意事项" aria-label="Permalink to &quot;三、互斥锁的注意事项&quot;">​</a></h1><p>1、在高度竞争的情况下，多个 Goroutine 争夺锁可能导致性能下降。为了提高性能，可以考虑使用更轻量级的同步原语，如读写锁（<code>sync.RWMutex</code>）或通道（<code>chan</code>），以根据需求进行读或写的并发控制。</p><p>2、在 Lock() 之前使用 Unlock() 会导致 panic 异常</p><p>3、使用 Lock() 加锁后，再次 Lock() 会导致死锁（不支持重入），需 Unlock()解锁后才能再加锁</p><p>4、锁定状态与 goroutine 没有关联，一个 goroutine 可以 Lock，另一个 goroutine 可以 Unlock</p>`,33),t=[i];function l(o,c,r,d,h,m){return n(),s("div",null,t)}const k=a(e,[["render",l]]);export{g as __pageData,k as default};
