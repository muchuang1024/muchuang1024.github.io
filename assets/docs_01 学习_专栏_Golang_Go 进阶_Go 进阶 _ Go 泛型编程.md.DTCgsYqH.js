import{_ as s,c as a,o as n,a4 as p}from"./chunks/framework.4aTu-Nia.js";const _=JSON.parse('{"title":"一、基本概念","description":"","frontmatter":{},"headers":[],"relativePath":"docs/01 学习/专栏/Golang/Go 进阶/Go 进阶 | Go 泛型编程.md","filePath":"docs/01 学习/专栏/Golang/Go 进阶/Go 进阶 | Go 泛型编程.md"}'),i={name:"docs/01 学习/专栏/Golang/Go 进阶/Go 进阶 | Go 泛型编程.md"},e=p(`<p>泛型编程是一种编程范式，它允许编写具有参数化类型的代码，从而增加代码的复用性和灵活性。在泛型编程中，你可以编写一段代码，使其适用于不同类型的参数，而不需要为每种类型编写不同的实现。</p><p>在过去的 Go 版本中，Go 不支持泛型编程，这意味着你需要为不同类型编写特定的函数或数据结构。不过，自 Go 1.18 版本起，Go 引入了泛型支持，这使得在 Go 中编写泛型代码变得更加容易和灵活。</p><h1 id="一、基本概念" tabindex="-1">一、基本概念 <a class="header-anchor" href="#一、基本概念" aria-label="Permalink to &quot;一、基本概念&quot;">​</a></h1><p>泛型是 Go 1.18 版本中引入的一项功能，允许在函数和数据结构中使用参数化类型，以增加代码的复用性和灵活性。</p><h2 id="如何声明一个泛型函数" tabindex="-1">如何声明一个泛型函数 <a class="header-anchor" href="#如何声明一个泛型函数" aria-label="Permalink to &quot;如何声明一个泛型函数&quot;">​</a></h2><p>你可以使用以下语法声明一个泛型函数：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> functionName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">T</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> any</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">](</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">params</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> T</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 函数体</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="什么是泛型类型约束" tabindex="-1">什么是泛型类型约束 <a class="header-anchor" href="#什么是泛型类型约束" aria-label="Permalink to &quot;什么是泛型类型约束&quot;">​</a></h2><p>泛型类型约束是指你可以限制泛型类型参数的类型范围，例如使用 <code>T comparable</code> 来限制 <code>T</code> 必须是可比较的类型。</p><h1 id="二、使用示例" tabindex="-1">二、使用示例 <a class="header-anchor" href="#二、使用示例" aria-label="Permalink to &quot;二、使用示例&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import &quot;fmt&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 泛型函数，可以用于不同类型的切片</span></span>
<span class="line"><span>func contains[T comparable](s []T, elem T) bool {</span></span>
<span class="line"><span>	for _, v := range s {</span></span>
<span class="line"><span>		if v == elem {</span></span>
<span class="line"><span>			return true</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	return false</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	intSlice := []int{1, 2, 3, 4, 5}</span></span>
<span class="line"><span>	strSlice := []string{&quot;apple&quot;, &quot;banana&quot;, &quot;cherry&quot;}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	fmt.Println(contains(intSlice, 3))            // 输出 true</span></span>
<span class="line"><span>	fmt.Println(contains(strSlice, &quot;watermelon&quot;)) // 输出 false</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>泛型允许你编写通用的函数和数据结构，而不需要为每种类型编写特定的实现，从而减少了代码重复。这可以提高代码的可读性，因为你只需关注算法的实现而不必关注具体的数据类型。</p>`,12),t=[e];function l(o,c,r,h,d,k){return n(),a("div",null,t)}const g=s(i,[["render",l]]);export{_ as __pageData,g as default};
