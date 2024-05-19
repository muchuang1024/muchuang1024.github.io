import{_ as a,c as n,o as p,a4 as s}from"./chunks/framework.4aTu-Nia.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/03 博客/教程/AI 微信机器人智能问答知识库.md","filePath":"docs/03 博客/教程/AI 微信机器人智能问答知识库.md"}'),i={name:"docs/03 博客/教程/AI 微信机器人智能问答知识库.md"},e=s(`<p>上一篇文章，我们讲了如何大家 AI 微信机器人基础篇，完成和机器人的私聊、群聊对话等功能。</p><p>这一篇分享下 AI 微信机器人进阶篇，主要完成如下功能：</p><p>1、知识库问答</p><p>2、发送文章自动总结</p><p>要完成上面的功能，需要用到 LinkAI，LinkAI 的3个核心能力如下：</p><p>1、基于知识库内容进行问答</p><p>2、对模型能力的扩展和增强的插件</p><p>3、文件/链接/图片内容总结</p><h2 id="一、效果展示" tabindex="-1">一、效果展示 <a class="header-anchor" href="#一、效果展示" aria-label="Permalink to &quot;一、效果展示&quot;">​</a></h2><p>1、不同群聊配置不同的机器人</p><p>机器人的角色是微信群配置的LinkAI 应用的人设</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240511235809.png" alt=""></p><p>2、知识库问答</p><p>机器人的回答是微信群配置的 LinkAI 应用的知识库</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240511235939.png" alt=""></p><p>3、自动阅读网页内容并总结</p><p>机器人使用了微信群配置的LinkAI 应用的插件：网页阅读，进行内容总结</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240512000009.png" alt=""></p><h2 id="二、搭建-linkai-应用" tabindex="-1">二、搭建 LinkAI 应用 <a class="header-anchor" href="#二、搭建-linkai-应用" aria-label="Permalink to &quot;二、搭建 LinkAI 应用&quot;">​</a></h2><p>LinkAI 可以理解为对 AI 大模型的封装，在 LinkAI 搭建的应用可以配置使用什么样的大模型，可以实现如下功能：</p><p>1、不同群聊可以配置不同类型的机器人（普通机器人、知识库机器人）</p><p>2、自动总结文件、网页内容、在线搜索</p><p>3、知识库问答</p><h3 id="_1、注册-linkai" tabindex="-1">1、注册 LinkAI <a class="header-anchor" href="#_1、注册-linkai" aria-label="Permalink to &quot;1、注册 LinkAI&quot;">​</a></h3><p>访问 <a href="https://link-ai.tech/home" target="_blank" rel="noreferrer">LinkAI 官网</a> ，使用微信或者手机号完成注册，新用户注册后可以获得 300 积分，每日签到可额外获得积分</p><h3 id="_2、创建普通机器人" tabindex="-1">2、创建普通机器人 <a class="header-anchor" href="#_2、创建普通机器人" aria-label="Permalink to &quot;2、创建普通机器人&quot;">​</a></h3><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240511221640.png" alt=""></p><p>普通机器人选择轻应用即可，填写应用名称和应用描述后，可使用AI一键填写</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240511222145.png" alt="image.png"></p><p>应用创建成功后，点击确认按钮会进入应用配置和应用接入页面</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240511223245.png" alt=""></p><p>一般只需要配置如下选项：</p><p>开场介绍：首次进入对话时，智能助手向用户发送的第一条消息 模型设置：选择大模型 应用设定：模型角色设定，即提示词 插件配置：具备的插件技能，开启网页速读可以根据链接访问内容</p><p>配置后上面的信息后，右边可以进行调试，符合预期效果后，可以接入其它三方应用</p><h3 id="_3、创建知识库机器人" tabindex="-1">3、创建知识库机器人 <a class="header-anchor" href="#_3、创建知识库机器人" aria-label="Permalink to &quot;3、创建知识库机器人&quot;">​</a></h3><p>需要先创建知识库，然后再创建知识库应用，绑定之前创建的知识库</p><p>1）创建知识库</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240511230729.png" alt="image.png"></p><p>可以选择两种方式上传知识库文件</p><p>1、无结构化的文档</p><p>2、QA 格式的 CSV 模板</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240511231358.png" alt=""></p><p>2）创建知识库应用</p><p>创建时绑定知识库</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240511232006.png" alt=""></p><p>知识库配置</p><ul><li><p>相似度：知识库条目的相似度高于该阈值才会被检索</p></li><li><p>单次检索条数：单次问答从知识库中检索的最大段落数</p></li><li><p>未命中策略：当机器人找不到内容的情况下，是可以让模型自由发挥的回复用户，还是指定固定内容</p></li></ul><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240511232710.png" alt=""></p><h3 id="_4、获取-api-key-和应用-code" tabindex="-1">4、获取 API key 和应用 Code <a class="header-anchor" href="#_4、获取-api-key-和应用-code" aria-label="Permalink to &quot;4、获取 API key 和应用 Code&quot;">​</a></h3><p>1）获取 API key</p><p>LinkAPI 的API key（类似 gpt、xunfei 等），刚进来时没有 API Key，可以点击按钮创建</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240511233127.png" alt=""></p><p>2）获取应用 Code</p><p>不同群聊可以配置不同类型的机器人，如果某个群聊没有出现在插件配置文件中时，将默认使用 LINKALAPP_CODE 对应的应用 Code</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240511233207.png" alt=""></p><h2 id="三、服务搭建" tabindex="-1">三、服务搭建 <a class="header-anchor" href="#三、服务搭建" aria-label="Permalink to &quot;三、服务搭建&quot;">​</a></h2><p>搭建过程和上一篇完全一样，只需要修改几个配置参数</p><p>1）修改根目录 config.json</p><p>配置 use_linkai、linkai_api_key、linkai_app_code</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&quot;use_linkai&quot;: True,</span></span>
<span class="line"><span>&quot;linkai_api_key&quot;: &quot;&quot;,  #API key</span></span>
<span class="line"><span>&quot;linkai_app_code&quot;: &quot;&quot;, #默认应用的code，当私聊时，或者在某个群聊没有出现在插件配置文件中时，将默认使用 LINKALAPP_CODE 对应的应用</span></span></code></pre></div><p>2）增加 plugins/linkai/config.json</p><p>将 <code>plugins/linkai</code> 目录下的 <code>config.json.template</code> 配置模板复制为最终生效的 <code>plugins/linkai/config.json</code></p><p>并设置如下参数</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>{</span></span>
<span class="line"><span>    &quot;group_app_map&quot;: {</span></span>
<span class="line"><span>      &quot;AI 机器人测试&quot;: &quot;JY9kReJl&quot;</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    &quot;midjourney&quot;: {</span></span>
<span class="line"><span>        &quot;enabled&quot;: true,</span></span>
<span class="line"><span>        &quot;auto_translate&quot;: true,</span></span>
<span class="line"><span>        &quot;img_proxy&quot;: true,</span></span>
<span class="line"><span>        &quot;max_tasks&quot;: 3,</span></span>
<span class="line"><span>        &quot;max_tasks_per_user&quot;: 1,</span></span>
<span class="line"><span>        &quot;use_image_create_prefix&quot;: true</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    &quot;summary&quot;: {</span></span>
<span class="line"><span>        &quot;enabled&quot;: true,</span></span>
<span class="line"><span>        &quot;group_enabled&quot;: true,</span></span>
<span class="line"><span>        &quot;max_file_size&quot;: 5000,</span></span>
<span class="line"><span>        &quot;type&quot;: [&quot;FILE&quot;, &quot;SHARING&quot;]</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="四、总结" tabindex="-1">四、总结 <a class="header-anchor" href="#四、总结" aria-label="Permalink to &quot;四、总结&quot;">​</a></h2><p>在本文中，我们深入探讨了 AI 微信机器人的进阶功能，包括知识库问答、发送文章自动总结等。通过使用 LinkAI，我们可以轻松实现这些高级功能，极大地提升微信机器人的智能水平和实用性。</p><p>文章通过详细的步骤展示了如何搭建 LinkAI 应用，包括 注册 LinkAI、创建普通机器人和知识库机器人，以及如何获取 API key 和 应用 Code。同时，还介绍了如何修改配置参数以适应不同的群聊需求。</p><p>最后，希望本文能够帮助大家更好地理解和应用AI微信机器人，同时也期待看到更多创新和有趣的应用案例。</p>`,68),t=[e];function o(l,c,u,r,g,h){return p(),n("div",null,t)}const _=a(i,[["render",o]]);export{d as __pageData,_ as default};
