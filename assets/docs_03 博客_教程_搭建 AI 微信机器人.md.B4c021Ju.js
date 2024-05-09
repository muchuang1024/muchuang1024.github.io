import{_ as s,c as a,o as n,a4 as p}from"./chunks/framework.4aTu-Nia.js";const I=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/03 博客/教程/搭建 AI 微信机器人.md","filePath":"docs/03 博客/教程/搭建 AI 微信机器人.md"}'),e={name:"docs/03 博客/教程/搭建 AI 微信机器人.md"},o=p(`<h2 id="一、安装-docker" tabindex="-1">一、安装 Docker <a class="header-anchor" href="#一、安装-docker" aria-label="Permalink to &quot;一、安装 Docker&quot;">​</a></h2><p>前往 <a href="https://docs.docker.com/engine/install/" target="_blank" rel="noreferrer">docker官网</a> 进行下载安装，安装后，在命令行 执行命令 <code>docker -v</code> ，如果出现版本号则代表安装成功</p><p>1、创建项目文件夹</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>mkdir wechat-bot</span></span>
<span class="line"><span>cd wechat-bot</span></span></code></pre></div><p>2、下载 docker-compose.yml 文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>wget https://open-1317903499.cos.ap-guangzhou.myqcloud.com/docker-compose.yml</span></span></code></pre></div><p>3、修改 docker-compose.yml 配置</p><p>下载完成后打开 <code>docker-compose.yml</code> 修改配置， <code>OPEN_AI_API_KEY</code> 和 <code>GROUP_NAME_WHITE_LIST</code> 等。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>version: &#39;2.0&#39;</span></span>
<span class="line"><span>services:</span></span>
<span class="line"><span>  chatgpt-on-wechat:</span></span>
<span class="line"><span>    image: zhayujie/chatgpt-on-wechat</span></span>
<span class="line"><span>    container_name: chatgpt-on-wechat</span></span>
<span class="line"><span>    security_opt:</span></span>
<span class="line"><span>      - seccomp:unconfined</span></span>
<span class="line"><span>    environment:</span></span>
<span class="line"><span>      OPEN_AI_API_KEY: &#39;YOUR API KEY&#39;</span></span>
<span class="line"><span>      MODEL: &#39;gpt-3.5-turbo&#39;</span></span>
<span class="line"><span>      PROXY: &#39;&#39;</span></span>
<span class="line"><span>      SINGLE_CHAT_PREFIX: &#39;[&quot;bot&quot;, &quot;@bot&quot;]&#39;</span></span>
<span class="line"><span>      SINGLE_CHAT_REPLY_PREFIX: &#39;&quot;[bot] &quot;&#39;</span></span>
<span class="line"><span>      GROUP_CHAT_PREFIX: &#39;[&quot;@bot&quot;]&#39;</span></span>
<span class="line"><span>      GROUP_NAME_WHITE_LIST: &#39;[&quot;ChatGPT测试群&quot;, &quot;ChatGPT测试群2&quot;]&#39;</span></span>
<span class="line"><span>      IMAGE_CREATE_PREFIX: &#39;[&quot;画&quot;, &quot;看&quot;, &quot;找&quot;]&#39;</span></span>
<span class="line"><span>      CONVERSATION_MAX_TOKENS: 1000</span></span>
<span class="line"><span>      SPEECH_RECOGNITION: &#39;False&#39;</span></span>
<span class="line"><span>      CHARACTER_DESC: &#39;你是ChatGPT, 一个由OpenAI训练的大型语言模型, 你旨在回答并解决人们的任何问题，并且可以使用多种语言与人交流。&#39;</span></span>
<span class="line"><span>      EXPIRES_IN_SECONDS: 3600</span></span>
<span class="line"><span>      USE_GLOBAL_PLUGIN_CONFIG: &#39;True&#39;</span></span>
<span class="line"><span>      USE_LINKAI: &#39;False&#39;</span></span>
<span class="line"><span>      LINKAI_API_KEY: &#39;&#39;</span></span>
<span class="line"><span>      LINKAI_APP_CODE: &#39;&#39;</span></span></code></pre></div><p><code>group_name_white_list</code>：开启自动回复的群名称列表，如果想对所有群聊生效，可以直接填写 <code>&quot;group_name_white_list&quot;: [&quot;ALL_GROUP&quot;]</code></p><p>4、服务启动</p><p>docker-compose pull # 启动鏡像 docker-compose up -d # 启动 docker logs -f chatgpt-on-wechat # 查看日志</p><p>在日志中看到微信二维码，扫码登录</p>`,13),t=[o];function c(l,i,_,d,r,u){return n(),a("div",null,t)}const m=s(e,[["render",c]]);export{I as __pageData,m as default};
