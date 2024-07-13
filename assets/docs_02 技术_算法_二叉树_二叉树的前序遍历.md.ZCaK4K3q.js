import{_ as a,c as s,o as n,a4 as p}from"./chunks/framework.4aTu-Nia.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/02 技术/算法/二叉树/二叉树的前序遍历.md","filePath":"docs/02 技术/算法/二叉树/二叉树的前序遍历.md"}'),e={name:"docs/02 技术/算法/二叉树/二叉树的前序遍历.md"},l=p(`<h2 id="一-什么是前序遍历" tabindex="-1">一）什么是前序遍历？ <a class="header-anchor" href="#一-什么是前序遍历" aria-label="Permalink to &quot;一）什么是前序遍历？&quot;">​</a></h2><p>前序遍历是中左右，每次先处理的是根节点，然后再处理左孩子，最后处理右孩子。</p><h2 id="二-递归如何实现" tabindex="-1">二）递归如何实现？ <a class="header-anchor" href="#二-递归如何实现" aria-label="Permalink to &quot;二）递归如何实现？&quot;">​</a></h2><p>递归算法的三个要素。每次写递归，都按照这三要素来写，可以保证大家写出正确的递归算法！</p><h3 id="_1、确定递归函数的参数和返回值" tabindex="-1">1、确定递归函数的参数和返回值 <a class="header-anchor" href="#_1、确定递归函数的参数和返回值" aria-label="Permalink to &quot;1、确定递归函数的参数和返回值&quot;">​</a></h3><p>确定哪些参数是递归的过程中需要处理的，那么就在递归函数里加上这个参数， 并且还要明确每次递归的返回值是什么进而确定递归函数的返回类型。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func traverse(root *TreeNode) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_2、确定终止条件" tabindex="-1">2、确定终止条件 <a class="header-anchor" href="#_2、确定终止条件" aria-label="Permalink to &quot;2、确定终止条件&quot;">​</a></h3><p>写完了递归算法, 运行的时候，经常会遇到栈溢出的错误，就是没写终止条件或者终止条件写的不对，操作系统也是用一个栈的结构来保存每一层递归的信息，如果递归没有终止，操作系统的内存栈必然就会溢出。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>if root == nil {</span></span>
<span class="line"><span>    return</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_3、确定单层递归逻辑" tabindex="-1">3、确定单层递归逻辑 <a class="header-anchor" href="#_3、确定单层递归逻辑" aria-label="Permalink to &quot;3、确定单层递归逻辑&quot;">​</a></h3><p>确定单层递归的逻辑： 确定每一层递归需要处理的信息。在这里也就会重复调用自己来实现递归的过程。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>res = append(res, root.Val) // 处理根节点</span></span>
<span class="line"><span>traverse(root.Left) // 递归处理左孩子</span></span>
<span class="line"><span>traverse(root.Right) // 递归处理右孩子</span></span></code></pre></div><h2 id="三-迭代如何实现" tabindex="-1">三）迭代如何实现？ <a class="header-anchor" href="#三-迭代如何实现" aria-label="Permalink to &quot;三）迭代如何实现？&quot;">​</a></h2><p>迭代法实现递归的效果，就要用到栈，递归的本质就是栈（先入后出），先访问根节点，然后压入右孩子，最后压入左孩子，栈为什么要先加入右孩子，再加入左孩子呢？ 因为栈的特性是先入后出，这样出栈的时候才是中左右的顺序。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 处理根节点</span></span>
<span class="line"><span>res = append(res, node.Val)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 右孩子入栈</span></span>
<span class="line"><span>if node.Right != nil {</span></span>
<span class="line"><span>    stack = append(stack, node.Right)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 左孩子入栈</span></span>
<span class="line"><span>if node.Left != nil {</span></span>
<span class="line"><span>    stack = append(stack, node.Left)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="四-代码" tabindex="-1">四）代码 <a class="header-anchor" href="#四-代码" aria-label="Permalink to &quot;四）代码&quot;">​</a></h2><h3 id="_1、解法-1-递归" tabindex="-1">1、解法 1 - 递归 <a class="header-anchor" href="#_1、解法-1-递归" aria-label="Permalink to &quot;1、解法 1 - 递归&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func preorderTraversal(root *TreeNode) (res []int) {</span></span>
<span class="line"><span>    var traverse func(root *TreeNode)</span></span>
<span class="line"><span>    traverse = func(root *TreeNode) {</span></span>
<span class="line"><span>        if root == nil {</span></span>
<span class="line"><span>            return</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        res = append(res, root.Val)</span></span>
<span class="line"><span>        traverse(root.Left)</span></span>
<span class="line"><span>        traverse(root.Right)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    traverse(root)</span></span>
<span class="line"><span>    return res</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_2、解法-2-迭代" tabindex="-1">2、解法 2 - 迭代 <a class="header-anchor" href="#_2、解法-2-迭代" aria-label="Permalink to &quot;2、解法 2 - 迭代&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func preorderTraversal(root *TreeNode) (res []int) {</span></span>
<span class="line"><span>	if root == nil {</span></span>
<span class="line"><span>		return res</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	stack := make([]*TreeNode, 0)</span></span>
<span class="line"><span>	stack = append(stack, root)</span></span>
<span class="line"><span>	for len(stack) &gt; 0 {</span></span>
<span class="line"><span>		// 弹出</span></span>
<span class="line"><span>		node := stack[len(stack)-1]</span></span>
<span class="line"><span>		stack = stack[:len(stack)-1]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		// 访问根节点</span></span>
<span class="line"><span>		res = append(res, node.Val)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		// 右孩子入栈</span></span>
<span class="line"><span>		if node.Right != nil {</span></span>
<span class="line"><span>			stack = append(stack, node.Right)</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		// 左孩子入栈</span></span>
<span class="line"><span>		if node.Left != nil {</span></span>
<span class="line"><span>			stack = append(stack, node.Left)</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	return res</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_3、解法-3-迭代" tabindex="-1">3、解法 3 - 迭代 <a class="header-anchor" href="#_3、解法-3-迭代" aria-label="Permalink to &quot;3、解法 3 - 迭代&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>func preorderTraversal(root *TreeNode) (res []int) {</span></span>
<span class="line"><span>    stack := make([]*TreeNode, 0)</span></span>
<span class="line"><span>    for root != nil || len(stack) &gt; 0 {</span></span>
<span class="line"><span>        for root != nil {</span></span>
<span class="line"><span>            res = append(res, root.Val)</span></span>
<span class="line"><span>            stack = append(stack, root)</span></span>
<span class="line"><span>            root = root.Left</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        node := stack[len(stack)-1]</span></span>
<span class="line"><span>        stack = stack[:len(stack)-1]</span></span>
<span class="line"><span>        root = node.Right</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return res</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,23),t=[l];function i(c,o,r,d,h,u){return n(),s("div",null,t)}const v=a(e,[["render",i]]);export{g as __pageData,v as default};
