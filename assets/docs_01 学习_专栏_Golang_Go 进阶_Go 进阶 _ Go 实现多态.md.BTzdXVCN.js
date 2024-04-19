import{_ as a,c as s,o as n,a4 as p}from"./chunks/framework.4aTu-Nia.js";const g=JSON.parse('{"title":"一、定义接口","description":"","frontmatter":{},"headers":[],"relativePath":"docs/01 学习/专栏/Golang/Go 进阶/Go 进阶 | Go 实现多态.md","filePath":"docs/01 学习/专栏/Golang/Go 进阶/Go 进阶 | Go 实现多态.md"}'),e={name:"docs/01 学习/专栏/Golang/Go 进阶/Go 进阶 | Go 实现多态.md"},l=p(`<p>Go 语言中实现多态的方式与传统的面向对象语言（如 Java 和 C++）有所不同，因为 Go 不支持经典的类继承体系。在 Go 中，多态性通过接口（interfaces）和类型断言（type assertion）来实现，以下是具体的步骤</p><h1 id="一、定义接口" tabindex="-1">一、定义接口 <a class="header-anchor" href="#一、定义接口" aria-label="Permalink to &quot;一、定义接口&quot;">​</a></h1><p>首先需要定义一个接口，接口是一组方法的抽象描述。这些方法定义了类型必须实现的行为。例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>type Shape interface {</span></span>
<span class="line"><span>    Area() float64</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>在这里，我们定义了一个名为 Shape 的接口，其中包含一个 Area() 方法的声明。</p><h1 id="二、创建具体类型" tabindex="-1">二、创建具体类型 <a class="header-anchor" href="#二、创建具体类型" aria-label="Permalink to &quot;二、创建具体类型&quot;">​</a></h1><p>然后创建具体类型，这些类型将实现接口中定义的方法。例如，我们可以创建一名为 Circle 和 Rectangle 的类型：</p><p>创建 Circle 结构体，实现 Area() 方法</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>type Circle struct {</span></span>
<span class="line"><span>    Radius float64</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func (c Circle) Area() float64 {</span></span>
<span class="line"><span>    return math.Pi _ c.Radius _ c.Radius</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>创建 Rectangle 结构体，实现 Area() 方法</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>type Rectangle struct {</span></span>
<span class="line"><span>    Width float64</span></span>
<span class="line"><span>    Height float64</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func (r Rectangle) Area() float64 {</span></span>
<span class="line"><span>    return r.Width * r.Height</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>创建了一个 Circle 结构体，并为它定义了 Area() 方法，以计算圆的面积</p><p>创建了一个 Rectangle 结构体，并为它定义了 Area() 方法，以计算长方形的面积。</p><h1 id="三、使用接口" tabindex="-1">三、使用接口 <a class="header-anchor" href="#三、使用接口" aria-label="Permalink to &quot;三、使用接口&quot;">​</a></h1><p>接下来创建接口类型的变量，并将具体类型的实例赋给这些变量。这就允许你调用接口中的方法，而不用关心具体的类型。示例如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func main() {</span></span>
<span class="line"><span>   var s Shape</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   // 将Circle实例赋给Shape类型的变量</span></span>
<span class="line"><span>   s = Circle{Radius: 5}</span></span>
<span class="line"><span>   // 类型断言</span></span>
<span class="line"><span>   if _, ok := s.(Circle); ok {</span></span>
<span class="line"><span>   	fmt.Println(&quot;我是圆形&quot;)</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   fmt.Println(&quot;Area of the shape:&quot;, s.Area())</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   // 将Rectangle实例赋给Shape类型的变量</span></span>
<span class="line"><span>   s = Rectangle{Width: 4, Height: 6}</span></span>
<span class="line"><span>   // 类型断言</span></span>
<span class="line"><span>   if _, ok := s.(Rectangle); ok {</span></span>
<span class="line"><span>   	fmt.Println(&quot;我是长方形&quot;)</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   fmt.Println(&quot;Area of the shape:&quot;, s.Area())</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>在这个示例中，我们创建了一个 Shape 类型的变量 s，然后将一个 Circle 和 Rectangle 的实例分配给它。随后，我们可以调用 s 的 Area() 方法，这个方法会多态地调用对应结构体中的 Area() 方法。</p><p>总之，Go 中实现多态性的方式是通过接口和方法的组合，允许不同类型实现相同的接口方法，从而实现多态性的效果。这种方式在 Go 中强调了灵活性和简洁性。</p>`,18),t=[l];function i(c,o,r,h,d,u){return n(),s("div",null,t)}const f=a(e,[["render",i]]);export{g as __pageData,f as default};
