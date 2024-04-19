import{_ as a,c as n,o as s,a4 as e}from"./chunks/framework.4aTu-Nia.js";const g=JSON.parse('{"title":"一、基本概念","description":"","frontmatter":{},"headers":[],"relativePath":"docs/01 学习/专栏/Golang/Go 源码/Go 源码 | Go 读写锁的实现原理.md","filePath":"docs/01 学习/专栏/Golang/Go 源码/Go 源码 | Go 读写锁的实现原理.md"}'),p={name:"docs/01 学习/专栏/Golang/Go 源码/Go 源码 | Go 读写锁的实现原理.md"},t=e(`<h1 id="一、基本概念" tabindex="-1">一、基本概念 <a class="header-anchor" href="#一、基本概念" aria-label="Permalink to &quot;一、基本概念&quot;">​</a></h1><p>读写互斥锁 RWMutex，是对 Mutex 的一个扩展，当一个 goroutine 获得了读锁后，其他 goroutine 可以获取读锁，但不能获取写锁；当一个 goroutine 获得了写锁后，其他 goroutine 既不能获取读锁也不能获取写锁（只能存在一个写者或多个读者，可以同时读）</p><p>使用场景：</p><p>读多于写的情况（既保证线程安全，又保证性能不太差）</p><h1 id="二、底层实现结构" tabindex="-1">二、底层实现结构 <a class="header-anchor" href="#二、底层实现结构" aria-label="Permalink to &quot;二、底层实现结构&quot;">​</a></h1><p>互斥锁对应的是底层结构是 sync.RWMutex 结构体，位于 src/sync/rwmutex.go 中</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>type RWMutex struct {</span></span>
<span class="line"><span>    w           Mutex  // 复用互斥锁</span></span>
<span class="line"><span>    writerSem   uint32 // 信号量，用于写等待读</span></span>
<span class="line"><span>    readerSem   uint32 // 信号量，用于读等待写</span></span>
<span class="line"><span>    readerCount int32  // 当前执行读的 goroutine 数量</span></span>
<span class="line"><span>    readerWait  int32  // 被阻塞的准备读的 goroutine 的数量</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="一-操作" tabindex="-1">一）操作 <a class="header-anchor" href="#一-操作" aria-label="Permalink to &quot;一）操作&quot;">​</a></h2><p>读锁的加锁与释放</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func (rw *RWMutex) RLock() // 加读锁</span></span>
<span class="line"><span>func (rw *RWMutex) RUnlock() // 释放读锁</span></span></code></pre></div><h2 id="二-加读锁" tabindex="-1">二）加读锁 <a class="header-anchor" href="#二-加读锁" aria-label="Permalink to &quot;二）加读锁&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func (rw *RWMutex) RLock() {</span></span>
<span class="line"><span>// 为什么readerCount会小于0呢？往下看发现writer的Lock()会对readerCount做减法操作（原子操作）</span></span>
<span class="line"><span>  if atomic.AddInt32(&amp;rw.readerCount, 1) &lt; 0 {</span></span>
<span class="line"><span>    // A writer is pending, wait for it.</span></span>
<span class="line"><span>    runtime_Semacquire(&amp;rw.readerSem)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><code>atomic.AddInt32(&amp;rw.readerCount, 1)</code> 调用这个原子方法，对当前在读的数量加 1，如果返回负数，那么说明当前有其他写锁，这时候就调用 <code>runtime_SemacquireMutex</code> 休眠当前 goroutine 等待被唤醒</p><h2 id="三-释放读锁" tabindex="-1">三）释放读锁 <a class="header-anchor" href="#三-释放读锁" aria-label="Permalink to &quot;三）释放读锁&quot;">​</a></h2><p>解锁的时候对正在读的操作减 1，如果返回值小于 0 那么说明当前有在写的操作，这个时候调用 <code>rUnlockSlow</code> 进入慢速通道</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func (rw *RWMutex) RUnlock() {</span></span>
<span class="line"><span>    if r := atomic.AddInt32(&amp;rw.readerCount, -1); r &lt; 0 {</span></span>
<span class="line"><span>        rw.rUnlockSlow(r)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>被阻塞的准备读的 goroutine 的数量减 1，readerWait 为 0，就表示当前没有正在准备读的 goroutine 这时候调用 <code>runtime_Semrelease</code> 唤醒写操作</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func (rw *RWMutex) rUnlockSlow(r int32) {</span></span>
<span class="line"><span>    // A writer is pending.</span></span>
<span class="line"><span>    if atomic.AddInt32(&amp;rw.readerWait, -1) == 0 {</span></span>
<span class="line"><span>        // The last reader unblocks the writer.</span></span>
<span class="line"><span>        runtime_Semrelease(&amp;rw.writerSem, false, 1)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>写锁的加锁与释放</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func (rw *RWMutex) Lock() // 加写锁</span></span>
<span class="line"><span>func (rw *RWMutex) Unlock() // 释放写锁</span></span></code></pre></div><h2 id="四-加写锁" tabindex="-1">四）加写锁 <a class="header-anchor" href="#四-加写锁" aria-label="Permalink to &quot;四）加写锁&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const rwmutexMaxReaders = 1 &lt;&lt; 30</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func (rw *RWMutex) Lock() {</span></span>
<span class="line"><span>	// First, resolve competition with other writers.</span></span>
<span class="line"><span>	rw.w.Lock()</span></span>
<span class="line"><span>	// Announce to readers there is a pending writer.</span></span>
<span class="line"><span>	r := atomic.AddInt32(&amp;rw.readerCount, -rwmutexMaxReaders) + rwmutexMaxReaders</span></span>
<span class="line"><span>	// Wait for active readers.</span></span>
<span class="line"><span>	if r != 0 &amp;&amp; atomic.AddInt32(&amp;rw.readerWait, r) != 0 {</span></span>
<span class="line"><span>		runtime_Semacquire(&amp;rw.writerSem)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>首先调用互斥锁的 lock，获取到互斥锁之后，如果计算之后当前仍然有其他 goroutine 持有读锁，那么就调用 <code>runtime_SemacquireMutex</code> 休眠当前的 goroutine 等待所有的读操作完成</p><p>这里 readerCount 原子性加上一个很大的负数，是防止后面的协程能拿到读锁，阻塞读</p><h2 id="五-释放写锁" tabindex="-1">五）释放写锁 <a class="header-anchor" href="#五-释放写锁" aria-label="Permalink to &quot;五）释放写锁&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func (rw *RWMutex) Unlock() {</span></span>
<span class="line"><span>	// Announce to readers there is no active writer.</span></span>
<span class="line"><span>	r := atomic.AddInt32(&amp;rw.readerCount, rwmutexMaxReaders)</span></span>
<span class="line"><span>	// Unblock blocked readers, if any.</span></span>
<span class="line"><span>	for i := 0; i &lt; int(r); i++ {</span></span>
<span class="line"><span>		runtime_Semrelease(&amp;rw.readerSem, false)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	// Allow other writers to proceed.</span></span>
<span class="line"><span>	rw.w.Unlock()</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>解锁的操作，会先调用 <code>atomic.AddInt32(&amp;rw.readerCount, rwmutexMaxReaders)</code> 将恢复之前写入的负数，然后根据当前有多少个读操作在等待，循环唤醒</p><h1 id="三、注意点" tabindex="-1">三、注意点 <a class="header-anchor" href="#三、注意点" aria-label="Permalink to &quot;三、注意点&quot;">​</a></h1><p>1、读锁或写锁在 Lock() 之前使用 Unlock() 会导致 panic 异常</p><p>2、使用 Lock() 加锁后，再次 Lock() 会导致死锁（不支持重入），需 Unlock()解锁后才能再加锁</p><p>3、锁定状态与 goroutine 没有关联，一个 goroutine 可以 RLock（Lock），另一个 goroutine 可以 RUnlock（Unlock）</p><h1 id="四、互斥锁和读写锁的区别" tabindex="-1">四、互斥锁和读写锁的区别 <a class="header-anchor" href="#四、互斥锁和读写锁的区别" aria-label="Permalink to &quot;四、互斥锁和读写锁的区别&quot;">​</a></h1><p>1、读写锁区分读者和写者，而互斥锁不区分</p><p>2、互斥锁同一时间只允许一个线程访问该对象，无论读写；读写锁同一时间内只允许一个写者，但是允许多个读者同时读对象。</p>`,34),i=[t];function l(o,r,c,d,u,h){return s(),n("div",null,i)}const k=a(p,[["render",l]]);export{g as __pageData,k as default};
