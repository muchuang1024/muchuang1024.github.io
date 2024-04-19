import{_ as n,c as s,o as a,a4 as p}from"./chunks/framework.4aTu-Nia.js";const _=JSON.parse('{"title":"一、概念","description":"","frontmatter":{},"headers":[],"relativePath":"docs/01 学习/课程/Golang/Go 源码/Go 源码 | Go Cond 实现原理.md","filePath":"docs/01 学习/课程/Golang/Go 源码/Go 源码 | Go Cond 实现原理.md"}'),e={name:"docs/01 学习/课程/Golang/Go 源码/Go 源码 | Go Cond 实现原理.md"},o=p(`<h1 id="一、概念" tabindex="-1">一、概念 <a class="header-anchor" href="#一、概念" aria-label="Permalink to &quot;一、概念&quot;">​</a></h1><p>Go 标准库提供了<code>Cond</code>原语，<code>sync.Cond</code>（条件变量）是一个用于在多个 goroutine 之间进行同步和通信的重要工具，可以让 Goroutine 在满足特定条件时被阻塞和唤醒</p><h1 id="二、底层数据结构" tabindex="-1">二、底层数据结构 <a class="header-anchor" href="#二、底层数据结构" aria-label="Permalink to &quot;二、底层数据结构&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>type Cond struct {</span></span>
<span class="line"><span>    noCopy noCopy</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // L is held while observing or changing the condition</span></span>
<span class="line"><span>    L Locker</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    notify  notifyList</span></span>
<span class="line"><span>    checker copyChecker</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>type notifyList struct {</span></span>
<span class="line"><span>    wait   uint32</span></span>
<span class="line"><span>    notify uint32</span></span>
<span class="line"><span>    lock   uintptr // key field of the mutex</span></span>
<span class="line"><span>    head   unsafe.Pointer</span></span>
<span class="line"><span>    tail   unsafe.Pointer</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>主要有<code>4</code>个字段：</p><ul><li><code>nocopy</code> ： golang 源码中检测禁止拷贝的技术。如果程序中有 WaitGroup 的赋值行为，使用 <code>go vet</code> 检查程序时，就会发现有报错，但需要注意的是，noCopy 不会影响程序正常的编译和运行</li><li><code>checker</code>：用于禁止运行期间发生拷贝，双重检查(<code>Double check</code>)</li><li><code>L</code>：可以传入一个读写锁或互斥锁，当修改条件或者调用<code>Wait</code>方法时需要加锁</li><li><code>notify</code>：通知链表，调用<code>Wait()</code>方法的<code>Goroutine</code>会放到这个链表中，从这里获取需被唤醒的 Goroutine 列表</li></ul><h1 id="三、使用方法" tabindex="-1">三、使用方法 <a class="header-anchor" href="#三、使用方法" aria-label="Permalink to &quot;三、使用方法&quot;">​</a></h1><p>在 Cond 里主要有 3 个方法：</p><ul><li><code>sync.NewCond(l Locker)</code>: 新建一个 sync.Cond 变量，注意该函数需要一个 Locker 作为必填参数，这是因为在 <code>cond.Wait()</code> 中底层会涉及到 Locker 的锁操作</li><li><code>Cond.Wait()</code>: 阻塞等待被唤醒，调用 Wait 函数前<strong>需要先加锁</strong>；并且由于 Wait 函数被唤醒时存在虚假唤醒等情况，导致唤醒后发现，条件依旧不成立，因此需要使用 for 语句来循环地进行等待，直到条件成立为止</li><li><code>Cond.Signal()</code>: 只唤醒一个最先 Wait 的 goroutine，可以不用加锁</li><li><code>Cond.Broadcast()</code>: 唤醒所有 Wait 的 goroutine，可以不用加锁</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;fmt&quot;</span></span>
<span class="line"><span>	&quot;sync&quot;</span></span>
<span class="line"><span>	&quot;time&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	var mu sync.Mutex</span></span>
<span class="line"><span>	cond := sync.NewCond(&amp;mu)</span></span>
<span class="line"><span>	done := make(chan bool)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 启动一个goroutine等待条件</span></span>
<span class="line"><span>	go func() {</span></span>
<span class="line"><span>		mu.Lock()</span></span>
<span class="line"><span>		defer mu.Unlock()</span></span>
<span class="line"><span>		fmt.Println(&quot;Waiting for condition...&quot;)</span></span>
<span class="line"><span>		cond.Wait() // 等待条件变量被唤醒</span></span>
<span class="line"><span>		// Wait 内部会先调用 c.L.Unlock()，来先释放锁，如果调用方不先加锁的话，会报错</span></span>
<span class="line"><span>		fmt.Println(&quot;Condition received!&quot;)</span></span>
<span class="line"><span>		done &lt;- true</span></span>
<span class="line"><span>	}()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 模拟一些耗时的工作</span></span>
<span class="line"><span>	time.Sleep(2 * time.Second)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 在主goroutine中发送Signal信号，唤醒等待的goroutine</span></span>
<span class="line"><span>	fmt.Println(&quot;Sending signal...&quot;)</span></span>
<span class="line"><span>	cond.Signal() // 唤醒一个等待的goroutine</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 等待goroutine完成</span></span>
<span class="line"><span>	&lt;-done</span></span>
<span class="line"><span>	fmt.Println(&quot;Done&quot;)</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>Waiting for condition...</span></span>
<span class="line"><span>Sending signal...</span></span>
<span class="line"><span>Condition received!</span></span>
<span class="line"><span>Done</span></span></code></pre></div><p>在上述示例中，我们创建了一个互斥锁 mu 和一个 sync.Cond 变量 cond。然后，我们启动一个 goroutine 等待条件变量被唤醒，并在主 goroutine 中模拟一些耗时的工作后，通过 cond.Signal() 方法发送信号，唤醒等待的 goroutine。</p><p>一旦条件变量被唤醒，等待的 goroutine 会继续执行。当你运行这个示例时，你会看到输出中的等待和唤醒消息，以及最后的&quot;Done&quot;表示成功完成。</p><p>请注意，在使用 Signal 方法时，通常需要在互斥锁的保护下调用，以确保对条件变量的访问是线程安全的。</p>`,15),i=[o];function l(t,c,d,r,u,g){return a(),s("div",null,i)}const m=n(e,[["render",l]]);export{_ as __pageData,m as default};
