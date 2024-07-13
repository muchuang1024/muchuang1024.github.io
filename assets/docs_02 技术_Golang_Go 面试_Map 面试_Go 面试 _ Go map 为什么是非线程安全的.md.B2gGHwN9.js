import{_ as n,c as s,o as a,a4 as p}from"./chunks/framework.4aTu-Nia.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/02 技术/Golang/Go 面试/Map 面试/Go 面试 | Go map 为什么是非线程安全的.md","filePath":"docs/02 技术/Golang/Go 面试/Map 面试/Go 面试 | Go map 为什么是非线程安全的.md"}'),t={name:"docs/02 技术/Golang/Go 面试/Map 面试/Go 面试 | Go map 为什么是非线程安全的.md"},l=p(`<p>map 默认是并发不安全的，同时对 map 进行并发读写时，程序会 panic，原因如下：</p><p>Go 官方在经过了长时间的讨论后，认为 Go map 更应适配典型使用场景（不需要从多个 goroutine 中进行安全访问），而不是为了小部分情况（并发访问），导致大部分程序付出加锁代价（性能），决定了不支持。</p><p>2 个协程同时读和写，以下程序会出现致命错误：fatal error: concurrent map writes</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;fmt&quot;</span></span>
<span class="line"><span>	&quot;time&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	s := make(map[int]int)</span></span>
<span class="line"><span>	for i := 0; i &lt; 100; i++ {</span></span>
<span class="line"><span>		go func(i int) {</span></span>
<span class="line"><span>			s[i] = i</span></span>
<span class="line"><span>		}(i)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	for i := 0; i &lt; 100; i++ {</span></span>
<span class="line"><span>		go func(i int) {</span></span>
<span class="line"><span>			fmt.Printf(&quot;map第%d个元素值是%d\\n&quot;, i, s[i])</span></span>
<span class="line"><span>		}(i)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	time.Sleep(1 * time.Second)</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>如果想实现 map 线程安全，有两种方式：</p><p><strong>1、使用读写锁 <code>map</code> + <code>sync.RWMutex</code></strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;fmt&quot;</span></span>
<span class="line"><span>	&quot;sync&quot;</span></span>
<span class="line"><span>	&quot;time&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	var lock sync.RWMutex</span></span>
<span class="line"><span>	s := make(map[int]int)</span></span>
<span class="line"><span>	for i := 0; i &lt; 100; i++ {</span></span>
<span class="line"><span>		go func(i int) {</span></span>
<span class="line"><span>			lock.Lock()</span></span>
<span class="line"><span>			s[i] = i</span></span>
<span class="line"><span>			lock.Unlock()</span></span>
<span class="line"><span>		}(i)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	for i := 0; i &lt; 100; i++ {</span></span>
<span class="line"><span>		go func(i int) {</span></span>
<span class="line"><span>			lock.RLock()</span></span>
<span class="line"><span>			fmt.Printf(&quot;map第%d个元素值是%d\\n&quot;, i, s[i])</span></span>
<span class="line"><span>			lock.RUnlock()</span></span>
<span class="line"><span>		}(i)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	time.Sleep(1 * time.Second)</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>2、使用 Go 提供的 <code>sync.Map</code></strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;fmt&quot;</span></span>
<span class="line"><span>	&quot;sync&quot;</span></span>
<span class="line"><span>	&quot;time&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	var m sync.Map</span></span>
<span class="line"><span>	for i := 0; i &lt; 100; i++ {</span></span>
<span class="line"><span>		go func(i int) {</span></span>
<span class="line"><span>			m.Store(i, i)</span></span>
<span class="line"><span>		}(i)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	for i := 0; i &lt; 100; i++ {</span></span>
<span class="line"><span>		go func(i int) {</span></span>
<span class="line"><span>			v, ok := m.Load(i)</span></span>
<span class="line"><span>			fmt.Printf(&quot;Load: %v, %v\\n&quot;, v, ok)</span></span>
<span class="line"><span>		}(i)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	time.Sleep(1 * time.Second)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-label="Permalink to &quot;&quot;">​</a></h2>`,10),i=[l];function e(c,o,m,r,d,u){return a(),s("div",null,i)}const f=n(t,[["render",e]]);export{g as __pageData,f as default};
