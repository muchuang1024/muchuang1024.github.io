import{_ as s,c as n,o as a,a4 as p}from"./chunks/framework.4aTu-Nia.js";const G=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/01 学习/专栏/Golang/Go 面试/Slice 面试/Go 面试 | Go slice 为什么不是线程安全的.md","filePath":"docs/01 学习/专栏/Golang/Go 面试/Slice 面试/Go 面试 | Go slice 为什么不是线程安全的.md"}'),e={name:"docs/01 学习/专栏/Golang/Go 面试/Slice 面试/Go 面试 | Go slice 为什么不是线程安全的.md"},l=p(`<p>1、先看下线程安全的定义</p><p>多个线程访问同一个对象时，调用这个对象的行为都可以获得正确的结果，那么这个对象就是线程安全的。</p><p>若有多个线程同时执行写操作，一般都需要考虑线程同步，否则的话就可能影响线程安全。</p><p>2、Go 语言实现线程安全常用的几种方式</p><ul><li>互斥锁</li><li>读写锁</li><li>原子操作</li><li>sync.once</li><li>sync.atomic</li><li>channel</li></ul><p>3、slice 底层结构并没有使用加锁等方式，不支持并发读写，所以并不是线程安全的</p><p>使用多个 goroutine 对类型为 slice 的变量进行操作，每次输出的值大概率都不会一样，与预期值不一致; slice 在并发执行中不会报错，但是数据会丢失</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func TestSliceConcurrencySafe(t *testing.T) {</span></span>
<span class="line"><span> a := make([]int, 0)</span></span>
<span class="line"><span> var wg sync.WaitGroup</span></span>
<span class="line"><span> for i := 0; i &lt; 10000; i++ {</span></span>
<span class="line"><span>  wg.Add(1)</span></span>
<span class="line"><span>  go func(i int) {</span></span>
<span class="line"><span> &amp;nbsp; a = append(a, i)</span></span>
<span class="line"><span> &amp;nbsp; wg.Done()</span></span>
<span class="line"><span>  }(i)</span></span>
<span class="line"><span> }</span></span>
<span class="line"><span> wg.Wait()</span></span>
<span class="line"><span> t.Log(len(a))</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出结果不等于 10000</p>`,9),i=[l];function c(o,t,_,r,d,g){return a(),n("div",null,i)}const m=s(e,[["render",c]]);export{G as __pageData,m as default};
