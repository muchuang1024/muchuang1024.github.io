import{_ as n,c as s,o as a,a4 as p}from"./chunks/framework.4aTu-Nia.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/01 学习/课程/Golang/Go 面试/Mutex 面试/Go 面试 | Go 互斥锁允许自旋的条件.md","filePath":"docs/01 学习/课程/Golang/Go 面试/Mutex 面试/Go 面试 | Go 互斥锁允许自旋的条件.md"}'),e={name:"docs/01 学习/课程/Golang/Go 面试/Mutex 面试/Go 面试 | Go 互斥锁允许自旋的条件.md"},t=p(`<p><strong>线程没有获取到锁时常见有 2 种处理方式</strong></p><p>1、一种是没有获取到锁的线程就一直循环等待判断该资源是否已经释放锁，这种锁也叫做<strong>自旋锁</strong>，它不用将线程阻塞起来， 适用于并发低且程序执行时间短的场景，缺点是 cpu 占用较高</p><p>2、另外一种处理方式就是把自己阻塞起来，会<strong>释放 CPU 给其他线程</strong>，内核会将线程置为「睡眠」状态，等到锁被释放后，内核会在合适的时机唤醒该线程，适用于高并发场景，缺点是有线程上下文切换的开销</p><p>Go 语言中的 Mutex 实现了自旋与阻塞两种场景，当满足不了自旋条件时，就会进入阻塞</p><p><strong>允许自旋的条件</strong></p><p>1、锁已被占用，并且锁不处于饥饿模式。</p><p>2、积累的自旋次数小于最大自旋次数（active_spin=4）。</p><p>3、cpu 核数大于 1。</p><p>4、有空闲的 P。</p><p>5、当前 goroutine 所挂载的 P 下，本地待运行队列为空。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>if old&amp;(mutexLocked|mutexStarving) == mutexLocked &amp;&amp; runtime_canSpin(iter) {</span></span>
<span class="line"><span>	...</span></span>
<span class="line"><span>    runtime_doSpin()</span></span>
<span class="line"><span>	continue</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>func sync_runtime_canSpin(i int) bool {</span></span>
<span class="line"><span>	if i &gt;= active_spin</span></span>
<span class="line"><span>	|| ncpu &lt;= 1</span></span>
<span class="line"><span>	|| gomaxprocs &lt;= int32(sched.npidle+sched.nmspinning)+1 {</span></span>
<span class="line"><span>	      return false</span></span>
<span class="line"><span>	 }</span></span>
<span class="line"><span>   if p := getg().m.p.ptr(); !runqempty(p) {</span></span>
<span class="line"><span>      return false</span></span>
<span class="line"><span> }</span></span>
<span class="line"><span>   return true</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>自旋代码</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func sync_runtime_doSpin() {</span></span>
<span class="line"><span>	procyield(active_spin_cnt)</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>如果可以进入自旋状态之后就会调用 <code>runtime_doSpin</code> 方法进入自旋， <code>doSpin</code> 方法会调用 <code>procyield(30)</code> 执行 30 次 <code>PAUSE</code> 指令，什么都不做，但是会消耗 CPU 时间</p>`,14),o=[t];function i(c,l,r,_,d,u){return a(),s("div",null,o)}const h=n(e,[["render",i]]);export{m as __pageData,h as default};
