import{_ as n,c as s,o as a,a4 as p}from"./chunks/framework.4aTu-Nia.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/01 学习/专栏/Golang/Go 面试/Channel 面试/Go 面试 | Go channel 有无缓冲的区别.md","filePath":"docs/01 学习/专栏/Golang/Go 面试/Channel 面试/Go 面试 | Go channel 有无缓冲的区别.md"}'),t={name:"docs/01 学习/专栏/Golang/Go 面试/Channel 面试/Go 面试 | Go channel 有无缓冲的区别.md"},l=p(`<p><strong>1、无缓冲</strong></p><p>一个送信人去你家送信，你不在家他不走，你一定要接下信，他才会走。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;fmt&quot;</span></span>
<span class="line"><span>	&quot;time&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func loop(ch chan int) {</span></span>
<span class="line"><span>	for {</span></span>
<span class="line"><span>		select {</span></span>
<span class="line"><span>		case i := &lt;-ch:</span></span>
<span class="line"><span>			fmt.Println(&quot;this  value of unbuffer channel&quot;, i)</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	ch := make(chan int)</span></span>
<span class="line"><span>	ch &lt;- 1</span></span>
<span class="line"><span>	go loop(ch)</span></span>
<span class="line"><span>	time.Sleep(1 * time.Millisecond)</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这里会报错 <code>fatal error: all goroutines are asleep - deadlock!</code> 就是因为 <code>ch&lt;-1</code> 发送了，但是同时没有接收者，所以就发生了阻塞</p><p>但如果我们把 <code>ch &lt;- 1</code> 放到 <code>go loop(ch)</code> 下面，程序就会正常运行</p><p><strong>2、有缓冲</strong></p><p>一个送信人去你家送信，扔到你家的信箱转身就走，除非你的信箱满了，他必须等信箱有多余空间才会走。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;fmt&quot;</span></span>
<span class="line"><span>	&quot;time&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func loop(ch chan int) {</span></span>
<span class="line"><span>	for {</span></span>
<span class="line"><span>		select {</span></span>
<span class="line"><span>		case i := &lt;-ch:</span></span>
<span class="line"><span>			fmt.Println(&quot;this  value of unbuffer channel&quot;, i)</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	ch := make(chan int,3)</span></span>
<span class="line"><span>	ch &lt;- 1</span></span>
<span class="line"><span>	ch &lt;- 2</span></span>
<span class="line"><span>	ch &lt;- 3</span></span>
<span class="line"><span>	ch &lt;- 4</span></span>
<span class="line"><span>	go loop(ch)</span></span>
<span class="line"><span>	time.Sleep(1 * time.Millisecond)</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这里也会报 fatal error: all goroutines are asleep - deadlock! ，这是因为 channel 的大小为 3 ，而我们要往里面塞 4 个数据，所以就会阻塞住，解决的办法有两个:</p><p>把 channel 长度调大一点</p><p>把 channel 的信息发送者 ch &lt;- 1 这些代码移动到 go loop(ch) 下面 ，让 channel 实时消费就不会导致阻塞了</p><p><strong>3、两者区别</strong></p><table><thead><tr><th></th><th>无缓冲</th><th>有缓冲</th></tr></thead><tbody><tr><td>创建方式</td><td>make(chan TYPE)</td><td>make(chan TYPE, SIZE)</td></tr><tr><td>发送阻塞</td><td>数据接收前发送阻塞</td><td>缓冲满时发送阻塞</td></tr><tr><td>接收阻塞</td><td>数据发送前接收阻塞</td><td>缓冲空时接收阻塞</td></tr></tbody></table>`,13),e=[l];function c(o,i,d,h,r,_){return a(),s("div",null,e)}const g=n(t,[["render",c]]);export{m as __pageData,g as default};
