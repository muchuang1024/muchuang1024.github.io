import{_ as a,c as s,o as n,a4 as p}from"./chunks/framework.4aTu-Nia.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/01 AI/AI 智能体/Coze 实战视频生成小红书文案.md","filePath":"docs/01 AI/AI 智能体/Coze 实战视频生成小红书文案.md"}'),e={name:"docs/01 AI/AI 智能体/Coze 实战视频生成小红书文案.md"},i=p(`<p>抖音作为短视频平台的佼佼者，以其快速、生动的视频内容捕获了无数用户的注意力。然而，如何将这些热门视频的内容和风格，转化为小红书平台上独具特色的文案和图片，是一个挑战。</p><p>有了智能体，就可以通过输入抖音热门视频的关键词或视频链接，使用 Coze 的插件迅速捕捉视频的核心内容，然后利用大模型生成符合小红书风格的文案和配图</p><h2 id="一、效果演示" tabindex="-1">一、效果演示 <a class="header-anchor" href="#一、效果演示" aria-label="Permalink to &quot;一、效果演示&quot;">​</a></h2><p>抖音视频地址：</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240727095700.png" alt=""></p><p>根据抖音视频生成小红书文案 <img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240727095619.png" alt=""></p><p>根据视频关键词获取抖音视频并生成小红书文案</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240727095641.png" alt=""></p><h2 id="二、工作流设计" tabindex="-1">二、工作流设计 <a class="header-anchor" href="#二、工作流设计" aria-label="Permalink to &quot;二、工作流设计&quot;">​</a></h2><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240727102006.png" alt=""></p><h3 id="_1、整体流程" tabindex="-1">1、整体流程 <a class="header-anchor" href="#_1、整体流程" aria-label="Permalink to &quot;1、整体流程&quot;">​</a></h3><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240727095956.png" alt=""></p><h3 id="_2、开始模块" tabindex="-1">2、开始模块 <a class="header-anchor" href="#_2、开始模块" aria-label="Permalink to &quot;2、开始模块&quot;">​</a></h3><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240727001846.png" alt=""></p><h3 id="_3、信息提取" tabindex="-1">3、信息提取 <a class="header-anchor" href="#_3、信息提取" aria-label="Permalink to &quot;3、信息提取&quot;">​</a></h3><p>使用大模型将用户的输入拆分为文字和链接两部分</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240727003958.png" alt=""></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>如果用户输入{{input}}包含文字，请提取文字并保存到变量 keyword 当中</span></span>
<span class="line"><span></span></span>
<span class="line"><span>如果用户输入{{input}}包含链接，请提取链接并保存到变量 link 当中</span></span></code></pre></div><h3 id="_4、选择器" tabindex="-1">4、选择器 <a class="header-anchor" href="#_4、选择器" aria-label="Permalink to &quot;4、选择器&quot;">​</a></h3><p>如果用户输入包含视频链接，则直接获取获取视频内容 如果用户输入不包含视频链接，则根据视频关键词先获取热门抖音视频链接</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240727004036.png" alt=""></p><h3 id="_5、获取视频链接和内容" tabindex="-1">5、获取视频链接和内容 <a class="header-anchor" href="#_5、获取视频链接和内容" aria-label="Permalink to &quot;5、获取视频链接和内容&quot;">​</a></h3><p>使用 coze 插件获取视频链接和视频内容</p><p>视频链接插件：get_video</p><p>内容解析插件：LinkReaderPlugin</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240727100253.png" alt=""></p><h3 id="_6、提取视频文案代码" tabindex="-1">6、提取视频文案代码 <a class="header-anchor" href="#_6、提取视频文案代码" aria-label="Permalink to &quot;6、提取视频文案代码&quot;">​</a></h3><p>根据上面的分支，提取对应的视频内容</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240727004646.png" alt=""></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>async def main(args: Args) -&gt; Output:</span></span>
<span class="line"><span>    params = args.params</span></span>
<span class="line"><span>    if params[&#39;input&#39;] is not None:</span></span>
<span class="line"><span>        ret: Output = {</span></span>
<span class="line"><span>            &quot;content&quot;: params[&#39;input&#39;][&#39;content&#39;],</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    else:</span></span>
<span class="line"><span>         ret: Output = {</span></span>
<span class="line"><span>            &quot;content&quot;: params[&#39;input2&#39;][&#39;content&#39;],</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    return ret</span></span></code></pre></div><h3 id="_7、生成标题" tabindex="-1">7、生成标题 <a class="header-anchor" href="#_7、生成标题" aria-label="Permalink to &quot;7、生成标题&quot;">​</a></h3><p>使用大模型生成适合小红书平台特性的标题</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240727092905.png" alt=""></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>角色：你是小红书爆款写作专家，请根据以下内容优化标题：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{{input}}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>背景：为小红书用户优化内容，使其更加吸引人并增加曝光度</span></span>
<span class="line"><span></span></span>
<span class="line"><span>输出格式：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1、三个标题，包含适当的表情符号</span></span>
<span class="line"><span></span></span>
<span class="line"><span>输出要求：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1、标题要符合小红书平台的特性，简洁明了，能抓住用户眼球</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2、每个标题都要有吸引力，能引发用户的兴趣和共鸣</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3、每个标题中随机使用1-2个爆款关键词</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4、使用二极管标题法进行创作</span></span></code></pre></div><h3 id="_8、生成内容" tabindex="-1">8、生成内容 <a class="header-anchor" href="#_8、生成内容" aria-label="Permalink to &quot;8、生成内容&quot;">​</a></h3><p>使用大模型生成适合小红书平台特性的正文内容</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240727092936.png" alt=""></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>角色：你是小红书爆款写作专家，请根据以下内容优化正文：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{{input}}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>背景：为小红书用户优化内容，使其更加吸引人并增加曝光度</span></span>
<span class="line"><span></span></span>
<span class="line"><span>输出格式：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1、一篇包含适当表情符号的正文</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2、每段话开头、结尾以及中间适当插入emoji表情</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3、文章结尾提供合适的#标签</span></span>
<span class="line"><span></span></span>
<span class="line"><span>输出要求：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1、正文包含适当的表情符号</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2、文末提供3-5个相关SEO关键词的#标签</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3、文章口语化、简短，长度约200字</span></span></code></pre></div><h3 id="_9、图片-prompt" tabindex="-1">9、图片 Prompt <a class="header-anchor" href="#_9、图片-prompt" aria-label="Permalink to &quot;9、图片 Prompt&quot;">​</a></h3><p>使用大模型生成图片提示词</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240727093041.png" alt=""></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>角色：你是绘图Prompt大师，请将以下内容转成AI更容易理解的绘画Prompt：</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>{{input}}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>背景：优化用户输入内容，使其更适合用于AI绘画生成</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>输出格式：优化后的绘画Prompt</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>输出要求：</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>- 描述清晰、详细，适合AI理解并生成绘画</span></span>
<span class="line"><span>- 包含必要的细节和指令，使AI绘画更容易</span></span></code></pre></div><h3 id="_10、生成图片" tabindex="-1">10、生成图片 <a class="header-anchor" href="#_10、生成图片" aria-label="Permalink to &quot;10、生成图片&quot;">​</a></h3><p>使用字节 ImageToolPro 插件根据提示词生成图片</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240727093126.png" alt=""></p><h3 id="_11、结束模块" tabindex="-1">11、结束模块 <a class="header-anchor" href="#_11、结束模块" aria-label="Permalink to &quot;11、结束模块&quot;">​</a></h3><p>输出上面的标题、正文、图片</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240727093151.png" alt=""></p><h2 id="三、测试与发布" tabindex="-1">三、测试与发布 <a class="header-anchor" href="#三、测试与发布" aria-label="Permalink to &quot;三、测试与发布&quot;">​</a></h2><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240727093337.png" alt=""></p><h2 id="四、复盘与总结" tabindex="-1">四、复盘与总结 <a class="header-anchor" href="#四、复盘与总结" aria-label="Permalink to &quot;四、复盘与总结&quot;">​</a></h2><p>Coze 作为一个智能体，通过输入抖音热门视频关键词或链接，能生成小红书风格的文案及配图。它不仅提高内容创作效率，还确保内容风格符合目标平台特点，为内容创作者提供了新的可能性，让创意表达更高效、多样化。</p>`,52),l=[i];function c(t,o,h,r,u,g){return n(),s("div",null,l)}const b=a(e,[["render",c]]);export{d as __pageData,b as default};
