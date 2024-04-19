import{_ as s,c as a,o as n,a4 as t}from"./chunks/framework.4aTu-Nia.js";const h=JSON.parse(`{"title":"一、GODEBUG='gctrace=1'","description":"","frontmatter":{},"headers":[],"relativePath":"docs/01 学习/专栏/Golang/Go 面试/并发面试/Go 面试 | Go 如何查看 GC 信息.md","filePath":"docs/01 学习/专栏/Golang/Go 面试/并发面试/Go 面试 | Go 如何查看 GC 信息.md"}`),p={name:"docs/01 学习/专栏/Golang/Go 面试/并发面试/Go 面试 | Go 如何查看 GC 信息.md"},e=t(`<p>在 Go 语言中，垃圾回收是一个重要的机制，它负责管理内存的分配和释放，确保程序运行过程中不会出现内存泄漏等问题。为了更好地了解和调试 Go 的垃圾回收过程，可以使用以下四种方式</p><h1 id="一、godebug-gctrace-1" tabindex="-1">一、GODEBUG=&#39;gctrace=1&#39; <a class="header-anchor" href="#一、godebug-gctrace-1" aria-label="Permalink to &quot;一、GODEBUG=&#39;gctrace=1&#39;&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>    for n := 1; n &lt; 100000; n++ {</span></span>
<span class="line"><span>        _ = make([]byte, 1&lt;&lt;20)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>$ GODEBUG=&#39;gctrace=1&#39; go run main.go</span></span>
<span class="line"><span></span></span>
<span class="line"><span>gc 1 @0.003s 4%: 0.013+1.7+0.008 ms clock, 0.10+0.67/1.2/0.018+0.064 ms cpu, 4-&gt;6-&gt;2 MB, 5 MB goal, 8 P</span></span>
<span class="line"><span>gc 2 @0.006s 2%: 0.006+4.5+0.058 ms clock, 0.048+0.070/0.027/3.6+0.47 ms cpu, 4-&gt;5-&gt;1 MB, 5 MB goal, 8 P</span></span>
<span class="line"><span>gc 3 @0.011s 3%: 0.021+1.3+0.009 ms clock, 0.17+0.041/0.41/0.046+0.072 ms cpu, 4-&gt;6-&gt;2 MB, 5 MB goal, 8 P</span></span>
<span class="line"><span>gc 4 @0.013s 5%: 0.025+0.38+0.26 ms clock, 0.20+0.054/0.15/0.009+2.1 ms cpu, 4-&gt;6-&gt;2 MB, 5 MB goal, 8 P</span></span>
<span class="line"><span>gc 5 @0.014s 5%: 0.021+0.16+0.002 ms clock, 0.17+0.098/0.028/0.001+0.016 ms cpu, 4-&gt;5-&gt;1 MB, 5 MB goal, 8 P</span></span>
<span class="line"><span>gc 6 @0.014s 7%: 0.025+1.6+0.003 ms clock, 0.20+0.061/2.9/1.5+0.025 ms cpu, 4-&gt;6-&gt;2 MB, 5 MB goal, 8 P</span></span>
<span class="line"><span>gc 7 @0.016s 7%: 0.019+1.0+0.002 ms clock, 0.15+0.053/1.0/0.018+0.017 ms cpu, 4-&gt;6-&gt;2 MB, 5 MB goal, 8 P</span></span>
<span class="line"><span>gc 8 @0.017s 7%: 0.029+0.17+0.002 ms clock, 0.23+0.037/0.10/0.063+0.022 ms cpu, 4-&gt;4-&gt;0 MB, 5 MB goal, 8 P</span></span>
<span class="line"><span>gc 9 @0.018s 7%: 0.019+0.23+0.002 ms clock, 0.15+0.040/0.16/0.023+0.018 ms cpu, 4-&gt;5-&gt;1 MB, 5 MB goal, 8 P</span></span>
<span class="line"><span>gc 10 @0.018s 7%: 0.022+0.23+0.003 ms clock, 0.17+0.061/0.13/0.006+0.024 ms cpu, 4-&gt;6-&gt;2 MB, 5 MB goal, 8 P</span></span>
<span class="line"><span>gc 11 @0.018s 7%: 0.019+0.11+0.001 ms clock, 0.15+0.033/0.051/0.013+0.015 ms cpu, 4-&gt;5-&gt;1 MB, 5 MB goal, 8 P</span></span>
<span class="line"><span>gc 12 @0.019s 7%: 0.018+0.19+0.001 ms clock, 0.14+0.035/0.10/0.018+0.014 ms cpu, 4-&gt;5-&gt;1 MB, 5 MB goal, 8 P</span></span>
<span class="line"><span>gc 13 @0.019s 7%: 0.018+0.35+0.002 ms clock, 0.15+0.21/0.054/0.013+0.016 ms cpu, 4-&gt;5-&gt;1 MB, 5 MB goal, 8 P</span></span>
<span class="line"><span>gc 14 @0.019s 8%: 0.024+0.27+0.002 ms clock, 0.19+0.022/0.13/0.014+0.017 ms cpu, 4-&gt;5-&gt;1 MB, 5 MB goal, 8 P</span></span>
<span class="line"><span>gc 15 @0.020s 8%: 0.019+0.42+0.038 ms clock, 0.15+0.060/0.28/0.007+0.31 ms cpu, 4-&gt;17-&gt;13 MB, 5 MB goal, 8 P</span></span>
<span class="line"><span>gc 16 @0.021s 8%: 0.018+0.53+0.060 ms clock, 0.14+0.045/0.39/0.005+0.48 ms cpu, 21-&gt;28-&gt;7 MB, 26 MB goal, 8 P</span></span>
<span class="line"><span>gc 17 @0.021s 10%: 0.020+0.91+0.64 ms clock, 0.16+0.050/0.36/0.027+5.1 ms cpu, 12-&gt;16-&gt;4 MB, 14 MB goal, 8 P</span></span>
<span class="line"><span>gc 18 @0.023s 10%: 0.020+0.55+0.002 ms clock, 0.16+0.053/0.50/0.081+0.023 ms cpu, 7-&gt;9-&gt;2 MB, 8 MB goal, 8 P</span></span></code></pre></div><p>字段含义由下表所示：</p><table><thead><tr><th>字段</th><th>含义</th></tr></thead><tbody><tr><td>gc 2</td><td>第二个 GC 周期</td></tr><tr><td>0.006</td><td>程序开始后的 0.006 秒</td></tr><tr><td>2%</td><td>该 GC 周期中 CPU 的使用率</td></tr><tr><td>0.006</td><td>标记开始时， STW 所花费的时间（wall clock）</td></tr><tr><td>4.5</td><td>标记过程中，并发标记所花费的时间（wall clock）</td></tr><tr><td>0.058</td><td>标记终止时， STW 所花费的时间（wall clock）</td></tr><tr><td>0.048</td><td>标记开始时， STW 所花费的时间（cpu time）</td></tr><tr><td>0.070</td><td>标记过程中，标记辅助所花费的时间（cpu time）</td></tr><tr><td>0.027</td><td>标记过程中，并发标记所花费的时间（cpu time）</td></tr><tr><td>3.6</td><td>标记过程中，GC 空闲的时间（cpu time）</td></tr><tr><td>0.47</td><td>标记终止时， STW 所花费的时间（cpu time）</td></tr><tr><td>4</td><td>标记开始时，堆的大小的实际值</td></tr><tr><td>5</td><td>标记结束时，堆的大小的实际值</td></tr><tr><td>1</td><td>标记结束时，标记为存活的对象大小</td></tr><tr><td>5</td><td>标记结束时，堆的大小的预测值</td></tr><tr><td>8</td><td>P 的数量</td></tr></tbody></table><h1 id="二、go-tool-trace" tabindex="-1">二、go tool trace <a class="header-anchor" href="#二、go-tool-trace" aria-label="Permalink to &quot;二、go tool trace&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;os&quot;</span></span>
<span class="line"><span>	&quot;runtime/trace&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	f, _ := os.Create(&quot;trace.out&quot;)</span></span>
<span class="line"><span>	defer f.Close()</span></span>
<span class="line"><span>	trace.Start(f)</span></span>
<span class="line"><span>	defer trace.Stop()</span></span>
<span class="line"><span>	for n := 1; n &lt; 100000; n++ {</span></span>
<span class="line"><span>		_ = make([]byte, 1&lt;&lt;20)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>$ go run main.go</span></span>
<span class="line"><span>$ go tool trace trace.out</span></span></code></pre></div><p>打开浏览器后，可以看到如下统计：</p><p><img src="https://cdn.jsdelivr.net/gh/caijinlin/imgcdn/image-20220504204708533.png#id=Npf4N&amp;originHeight=359&amp;originWidth=404&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt=""></p><p>点击 View trace，可以查看当时的 trace 情况</p><p><img src="https://cdn.jsdelivr.net/gh/caijinlin/imgcdn/f3d74b546b1e360c9d6946757ada4f64.png#id=gvVoj&amp;originHeight=391&amp;originWidth=1080&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt=""></p><p>点击 Minimum mutator utilization，可以查看到赋值器 mutator （用户程序）对 CPU 的利用率 74.1%，接近 100%则代表没有针对 GC 的优化空间了</p><p><img src="https://cdn.jsdelivr.net/gh/caijinlin/imgcdn/image-20220504204751752.png#id=SgVgk&amp;originHeight=495&amp;originWidth=1149&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt=""></p><h1 id="三、debug-readgcstats" tabindex="-1">三、debug.ReadGCStats <a class="header-anchor" href="#三、debug-readgcstats" aria-label="Permalink to &quot;三、debug.ReadGCStats&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;fmt&quot;</span></span>
<span class="line"><span>	&quot;runtime/debug&quot;</span></span>
<span class="line"><span>	&quot;time&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func printGCStats() {</span></span>
<span class="line"><span>	t := time.NewTicker(time.Second)</span></span>
<span class="line"><span>	s := debug.GCStats{}</span></span>
<span class="line"><span>	for {</span></span>
<span class="line"><span>		select {</span></span>
<span class="line"><span>		case &lt;-t.C:</span></span>
<span class="line"><span>			debug.ReadGCStats(&amp;s)</span></span>
<span class="line"><span>			fmt.Printf(&quot;gc %d last@%v, PauseTotal %v\\n&quot;, s.NumGC, s.LastGC, s.PauseTotal)</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	go printGCStats()</span></span>
<span class="line"><span>	for n := 1; n &lt; 100000; n++ {</span></span>
<span class="line"><span>		_ = make([]byte, 1&lt;&lt;20)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>$ go run main.go</span></span>
<span class="line"><span></span></span>
<span class="line"><span>gc 3392 last@2022-05-04 19:22:52.877293 +0800 CST, PauseTotal 117.524907ms</span></span>
<span class="line"><span>gc 6591 last@2022-05-04 19:22:53.876837 +0800 CST, PauseTotal 253.254996ms</span></span>
<span class="line"><span>gc 10028 last@2022-05-04 19:22:54.87674 +0800 CST, PauseTotal 376.981595ms</span></span>
<span class="line"><span>gc 13447 last@2022-05-04 19:22:55.87689 +0800 CST, PauseTotal 511.420111ms</span></span>
<span class="line"><span>gc 16938 last@2022-05-04 19:22:56.876955 +0800 CST, PauseTotal 649.293449ms</span></span>
<span class="line"><span>gc 20350 last@2022-05-04 19:22:57.876756 +0800 CST, PauseTotal 788.003014ms</span></span></code></pre></div><p>字段含义由下表所示：</p><table><thead><tr><th>字段</th><th>含义</th></tr></thead><tbody><tr><td>NumGC</td><td>GC 总次数</td></tr><tr><td>LastGC</td><td>上次 GC 时间</td></tr><tr><td>PauseTotal</td><td>STW 总耗时</td></tr></tbody></table><h1 id="四、runtime-readmemstats" tabindex="-1">四、runtime.ReadMemStats <a class="header-anchor" href="#四、runtime-readmemstats" aria-label="Permalink to &quot;四、runtime.ReadMemStats&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;fmt&quot;</span></span>
<span class="line"><span>	&quot;runtime&quot;</span></span>
<span class="line"><span>	&quot;time&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func printMemStats() {</span></span>
<span class="line"><span>	t := time.NewTicker(time.Second)</span></span>
<span class="line"><span>	s := runtime.MemStats{}</span></span>
<span class="line"><span>	for {</span></span>
<span class="line"><span>		select {</span></span>
<span class="line"><span>		case &lt;-t.C:</span></span>
<span class="line"><span>			runtime.ReadMemStats(&amp;s)</span></span>
<span class="line"><span>			fmt.Printf(&quot;gc %d last@%v, heap_object_num: %v, heap_alloc: %vMB, next_heap_size: %vMB\\n&quot;,</span></span>
<span class="line"><span>				s.NumGC, time.Unix(int64(time.Duration(s.LastGC).Seconds()), 0), s.HeapObjects, s.HeapAlloc/(1&lt;&lt;20), s.NextGC/(1&lt;&lt;20))</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	go printMemStats()</span></span>
<span class="line"><span>	fmt.Println(1 &lt;&lt; 20)</span></span>
<span class="line"><span>	for n := 1; n &lt; 100000; n++ {</span></span>
<span class="line"><span>		_ = make([]byte, 1&lt;&lt;20)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>$ go run main.go</span></span>
<span class="line"><span></span></span>
<span class="line"><span>gc 2978 last@2022-05-04 19:38:04 +0800 CST, heap_object_num: 391, heap_alloc: 20MB, next_heap_size: 28MB</span></span>
<span class="line"><span>gc 5817 last@2022-05-04 19:38:05 +0800 CST, heap_object_num: 370, heap_alloc: 4MB, next_heap_size: 4MB</span></span>
<span class="line"><span>gc 9415 last@2022-05-04 19:38:06 +0800 CST, heap_object_num: 392, heap_alloc: 7MB, next_heap_size: 8MB</span></span>
<span class="line"><span>gc 11429 last@2022-05-04 19:38:07 +0800 CST, heap_object_num: 339, heap_alloc: 4MB, next_heap_size: 5MB</span></span>
<span class="line"><span>gc 14706 last@2022-05-04 19:38:08 +0800 CST, heap_object_num: 436, heap_alloc: 6MB, next_heap_size: 8MB</span></span>
<span class="line"><span>gc 18253 last@2022-05-04 19:38:09 +0800 CST, heap_object_num: 375, heap_alloc: 4MB, next_heap_size: 6M</span></span></code></pre></div><p>字段含义由下表所示：</p><table><thead><tr><th>字段</th><th>含义</th></tr></thead><tbody><tr><td>NumGC</td><td>GC 总次数</td></tr><tr><td>LastGC</td><td>上次 GC 时间</td></tr><tr><td>HeapObjects</td><td>堆中已经分配的对象总数，GC 内存回收后 HeapObjects 取值相应减小</td></tr><tr><td>HeapAlloc</td><td>堆中已经分配给对象的字节数，GC 内存回收后 HeapAlloc 取值相应减小</td></tr><tr><td>NextGC</td><td>下次 GC 目标堆的大小</td></tr></tbody></table>`,25),l=[e];function c(i,o,d,g,r,m){return n(),a("div",null,l)}const _=s(p,[["render",c]]);export{h as __pageData,_ as default};
