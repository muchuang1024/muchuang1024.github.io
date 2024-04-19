import{_ as a,c as s,o as p,a4 as n}from"./chunks/framework.4aTu-Nia.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/01 学习/课程/Golang/Go 面试/Map 面试/Go 面试 | Go map 和 sync.Map 谁的性能好.md","filePath":"docs/01 学习/课程/Golang/Go 面试/Map 面试/Go 面试 | Go map 和 sync.Map 谁的性能好.md"}'),e={name:"docs/01 学习/课程/Golang/Go 面试/Map 面试/Go 面试 | Go map 和 sync.Map 谁的性能好.md"},t=n(`<p>Go 语言的 sync.Map 支持并发读写，采取了 “空间换时间” 的机制，冗余了两个数据结构，分别是：read 和 dirty</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>type Map struct {</span></span>
<span class="line"><span>   mu Mutex</span></span>
<span class="line"><span>   read atomic.Value // readOnly</span></span>
<span class="line"><span>   dirty map[interface{}]*entry</span></span>
<span class="line"><span>   misses int</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>对比原始 map：</p><p>和原始 map+RWLock 的实现并发的方式相比，sync.Map 减少了加锁对性能的影响。它做了一些优化：可以无锁访问 read map，而且会优先操作 read map，倘若只操作 read map 就可以满足要求，那就不用去操作 write map(dirty)，所以在某些特定场景中它发生锁竞争的频率会远远小于 map+RWLock 的实现方式</p><p>优点：适合读多写少的场景</p><p>缺点：写多的场景，会导致 read map 缓存失效，需要加锁，冲突变多，性能急剧下降</p>`,6),o=[t];function c(_,i,r,d,l,m){return p(),s("div",null,o)}const y=a(e,[["render",c]]);export{u as __pageData,y as default};
