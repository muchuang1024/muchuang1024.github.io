import{_ as a,c as s,o as n,a4 as p}from"./chunks/framework.4aTu-Nia.js";const b=JSON.parse('{"title":"一、基本概念","description":"","frontmatter":{},"headers":[],"relativePath":"docs/01 学习/课程/Golang/Go 源码/Go 源码 | Go map 的底层实现原理.md","filePath":"docs/01 学习/课程/Golang/Go 源码/Go 源码 | Go map 的底层实现原理.md"}'),e={name:"docs/01 学习/课程/Golang/Go 源码/Go 源码 | Go map 的底层实现原理.md"},t=p(`<h1 id="一、基本概念" tabindex="-1">一、基本概念 <a class="header-anchor" href="#一、基本概念" aria-label="Permalink to &quot;一、基本概念&quot;">​</a></h1><p>Go 中的 <code>map</code> 是一种非常方便的数据结构，它提供了键值对的存储和快速检索功能。</p><h1 id="二、底层原理" tabindex="-1">二、底层原理 <a class="header-anchor" href="#二、底层原理" aria-label="Permalink to &quot;二、底层原理&quot;">​</a></h1><p>Go 中的 map 是一个指针，占用 8 个字节，指向 hmap 结构体，源码包中 src/runtime/map.go 定义了 hmap 的数据结构：</p><p>hmap 包含若干个结构为 bmap 的数组，每个 bmap 底层都采用链表结构，bmap 通常叫其 bucket</p><p><img src="https://cdn.jsdelivr.net/gh/caijinlin/imgcdn/640.png#id=bnJdx&amp;originHeight=817&amp;originWidth=962&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt=""></p><h2 id="一-hmap-结构体" tabindex="-1">一）hmap 结构体 <a class="header-anchor" href="#一-hmap-结构体" aria-label="Permalink to &quot;一）hmap 结构体&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// A header for a Go map.</span></span>
<span class="line"><span>type hmap struct {</span></span>
<span class="line"><span>    count     int</span></span>
<span class="line"><span>    // 代表哈希表中的元素个数，调用len(map)时，返回的就是该字段值。</span></span>
<span class="line"><span>    flags     uint8</span></span>
<span class="line"><span>    // 状态标志（是否处于正在写入的状态等）</span></span>
<span class="line"><span>    B         uint8</span></span>
<span class="line"><span>    // buckets（桶）的对数</span></span>
<span class="line"><span>    // 如果B=5，则buckets数组的长度 = 2^B=32，意味着有32个桶</span></span>
<span class="line"><span>    noverflow uint16</span></span>
<span class="line"><span>    // 溢出桶的数量</span></span>
<span class="line"><span>    hash0     uint32</span></span>
<span class="line"><span>    // 生成hash的随机数种子</span></span>
<span class="line"><span>    buckets    unsafe.Pointer</span></span>
<span class="line"><span>    // 指向buckets数组的指针，数组大小为2^B，如果元素个数为0，它为nil。</span></span>
<span class="line"><span>    oldbuckets unsafe.Pointer</span></span>
<span class="line"><span>    // 如果发生扩容，oldbuckets是指向老的buckets数组的指针，老的buckets数组大小是新的buckets的1/2;非扩容状态下，它为nil。</span></span>
<span class="line"><span>    nevacuate  uintptr</span></span>
<span class="line"><span>    // 表示扩容进度，小于此地址的buckets代表已搬迁完成。</span></span>
<span class="line"><span>    extra *mapextra</span></span>
<span class="line"><span>    // 存储溢出桶，这个字段是为了优化GC扫描而设计的，下面详细介绍</span></span>
<span class="line"><span> }</span></span></code></pre></div><h2 id="二-bmap-结构体" tabindex="-1">二）bmap 结构体 <a class="header-anchor" href="#二-bmap-结构体" aria-label="Permalink to &quot;二）bmap 结构体&quot;">​</a></h2><p><code>bmap</code> 就是我们常说的“桶”，一个桶里面会最多装 8 个 key，这些 key 之所以会落入同一个桶，是因为它们经过哈希计算后，哈希结果的低 B 位是相同的，关于 key 的定位我们在 map 的查询中详细说明。在桶内，又会根据 key 计算出来的 hash 值的高 8 位来决定 key 到底落入桶内的哪个位置（一个桶内最多有 8 个位置)。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// A bucket for a Go map.</span></span>
<span class="line"><span>type bmap struct {</span></span>
<span class="line"><span>    tophash [bucketCnt]uint8</span></span>
<span class="line"><span>    // len为8的数组</span></span>
<span class="line"><span>    // 用来快速定位key是否在这个bmap中</span></span>
<span class="line"><span>    // 一个桶最多8个槽位，如果key所在的tophash值在tophash中，则代表该key在这个桶中</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>上面 bmap 结构是静态结构，在编译过程中<code>runtime.bmap</code>会拓展成以下结构体：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>type bmap struct{</span></span>
<span class="line"><span>	tophash [8]uint8</span></span>
<span class="line"><span>	keys [8]keytype</span></span>
<span class="line"><span>	// keytype 由编译器编译时候确定</span></span>
<span class="line"><span>	values [8]elemtype</span></span>
<span class="line"><span>	// elemtype 由编译器编译时候确定</span></span>
<span class="line"><span>	overflow uintptr</span></span>
<span class="line"><span>	// overflow指向下一个bmap，overflow是uintptr而不是*bmap类型，保证bmap完全不含指针，是为了减少gc，溢出桶存储到extra字段中</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>tophash 就是用于实现快速定位 key 的位置，在实现过程中会使用 key 的 hash 值的高 8 位作为 tophash 值，存放在 bmap 的 tophash 字段中</p><p>tophash 字段不仅存储 key 哈希值的高 8 位，还会存储一些状态值，用来表明当前桶单元状态，这些状态值都是小于 minTopHash 的</p><p>为了避免 key 哈希值的高 8 位值和这些状态值相等，产生混淆情况，所以当 key 哈希值高 8 位若小于 minTopHash 时候，自动将其值加上 minTopHash 作为该 key 的 tophash。桶单元的状态值如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>emptyRest      = 0 // 表明此桶单元为空，且更高索引的单元也是空</span></span>
<span class="line"><span>emptyOne       = 1 // 表明此桶单元为空</span></span>
<span class="line"><span>evacuatedX     = 2 // 用于表示扩容迁移到新桶前半段区间</span></span>
<span class="line"><span>evacuatedY     = 3 // 用于表示扩容迁移到新桶后半段区间</span></span>
<span class="line"><span>evacuatedEmpty = 4 // 用于表示此单元已迁移</span></span>
<span class="line"><span>minTopHash     = 5 // key的tophash值与桶状态值分割线值，小于此值的一定代表着桶单元的状态，大于此值的一定是key对应的tophash值</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func tophash(hash uintptr) uint8 {</span></span>
<span class="line"><span>	top := uint8(hash &gt;&gt; (goarch.PtrSize*8 - 8))</span></span>
<span class="line"><span>	if top &lt; minTopHash {</span></span>
<span class="line"><span>		top += minTopHash</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	return top</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="三-mapextra-结构体" tabindex="-1">三）mapextra 结构体 <a class="header-anchor" href="#三-mapextra-结构体" aria-label="Permalink to &quot;三）mapextra 结构体&quot;">​</a></h2><p>当 map 的 key 和 value 都不是指针类型时候，bmap 将完全不包含指针，那么 gc 时候就不用扫描 bmap。bmap 指向溢出桶的字段 overflow 是 uintptr 类型，为了防止这些 overflow 桶被 gc 掉，所以需要 mapextra.overflow 将它保存起来。如果 bmap 的 overflow 是*bmap 类型，那么 gc 扫描的是一个个拉链表，效率明显不如直接扫描一段内存(hmap.mapextra.overflow)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>type mapextra struct {</span></span>
<span class="line"><span>    overflow    *[]*bmap</span></span>
<span class="line"><span>    // overflow 包含的是 hmap.buckets 的 overflow 的 buckets</span></span>
<span class="line"><span>    oldoverflow *[]*bma</span></span>
<span class="line"><span>   // oldoverflow 包含扩容时 hmap.oldbuckets 的 overflow 的 bucket</span></span>
<span class="line"><span>  	nextOverflow *bmap</span></span>
<span class="line"><span> 	 // 指向空闲的 overflow bucket 的指针</span></span>
<span class="line"><span>}</span></span></code></pre></div><h1 id="三、总结" tabindex="-1">三、总结 <a class="header-anchor" href="#三、总结" aria-label="Permalink to &quot;三、总结&quot;">​</a></h1><p>bmap（bucket）内存数据结构可视化如下:</p><p>注意到 key 和 value 是各自放在一起的，并不是 <code>key/value/key/value/...</code> 这样的形式，当 key 和 value 类型不一样的时候，key 和 value 占用字节大小不一样，使用 key/value 这种形式可能会因为内存对齐导致内存空间浪费，所以 Go 采用 key 和 value 分开存储的设计，更节省内存空间</p><p><img src="https://cdn.jsdelivr.net/gh/caijinlin/imgcdn/640-20220309173633627.png#id=rI7Co&amp;originHeight=501&amp;originWidth=480&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt=""></p><h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-label="Permalink to &quot;&quot;">​</a></h2>`,25),l=[t];function i(o,c,h,r,m,d){return n(),s("div",null,l)}const k=a(e,[["render",i]]);export{b as __pageData,k as default};
