import{_ as s,c as n,o as a,a4 as p}from"./chunks/framework.4aTu-Nia.js";const g=JSON.parse('{"title":"一、基本概念","description":"","frontmatter":{},"headers":[],"relativePath":"docs/01 学习/专栏/Golang/Go 源码/Go 源码 | Go defer 关键字的实现原理.md","filePath":"docs/01 学习/专栏/Golang/Go 源码/Go 源码 | Go defer 关键字的实现原理.md"}'),e={name:"docs/01 学习/专栏/Golang/Go 源码/Go 源码 | Go defer 关键字的实现原理.md"},l=p(`<h1 id="一、基本概念" tabindex="-1">一、基本概念 <a class="header-anchor" href="#一、基本概念" aria-label="Permalink to &quot;一、基本概念&quot;">​</a></h1><p>defer 能够让我们推迟执行某些函数调用，推迟到当前函数返回前才实际执行。defer 与 panic 和 recover 结合，形成了 Go 语言风格的异常与捕获机制。</p><p>使用场景：defer 语句经常被用于处理成对的操作，如文件句柄关闭、连接关闭、释放锁</p><p>优点：方便开发者使用</p><p>缺点：有性能损耗</p><h1 id="二、实现原理" tabindex="-1">二、实现原理 <a class="header-anchor" href="#二、实现原理" aria-label="Permalink to &quot;二、实现原理&quot;">​</a></h1><p>在 Go 语言中，defer 的先进后出（后进先出）的执行顺序是由编译器实现的，它通过在函数退出点插入 defer 语句的调用代码，确保这些语句按照与它们被添加到栈的相反顺序执行。</p><p>源代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func A(i int) {</span></span>
<span class="line"><span>    defer A1(i, 2\\*i)</span></span>
<span class="line"><span>    if(i &gt; 1) {</span></span>
<span class="line"><span>        defer A2(&quot;Hello&quot;, &quot;eggo&quot;)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 其它 code</span></span>
<span class="line"><span>    return</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>编译后（伪代码）：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func A(i int) {</span></span>
<span class="line"><span>    // 其它 code</span></span>
<span class="line"><span>    if(i &gt; 1){</span></span>
<span class="line"><span>        A2(&quot;Hello&quot;, &quot;eggo&quot;)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    A1(i, 2\\*i)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h1 id="三、代码示例" tabindex="-1">三、代码示例 <a class="header-anchor" href="#三、代码示例" aria-label="Permalink to &quot;三、代码示例&quot;">​</a></h1><p>1、函数退出前，按照先进后出的顺序，执行 defer 函数</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>package main</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>import &quot;fmt&quot;</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>// defer：延迟函数执行，先进后出</span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>    defer fmt.Println(&quot;defer1&quot;)</span></span>
<span class="line"><span>    defer fmt.Println(&quot;defer2&quot;)</span></span>
<span class="line"><span>    defer fmt.Println(&quot;defer3&quot;)</span></span>
<span class="line"><span>    defer fmt.Println(&quot;defer4&quot;)</span></span>
<span class="line"><span>    fmt.Println(&quot;11111&quot;)</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>11111</span></span>
<span class="line"><span>defer4</span></span>
<span class="line"><span>defer3</span></span>
<span class="line"><span>defer2</span></span>
<span class="line"><span>defer1</span></span></code></pre></div><p>2、panic 后的 defer 函数不会被执行（遇到 panic，如果没有捕获错误，函数会立刻终止）</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>import &quot;fmt&quot;</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>// panic 后的 defer 函数不会被执行</span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>    defer fmt.Println(&quot;panic before&quot;)</span></span>
<span class="line"><span>    panic(&quot;发生 panic&quot;)</span></span>
<span class="line"><span>    defer func() {</span></span>
<span class="line"><span>    fmt.Println(&quot;panic after&quot;)</span></span>
<span class="line"><span>    }()</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>panic before</span></span>
<span class="line"><span>panic: 发生 panic</span></span></code></pre></div><p>3、panic 没有被 recover 时，抛出的 panic 到当前 goroutine 最上层函数时，最上层程序直接异常终止</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>import &quot;fmt&quot;</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>func F() {</span></span>
<span class="line"><span>    defer func() {</span></span>
<span class="line"><span>        fmt.Println(&quot;b&quot;)</span></span>
<span class="line"><span>    }()</span></span>
<span class="line"><span>    panic(&quot;a&quot;)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 子函数抛出的 panic 没有 recover 时，上层函数时，程序直接异常终止</span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>    defer func() {</span></span>
<span class="line"><span>        fmt.Println(&quot;c&quot;)</span></span>
<span class="line"><span>    }()</span></span>
<span class="line"><span>    F()</span></span>
<span class="line"><span>    fmt.Println(&quot;继续执行&quot;)</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>​ 输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>b</span></span>
<span class="line"><span>c</span></span>
<span class="line"><span>panic: a</span></span></code></pre></div><p>4、panic 有被 recover 时，当前 goroutine 最上层函数正常执行</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>import &quot;fmt&quot;</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>func F() {</span></span>
<span class="line"><span>    defer func() {</span></span>
<span class="line"><span>        if err := recover(); err != nil {</span></span>
<span class="line"><span>            fmt.Println(&quot;捕获异常:&quot;, err)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        fmt.Println(&quot;b&quot;)</span></span>
<span class="line"><span>    }()</span></span>
<span class="line"><span>    panic(&quot;a&quot;)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>    defer func() {</span></span>
<span class="line"><span>        fmt.Println(&quot;c&quot;)</span></span>
<span class="line"><span>    }()</span></span>
<span class="line"><span>    F()</span></span>
<span class="line"><span>    fmt.Println(&quot;继续执行&quot;)</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>捕获异常: a</span></span>
<span class="line"><span>b</span></span>
<span class="line"><span>继续执行</span></span>
<span class="line"><span>c</span></span></code></pre></div>`,28),i=[l];function t(c,o,d,r,u,h){return a(),n("div",null,i)}const m=s(e,[["render",t]]);export{g as __pageData,m as default};
