import{_ as s,c as a,o as n,a4 as p}from"./chunks/framework.4aTu-Nia.js";const m=JSON.parse('{"title":"一、go tool trace","description":"","frontmatter":{},"headers":[],"relativePath":"docs/02 技术/Golang/Go 面试/调度模型面试/Go 面试 | Go 如何查看运行时调度信息.md","filePath":"docs/02 技术/Golang/Go 面试/调度模型面试/Go 面试 | Go 如何查看运行时调度信息.md"}'),t={name:"docs/02 技术/Golang/Go 面试/调度模型面试/Go 面试 | Go 如何查看运行时调度信息.md"},e=p(`<p>有 2 种方式可以查看一个程序的调度 GMP 信息，分别是 go tool trace 和 GODEBUG</p><p>比如 trace.go 代码如下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;fmt&quot;</span></span>
<span class="line"><span>	&quot;os&quot;</span></span>
<span class="line"><span>	&quot;runtime/trace&quot;</span></span>
<span class="line"><span>	&quot;time&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	//创建trace文件</span></span>
<span class="line"><span>	f, err := os.Create(&quot;trace.out&quot;)</span></span>
<span class="line"><span>	if err != nil {</span></span>
<span class="line"><span>		panic(err)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	defer f.Close()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	//启动trace goroutine</span></span>
<span class="line"><span>	err = trace.Start(f)</span></span>
<span class="line"><span>	if err != nil {</span></span>
<span class="line"><span>		panic(err)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	defer trace.Stop()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	//main</span></span>
<span class="line"><span>	for i := 0; i &lt; 5; i++ {</span></span>
<span class="line"><span>		time.Sleep(time.Second)</span></span>
<span class="line"><span>		fmt.Println(&quot;Hello World&quot;)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre></div><h1 id="一、go-tool-trace" tabindex="-1">一、go tool trace <a class="header-anchor" href="#一、go-tool-trace" aria-label="Permalink to &quot;一、go tool trace&quot;">​</a></h1><p>启动可视化界面：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>go run trace.go</span></span>
<span class="line"><span>go tool trace trace.out</span></span>
<span class="line"><span>2022/04/22 10:44:11 Parsing trace...</span></span>
<span class="line"><span>2022/04/22 10:44:11 Splitting trace...</span></span>
<span class="line"><span>2022/04/22 10:44:11 Opening browser. Trace viewer is listening on http://127.0.0.1:35488</span></span></code></pre></div><p>打开 <code>http://127.0.0.1:35488</code> 查看可视化界面：</p><p><img src="https://cdn.jsdelivr.net/gh/caijinlin/imgcdn/image-20220422214355669.png#id=Eojyo&amp;originHeight=235&amp;originWidth=661&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt=""></p><p>点击 <code>view trace</code> 能够看见可视化的调度流程：</p><p><img src="https://cdn.jsdelivr.net/gh/caijinlin/imgcdn/image-20220422213604926.png#id=QygBY&amp;originHeight=335&amp;originWidth=1773&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt=""></p><p><img src="https://cdn.jsdelivr.net/gh/caijinlin/imgcdn/image-20220422210738598.png#id=gtM6a&amp;originHeight=170&amp;originWidth=1763&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt=""></p><p>一共有 2 个 G 在程序中，一个是特殊的 G0，是每个 M 必须有的一个初始化的 G，另外一个是 G1 main goroutine (执行 main 函数的协程)，在一段时间内处于可运行和运行的状态。</p><p><strong>2. 点击 Threads 那一行可视化的数据条，我们会看到 M 详细的信息</strong></p><p><img src="https://cdn.jsdelivr.net/gh/caijinlin/imgcdn/image-20220422211223494.png#id=CZ4MV&amp;originHeight=179&amp;originWidth=1606&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt=""></p><p>一共有 2 个 M 在程序中，一个是特殊的 M0，用于初始化使用，另外一个是用于执行 G1 的 M1</p><p><strong>3. 点击 Proc 那一行可视化的数据条，我们会看到 P 上正在运行 goroutine 详细的信息</strong></p><p>一共有 3 个 P 在程序中，分别是 P0、P1、P2</p><p><img src="https://cdn.jsdelivr.net/gh/caijinlin/imgcdn/image-20220422212719433.png#id=Eilnc&amp;originHeight=602&amp;originWidth=1786&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt=""></p><p>点击具体的 Goroutine 行为后可以看到其相关联的详细信息:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>Start：开始时间</span></span>
<span class="line"><span>Wall Duration：持续时间</span></span>
<span class="line"><span>Self Time：执行时间</span></span>
<span class="line"><span>Start Stack Trace：开始时的堆栈信息</span></span>
<span class="line"><span>End Stack Trace：结束时的堆栈信息</span></span>
<span class="line"><span>Incoming flow：输入流</span></span>
<span class="line"><span>Outgoing flow：输出流</span></span>
<span class="line"><span>Preceding events：之前的事件</span></span>
<span class="line"><span>Following events：之后的事件</span></span>
<span class="line"><span>All connected：所有连接的事件</span></span></code></pre></div><h1 id="二、-godebug" tabindex="-1">二、 GODEBUG <a class="header-anchor" href="#二、-godebug" aria-label="Permalink to &quot;二、 GODEBUG&quot;">​</a></h1><p>GODEBUG 变量可以控制运行时内的调试变量。查看调度器信息，将会使用如下两个参数：</p><ul><li>schedtrace：设置 <code>schedtrace=X</code> 参数可以使运行时在每 X 毫秒发出一行调度器的摘要信息到标准 err 输出中。</li><li>scheddetail：设置 <code>schedtrace=X</code> 和 <code>scheddetail=1</code> 可以使运行时在每 X 毫秒发出一次详细的多行信息，信息内容主要包括调度程序、处理器、OS 线程 和 Goroutine 的状态。</li></ul><p><strong>查看基本信息</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>go build trace.go</span></span>
<span class="line"><span>GODEBUG=schedtrace=1000 ./trace</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>SCHED 0ms: gomaxprocs=8 idleprocs=6 threads=4 spinningthreads=1 idlethreads=0 runqueue=0 [1 0 0 0 0 0 0 0]</span></span>
<span class="line"><span>Hello World</span></span>
<span class="line"><span>SCHED 1010ms: gomaxprocs=8 idleprocs=8 threads=4 spinningthreads=0 idlethreads=2 runqueue=0 [0 0 0 0 0 0 0 0]</span></span>
<span class="line"><span>Hello World</span></span>
<span class="line"><span>SCHED 2014ms: gomaxprocs=8 idleprocs=8 threads=4 spinningthreads=0 idlethreads=2 runqueue=0 [0 0 0 0 0 0 0 0]</span></span>
<span class="line"><span>Hello World</span></span>
<span class="line"><span>SCHED 3024ms: gomaxprocs=8 idleprocs=8 threads=4 spinningthreads=0 idlethreads=2 runqueue=0 [0 0 0 0 0 0 0 0]</span></span>
<span class="line"><span>Hello World</span></span>
<span class="line"><span>SCHED 4027ms: gomaxprocs=8 idleprocs=8 threads=4 spinningthreads=0 idlethreads=2 runqueue=0 [0 0 0 0 0 0 0 0]</span></span>
<span class="line"><span>Hello World</span></span>
<span class="line"><span>SCHED 5029ms: gomaxprocs=8 idleprocs=7 threads=4 spinningthreads=0 idlethreads=2 runqueue=0 [0 0 0 0 0 0 0 0]</span></span></code></pre></div><p>sched：每一行都代表调度器的调试信息，后面提示的毫秒数表示启动到现在的运行时间，输出的时间间隔受 <code>schedtrace</code> 的值影响。</p><p>gomaxprocs：当前的 CPU 核心数（GOMAXPROCS 的当前值）。</p><p>idleprocs：空闲的处理器数量，后面的数字表示当前的空闲数量。</p><p>threads：OS 线程数量，后面的数字表示当前正在运行的线程数量。</p><p>spinningthreads：自旋状态的 OS 线程数量。</p><p>idlethreads：空闲的线程数量。</p><p>runqueue：全局队列中中的 Goroutine 数量，而后面的[0 0 0 0 0 0 0 0] 则分别代表这 8 个 P 的本地队列正在运行的 Goroutine 数量。</p><p><strong>查看详细信息</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>go build trace.go</span></span>
<span class="line"><span>GODEBUG=scheddetail=1,schedtrace=1000 ./trace</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>SCHED 0ms: gomaxprocs=8 idleprocs=6 threads=4 spinningthreads=1 idlethreads=0 runqueue=0 gcwaiting=0 nmidlelocked=0 stopwait=0 sysmonwait=0</span></span>
<span class="line"><span>  P0: status=0 schedtick=0 syscalltick=0 m=-1 runqsize=1 gfreecnt=0 timerslen=0</span></span>
<span class="line"><span>  P1: status=1 schedtick=0 syscalltick=0 m=2 runqsize=0 gfreecnt=0 timerslen=0</span></span>
<span class="line"><span>  P2: status=0 schedtick=0 syscalltick=0 m=-1 runqsize=0 gfreecnt=0 timerslen=0</span></span>
<span class="line"><span>  P3: status=0 schedtick=0 syscalltick=0 m=-1 runqsize=0 gfreecnt=0 timerslen=0</span></span>
<span class="line"><span>  P4: status=0 schedtick=0 syscalltick=0 m=-1 runqsize=0 gfreecnt=0 timerslen=0</span></span>
<span class="line"><span>  P5: status=0 schedtick=0 syscalltick=0 m=-1 runqsize=0 gfreecnt=0 timerslen=0</span></span>
<span class="line"><span>  P6: status=0 schedtick=0 syscalltick=0 m=-1 runqsize=0 gfreecnt=0 timerslen=0</span></span>
<span class="line"><span>  P7: status=0 schedtick=0 syscalltick=0 m=-1 runqsize=0 gfreecnt=0 timerslen=0</span></span>
<span class="line"><span>  M3: p=0 curg=-1 mallocing=0 throwing=0 preemptoff= locks=1 dying=0 spinning=false blocked=false lockedg=-1</span></span>
<span class="line"><span>  M2: p=1 curg=-1 mallocing=0 throwing=0 preemptoff= locks=2 dying=0 spinning=false blocked=false lockedg=-1</span></span>
<span class="line"><span>  M1: p=-1 curg=-1 mallocing=0 throwing=0 preemptoff= locks=2 dying=0 spinning=false blocked=false lockedg=-1</span></span>
<span class="line"><span>  M0: p=-1 curg=-1 mallocing=0 throwing=0 preemptoff= locks=1 dying=0 spinning=false blocked=false lockedg=1</span></span>
<span class="line"><span>  G1: status=1(chan receive) m=-1 lockedm=0</span></span>
<span class="line"><span>  G2: status=1() m=-1 lockedm=-1</span></span>
<span class="line"><span>  G3: status=1() m=-1 lockedm=-1</span></span>
<span class="line"><span>  G4: status=4(GC scavenge wait) m=-1 lockedm=-1</span></span></code></pre></div><p>G</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>status：G 的运行状态。</span></span>
<span class="line"><span>m：隶属哪一个 M。</span></span>
<span class="line"><span>lockedm：是否有锁定 M。</span></span></code></pre></div><p>G 的运行状态共涉及如下 9 种状态：</p><table><thead><tr><th>状态</th><th>值</th><th>含义</th></tr></thead><tbody><tr><td>_Gidle</td><td>0</td><td>刚刚被分配，还没有进行初始化。</td></tr><tr><td>_Grunnable</td><td>1</td><td>已经在运行队列中，还没有执行用户代码。</td></tr><tr><td>_Grunning</td><td>2</td><td>不在运行队列里中，已经可以执行用户代码，此时已经分配了 M 和 P。</td></tr><tr><td>_Gsyscall</td><td>3</td><td>正在执行系统调用，此时分配了 M。</td></tr><tr><td>_Gwaiting</td><td>4</td><td>在运行时被阻止，没有执行用户代码，也不在运行队列中，此时它正在某处阻塞等待中。</td></tr><tr><td>_Gmoribund_unused</td><td>5</td><td>尚未使用，但是在 gdb 中进行了硬编码。</td></tr><tr><td>_Gdead</td><td>6</td><td>尚未使用，这个状态可能是刚退出或是刚被初始化，此时它并没有执行用户代码，有可能有也有可能没有分配堆栈。</td></tr><tr><td>_Genqueue_unused</td><td>7</td><td>尚未使用。</td></tr><tr><td>_Gcopystack</td><td>8</td><td>正在复制堆栈，并没有执行用户代码，也不在运行队列中。</td></tr></tbody></table><p>M</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>p：隶属哪一个 P。</span></span>
<span class="line"><span>curg：当前正在使用哪个 G。</span></span>
<span class="line"><span>runqsize：运行队列中的 G 数量。</span></span>
<span class="line"><span>gfreecnt：可用的G（状态为 Gdead）。</span></span>
<span class="line"><span>mallocing：是否正在分配内存。</span></span>
<span class="line"><span>throwing：是否抛出异常。</span></span>
<span class="line"><span>preemptoff：不等于空字符串的话，保持 curg 在这个 m 上运行。</span></span></code></pre></div><p>P</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>status：P 的运行状态。</span></span>
<span class="line"><span>schedtick：P 的调度次数。</span></span>
<span class="line"><span>syscalltick：P 的系统调用次数。</span></span>
<span class="line"><span>m：隶属哪一个 M。</span></span>
<span class="line"><span>runqsize：运行队列中的 G 数量。</span></span>
<span class="line"><span>gfreecnt：可用的G（状态为 Gdead）</span></span></code></pre></div><table><thead><tr><th>状态</th><th>值</th><th>含义</th></tr></thead><tbody><tr><td>_Pidle</td><td>0</td><td>刚刚被分配，还没有进行进行初始化。</td></tr><tr><td>_Prunning</td><td>1</td><td>当 M 与 P 绑定调用 acquirep 时，P 的状态会改变为 _Prunning。</td></tr><tr><td>_Psyscall</td><td>2</td><td>正在执行系统调用。</td></tr><tr><td>_Pgcstop</td><td>3</td><td>暂停运行，此时系统正在进行 GC，直至 GC 结束后才会转变到下一个状态阶段。</td></tr><tr><td>_Pdead</td><td>4</td><td>废弃，不再使用。</td></tr></tbody></table>`,45),i=[e];function l(c,d,o,r,g,h){return n(),a("div",null,i)}const k=s(t,[["render",l]]);export{m as __pageData,k as default};
