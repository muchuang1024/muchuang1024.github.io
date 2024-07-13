import{_ as n,c as s,o as a,a4 as p}from"./chunks/framework.4aTu-Nia.js";const f=JSON.parse('{"title":"一、什么是值传递？","description":"","frontmatter":{},"headers":[],"relativePath":"docs/02 技术/Golang/Go 面试/基础面试/Go 面试 | Go 函数参数传递到底是值传递还是引用传递.md","filePath":"docs/02 技术/Golang/Go 面试/基础面试/Go 面试 | Go 函数参数传递到底是值传递还是引用传递.md"}'),t={name:"docs/02 技术/Golang/Go 面试/基础面试/Go 面试 | Go 函数参数传递到底是值传递还是引用传递.md"},l=p(`<p>在函数中，如果参数是非引用类型（int、string、struct 等这些），这样就在函数中就无法修改原内容数据；</p><p>如果参数是引用类型（指针、map、slice、chan 等这些），这样就可以修改原内容数据。</p><p>是否可以修改原内容数据，和传值、传引用没有必然的关系。在 C++中，传引用肯定是可以修改原内容数据的，在 Go 语言里，虽然只有传值，但是我们也可以修改原内容数据，因为参数是引用类型</p><p>先说下结论：<strong>Go 语言中所有的传参都是值传递（传值），都是一个副本，一个拷贝。</strong></p><table><thead><tr><th>类型</th><th>传递方式</th><th>说明</th></tr></thead><tbody><tr><td>基本类型</td><td>值传递</td><td>如 int、float、bool，传递的是数据的副本。</td></tr><tr><td>数组</td><td>值传递</td><td>传递数组时，会复制整个数组。</td></tr><tr><td>结构体</td><td>值传递</td><td>传递结构体时，会复制整个结构体。</td></tr><tr><td>切片</td><td>值传递</td><td>切片本身是通过值传递的，但实际上传递的是对底层数组的引用。</td></tr><tr><td>映射</td><td>值传递</td><td>映射（map）同样是引用类型，通过值传递映射时，传递的是对映射的引用。</td></tr><tr><td>通道</td><td>值传递</td><td>通道（channel）是引用类型，传递的是对通道的引用。</td></tr><tr><td>接口</td><td>值传递</td><td>接口类型本身是通过值传递的，但接口可能持有的是其他引用类型的引用。</td></tr><tr><td>函数</td><td>值传递</td><td>函数类型是引用类型，传递的是函数的引用。</td></tr><tr><td>指针</td><td>值传递</td><td>指针传递的是指针的副本，但副本指向的是同一个内存地址。</td></tr></tbody></table><h1 id="一、什么是值传递" tabindex="-1">一、什么是值传递？ <a class="header-anchor" href="#一、什么是值传递" aria-label="Permalink to &quot;一、什么是值传递？&quot;">​</a></h1><p>将实参的值传递给形参，形参是实参的一份拷贝，实参和形参的内存地址不同。函数内对形参值内容的修改，是否会影响实参的值内容，取决于参数是否是引用类型</p><h1 id="二、什么是引用传递" tabindex="-1">二、什么是引用传递？ <a class="header-anchor" href="#二、什么是引用传递" aria-label="Permalink to &quot;二、什么是引用传递？&quot;">​</a></h1><p>将实参的地址传递给形参，函数内对形参值内容的修改，将会影响实参的值内容。Go 语言是没有引用传递的，在 C++中，函数参数的传递方式有引用传递。</p><p>下面分别针对 Go 的值类型（int、struct 等）、引用类型（指针、slice、map、channel），验证是否是值传递，以及函数内对形参的修改是否会修改原内容数据</p><h1 id="三、各类型参数传递" tabindex="-1">三、各类型参数传递 <a class="header-anchor" href="#三、各类型参数传递" aria-label="Permalink to &quot;三、各类型参数传递&quot;">​</a></h1><h2 id="int-类型" tabindex="-1">int 类型 <a class="header-anchor" href="#int-类型" aria-label="Permalink to &quot;int 类型&quot;">​</a></h2><p>形参和实际参数内存地址不一样，证明是值传递；参数是值类型，所以函数内对形参的修改，不会修改原内容数据</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import &quot;fmt&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	var i int64 = 1</span></span>
<span class="line"><span>	fmt.Printf(&quot;原始int内存地址是 %p\\n&quot;, &amp;i)</span></span>
<span class="line"><span>	modifyInt(i) // args就是实际参数</span></span>
<span class="line"><span>	fmt.Printf(&quot;改动后的值是: %v\\n&quot;, i)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func modifyInt(i int64) { //这里定义的args就是形式参数</span></span>
<span class="line"><span>	fmt.Printf(&quot;函数里接收到int的内存地址是：%p\\n&quot;, &amp;i)</span></span>
<span class="line"><span>	i = 10</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>原始int内存地址是 0xc0000180b8</span></span>
<span class="line"><span>函数里接收到int的内存地址是：0xc0000180c0</span></span>
<span class="line"><span>改动后的值是: 1</span></span></code></pre></div><h2 id="指针类型" tabindex="-1">指针类型 <a class="header-anchor" href="#指针类型" aria-label="Permalink to &quot;指针类型&quot;">​</a></h2><p>形参和实际参数内存地址不一样，证明是值传递，由于形参和实参是指针，指向同一个变量。函数内对指针指向变量的修改，会修改原内容数据</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import &quot;fmt&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	var args int64 = 1                  // int类型变量</span></span>
<span class="line"><span>	p := &amp;args                          // 指针类型变量</span></span>
<span class="line"><span>	fmt.Printf(&quot;原始指针的内存地址是 %p\\n&quot;, &amp;p)   // 存放指针类型变量</span></span>
<span class="line"><span>	fmt.Printf(&quot;原始指针指向变量的内存地址 %p\\n&quot;, p) // 存放int变量</span></span>
<span class="line"><span>	modifyPointer(p)                    // args就是实际参数</span></span>
<span class="line"><span>	fmt.Printf(&quot;改动后的值是: %v\\n&quot;, *p)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func modifyPointer(p *int64) { //这里定义的args就是形式参数</span></span>
<span class="line"><span>	fmt.Printf(&quot;函数里接收到指针的内存地址是 %p \\n&quot;, &amp;p)</span></span>
<span class="line"><span>	fmt.Printf(&quot;函数里接收到指针指向变量的内存地址 %p\\n&quot;, p)</span></span>
<span class="line"><span>	*p = 10</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>原始指针的内存地址是 0xc000110018</span></span>
<span class="line"><span>原始指针指向变量的内存地址 0xc00010c008</span></span>
<span class="line"><span>函数里接收到指针的内存地址是 0xc000110028</span></span>
<span class="line"><span>函数里接收到指针指向变量的内存地址 0xc00010c008</span></span>
<span class="line"><span>改动后的值是: 10</span></span></code></pre></div><h2 id="slice-类型" tabindex="-1">slice 类型 <a class="header-anchor" href="#slice-类型" aria-label="Permalink to &quot;slice 类型&quot;">​</a></h2><p>形参和实际参数内存地址一样，不代表是引用类型；下面进行详细说明 slice 还是值传递，传递的是指针</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import &quot;fmt&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	var s = []int64{1, 2, 3}</span></span>
<span class="line"><span>	// &amp;操作符打印出的地址是无效的，是fmt函数作了特殊处理</span></span>
<span class="line"><span>	fmt.Printf(&quot;直接对原始切片取地址%v \\n&quot;, &amp;s)</span></span>
<span class="line"><span>	// 打印slice的内存地址是可以直接通过%p打印的,不用使用&amp;取地址符转换</span></span>
<span class="line"><span>	fmt.Printf(&quot;原始切片的内存地址： %p \\n&quot;, s)</span></span>
<span class="line"><span>	fmt.Printf(&quot;原始切片第一个元素的内存地址： %p \\n&quot;, &amp;s[0])</span></span>
<span class="line"><span>	modifySlice(s)</span></span>
<span class="line"><span>	fmt.Printf(&quot;改动后的值是: %v\\n&quot;, s)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func modifySlice(s []int64) {</span></span>
<span class="line"><span>	// &amp;操作符打印出的地址是无效的，是fmt函数作了特殊处理</span></span>
<span class="line"><span>	fmt.Printf(&quot;直接对函数里接收到切片取地址%v\\n&quot;, &amp;s)</span></span>
<span class="line"><span>	// 打印slice的内存地址是可以直接通过%p打印的,不用使用&amp;取地址符转换</span></span>
<span class="line"><span>	fmt.Printf(&quot;函数里接收到切片的内存地址是 %p \\n&quot;, s)</span></span>
<span class="line"><span>	fmt.Printf(&quot;函数里接收到切片第一个元素的内存地址： %p \\n&quot;, &amp;s[0])</span></span>
<span class="line"><span>	s[0] = 10</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>直接对原始切片取地址&amp;[1 2 3]</span></span>
<span class="line"><span>原始切片的内存地址： 0xc0000b8000</span></span>
<span class="line"><span>原始切片第一个元素的内存地址： 0xc0000b8000</span></span>
<span class="line"><span>直接对函数里接收到切片取地址&amp;[1 2 3]</span></span>
<span class="line"><span>函数里接收到切片的内存地址是 0xc0000b8000</span></span>
<span class="line"><span>函数里接收到切片第一个元素的内存地址： 0xc0000b8000</span></span>
<span class="line"><span>改动后的值是: [10 2 3]</span></span></code></pre></div><p><code>slice</code>是一个结构体，他的第一个元素是一个指针类型，这个指针指向的是<strong>底层数组的第一个元素</strong>。当参数是<code>slice</code>类型的时候，fmt.printf 通过%p 打印的 slice 变量的地址其实就是内部存储数组元素的地址，所以打印出来形参和实参内存地址一样。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>type slice struct {</span></span>
<span class="line"><span>    array unsafe.Pointer // 指针</span></span>
<span class="line"><span>    len   int</span></span>
<span class="line"><span>    cap   int</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>因为 slice 作为参数时本质是传递的指针，上面证明了指针也是值传递，所以参数为 slice 也是值传递，指针指向的是同一个变量，函数内对形参的修改，会修改原内容数据</p><p>单纯的从 slice 这个结构体看，我们可以通过 modify 修改存储元素的内容，但是永远修改不了 len 和 cap，因为他们只是一个拷贝，如果要修改，那就要传递&amp;slice 作为参数才可以。</p><h2 id="map-类型" tabindex="-1">map 类型 <a class="header-anchor" href="#map-类型" aria-label="Permalink to &quot;map 类型&quot;">​</a></h2><p>形参和实际参数内存地址不一样，证明是值传递</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import &quot;fmt&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	m := make(map[string]int)</span></span>
<span class="line"><span>	m[&quot;age&quot;] = 8</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	fmt.Printf(&quot;原始map的内存地址是：%p\\n&quot;, &amp;m)</span></span>
<span class="line"><span>	modifyMap(m)</span></span>
<span class="line"><span>	fmt.Printf(&quot;改动后的值是: %v\\n&quot;, m)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func modifyMap(m map[string]int) {</span></span>
<span class="line"><span>	fmt.Printf(&quot;函数里接收到map的内存地址是：%p\\n&quot;, &amp;m)</span></span>
<span class="line"><span>	m[&quot;age&quot;] = 9</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>原始map的内存地址是：0xc00000e028</span></span>
<span class="line"><span>函数里接收到map的内存地址是：0xc00000e038</span></span>
<span class="line"><span>改动后的值是: map[age:9]</span></span></code></pre></div><p>通过 make 函数创建的 map 变量本质是一个<code>hmap</code>类型的指针<code>*hmap</code>，所以函数内对形参的修改，会修改原内容数据</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>//src/runtime/map.go</span></span>
<span class="line"><span>func makemap(t *maptype, hint int, h *hmap) *hmap {</span></span>
<span class="line"><span>    mem, overflow := math.MulUintptr(uintptr(hint), t.bucket.size)</span></span>
<span class="line"><span>    if overflow || mem &gt; maxAlloc {</span></span>
<span class="line"><span>        hint = 0</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // initialize Hmap</span></span>
<span class="line"><span>    if h == nil {</span></span>
<span class="line"><span>        h = new(hmap)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    h.hash0 = fastrand()</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="channel-类型" tabindex="-1">channel 类型 <a class="header-anchor" href="#channel-类型" aria-label="Permalink to &quot;channel 类型&quot;">​</a></h2><p>形参和实际参数内存地址不一样，证明是值传递</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;fmt&quot;</span></span>
<span class="line"><span>	&quot;time&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	p := make(chan bool)</span></span>
<span class="line"><span>	fmt.Printf(&quot;原始chan的内存地址是：%p\\n&quot;, &amp;p)</span></span>
<span class="line"><span>	go func(p chan bool) {</span></span>
<span class="line"><span>		fmt.Printf(&quot;函数里接收到chan的内存地址是：%p\\n&quot;, &amp;p)</span></span>
<span class="line"><span>		//模拟耗时</span></span>
<span class="line"><span>		time.Sleep(2 * time.Second)</span></span>
<span class="line"><span>		p &lt;- true</span></span>
<span class="line"><span>	}(p)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	select {</span></span>
<span class="line"><span>	case l := &lt;-p:</span></span>
<span class="line"><span>		fmt.Printf(&quot;接收到的值是: %v\\n&quot;, l)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>原始chan的内存地址是：0xc00000e028</span></span>
<span class="line"><span>函数里接收到chan的内存地址是：0xc00000e038</span></span>
<span class="line"><span>接收到的值是: true</span></span></code></pre></div><p>通过 make 函数创建的 chan 变量本质是一个<code>hchan</code>类型的指针<code>*hchan</code>，所以函数内对形参的修改，会修改原内容数据</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// src/runtime/chan.go</span></span>
<span class="line"><span>func makechan(t *chantype, size int) *hchan {</span></span>
<span class="line"><span>    elem := t.elem</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // compiler checks this but be safe.</span></span>
<span class="line"><span>    if elem.size &gt;= 1&lt;&lt;16 {</span></span>
<span class="line"><span>        throw(&quot;makechan: invalid channel element type&quot;)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if hchanSize%maxAlign != 0 || elem.align &gt; maxAlign {</span></span>
<span class="line"><span>        throw(&quot;makechan: bad alignment&quot;)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    mem, overflow := math.MulUintptr(elem.size, uintptr(size))</span></span>
<span class="line"><span>    if overflow || mem &gt; maxAlloc-hchanSize || size &lt; 0 {</span></span>
<span class="line"><span>        panic(plainError(&quot;makechan: size out of range&quot;))</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="struct-类型" tabindex="-1">struct 类型 <a class="header-anchor" href="#struct-类型" aria-label="Permalink to &quot;struct 类型&quot;">​</a></h2><p>形参和实际参数内存地址不一样，证明是值传递。形参不是引用类型或者指针类型，所以函数内对形参的修改，不会修改原内容数据</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import &quot;fmt&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>type Person struct {</span></span>
<span class="line"><span>	Name string</span></span>
<span class="line"><span>	Age  int</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	per := Person{</span></span>
<span class="line"><span>		Name: &quot;test&quot;,</span></span>
<span class="line"><span>		Age:  8,</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	fmt.Printf(&quot;原始struct的内存地址是：%p\\n&quot;, &amp;per)</span></span>
<span class="line"><span>	modifyStruct(per)</span></span>
<span class="line"><span>	fmt.Printf(&quot;改动后的值是: %v\\n&quot;, per)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func modifyStruct(per Person) {</span></span>
<span class="line"><span>	fmt.Printf(&quot;函数里接收到struct的内存地址是：%p\\n&quot;, &amp;per)</span></span>
<span class="line"><span>	per.Age = 10</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>原始struct的内存地址是：0xc0000a6018</span></span>
<span class="line"><span>函数里接收到struct的内存地址是：0xc0000a6030</span></span>
<span class="line"><span>改动后的值是: {test 8}</span></span></code></pre></div>`,37),e=[l];function i(c,o,r,d,m,u){return a(),s("div",null,e)}const g=n(t,[["render",i]]);export{f as __pageData,g as default};
