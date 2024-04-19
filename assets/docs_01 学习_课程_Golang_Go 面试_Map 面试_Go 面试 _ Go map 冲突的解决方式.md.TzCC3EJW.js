import{_ as a,c as s,o as e,a4 as n}from"./chunks/framework.4aTu-Nia.js";const m=JSON.parse('{"title":"一、链地址法","description":"","frontmatter":{},"headers":[],"relativePath":"docs/01 学习/课程/Golang/Go 面试/Map 面试/Go 面试 | Go map 冲突的解决方式.md","filePath":"docs/01 学习/课程/Golang/Go 面试/Map 面试/Go 面试 | Go map 冲突的解决方式.md"}'),t={name:"docs/01 学习/课程/Golang/Go 面试/Map 面试/Go 面试 | Go map 冲突的解决方式.md"},o=n(`<p>在发生哈希冲突时，Python 中 dict 采用的开放寻址法，Java 的 HashMap 采用的是链地址法，而 Go map 也采用链地址法解决冲突，具体就是<strong>插入 key 到 map 中时</strong>，当 key 定位的桶<strong>填满 8 个元素后</strong>（这里的单元就是桶，不是元素），将会创建一个溢出桶，并且将溢出桶插入当前桶所在链表尾部。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>if inserti == nil {</span></span>
<span class="line"><span>		// all current buckets are full, allocate a new one.</span></span>
<span class="line"><span>		newb := h.newoverflow(t, b)</span></span>
<span class="line"><span>		// 创建一个新的溢出桶</span></span>
<span class="line"><span>		inserti = &amp;newb.tophash[0]</span></span>
<span class="line"><span>		insertk = add(unsafe.Pointer(newb), dataOffset)</span></span>
<span class="line"><span>		elem = add(insertk, bucketCnt*uintptr(t.keysize))</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>比较常用的 Hash 冲突解决方案有链地址法和开放寻址法：</p><h1 id="一、链地址法" tabindex="-1">一、链地址法 <a class="header-anchor" href="#一、链地址法" aria-label="Permalink to &quot;一、链地址法&quot;">​</a></h1><p>当哈希冲突发生时，创建新<strong>单元</strong>，并将新单元添加到冲突单元所在链表的尾部。</p><h1 id="二、开放寻址法" tabindex="-1">二、开放寻址法 <a class="header-anchor" href="#二、开放寻址法" aria-label="Permalink to &quot;二、开放寻址法&quot;">​</a></h1><p>当哈希冲突发生时，从发生冲突的那个<strong>单元</strong>起，按照一定的次序，从哈希表中寻找一个空闲的单元，然后把发生冲突的元素存入到该单元。<strong>开放寻址法需要的表长度要大于等于所需要存放的元素数量</strong></p><p>开放寻址法有多种方式：线性探测法、平方探测法、随机探测法和双重哈希法。这里以线性探测法来帮助读者理解开放寻址法思想</p><h2 id="一-线性探测法" tabindex="-1">一）线性探测法 <a class="header-anchor" href="#一-线性探测法" aria-label="Permalink to &quot;一）线性探测法&quot;">​</a></h2><p>设 <code>Hash(key)</code> 表示关键字 <code>key</code> 的哈希值， 表示哈希表的槽位数（哈希表的大小）。</p><p>线性探测法则可以表示为：</p><p>如果 <code>Hash(x) % M</code> 已经有数据，则尝试 <code>(Hash(x) + 1) % M</code> ;</p><p>如果 <code>(Hash(x) + 1) % M</code> 也有数据了，则尝试 <code>(Hash(x) + 2) % M</code> ;</p><p>如果 <code>(Hash(x) + 2) % M</code> 也有数据了，则尝试 <code>(Hash(x) + 3) % M</code> ;</p><h1 id="三-两种解决方案比较" tabindex="-1">三）两种解决方案比较 <a class="header-anchor" href="#三-两种解决方案比较" aria-label="Permalink to &quot;三）两种解决方案比较&quot;">​</a></h1><p>对于链地址法，基于数组 + 链表进行存储，链表节点可以在需要时再创建，不必像开放寻址法那样事先申请好足够内存，因此链地址法对于内存的利用率会比开方寻址法高。链地址法对装载因子的容忍度会更高，并且适合存储大对象、大数据量的哈希表。而且相较于开放寻址法，它更加灵活，支持更多的优化策略，比如可采用红黑树代替链表。但是链地址法需要额外的空间来存储指针。</p><p>对于开放寻址法，它只有数组一种数据结构就可完成存储，继承了数组的优点，对 CPU 缓存友好，易于序列化操作。但是它对内存的利用率不如链地址法，且发生冲突时代价更高。<strong>当数据量明确、装载因子小，适合采用开放寻址法。</strong></p>`,17),p=[o];function c(r,l,i,d,h,_){return e(),s("div",null,p)}const g=a(t,[["render",c]]);export{m as __pageData,g as default};
