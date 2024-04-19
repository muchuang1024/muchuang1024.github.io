import{_ as n,c as a,o as s,a4 as p}from"./chunks/framework.4aTu-Nia.js";const b=JSON.parse('{"title":"一、基本概念","description":"","frontmatter":{},"headers":[],"relativePath":"docs/01 学习/课程/Golang/Go 源码/Go 源码 | Go channel 的底层实现原理.md","filePath":"docs/01 学习/课程/Golang/Go 源码/Go 源码 | Go channel 的底层实现原理.md"}'),e={name:"docs/01 学习/课程/Golang/Go 源码/Go 源码 | Go channel 的底层实现原理.md"},l=p(`<h1 id="一、基本概念" tabindex="-1">一、基本概念 <a class="header-anchor" href="#一、基本概念" aria-label="Permalink to &quot;一、基本概念&quot;">​</a></h1><p>Go 中的 channel 是一个队列，遵循先进先出的原则，负责协程之间的通信（Go 语言提倡不要通过共享内存来通信，而要通过通信来实现内存共享，CSP(Communicating Sequential Process)并发模型，就是通过 goroutine 和 channel 来实现的）</p><p>使用场景：</p><p>1、停止信号监听</p><p>2、定时任务</p><p>3、生产方和消费方解耦</p><p>4、控制并发数</p><h1 id="二、底层数据结构" tabindex="-1">二、底层数据结构 <a class="header-anchor" href="#二、底层数据结构" aria-label="Permalink to &quot;二、底层数据结构&quot;">​</a></h1><p>通过 var 声明或者 make 函数创建的 channel 变量是一个存储在函数栈帧上的指针，占用 8 个字节，指向堆上的 hchan 结构体</p><p>源码包中<code>src/runtime/chan.go</code>定义了 hchan 的数据结构：</p><p><img src="https://cdn.jsdelivr.net/gh/caijinlin/imgcdn/hchan.png#id=uCG0j&amp;originHeight=773&amp;originWidth=1080&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt=""></p><h2 id="一-hchan-结构体" tabindex="-1">一）hchan 结构体 <a class="header-anchor" href="#一-hchan-结构体" aria-label="Permalink to &quot;一）hchan 结构体&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>type hchan struct {</span></span>
<span class="line"><span> closed   uint32   // channel是否关闭的标志</span></span>
<span class="line"><span> elemtype *_type   // channel中的元素类型</span></span>
<span class="line"><span></span></span>
<span class="line"><span> // channel分为无缓冲和有缓冲两种。</span></span>
<span class="line"><span> // 对于有缓冲的channel存储数据，使用了 ring buffer（环形缓冲区) 来缓存写入的数据，本质是循环数组</span></span>
<span class="line"><span> // 为啥是循环数组？普通数组不行吗，普通数组容量固定更适合指定的空间，弹出元素时，普通数组需要全部都前移</span></span>
<span class="line"><span> // 当下标超过数组容量后会回到第一个位置，所以需要有两个字段记录当前读和写的下标位置</span></span>
<span class="line"><span> buf      unsafe.Pointer // 指向底层循环数组的指针（环形缓冲区）</span></span>
<span class="line"><span> qcount   uint           // 循环数组中的元素数量</span></span>
<span class="line"><span> dataqsiz uint           // 循环数组的长度</span></span>
<span class="line"><span> elemsize uint16 				 // 元素的大小</span></span>
<span class="line"><span> sendx    uint           // 下一次写下标的位置</span></span>
<span class="line"><span> recvx    uint           // 下一次读下标的位置</span></span>
<span class="line"><span></span></span>
<span class="line"><span> // 尝试读取channel或向channel写入数据而被阻塞的goroutine</span></span>
<span class="line"><span> recvq    waitq  // 读等待队列</span></span>
<span class="line"><span> sendq    waitq  // 写等待队列</span></span>
<span class="line"><span></span></span>
<span class="line"><span> lock mutex //互斥锁，保证读写channel时不存在并发竞争问题</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="二-等待队列" tabindex="-1">二）等待队列 <a class="header-anchor" href="#二-等待队列" aria-label="Permalink to &quot;二）等待队列&quot;">​</a></h2><p>双向链表，包含一个头结点和一个尾结点，每个节点是一个 sudog 结构体变量，记录哪个协程在等待，等待的是哪个 channel，等待发送/接收的数据在哪里</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>type waitq struct {</span></span>
<span class="line"><span>   first *sudog</span></span>
<span class="line"><span>   last  *sudog</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>type sudog struct {</span></span>
<span class="line"><span>	g *g</span></span>
<span class="line"><span>	next *sudog</span></span>
<span class="line"><span>	prev *sudog</span></span>
<span class="line"><span>	elem unsafe.Pointer</span></span>
<span class="line"><span>	c        *hchan</span></span>
<span class="line"><span>	...</span></span>
<span class="line"><span>}</span></span></code></pre></div><h1 id="三、操作" tabindex="-1">三、操作 <a class="header-anchor" href="#三、操作" aria-label="Permalink to &quot;三、操作&quot;">​</a></h1><h2 id="一-创建" tabindex="-1">一）创建 <a class="header-anchor" href="#一-创建" aria-label="Permalink to &quot;一）创建&quot;">​</a></h2><p>1、创建 channel 有两种，一种是带缓冲的 channel，一种是不带缓冲的 channel</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 带缓冲</span></span>
<span class="line"><span>ch := make(chan int, 3)</span></span>
<span class="line"><span>// 不带缓冲</span></span>
<span class="line"><span>ch := make(chan int)</span></span></code></pre></div><p>2、使用 <code>make(chan T, cap)</code> 来创建 channel，make 语法会在编译时，转换为 <code>makechan64</code> 和 <code>makechan</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func makechan64(t *chantype, size int64) *hchan {</span></span>
<span class="line"><span>	if int64(int(size)) != size {</span></span>
<span class="line"><span>		panic(plainError(&quot;makechan: size out of range&quot;))</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	return makechan(t, int(size))</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>3、创建时的策略</p><table><thead><tr><th>Channel 类型</th><th>内存分配策略</th></tr></thead><tbody><tr><td>无缓冲 Channel</td><td>仅为<code>hchan</code>结构本身分配内存，因为无缓冲 Channel 不用于存储数据。</td></tr><tr><td>有缓冲 Channel，元素不包含指针</td><td>为<code>hchan</code>结构和底层数组分配一段连续的内存地址，提高内存访问效率。</td></tr><tr><td>有缓冲 Channel，元素包含指针</td><td>为<code>hchan</code>结构和底层数组分配不同的内存地址，以更好地处理含有指针的元素（垃圾回收）。</td></tr></tbody></table><h2 id="二-发送" tabindex="-1">二）发送 <a class="header-anchor" href="#二-发送" aria-label="Permalink to &quot;二）发送&quot;">​</a></h2><p>1、发送操作</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>ch &lt;- 10</span></span></code></pre></div><p>2、发送操作，编译时转换为<code>runtime.chansend</code>函数</p><p>阻塞式：调用 chansend 函数，并且 block=true</p><p>非阻塞式：调用 chansend 函数，并且 block=false</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func chansend(c *hchan, ep unsafe.Pointer, block bool, callerpc uintptr) bool</span></span></code></pre></div><p>向 channel 中发送数据时大概分为两大块：检查和数据发送，数据发送流程如下：</p><p>如果 channel 的读等待队列存在接收者 goroutine，将数据<strong>直接发送</strong>给第一个等待的 goroutine， <strong>唤醒接收的 goroutine</strong></p><p>如果 channel 的读等待队列不存在接收者 goroutine</p><ul><li>如果循环数组 buf 未满，那么将会把数据发送到循环数组 buf 的队尾</li><li>如果循环数组 buf 已满，这个时候就会走阻塞发送的流程，将当前 goroutine 加入写等待队列，并<strong>挂起等待唤醒</strong></li></ul><h2 id="三-接收" tabindex="-1">三）接收 <a class="header-anchor" href="#三-接收" aria-label="Permalink to &quot;三）接收&quot;">​</a></h2><p>1、接收操作</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;ch</span></span>
<span class="line"><span></span></span>
<span class="line"><span>v := &lt;ch</span></span>
<span class="line"><span></span></span>
<span class="line"><span>v, ok := &lt;ch</span></span></code></pre></div><p>2、接收操作，编译时转换为<code>runtime.chanrecv</code>函数</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func chanrecv(c *hchan, ep unsafe.Pointer, block bool) (selected, received bool)</span></span></code></pre></div><p>阻塞式：调用 chanrecv 函数，并且 block=true</p><p>非阻塞式：调用 chanrecv 函数，并且 block=false</p><p>向 channel 中接收数据时大概分为两大块，检查和数据发送，而数据接收流程如下：</p><p>如果 channel 的写等待队列存在发送者 goroutine</p><ul><li>如果是无缓冲 channel，<strong>直接</strong>从第一个发送者 goroutine 那里把数据拷贝给接收变量，<strong>唤醒发送的 goroutine</strong></li><li>如果是有缓冲 channel（已满），将循环数组 buf 的队首元素拷贝给接收变量，将第一个发送者 goroutine 的数据拷贝到 buf 循环数组队尾，<strong>唤醒发送的 goroutine</strong></li></ul><p>如果 channel 的写等待队列不存在发送者 goroutine</p><ul><li>如果循环数组 buf 非空，将循环数组 buf 的队首元素拷贝给接收变量</li><li>如果循环数组 buf 为空，这个时候就会走阻塞接收的流程，将当前 goroutine 加入读等待队列，并<strong>挂起等待唤醒</strong></li></ul><h2 id="四-关闭" tabindex="-1">四）关闭 <a class="header-anchor" href="#四-关闭" aria-label="Permalink to &quot;四）关闭&quot;">​</a></h2><p>1、关闭操作</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>close(ch)</span></span></code></pre></div><p>2、调用 close 函数，编译时转换为<code>runtime.closechan</code>函数</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func closechan(c *hchan)</span></span></code></pre></div><h1 id="四、案例分析" tabindex="-1">四、案例分析 <a class="header-anchor" href="#四、案例分析" aria-label="Permalink to &quot;四、案例分析&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;fmt&quot;</span></span>
<span class="line"><span>	&quot;time&quot;</span></span>
<span class="line"><span>	&quot;unsafe&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>  // ch是长度为4的带缓冲的channel</span></span>
<span class="line"><span>  // 初始hchan结构体重的buf为空，sendx和recvx均为0</span></span>
<span class="line"><span>	ch := make(chan string, 4)</span></span>
<span class="line"><span>	fmt.Println(ch, unsafe.Sizeof(ch))</span></span>
<span class="line"><span>	go sendTask(ch)</span></span>
<span class="line"><span>	go receiveTask(ch)</span></span>
<span class="line"><span>	time.Sleep(1 * time.Second)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// G1是发送者</span></span>
<span class="line"><span>// 当G1向ch里发送数据时，首先会对buf加锁，然后将task存储的数据copy到buf中，然后sendx++，然后释放对buf的锁</span></span>
<span class="line"><span>func sendTask(ch chan string) {</span></span>
<span class="line"><span>	taskList := []string{&quot;this&quot;, &quot;is&quot;, &quot;a&quot;, &quot;demo&quot;}</span></span>
<span class="line"><span>	for _, task := range taskList {</span></span>
<span class="line"><span>		ch &lt;- task //发送任务到channel</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// G2是接收者</span></span>
<span class="line"><span>// 当G2消费ch的时候，会首先对buf加锁，然后将buf中的数据copy到task变量对应的内存里，然后recvx++,并释放锁</span></span>
<span class="line"><span>func receiveTask(ch chan string) {</span></span>
<span class="line"><span>	for {</span></span>
<span class="line"><span>		task := &lt;-ch                  //接收任务</span></span>
<span class="line"><span>		fmt.Println(&quot;received&quot;, task) //处理任务</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>总结 hchan 结构体的主要组成部分有四个：</p><ul><li>用来保存 goroutine 之间传递数据的循环数组：buf</li><li>用来记录此循环数组当前发送或接收数据的下标值：sendx 和 recvx</li><li>用于保存向该 chan 发送和从该 chan 接收数据被阻塞的 goroutine 队列： sendq 和 recvq</li><li>保证 channel 写入和读取数据时线程安全的锁：lock</li></ul>`,56),t=[l];function c(i,o,h,d,r,u){return s(),a("div",null,t)}const m=n(e,[["render",c]]);export{b as __pageData,m as default};
