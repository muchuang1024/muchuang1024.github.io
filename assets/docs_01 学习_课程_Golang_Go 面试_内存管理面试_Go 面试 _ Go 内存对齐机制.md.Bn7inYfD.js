import{_ as n,c as a,o as s,a4 as p}from"./chunks/framework.4aTu-Nia.js";const g=JSON.parse('{"title":"一、什么是内存对齐","description":"","frontmatter":{},"headers":[],"relativePath":"docs/01 学习/课程/Golang/Go 面试/内存管理面试/Go 面试 | Go 内存对齐机制.md","filePath":"docs/01 学习/课程/Golang/Go 面试/内存管理面试/Go 面试 | Go 内存对齐机制.md"}'),i={name:"docs/01 学习/课程/Golang/Go 面试/内存管理面试/Go 面试 | Go 内存对齐机制.md"},t=p(`<h1 id="一、什么是内存对齐" tabindex="-1">一、什么是内存对齐 <a class="header-anchor" href="#一、什么是内存对齐" aria-label="Permalink to &quot;一、什么是内存对齐&quot;">​</a></h1><p>Go 语言内存对齐机制是为了优化内存访问和提高性能而设计的。为了能让 CPU 可以更快的存取到各个字段，Go 编译器会帮你把 struct 结构体做数据的对齐。所谓的数据对齐，是指内存地址是所存储数据大小（按字节为单位）的整数倍，以便 CPU 可以一次将该数据从内存中读取出来。 编译器通过在结构体的各个字段之间填充一些空白已达到对齐的目的。</p><h1 id="二、内存对齐系数" tabindex="-1">二、内存对齐系数 <a class="header-anchor" href="#二、内存对齐系数" aria-label="Permalink to &quot;二、内存对齐系数&quot;">​</a></h1><p>不同硬件平台占用的大小和对齐值都可能是不一样的，每个特定平台上的编译器都有自己的默认&quot;对齐系数&quot;，32 位系统对齐系数是 4，64 位系统对齐系数是 8</p><p>不同类型的对齐系数也可能不一样，使用<code>Go</code>语言中的<code>unsafe.Alignof</code>函数可以返回相应类型的对齐系数，对齐系数都符合<code>2^n</code>这个规律，最大也不会超过 8</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;fmt&quot;</span></span>
<span class="line"><span>	&quot;unsafe&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	fmt.Printf(&quot;bool alignof is %d\\n&quot;, unsafe.Alignof(bool(true)))</span></span>
<span class="line"><span>	fmt.Printf(&quot;string alignof is %d\\n&quot;, unsafe.Alignof(string(&quot;a&quot;)))</span></span>
<span class="line"><span>	fmt.Printf(&quot;int alignof is %d\\n&quot;, unsafe.Alignof(int(0)))</span></span>
<span class="line"><span>	fmt.Printf(&quot;float alignof is %d\\n&quot;, unsafe.Alignof(float64(0)))</span></span>
<span class="line"><span>	fmt.Printf(&quot;int32 alignof is %d\\n&quot;, unsafe.Alignof(int32(0)))</span></span>
<span class="line"><span>	fmt.Printf(&quot;float32 alignof is %d\\n&quot;, unsafe.Alignof(float32(0)))</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>可以查看到各种类型在 Mac 64 位上的对齐系数如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>bool alignof is 1</span></span>
<span class="line"><span>string alignof is 8</span></span>
<span class="line"><span>int alignof is 8</span></span>
<span class="line"><span>int32 alignof is 4</span></span>
<span class="line"><span>float32 alignof is 4</span></span>
<span class="line"><span>float alignof is 8</span></span></code></pre></div><h1 id="三、内存对齐的优点" tabindex="-1">三、内存对齐的优点 <a class="header-anchor" href="#三、内存对齐的优点" aria-label="Permalink to &quot;三、内存对齐的优点&quot;">​</a></h1><p>1、提高可移植性，有些<code>CPU</code>可以访问任意地址上的任意数据，而有些<code>CPU</code>只能在特定地址访问数据，因此不同硬件平台具有差异性，这样的代码就不具有移植性，如果在编译时，将分配的内存进行对齐，这就具有平台可以移植性了</p><p>2、提高内存的访问效率，32 位 CPU 下一次可以从内存中读取 32 位（4 个字节）的数据，64 位 CPU 下一次可以从内存中读取 64 位（8 个字节）的数据，这个长度也称为 CPU 的字长。CPU 一次可以读取 1 个字长的数据到内存中，如果所需要读取的数据正好跨了 1 个字长，那就得花两个 CPU 周期的时间去读取了。因此在内存中存放数据时进行对齐，可以提高内存访问效率。</p><h1 id="四、内存对齐的缺点" tabindex="-1">四、内存对齐的缺点 <a class="header-anchor" href="#四、内存对齐的缺点" aria-label="Permalink to &quot;四、内存对齐的缺点&quot;">​</a></h1><p>1、存在内存空间的浪费，实际上是空间换时间</p><h1 id="五、内存对齐原则" tabindex="-1">五、内存对齐原则 <a class="header-anchor" href="#五、内存对齐原则" aria-label="Permalink to &quot;五、内存对齐原则&quot;">​</a></h1><p>1、结构体变量中成员的偏移量必须是成员大小的整数倍</p><p>2、整个结构体的地址必须是最大字节的整数倍（结构体的内存占用是 1/4/8/16byte...)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;fmt&quot;</span></span>
<span class="line"><span>	&quot;runtime&quot;</span></span>
<span class="line"><span>	&quot;unsafe&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>type T1 struct {</span></span>
<span class="line"><span>	bool bool  // 1 byte</span></span>
<span class="line"><span>	i16  int16 // 2 byte</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>type T2 struct {</span></span>
<span class="line"><span>	i8  int8  // 1 byte</span></span>
<span class="line"><span>	i64 int64 // 8 byte</span></span>
<span class="line"><span>	i32 int32 // 4 byte</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>type T3 struct {</span></span>
<span class="line"><span>	i8  int8  // 1 byte</span></span>
<span class="line"><span>	i32 int32 // 4 byte</span></span>
<span class="line"><span>	i64 int64 // 8 byte</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	fmt.Println(runtime.GOARCH) // amd64</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	t1 := T1{}</span></span>
<span class="line"><span>	fmt.Println(unsafe.Sizeof(t1)) // 4 bytes</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	t2 := T2{}</span></span>
<span class="line"><span>	fmt.Println(unsafe.Sizeof(t2)) // 24 bytes</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	t3 := T3{}</span></span>
<span class="line"><span>	fmt.Println(unsafe.Sizeof(t3)) // 16 bytes</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>以 T1 结构体为例，实际存储数据的只有 3 字节，但实际用了 4 字节，浪费了 1 个字节：</p><p>i16 并没有直接放在 bool 的后面，而是在 bool 中填充了一个空白后，放到了偏移量为 2 的位置上。如果 i16 从偏移量为 1 的位置开始占用 2 个字节，就不满足对齐原则 1，所以 i16 从偏移量为 2 的位置开始</p><p><img src="https://cdn.jsdelivr.net/gh/caijinlin/imgcdn/image-20220502132935164.png#id=CTOUy&amp;originHeight=162&amp;originWidth=527&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt=""></p><p>以 T2 结构体为例，实际存储数据的只有 13 字节，但实际用了 24 字节，浪费了 11 个字节：</p><p><img src="https://cdn.jsdelivr.net/gh/caijinlin/imgcdn/image-20220502133003644.png#id=PiD9s&amp;originHeight=168&amp;originWidth=1105&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt=""></p><p>以 T3 结构体为例，实际存储数据的只有 13 字节，但实际用了 16 字节，浪费了 3 个字节：</p><p><img src="https://cdn.jsdelivr.net/gh/caijinlin/imgcdn/image-20220502133303337.png#id=euMr8&amp;originHeight=175&amp;originWidth=824&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt=""></p>`,24),e=[t];function l(o,c,r,d,u,m){return s(),a("div",null,e)}const h=n(i,[["render",l]]);export{g as __pageData,h as default};
