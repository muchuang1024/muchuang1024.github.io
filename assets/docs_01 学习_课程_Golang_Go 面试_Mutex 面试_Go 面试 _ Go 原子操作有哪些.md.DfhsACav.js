import{_ as a,c as s,o as n,a4 as i}from"./chunks/framework.4aTu-Nia.js";const g=JSON.parse('{"title":"一、基本概念","description":"","frontmatter":{},"headers":[],"relativePath":"docs/01 学习/课程/Golang/Go 面试/Mutex 面试/Go 面试 | Go 原子操作有哪些.md","filePath":"docs/01 学习/课程/Golang/Go 面试/Mutex 面试/Go 面试 | Go 原子操作有哪些.md"}'),p={name:"docs/01 学习/课程/Golang/Go 面试/Mutex 面试/Go 面试 | Go 原子操作有哪些.md"},t=i(`<h1 id="一、基本概念" tabindex="-1">一、基本概念 <a class="header-anchor" href="#一、基本概念" aria-label="Permalink to &quot;一、基本概念&quot;">​</a></h1><p>Go 语言提供了一些原子操作函数，用于在并发编程中安全地执行原子操作，这些操作是不可分割的，不会被其他 goroutine 中断。</p><p>原子操作仅会由一个独立的 CPU 指令代表和完成。原子操作是无锁的，常常直接通过 CPU 指令直接实现。 事实上，其它同步技术的实现常常依赖于原子操作。</p><p>Go 语言中一些常见的原子操作 位于 atomic 包中，是最轻量级的锁（也称无锁结构），可以在不形成临界区和创建互斥量的情况下完成并发安全的值替换操作，不过这个包只支持 int32/int64/uint32/uint64/uintptr 这几种数据类型的一些基础操作（增减、交换、载入、存储等）</p><h2 id="使用场景" tabindex="-1">使用场景 <a class="header-anchor" href="#使用场景" aria-label="Permalink to &quot;使用场景&quot;">​</a></h2><p>当我们想要对<strong>某个变量</strong>并发安全的修改，除了使用官方提供的 <code>mutex</code>，还可以使用 sync/atomic 包的原子操作，它能够保证对变量的读取或修改期间不被其他的协程所影响。</p><p>atomic 包提供的原子操作能够确保任一时刻只有一个 goroutine 对变量进行操作，善用 atomic 能够避免程序中出现大量的锁操作。</p><h2 id="常见操作" tabindex="-1">常见操作 <a class="header-anchor" href="#常见操作" aria-label="Permalink to &quot;常见操作&quot;">​</a></h2><ul><li>增减 Add</li><li>载入 Load</li><li>比较并交换 CompareAndSwap</li><li>交换 Swap</li><li>存储 Store</li></ul><p>atomic 操作的对象是一个地址，你需要把可寻址的变量的地址作为参数传递给方法，而不是把变量的值传递给方法</p><p>下面将分别介绍这些操作</p><h1 id="二、增减操作" tabindex="-1">二、增减操作 <a class="header-anchor" href="#二、增减操作" aria-label="Permalink to &quot;二、增减操作&quot;">​</a></h1><p>此类操作的前缀为 <code>Add</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func AddInt32(addr *int32, delta int32) (new int32)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func AddInt64(addr *int64, delta int64) (new int64)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func AddUint32(addr *uint32, delta uint32) (new uint32)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func AddUint64(addr *uint64, delta uint64) (new uint64)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func AddUintptr(addr *uintptr, delta uintptr) (new uintptr)</span></span></code></pre></div><p>需要注意的是，第一个参数必须是指针类型的值，通过指针变量可以获取被操作数在内存中的地址，从而施加特殊的 CPU 指令，确保同一时间只有一个 goroutine 能够进行操作。</p><p>使用举例：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">addr</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *int64</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">delta</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> int64</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	atomic.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">AddInt64</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(addr, delta) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//加操作</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	fmt.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Println</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;add opts: &quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">addr)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h1 id="三、载入操作" tabindex="-1">三、载入操作 <a class="header-anchor" href="#三、载入操作" aria-label="Permalink to &quot;三、载入操作&quot;">​</a></h1><p>此类操作的前缀为 <code>Load</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func LoadInt32(addr *int32) (val int32)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func LoadInt64(addr *int64) (val int64)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func LoadPointer(addr *unsafe.Pointer) (val unsafe.Pointer)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func LoadUint32(addr *uint32) (val uint32)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func LoadUint64(addr *uint64) (val uint64)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func LoadUintptr(addr *uintptr) (val uintptr)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 特殊类型： Value类型，常用于配置变更</span></span>
<span class="line"><span>func (v *Value) Load() (x interface{}) {}</span></span></code></pre></div><p>载入操作能够保证原子的读变量的值，当读取的时候，任何其他 CPU 操作都无法对该变量进行读写，其实现机制受到底层硬件的支持。</p><p>使用示例:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func load(addr *int64) {</span></span>
<span class="line"><span>	fmt.Println(&quot;load opts: &quot;, atomic.LoadInt64(&amp;opts))</span></span>
<span class="line"><span>}</span></span></code></pre></div><h1 id="四、比较并交换" tabindex="-1">四、比较并交换 <a class="header-anchor" href="#四、比较并交换" aria-label="Permalink to &quot;四、比较并交换&quot;">​</a></h1><p>此类操作的前缀为 <code>CompareAndSwap</code>, 该操作简称 CAS，可以用来实现乐观锁</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func CompareAndSwapInt32(addr *int32, old, new int32) (swapped bool)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func CompareAndSwapInt64(addr *int64, old, new int64) (swapped bool)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func CompareAndSwapPointer(addr *unsafe.Pointer, old, new unsafe.Pointer) (swapped bool)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func CompareAndSwapUint32(addr *uint32, old, new uint32) (swapped bool)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func CompareAndSwapUint64(addr *uint64, old, new uint64) (swapped bool)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func CompareAndSwapUintptr(addr *uintptr, old, new uintptr) (swapped bool)</span></span></code></pre></div><p>该操作在进行交换前首先确保变量的值未被更改，即仍然保持参数 <code>old</code> 所记录的值，满足此前提下才进行交换操作。CAS 的做法类似操作数据库时常见的乐观锁机制。</p><p>需要注意的是，当有大量的 goroutine 对变量进行读写操作时，可能导致 CAS 操作无法成功，这时可以利用 for 循环多次尝试。</p><p>使用示例：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> compareAndSwap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">addr</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *int64</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">oldValue</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> int64</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">newValue</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> int64</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> atomic.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">CompareAndSwapInt64</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(addr, oldValue, newValue) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		fmt.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Println</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;cas opts: &quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">addr)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">		return</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h1 id="五、交换" tabindex="-1">五、交换 <a class="header-anchor" href="#五、交换" aria-label="Permalink to &quot;五、交换&quot;">​</a></h1><p>此类操作的前缀为 <code>Swap</code>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func SwapInt32(addr *int32, new int32) (old int32)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func SwapInt64(addr *int64, new int64) (old int64)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func SwapPointer(addr *unsafe.Pointer, new unsafe.Pointer) (old unsafe.Pointer)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func SwapUint32(addr *uint32, new uint32) (old uint32)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func SwapUint64(addr *uint64, new uint64) (old uint64)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func SwapUintptr(addr *uintptr, new uintptr) (old uintptr)</span></span></code></pre></div><p>相对于 CAS，明显此类操作更为暴力直接，并不管变量的旧值是否被改变，直接赋予新值然后返回背替换的值。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func swap(addr *int64, newValue int64) {</span></span>
<span class="line"><span>	atomic.SwapInt64(addr, newValue)</span></span>
<span class="line"><span>	fmt.Println(&quot;swap opts: &quot;, *addr)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h1 id="六、存储" tabindex="-1">六、存储 <a class="header-anchor" href="#六、存储" aria-label="Permalink to &quot;六、存储&quot;">​</a></h1><p>此类操作的前缀为 <code>Store</code>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func StoreInt32(addr *int32, val int32)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func StoreInt64(addr *int64, val int64)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func StorePointer(addr *unsafe.Pointer, val unsafe.Pointer)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func StoreUint32(addr *uint32, val uint32)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func StoreUint64(addr *uint64, val uint64)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func StoreUintptr(addr *uintptr, val uintptr)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 特殊类型： Value类型，常用于配置变更</span></span>
<span class="line"><span>func (v *Value) Store(x interface{})</span></span></code></pre></div><p>此类操作确保了写变量的原子性，避免其他操作读到了修改变量过程中的脏数据。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func store(addr *int64, newValue int64) {</span></span>
<span class="line"><span>	atomic.StoreInt64(addr, newValue)</span></span>
<span class="line"><span>	fmt.Println(&quot;store opts: &quot;, *addr)</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,40),e=[t];function l(d,o,c,h,r,u){return n(),s("div",null,e)}const E=a(p,[["render",l]]);export{g as __pageData,E as default};
