import{_ as a,c as n,o as s,a4 as p}from"./chunks/framework.4aTu-Nia.js";const _=JSON.parse('{"title":"一、什么是 WorkStealing","description":"","frontmatter":{},"headers":[],"relativePath":"docs/01 学习/专栏/Golang/Go 面试/调度模型面试/Go 面试 | Go work stealing 机制.md","filePath":"docs/01 学习/专栏/Golang/Go 面试/调度模型面试/Go 面试 | Go work stealing 机制.md"}'),e={name:"docs/01 学习/专栏/Golang/Go 面试/调度模型面试/Go 面试 | Go work stealing 机制.md"},t=p(`<h1 id="一、什么是-workstealing" tabindex="-1">一、什么是 WorkStealing <a class="header-anchor" href="#一、什么是-workstealing" aria-label="Permalink to &quot;一、什么是 WorkStealing&quot;">​</a></h1><p>Go 语言的 Work Stealing 机制是一种用于调度协程（Goroutines）的策略，有助于充分利用多核 CPU，提高并发性能，降低锁竞争，从而使 Go 程序更高效地运行</p><p>Work Stealing 机制的核心思想：每个操作系统线程（M）都有一个本地任务队列，它会尽可能地先执行自己队列中的协程。当某个 M 的 P 队列为空，而其他 P 仍有任务时，该 M 会尝试从其他 P 中“偷”一些协程来执行，以实现负载均衡</p><h1 id="二、work-stealing-算法" tabindex="-1">二、Work Stealing 算法 <a class="header-anchor" href="#二、work-stealing-算法" aria-label="Permalink to &quot;二、Work Stealing 算法&quot;">​</a></h1><p><img src="https://static.xiaobot.net/file/2023-11-12/263968/e3e827558ab24a16dcd73c05480a53e7.png" alt=""></p><p>当从本线程 M 从绑定 P 本地 队列、全局 G 队列、Netpoller 都找不到可执行的 G，会从其它 P 里窃取 G 并放到当前 P 上面</p><p>1、如果全局队列有 G，从全局队列窃取的 G 数量：N = min(len(GRQ)/GOMAXPROCS + 1, len(GRQ/2)) （根据 GOMAXPROCS 数量负载均衡）</p><p>2、如果 Netpoller 有 G（网络 IO 被阻塞的 G），从 Netpoller 窃取的 G 数量：N = 1</p><p>3、如果从其它 P 里窃取 G，从其它 P 窃取的 G 数量：N = len(LRQ)/2（平分负载均衡）</p><p>4、如果尝试多次一直找不到需要运行的 goroutine 则进入睡眠状态，等待被其它工作线程唤醒</p><p>从其它 P 窃取 G 的源码见 runtime/proc.go stealWork 函数，窃取流程如下：</p><p>1、选择要窃取的 P</p><p>2、从 P 中偷走一半 G</p><h2 id="选择要窃取的-p" tabindex="-1">选择要窃取的 P <a class="header-anchor" href="#选择要窃取的-p" aria-label="Permalink to &quot;选择要窃取的 P&quot;">​</a></h2><p>窃取的实质就是遍历所有 P，查看其运行队列是否有 goroutine，如果有，则取其一半到当前工作线程的运行队列</p><p>为了保证公平性，遍历 P 时并不是按照数组下标顺序访问 P，而是使用了一种伪随机的方式遍历 allp 中的每个 P，防止每次遍历时使用同样的顺序访问 allp 中的元素</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>offset := uint32(random()) % nprocs</span></span>
<span class="line"><span>coprime := 随机选取一个小于nprocs且与nprocs互质的数</span></span>
<span class="line"><span>const stealTries = 4 // 最多重试4次</span></span>
<span class="line"><span>for i := 0; i &lt; stealTries; i++ {</span></span>
<span class="line"><span>  // 随机访问所有 P</span></span>
<span class="line"><span>	for i := 0; i &lt; nprocs; i++ {</span></span>
<span class="line"><span>  	  p := allp[offset]</span></span>
<span class="line"><span>    	从p的运行队列偷取goroutine</span></span>
<span class="line"><span>	    if 偷取成功 {</span></span>
<span class="line"><span>        break</span></span>
<span class="line"><span>   	 }</span></span>
<span class="line"><span>    	offset += coprime</span></span>
<span class="line"><span>	    offset = offset % nprocs</span></span>
<span class="line"><span>	 }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>可以看到只要随机数不一样，遍历 P 的顺序也不一样，但可以保证经过 nprocs 次循环，每个 P 都会被访问到</p><h2 id="从-p-中偷走一半-g" tabindex="-1">从 P 中偷走一半 G <a class="header-anchor" href="#从-p-中偷走一半-g" aria-label="Permalink to &quot;从 P 中偷走一半 G&quot;">​</a></h2><p>挑选出盗取的对象 P 之后，则调用 runtime/proc.go 函数 runqsteal 盗取 P 的运行队列中的 goroutine，runqsteal 函数再调用 runqgrap 从 P 的本地队列尾部批量偷走一半的 G</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func runqgrab(_p_ *p, batch *[256]guintptr, batchHead uint32, stealRunNextG bool) uint32 {</span></span>
<span class="line"><span>	for {</span></span>
<span class="line"><span>		h := atomic.LoadAcq(&amp;_p_.runqhead) // load-acquire, synchronize with other consumers</span></span>
<span class="line"><span>		t := atomic.LoadAcq(&amp;_p_.runqtail) // load-acquire, synchronize with the producer</span></span>
<span class="line"><span>		n := t - h        //计算队列中有多少个goroutine</span></span>
<span class="line"><span>		n = n - n/2     //取队列中goroutine个数的一半</span></span>
<span class="line"><span>		if n == 0 {</span></span>
<span class="line"><span>			......</span></span>
<span class="line"><span>			return ......</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>		return n</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre></div><h1 id="三、-work-stealing-的优点" tabindex="-1">三、 Work Stealing 的优点 <a class="header-anchor" href="#三、-work-stealing-的优点" aria-label="Permalink to &quot;三、 Work Stealing 的优点&quot;">​</a></h1><p>1、提高线程利用率：当线程 M 绑定的 P ⽆可运⾏的 G 时，尝试从其他 P 偷取 G ，减少空转</p><p>2、减少锁竞争：每个 M 都有自己的本地队列，避免了每次多线程访问全局队列时的锁竞争，提高了性能。</p><p>3、自动负载均衡：通过偷取其他 M 的任务，Work Stealing 可以自动平衡不同线程的工作负载，提高系统整体的并发性能。</p>`,25),l=[t];function o(i,r,c,d,h,u){return s(),n("div",null,l)}const G=a(e,[["render",o]]);export{_ as __pageData,G as default};
