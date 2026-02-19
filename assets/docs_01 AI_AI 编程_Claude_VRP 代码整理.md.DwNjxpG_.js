import{_ as s,c as a,o as n,a4 as p}from"./chunks/framework.4aTu-Nia.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/01 AI/AI 编程/Claude/VRP 代码整理.md","filePath":"docs/01 AI/AI 编程/Claude/VRP 代码整理.md"}'),e={name:"docs/01 AI/AI 编程/Claude/VRP 代码整理.md"},l=p(`<p><a href="https://chatgpt.com/share/6997291b-8700-800b-97e2-4a609adb7971" target="_blank" rel="noreferrer">https://chatgpt.com/share/6997291b-8700-800b-97e2-4a609adb7971</a></p><h2 id="原始提示词" tabindex="-1">原始提示词 <a class="header-anchor" href="#原始提示词" aria-label="Permalink to &quot;原始提示词&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>## 背景</span></span>
<span class="line"><span></span></span>
<span class="line"><span>当前 VRP-OR-Tools 代码库存在大量代码重复，缺乏统一的架构和可复用模块。多个文件实现了相似的功能（数据生成、OR-Tools 模型设置、解输出等），但各自独立，导致维护困难。本方案旨在重构代码库，建立可复用的生产代码模块，并将算法核心实现转换为  .py 文件，将不同场景算法调用示例代码转换为 Jupyter Notebook</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 目标</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 消除代码重复</span></span>
<span class="line"><span>2. 建立清晰的项目结构，区分算法实现和算法调用代码</span></span>
<span class="line"><span>3. 提供类型安全的 API，便于工程化使用</span></span>
<span class="line"><span>4. 积累可复用的生产资料</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 文件分类标准</span></span>
<span class="line"><span></span></span>
<span class="line"><span>| 类型                | 格式   | 原因                    |</span></span>
<span class="line"><span>| ------------------- | ------ | ----------------------- |</span></span>
<span class="line"><span>| 核心算法/求解器封装 | .py    | 作为库被 import，工程化 |</span></span>
<span class="line"><span>| 参数配置类          | .py    | 便于版本管理            |</span></span>
<span class="line"><span>| 教学案例/模型讲解   | .ipynb | 步骤可视化，适合演示    |</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>初始提示词就是我刚发你的，请基于两者生成最终的“超级提示词（终极优化版）”，并提升到接近 5 分质量级别。</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>极致压缩版</span></span></code></pre></div>`,5),t=[l];function c(i,o,d,r,h,_){return n(),a("div",null,t)}const g=s(e,[["render",c]]);export{b as __pageData,g as default};
