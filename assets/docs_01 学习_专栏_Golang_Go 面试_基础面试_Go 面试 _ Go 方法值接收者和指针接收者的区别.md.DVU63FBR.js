import{_ as s,c as n,o as a,a4 as t}from"./chunks/framework.4aTu-Nia.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/01 学习/专栏/Golang/Go 面试/基础面试/Go 面试 | Go 方法值接收者和指针接收者的区别.md","filePath":"docs/01 学习/专栏/Golang/Go 面试/基础面试/Go 面试 | Go 方法值接收者和指针接收者的区别.md"}'),p={name:"docs/01 学习/专栏/Golang/Go 面试/基础面试/Go 面试 | Go 方法值接收者和指针接收者的区别.md"},e=t(`<p>在 Go 语言中，方法可以有两种类型的接收者：值接收者（Value Receiver）和指针接收者（Pointer Receiver）。这两种接收者在方法定义和行为上有一些关键的区别：</p><p>1、<strong>值接收者</strong></p><p>当方法使用值接收者时，它在每次方法调用时都会获取接收者的一个副本。</p><p>这意味着方法对接收者的任何修改都不会影响原始对象。</p><p>值接收者适用于小型结构体或希望保持不可变性的情况。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>type MyStruct struct {</span></span>
<span class="line"><span>    Field int</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 值接收者</span></span>
<span class="line"><span>func (s MyStruct) ValueReceiverMethod() {</span></span>
<span class="line"><span>    s.Field = 10</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>2、<strong>指针接收者</strong></p><p>指针接收者允许直接修改接收者指向的原始对象。</p><p>这种方式在方法调用时不会创建接收者的副本，因此对于大型结构体或需要修改状态的场景更有效率。</p><p>使用指针接收者可以避免每次调用时的内存拷贝，提高性能。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>type MyStruct struct {</span></span>
<span class="line"><span>    Field int</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// 指针接收者</span></span>
<span class="line"><span>func (s *MyStruct) PointerReceiverMethod() {</span></span>
<span class="line"><span>    s.Field = 10</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>3、<strong>两者区别</strong></p><table><thead><tr><th>特性</th><th>值接收者</th><th>指针接收者</th></tr></thead><tbody><tr><td>内存副本</td><td>创建接收者的副本，原始对象不受影响。</td><td>直接使用原始对象的指针，无副本创建。</td></tr><tr><td>修改对象</td><td>不能修改原始对象。方法内的修改只影响副本。</td><td>可以修改原始对象。</td></tr><tr><td>适用场景</td><td>适用于小型结构体或不需要修改对象的情况。</td><td>适用于大型结构体或需要修改对象状态的情况。</td></tr><tr><td>性能</td><td>对于小对象，性能较好；大对象可能导致较大开销。</td><td>避免了内存拷贝，对于大对象性能较好。</td></tr></tbody></table>`,13),o=[e];function d(l,c,i,r,_,h){return a(),n("div",null,o)}const v=s(p,[["render",d]]);export{g as __pageData,v as default};
