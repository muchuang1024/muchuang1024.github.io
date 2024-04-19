import{_ as a,c as o,o as p,a4 as e}from"./chunks/framework.4aTu-Nia.js";const G=JSON.parse('{"title":"一、什么是负载因子","description":"","frontmatter":{},"headers":[],"relativePath":"docs/01 学习/课程/Golang/Go 面试/Map 面试/Go 面试 | Go map 的负载因子为什么是6.5.md","filePath":"docs/01 学习/课程/Golang/Go 面试/Map 面试/Go 面试 | Go map 的负载因子为什么是6.5.md"}'),t={name:"docs/01 学习/课程/Golang/Go 面试/Map 面试/Go 面试 | Go map 的负载因子为什么是6.5.md"},_=e('<p>在 Go 语言中，map 的负载因子（load factor）是指哈希表中已填充的位置占总位置的比例。当这个比例超过一定阈值时，map 会进行扩容，以保持操作的效率。Go 语言选择 6.5 作为负载因子的阈值是出于性能和内存使用的平衡考虑。</p><h1 id="一、什么是负载因子" tabindex="-1">一、什么是负载因子 <a class="header-anchor" href="#一、什么是负载因子" aria-label="Permalink to &quot;一、什么是负载因子&quot;">​</a></h1><p>负载因子（load factor），用于衡量当前哈希表中空间占用率的核心指标，就是平均每个 bucket 存储的元素个数。</p><p>计算公式如下： LoadFactor（负载因子）= hash 表中已存储的键值对的总数量 /hash 桶的个数（即 hmap 结构中 buckets 数组的个数）</p><p>在 Go 语言中，map 的负载因子（load factor）默认值为 6.5，当负载因子达到 6.5 时，Go 会自动触发扩容操作，将哈希表容量翻倍，并重新分配元素，以保持性能和内存的平衡。</p><p>这种自动管理的方式使得使用 map 变得非常方便，同时也可以获得不错的性能。</p><h1 id="二、为什么是-6-5" tabindex="-1">二、为什么是 6.5 <a class="header-anchor" href="#二、为什么是-6-5" aria-label="Permalink to &quot;二、为什么是 6.5&quot;">​</a></h1><p>为什么 Go 语言中哈希表的负载因子是 6.5，为什么不是 8，也不是 1。这里面有可靠的数据支撑吗？</p><p>实际上这是 Go 官方的经过认真的测试得出的数字，一起来看看官方的这份测试报告，报告中共包含 4 个关键指标，如下：</p><p>loadFactor：负载因子，也有叫装载因子</p><p>%overflow：溢出率，有溢出 bukcet 的百分比</p><p>bytes/entry：平均每对 key/value 的开销字节数</p><p>hitprobe：查找一个存在的 key 时，要查找的平均个数</p><p>missprobe：查找一个不存在的 key 时，要查找的平均个数</p><p>为什么选择 6.5 作为默认负载因子呢？这是一种权衡的结果，考虑了性能和内存的因素：</p><p>减少哈希冲突： 较低的负载因子可以减少哈希冲突的发生。哈希冲突是指多个键被映射到同一个哈希桶的情况。通过保持较低的负载因子，可以减少冲突，提高 map 的性能。</p><p>减少内存浪费： 较高的负载因子可以减少内存的浪费。如果负载因子设置得太低，会导致哈希表过于稀疏，浪费大量内存。选择适度的负载因子可以在一定程度上平衡内存和性能。</p><p>重新哈希成本： 哈希表的扩容操作会引入一定的成本，因为它涉及到重新计算哈希值、重新分配桶等操作。过于频繁的扩容会影响性能，因此选择一个适度的负载因子可以减少扩容的次数。</p><p>Go 官方的经过认真的测试得出的数字，一起来看看官方的这份测试报告。</p>',19),r=[_];function c(s,n,d,l,i,h){return p(),o("div",null,r)}const f=a(t,[["render",c]]);export{G as __pageData,f as default};
