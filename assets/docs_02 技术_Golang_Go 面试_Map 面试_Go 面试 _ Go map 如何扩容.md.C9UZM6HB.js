import{_ as s,c as a,o as n,a4 as p}from"./chunks/framework.4aTu-Nia.js";const k=JSON.parse('{"title":"一、扩容时机","description":"","frontmatter":{},"headers":[],"relativePath":"docs/02 技术/Golang/Go 面试/Map 面试/Go 面试 | Go map 如何扩容.md","filePath":"docs/02 技术/Golang/Go 面试/Map 面试/Go 面试 | Go map 如何扩容.md"}'),e={name:"docs/02 技术/Golang/Go 面试/Map 面试/Go 面试 | Go map 如何扩容.md"},l=p(`<h1 id="一、扩容时机" tabindex="-1">一、扩容时机 <a class="header-anchor" href="#一、扩容时机" aria-label="Permalink to &quot;一、扩容时机&quot;">​</a></h1><p>在向 map 插入新 key 的时候，会进行条件检测，符合下面这 2 个条件，就会触发扩容</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>if !h.growing() &amp;&amp; (overLoadFactor(h.count+1, h.B) || tooManyOverflowBuckets(h.noverflow, h.B)) {</span></span>
<span class="line"><span>  hashGrow(t, h)</span></span>
<span class="line"><span>  goto again // Growing the table invalidates everything, so try again</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>// 判断是否在扩容</span></span>
<span class="line"><span>func (h *hmap) growing() bool {</span></span>
<span class="line"><span>  return h.oldbuckets != nil</span></span>
<span class="line"><span>}</span></span></code></pre></div><h1 id="二、扩容条件" tabindex="-1">二、扩容条件 <a class="header-anchor" href="#二、扩容条件" aria-label="Permalink to &quot;二、扩容条件&quot;">​</a></h1><p><strong>1、超过负载</strong></p><p>map 元素个数 &gt; 6.5 * 桶个数</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func overLoadFactor(count int, B uint8) bool {</span></span>
<span class="line"><span>   return count &gt; bucketCnt &amp;&amp; uintptr(count) &gt; loadFactor*bucketShift(B)</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>bucketCnt = 8，一个桶可以装的最大元素个数</p><p>loadFactor = 6.5，负载因子，平均每个桶的元素个数</p><p>bucketShift(B): 桶的个数</p><p><strong>2、溢出桶太多</strong></p><p>当桶总数 &lt; 2 ^ 15 时，如果溢出桶总数 &gt;= 桶总数，则认为溢出桶过多。</p><p>当桶总数 &gt;= 2 ^ 15 时，直接与 2 ^ 15 比较，当溢出桶总数 &gt;= 2 ^ 15 时，即认为溢出桶太多了。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func tooManyOverflowBuckets(noverflow uint16, B uint8) bool {</span></span>
<span class="line"><span>  if B &gt; 15 {</span></span>
<span class="line"><span>    B = 15</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  // The compiler doesn&#39;t see here that B &lt; 16; mask B to generate shorter shift code.</span></span>
<span class="line"><span>  return noverflow &gt;= uint16(1)&lt;&lt;(B&amp;15)</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>对于条件 2，其实算是对条件 1 的补充。因为在负载因子比较小的情况下，有可能 map 的查找和插入效率也很低，而第 1 点识别不出来这种情况。</p><p>表面现象就是负载因子比较小比较小，即 map 里元素总数少，但是桶数量多（真实分配的桶数量多，包括大量的溢出桶）。比如不断的增删，这样会造成 overflow 的 bucket 数量增多，但负载因子又不高，达不到第 1 点的临界值，就不能触发扩容来缓解这种情况。</p><p>这样会造成桶的使用率不高，值存储得比较稀疏，查找插入效率会变得非常低，因此有了第 2 扩容条件。</p><h1 id="三、扩容机制" tabindex="-1">三、扩容机制 <a class="header-anchor" href="#三、扩容机制" aria-label="Permalink to &quot;三、扩容机制&quot;">​</a></h1><p><strong>1、双倍扩容</strong></p><p>针对条件 1，新建一个 buckets 数组，新的 buckets 大小是原来的 2 倍，然后旧 buckets 数据搬迁到新的 buckets。该方法我们称之为双倍扩容</p><p><strong>2、等量扩容</strong></p><p>针对条件 2，并不扩大容量，buckets 数量维持不变，重新做一遍类似双倍扩容的搬迁动作，把松散的键值对重新排列一次，使得同一个 bucket 中的 key 排列地更紧密，节省空间，提高 bucket 利用率，进而保证更快的存取。该方法我们称之为等量扩容。</p><p><strong>3、扩容函数</strong></p><p>上面说的 hashGrow() 函数实际上并没有真正地“搬迁”，它只是分配好了新的 buckets，并将老的 buckets 挂到了 oldbuckets 字段上。真正搬迁 buckets 的动作在 growWork() 函数中，而调用 growWork() 函数的动作是在 mapassign 和 mapdelete 函数中。</p><p>也就是插入或修改、删除 key 的时候，都会尝试进行搬迁 buckets 的工作。先检查 oldbuckets 是否搬迁完毕，具体来说就是检查 oldbuckets 是否为 nil</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span> 1	func hashGrow(t *maptype, h *hmap) {</span></span>
<span class="line"><span> 2  // 如果达到条件 1，那么将B值加1，相当于是原来的2倍</span></span>
<span class="line"><span> 3  // 否则对应条件 2，进行等量扩容，所以 B 不变</span></span>
<span class="line"><span> 4    bigger := uint8(1)</span></span>
<span class="line"><span> 5    if !overLoadFactor(h.count+1, h.B) {</span></span>
<span class="line"><span> 6        bigger = 0</span></span>
<span class="line"><span> 7        h.flags |= sameSizeGrow</span></span>
<span class="line"><span> 8    }</span></span>
<span class="line"><span> 9  // 记录老的buckets</span></span>
<span class="line"><span>10    oldbuckets := h.buckets</span></span>
<span class="line"><span>11  // 申请新的buckets空间</span></span>
<span class="line"><span>12    newbuckets, nextOverflow := makeBucketArray(t, h.B+bigger, nil)</span></span>
<span class="line"><span>13  // 注意&amp;^ 运算符，这块代码的逻辑是转移标志位</span></span>
<span class="line"><span>14    flags := h.flags &amp;^ (iterator | oldIterator)</span></span>
<span class="line"><span>15    if h.flags&amp;iterator != 0 {</span></span>
<span class="line"><span>16        flags |= oldIterator</span></span>
<span class="line"><span>17    }</span></span>
<span class="line"><span>18    // 提交grow (atomic wrt gc)</span></span>
<span class="line"><span>19    h.B += bigger</span></span>
<span class="line"><span>20    h.flags = flags</span></span>
<span class="line"><span>21    h.oldbuckets = oldbuckets</span></span>
<span class="line"><span>22    h.buckets = newbuckets</span></span>
<span class="line"><span>23  // 搬迁进度为0</span></span>
<span class="line"><span>24    h.nevacuate = 0</span></span>
<span class="line"><span>25  // overflow buckets 数为0</span></span>
<span class="line"><span>26    h.noverflow = 0</span></span>
<span class="line"><span>27</span></span>
<span class="line"><span>28  // 如果发现hmap是通过extra字段 来存储 overflow buckets时</span></span>
<span class="line"><span>29    if h.extra != nil &amp;&amp; h.extra.overflow != nil {</span></span>
<span class="line"><span>30        if h.extra.oldoverflow != nil {</span></span>
<span class="line"><span>31            throw(&quot;oldoverflow is not nil&quot;)</span></span>
<span class="line"><span>32        }</span></span>
<span class="line"><span>33        h.extra.oldoverflow = h.extra.overflow</span></span>
<span class="line"><span>34        h.extra.overflow = nil</span></span>
<span class="line"><span>35    }</span></span>
<span class="line"><span>36    if nextOverflow != nil {</span></span>
<span class="line"><span>37        if h.extra == nil {</span></span>
<span class="line"><span>38            h.extra = new(mapextra)</span></span>
<span class="line"><span>39        }</span></span>
<span class="line"><span>40        h.extra.nextOverflow = nextOverflow</span></span>
<span class="line"><span>41    }</span></span>
<span class="line"><span>42}</span></span></code></pre></div><p>由于 map 扩容需要将原有的 key/value 重新搬迁到新的内存地址，如果 map 存储了数以亿计的 key-value，一次性搬迁将会造成比较大的延时。</p><p>因此 Go map 的扩容采取了一种称为“渐进式”的方式，原有的 key 并不会一次性搬迁完毕，每次最多只会搬迁 2 个 bucket。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func growWork(t *maptype, h *hmap, bucket uintptr) {</span></span>
<span class="line"><span>  // 为了确认搬迁的 bucket 是我们正在使用的 bucket</span></span>
<span class="line"><span>  // 即如果当前key映射到老的bucket1，那么就搬迁该bucket1。</span></span>
<span class="line"><span>  evacuate(t, h, bucket&amp;h.oldbucketmask())</span></span>
<span class="line"><span>  // 如果还未完成扩容工作，则再搬迁一个bucket。</span></span>
<span class="line"><span>  if h.growing() {</span></span>
<span class="line"><span>    evacuate(t, h, h.nevacuate)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,29),t=[l];function o(c,i,r,h,u,d){return n(),a("div",null,t)}const b=s(e,[["render",o]]);export{k as __pageData,b as default};
