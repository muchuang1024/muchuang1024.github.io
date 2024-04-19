import{_ as n,c as s,o as a,a4 as p}from"./chunks/framework.4aTu-Nia.js";const g=JSON.parse('{"title":"一、什么是可重入锁","description":"","frontmatter":{},"headers":[],"relativePath":"docs/01 学习/专栏/Golang/Go 面试/Mutex 面试/Go 面试 | Go 如何实现可重入锁.md","filePath":"docs/01 学习/专栏/Golang/Go 面试/Mutex 面试/Go 面试 | Go 如何实现可重入锁.md"}'),e={name:"docs/01 学习/专栏/Golang/Go 面试/Mutex 面试/Go 面试 | Go 如何实现可重入锁.md"},t=p(`<h1 id="一、什么是可重入锁" tabindex="-1">一、什么是可重入锁 <a class="header-anchor" href="#一、什么是可重入锁" aria-label="Permalink to &quot;一、什么是可重入锁&quot;">​</a></h1><p>可重入锁又称为递归锁，是指在同一个线程在外层方法获取锁的时候，在进入该线程的内层方法时会自动获取锁，不会因为之前已经获取过还没释放再次加锁导致死锁</p><p>Go 里面的 Mutex 不是可重入的锁。Mutex 的实现中没有记录哪个 goroutine 拥有这把锁。理论上，任何 goroutine 都可以随意地 Unlock 这把锁，所以没办法计算重入条件，并且 Mutex 重复 Lock 会导致死锁。</p><h1 id="二、如何实现可重入锁" tabindex="-1">二、如何实现可重入锁 <a class="header-anchor" href="#二、如何实现可重入锁" aria-label="Permalink to &quot;二、如何实现可重入锁&quot;">​</a></h1><p>实现一个可重入锁需要这两点：</p><ul><li>记住持有锁的线程</li><li>统计重入的次数</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;bytes&quot;</span></span>
<span class="line"><span>	&quot;fmt&quot;</span></span>
<span class="line"><span>	&quot;runtime&quot;</span></span>
<span class="line"><span>	&quot;strconv&quot;</span></span>
<span class="line"><span>	&quot;sync&quot;</span></span>
<span class="line"><span>	&quot;sync/atomic&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>type ReentrantLock struct {</span></span>
<span class="line"><span>	sync.Mutex</span></span>
<span class="line"><span>	recursion int32 // 这个goroutine 重入的次数</span></span>
<span class="line"><span>	owner     int64 // 当前持有锁的goroutine id</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Get returns the id of the current goroutine.</span></span>
<span class="line"><span>func GetGoroutineID() int64 {</span></span>
<span class="line"><span>	var buf [64]byte</span></span>
<span class="line"><span>	var s = buf[:runtime.Stack(buf[:], false)]</span></span>
<span class="line"><span>	s = s[len(&quot;goroutine &quot;):]</span></span>
<span class="line"><span>	s = s[:bytes.IndexByte(s, &#39; &#39;)]</span></span>
<span class="line"><span>	gid, _ := strconv.ParseInt(string(s), 10, 64)</span></span>
<span class="line"><span>	return gid</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func NewReentrantLock() sync.Locker {</span></span>
<span class="line"><span>	res := &amp;ReentrantLock{</span></span>
<span class="line"><span>		Mutex:     sync.Mutex{},</span></span>
<span class="line"><span>		recursion: 0,</span></span>
<span class="line"><span>		owner:     0,</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	return res</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ReentrantMutex 包装一个Mutex,实现可重入</span></span>
<span class="line"><span>type ReentrantMutex struct {</span></span>
<span class="line"><span>	sync.Mutex</span></span>
<span class="line"><span>	owner     int64 // 当前持有锁的goroutine id</span></span>
<span class="line"><span>	recursion int32 // 这个goroutine 重入的次数</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func (m *ReentrantMutex) Lock() {</span></span>
<span class="line"><span>	gid := GetGoroutineID()</span></span>
<span class="line"><span>	// 如果当前持有锁的goroutine就是这次调用的goroutine,说明是重入</span></span>
<span class="line"><span>	if atomic.LoadInt64(&amp;m.owner) == gid {</span></span>
<span class="line"><span>		m.recursion++</span></span>
<span class="line"><span>		return</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	m.Mutex.Lock()</span></span>
<span class="line"><span>	// 获得锁的goroutine第一次调用，记录下它的goroutine id,调用次数加1</span></span>
<span class="line"><span>	atomic.StoreInt64(&amp;m.owner, gid)</span></span>
<span class="line"><span>	m.recursion = 1</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func (m *ReentrantMutex) Unlock() {</span></span>
<span class="line"><span>	gid := GetGoroutineID()</span></span>
<span class="line"><span>	// 非持有锁的goroutine尝试释放锁，错误的使用</span></span>
<span class="line"><span>	if atomic.LoadInt64(&amp;m.owner) != gid {</span></span>
<span class="line"><span>		panic(fmt.Sprintf(&quot;wrong the owner(%d): %d!&quot;, m.owner, gid))</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	// 调用次数减1</span></span>
<span class="line"><span>	m.recursion--</span></span>
<span class="line"><span>	if m.recursion != 0 { // 如果这个goroutine还没有完全释放，则直接返回</span></span>
<span class="line"><span>		return</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	// 此goroutine最后一次调用，需要释放锁</span></span>
<span class="line"><span>	atomic.StoreInt64(&amp;m.owner, -1)</span></span>
<span class="line"><span>	m.Mutex.Unlock()</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	var mutex = &amp;ReentrantMutex{}</span></span>
<span class="line"><span>	mutex.Lock()</span></span>
<span class="line"><span>	mutex.Lock()</span></span>
<span class="line"><span>	fmt.Println(111)</span></span>
<span class="line"><span>	mutex.Unlock()</span></span>
<span class="line"><span>	mutex.Unlock()</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,7),l=[t];function i(c,o,r,u,m,d){return a(),s("div",null,l)}const x=n(e,[["render",i]]);export{g as __pageData,x as default};
