import{_ as t,c as a,o as s,a4 as n}from"./chunks/framework.4aTu-Nia.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/01 学习/课程/Golang/Go 面试/基础面试/Go 面试 | Go 方法与函数的区别.md","filePath":"docs/01 学习/课程/Golang/Go 面试/基础面试/Go 面试 | Go 方法与函数的区别.md"}'),e={name:"docs/01 学习/课程/Golang/Go 面试/基础面试/Go 面试 | Go 方法与函数的区别.md"},d=n(`<p>在 Go 语言中，函数和方法不太一样，有明确的概念区分。其他语言中，比如 Java，一般来说函数就是方法，方法就是函数</p><p>1、方法</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func (t *T) add(a, b int) int {</span></span>
<span class="line"><span>    return a + b</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>其中 T 是自定义类型或者结构体，不能是基础数据类型 int 等</p><p>2、函数</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func add(a, b int) int {</span></span>
<span class="line"><span>    return a + b</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>3、两者区别</p><table><thead><tr><th>特性</th><th>方法(Method)</th><th>函数(Function)</th></tr></thead><tbody><tr><td>关联对象</td><td>与特定类型（如结构体、类型别名）关联。</td><td>独立于类型，可以在包的任何地方定义。</td></tr><tr><td>接收者</td><td>有接收者，表示方法属于并可访问该类型的实例或指针。</td><td>没有接收者，仅定义参数列表和返回值。</td></tr><tr><td>调用方式</td><td>通过类型的实例或指针调用。</td><td>直接使用函数名和参数列表调用。</td></tr><tr><td>定义位置</td><td>必须在一个具体的类型定义内部。</td><td>可以在包的任何位置定义，不依赖于特定类型。</td></tr></tbody></table>`,8),p=[d];function o(c,i,l,_,r,h){return s(),a("div",null,p)}const g=t(e,[["render",o]]);export{b as __pageData,g as default};
