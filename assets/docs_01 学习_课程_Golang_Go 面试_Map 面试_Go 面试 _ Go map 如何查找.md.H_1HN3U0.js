import{_ as s,c as a,o as n,a4 as t}from"./chunks/framework.4aTu-Nia.js";const g=JSON.parse('{"title":"一、查找流程","description":"","frontmatter":{},"headers":[],"relativePath":"docs/01 学习/课程/Golang/Go 面试/Map 面试/Go 面试 | Go map 如何查找.md","filePath":"docs/01 学习/课程/Golang/Go 面试/Map 面试/Go 面试 | Go map 如何查找.md"}'),p={name:"docs/01 学习/课程/Golang/Go 面试/Map 面试/Go 面试 | Go map 如何查找.md"},i=t(`<p>Go 语言中读取 map 有两种语法：带 comma 和 不带 comma。当要查询的 key 不在 map 里，带 comma 的用法会返回一个 bool 型变量提示 key 是否在 map 中；而不带 comma 的语句则会返回一个 value 类型的零值。如果 value 是 int 型就会返回 0，如果 value 是 string 类型，就会返回空字符串。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 不带 comma 用法</span></span>
<span class="line"><span>value := m[&quot;name&quot;]</span></span>
<span class="line"><span>fmt.Printf(&quot;value:%s&quot;, value)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 带 comma 用法</span></span>
<span class="line"><span>value, ok := m[&quot;name&quot;]</span></span>
<span class="line"><span>if ok {</span></span>
<span class="line"><span>    fmt.Printf(&quot;value:%s&quot;, value)</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>map 的查找通过生成汇编码可以知道，根据 key 的不同类型/返回参数，编译器会将查找函数用更具体的函数替换，以优化效率：</p><table><thead><tr><th>类型</th><th>查找</th></tr></thead><tbody><tr><td>uint32</td><td>mapaccess1<em>fast32(t _maptype, h</em> hmap, key uint32) unsafe.Pointer</td></tr><tr><td>uint32</td><td>mapaccess2<em>fast32(t _maptype, h</em> hmap, key uint32) (unsafe.Pointer, bool)</td></tr><tr><td>uint64</td><td>mapaccess1<em>fast64(t _maptype, h</em> hmap, key uint64) unsafe.Pointer</td></tr><tr><td>uint64</td><td>mapaccess2<em>fast64(t _maptype, h</em> hmap, key uint64) (unsafe.Pointer, bool)</td></tr><tr><td>string</td><td>mapaccess1<em>faststr(t _maptype, h</em> hmap, ky string) unsafe.Pointer</td></tr><tr><td>string</td><td>mapaccess2<em>faststr(t _maptype, h</em> hmap, ky string) (unsafe.Pointer, bool)</td></tr></tbody></table><h1 id="一、查找流程" tabindex="-1">一、查找流程 <a class="header-anchor" href="#一、查找流程" aria-label="Permalink to &quot;一、查找流程&quot;">​</a></h1><p><img src="https://cdn.jsdelivr.net/gh/caijinlin/imgcdn/image-20220117201006909.png#id=GD2UW&amp;originHeight=781&amp;originWidth=340&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt=""></p><h2 id="一-写保护监测" tabindex="-1">一）写保护监测 <a class="header-anchor" href="#一-写保护监测" aria-label="Permalink to &quot;一）写保护监测&quot;">​</a></h2><p>函数首先会检查 map 的标志位 flags。如果 flags 的写标志位此时被置 1 了，说明有其他协程在执行“写”操作，进而导致程序 panic，这也说明了 map 不是线程安全的</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>if h.flags&amp;hashWriting != 0 {</span></span>
<span class="line"><span>	throw(&quot;concurrent map read and map write&quot;)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="二-计算-hash-值" tabindex="-1">二）计算 hash 值 <a class="header-anchor" href="#二-计算-hash-值" aria-label="Permalink to &quot;二）计算 hash 值&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>hash := t.hasher(key, uintptr(h.hash0))</span></span></code></pre></div><p>key 经过哈希函数计算后，得到的哈希值如下（主流 64 位机下共 64 个 bit 位）， 不同类型的 key 会有不同的 hash 函数</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span> 10010111 | 000011110110110010001111001010100010010110010101010 │ 01010</span></span></code></pre></div><h2 id="三-找到-hash-对应的-bucket" tabindex="-1">三）找到 hash 对应的 bucket <a class="header-anchor" href="#三-找到-hash-对应的-bucket" aria-label="Permalink to &quot;三）找到 hash 对应的 bucket&quot;">​</a></h2><p>bucket 定位：<strong>哈希值的低 B 个 bit 位</strong>，用来定位 key 所存放的 bucket</p><p>如果当前正在扩容中，并且定位到的旧 bucket 数据还未完成迁移，则使用旧的 bucket（扩容前的 bucket）</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>hash := t.hasher(key, uintptr(h.hash0))</span></span>
<span class="line"><span>// 桶的个数m-1，即 1&lt;&lt;B-1,B=5时，则有0~31号桶</span></span>
<span class="line"><span>m := bucketMask(h.B)</span></span>
<span class="line"><span>// 计算哈希值对应的bucket</span></span>
<span class="line"><span>// t.bucketsize为一个bmap的大小，通过对哈希值和桶个数取模得到桶编号，通过对桶编号和buckets起始地址进行运算，获取哈希值对应的bucket</span></span>
<span class="line"><span>b := (*bmap)(add(h.buckets, (hash&amp;m)*uintptr(t.bucketsize)))</span></span>
<span class="line"><span>// 是否在扩容</span></span>
<span class="line"><span>if c := h.oldbuckets; c != nil {</span></span>
<span class="line"><span>  // 桶个数已经发生增长一倍，则旧bucket的桶个数为当前桶个数的一半</span></span>
<span class="line"><span>	if !h.sameSizeGrow() {</span></span>
<span class="line"><span>		// There used to be half as many buckets; mask down one more power of two.</span></span>
<span class="line"><span>		m &gt;&gt;= 1</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	// 计算哈希值对应的旧bucket</span></span>
<span class="line"><span>	oldb := (*bmap)(add(c, (hash&amp;m)*uintptr(t.bucketsize)))</span></span>
<span class="line"><span>	// 如果旧bucket的数据没有完成迁移，则使用旧bucket查找</span></span>
<span class="line"><span>	if !evacuated(oldb) {</span></span>
<span class="line"><span>		b = oldb</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="四-遍历-bucket-查找" tabindex="-1">四）遍历 bucket 查找 <a class="header-anchor" href="#四-遍历-bucket-查找" aria-label="Permalink to &quot;四）遍历 bucket 查找&quot;">​</a></h2><p>tophash 值定位：<strong>哈希值的高 8 个 bit 位</strong>，用来快速判断 key 是否已在当前 bucket 中（如果不在的话，需要去 bucket 的 overflow 中查找）</p><p>用步骤 2 中的 hash 值，得到高 8 个 bit 位，也就是<code>10010111</code>，转化为十进制，也就是<strong>151</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>top := tophash(hash)</span></span>
<span class="line"><span>func tophash(hash uintptr) uint8 {</span></span>
<span class="line"><span>	top := uint8(hash &gt;&gt; (goarch.PtrSize*8 - 8))</span></span>
<span class="line"><span>	if top &lt; minTopHash {</span></span>
<span class="line"><span>		top += minTopHash</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	return top</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>上面函数中 hash 是 64 位的，sys.PtrSize 值是 8，所以<code>top := uint8(hash &gt;&gt; (sys.PtrSize*8 - 8))</code>等效<code>top = uint8(hash &gt;&gt; 56)</code>，最后 top 取出来的值就是 hash 的高 8 位值</p><p>在 bucket 及 bucket 的 overflow 中寻找**tophash 值（HOB hash）为 151* 的 槽位*，即为 key 所在位置，找到了空槽位或者 2 号槽位，这样整个查找过程就结束了，其中找到空槽位代表没找到。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>for ; b != nil; b = b.overflow(t) {</span></span>
<span class="line"><span>		for i := uintptr(0); i &lt; bucketCnt; i++ {</span></span>
<span class="line"><span>			if b.tophash[i] != top {</span></span>
<span class="line"><span>			  // 未被使用的槽位，插入</span></span>
<span class="line"><span>				if b.tophash[i] == emptyRest {</span></span>
<span class="line"><span>					break bucketloop</span></span>
<span class="line"><span>				}</span></span>
<span class="line"><span>				continue</span></span>
<span class="line"><span>			}</span></span>
<span class="line"><span>			// 找到tophash值对应的的key</span></span>
<span class="line"><span>			k := add(unsafe.Pointer(b), dataOffset+i*uintptr(t.keysize))</span></span>
<span class="line"><span>			if t.key.equal(key, k) {</span></span>
<span class="line"><span>				e := add(unsafe.Pointer(b), dataOffset+bucketCnt*uintptr(t.keysize)+i*uintptr(t.elemsize))</span></span>
<span class="line"><span>				return e</span></span>
<span class="line"><span>			}</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span></code></pre></div><p><img src="https://cdn.jsdelivr.net/gh/caijinlin/imgcdn/f39e10e1474fda593cbca86eb0c517e2.png#id=FxLKr&amp;originHeight=2248&amp;originWidth=1766&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt=""></p><h2 id="五-返回-key-对应的指针" tabindex="-1">五）返回 key 对应的指针 <a class="header-anchor" href="#五-返回-key-对应的指针" aria-label="Permalink to &quot;五）返回 key 对应的指针&quot;">​</a></h2><p>如果通过上面的步骤找到了 key 对应的槽位下标 i，我们再详细分析下 key/value 值是如何获取的：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// keys的偏移量</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">dataOffset </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> unsafe.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Offsetof</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">struct</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  b </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">bmap</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  v </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int64</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}{}.v)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 一个bucket的元素个数</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">bucketCnt </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 8</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// key 定位公式</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">k </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(unsafe.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Pointer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(b),dataOffset</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">i</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*uintptr</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(t.keysize))</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// value 定位公式</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">v</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(unsafe.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Pointer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(b),dataOffset</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">bucketCnt</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*uintptr</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(t.keysize)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">i</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*uintptr</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(t.valuesize))</span></span></code></pre></div><p>bucket 里 keys 的起始地址就是 unsafe.Pointer(b)+dataOffset</p><p>第 i 个下标 key 的地址就要在此基础上跨过 i 个 key 的大小；</p><p>而我们又知道，value 的地址是在所有 key 之后，因此第 i 个下标 value 的地址还需要加上所有 key 的偏移。</p>`,31),e=[i];function l(h,c,o,k,d,r){return n(),a("div",null,e)}const m=s(p,[["render",l]]);export{g as __pageData,m as default};
