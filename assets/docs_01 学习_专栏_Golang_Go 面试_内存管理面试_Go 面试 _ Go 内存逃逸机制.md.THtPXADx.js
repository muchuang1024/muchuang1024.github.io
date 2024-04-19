import{_ as a,c as s,o as n,a4 as p}from"./chunks/framework.4aTu-Nia.js";const m=JSON.parse('{"title":"一、概念","description":"","frontmatter":{},"headers":[],"relativePath":"docs/01 学习/专栏/Golang/Go 面试/内存管理面试/Go 面试 | Go 内存逃逸机制.md","filePath":"docs/01 学习/专栏/Golang/Go 面试/内存管理面试/Go 面试 | Go 内存逃逸机制.md"}'),e={name:"docs/01 学习/专栏/Golang/Go 面试/内存管理面试/Go 面试 | Go 内存逃逸机制.md"},i=p(`<h1 id="一、概念" tabindex="-1">一、概念 <a class="header-anchor" href="#一、概念" aria-label="Permalink to &quot;一、概念&quot;">​</a></h1><p>在一段程序中，每一个函数都会有自己的内存区域存放自己的局部变量、返回地址等，这些内存会由编译器在栈中进行分配，每一个函数都会分配一个栈桢，在函数运行结束后进行销毁，但是有些变量我们想在函数运行结束后仍然使用它，那么就需要把这个变量在堆上分配，这种从&quot;栈&quot;上逃逸到&quot;堆&quot;上的现象就成为内存逃逸。</p><p>在栈上分配的地址，一般由系统申请和释放，不会有额外性能的开销，比如函数的入参、局部变量、返回值等。在堆上分配的内存，如果要回收掉，需要进行 GC，那么 GC 一定会带来额外的性能开销。编程语言不断优化 GC 算法，主要目的都是为了减少 GC 带来的额外性能开销，变量一旦逃逸会导致性能开销变大。</p><h1 id="二、逃逸机制" tabindex="-1">二、逃逸机制 <a class="header-anchor" href="#二、逃逸机制" aria-label="Permalink to &quot;二、逃逸机制&quot;">​</a></h1><p>编译器会根据变量是否被外部引用来决定是否逃逸：</p><ol><li>如果函数外部没有引用，则优先放到栈中；</li><li>如果函数外部存在引用，则必定放到堆中;</li><li>如果栈上放不下，则必定放到堆上;</li></ol><p>逃逸分析也就是由编译器决定哪些变量放在栈，哪些放在堆中，通过编译参数<code>-gcflag=-m</code>可以查看编译过程中的逃逸分析，发生逃逸的几种场景如下：</p><h2 id="一-指针逃逸" tabindex="-1">一）指针逃逸 <a class="header-anchor" href="#一-指针逃逸" aria-label="Permalink to &quot;一）指针逃逸&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func escape1() *int {</span></span>
<span class="line"><span>	var a int = 1</span></span>
<span class="line"><span>	return &amp;a</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	escape1()</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>通过<code>go build -gcflags=-m main.go</code>查看逃逸情况：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>./main.go:4:6: moved to heap: a</span></span></code></pre></div><p>函数返回值为局部变量的指针，函数虽然退出了，但是因为指针的存在，指向的内存不能随着函数结束而回收，因此只能分配在堆上。</p><h2 id="二-栈空间不足" tabindex="-1">二）栈空间不足 <a class="header-anchor" href="#二-栈空间不足" aria-label="Permalink to &quot;二）栈空间不足&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func escape2() {</span></span>
<span class="line"><span>	s := make([]int, 0, 10000)</span></span>
<span class="line"><span>	for index, _ := range s {</span></span>
<span class="line"><span>		s[index] = index</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	escape2()</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>通过<code>go build -gcflags=-m main.go</code>查看逃逸情况：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>./main.go:4:11: make([]int, 10000, 10000) escapes to heap</span></span></code></pre></div><p>当栈空间足够时，不会发生逃逸，但是当变量过大时，已经完全超过栈空间的大小时，将会发生逃逸到堆上分配内存。局部变量 s 占用内存过大，编译器会将其分配到堆上</p><h2 id="三-变量大小不确定" tabindex="-1">三）变量大小不确定 <a class="header-anchor" href="#三-变量大小不确定" aria-label="Permalink to &quot;三）变量大小不确定&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func escape3() {</span></span>
<span class="line"><span>	number := 10</span></span>
<span class="line"><span>	s := make([]int, number) // 编译期间无法确定slice的长度</span></span>
<span class="line"><span>	for i := 0; i &lt; len(s); i++ {</span></span>
<span class="line"><span>		s[i] = i</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	escape3()</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>编译期间无法确定 slice 的长度，这种情况为了保证内存的安全，编译器也会触发逃逸，在堆上进行分配内存。直接<code>s := make([]int, 10)</code>不会发生逃逸</p><h2 id="四-动态类型" tabindex="-1">四）动态类型 <a class="header-anchor" href="#四-动态类型" aria-label="Permalink to &quot;四）动态类型&quot;">​</a></h2><p>动态类型就是编译期间不确定参数的类型、参数的长度也不确定的情况下就会发生逃逸</p><p>空接口 interface{} 可以表示任意的类型，如果函数参数为 interface{}，编译期间很难确定其参数的具体类型，也会发生逃逸。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import &quot;fmt&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func escape4() {</span></span>
<span class="line"><span>	fmt.Println(1111)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	escape4()</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>通过<code>go build -gcflags=-m main.go</code>查看逃逸情况：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>./main.go:6:14: 1111 escapes to heap</span></span></code></pre></div><p>fmt.Println(a ...interface{})函数参数为 interface，编译器不确定参数的类型，会将变量分配到堆上</p><h2 id="五-闭包引用对象" tabindex="-1">五）闭包引用对象 <a class="header-anchor" href="#五-闭包引用对象" aria-label="Permalink to &quot;五）闭包引用对象&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func escape5() func() int {</span></span>
<span class="line"><span>	var i int = 1</span></span>
<span class="line"><span>	return func() int {</span></span>
<span class="line"><span>		i++</span></span>
<span class="line"><span>		return i</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	escape5()</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>通过<code>go build -gcflags=-m main.go</code>查看逃逸情况：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>./main.go:4:6: moved to heap: i</span></span></code></pre></div><p>闭包函数中局部变量 i 在后续函数是继续使用的，编译器将其分配到堆上</p><h1 id="三、总结" tabindex="-1">三、总结 <a class="header-anchor" href="#三、总结" aria-label="Permalink to &quot;三、总结&quot;">​</a></h1><p>1、栈上分配内存比在堆中分配内存效率更高</p><p>2、栈上分配的内存不需要 GC 处理，而堆需要</p><p>3、逃逸分析目的是决定内分配地址是栈还是堆</p><p>4、逃逸分析在编译阶段完成</p><p>5、只要是指针变量都会在堆上分配，所以对于小变量我们还是使用传值（而不是传指针），效率更高一点</p>`,38),l=[i];function t(c,o,d,h,r,u){return n(),s("div",null,l)}const b=a(e,[["render",t]]);export{m as __pageData,b as default};
