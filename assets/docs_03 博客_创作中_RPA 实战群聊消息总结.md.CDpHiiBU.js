import{_ as a,c as i,o as t,a4 as n}from"./chunks/framework.4aTu-Nia.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/03 博客/创作中/RPA 实战群聊消息总结.md","filePath":"docs/03 博客/创作中/RPA 实战群聊消息总结.md"}'),e={name:"docs/03 博客/创作中/RPA 实战群聊消息总结.md"},s=n('<p>周末我坐在书房的电脑前，眼前是 30 个微信群的聊天窗口，每天 3000+未读信息让我感到压力山大。过去，我常常需要花费一两个小时来刷这些群信息，但有时大部分内容都毫无价值，让我深感时间被浪费了。</p><p>然而，今天我决定尝试一种新的方法。我运用 RPA（Robotic Process Automation）+ AI 技术，读取微信聊天记录，然后让大模型自动总结群聊记录并发送给我。不到</p><p>20 分钟，我就收到了一份详细的群聊摘要，包含了所有核心信息。</p><p>我惊喜地发现，这份摘要不仅节省了我的时间，还让我能够直接掌握群聊的重点。我不再需要浪费时间在无意义的闲聊上，而是可以更加专注于工作和生活。</p><p>这个经历让我深刻体会到通过合理运用 RPA 和 AI 技术，我们能够更好地管理信息，提高工作效率，从而拥有更多时间去做自己喜欢的事情。我感到非常开心，决定将这种方法推荐给身边的朋友和同事，让更多的人受益。</p><p>在这篇文章中，我将使用 RPA 工具影刀来制作总结微信聊天记录的程序</p><h2 id="一、业务流程" tabindex="-1">一、业务流程 <a class="header-anchor" href="#一、业务流程" aria-label="Permalink to &quot;一、业务流程&quot;">​</a></h2><p>主流程完成微信记录的读取，然后调用子流程 1 完成微信聊天记录总结，调用子流程 2 完成发送消息到微信</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240528221451.png" alt=""></p><h3 id="_1、获取微信聊天记录" tabindex="-1">1、获取微信聊天记录 <a class="header-anchor" href="#_1、获取微信聊天记录" aria-label="Permalink to &quot;1、获取微信聊天记录&quot;">​</a></h3><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240528214508028.png" alt=""></p><h3 id="_2、调用-kimi-总结微信聊天记录" tabindex="-1">2、调用 Kimi 总结微信聊天记录 <a class="header-anchor" href="#_2、调用-kimi-总结微信聊天记录" aria-label="Permalink to &quot;2、调用 Kimi 总结微信聊天记录&quot;">​</a></h3><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240528221407.png" alt=""></p><h3 id="_3、发送群聊总结摘要到个人微信" tabindex="-1">3、发送群聊总结摘要到个人微信 <a class="header-anchor" href="#_3、发送群聊总结摘要到个人微信" aria-label="Permalink to &quot;3、发送群聊总结摘要到个人微信&quot;">​</a></h3><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240528221103.png" alt=""></p><h2 id="二、实操步骤" tabindex="-1">二、实操步骤 <a class="header-anchor" href="#二、实操步骤" aria-label="Permalink to &quot;二、实操步骤&quot;">​</a></h2><h3 id="_1、获取目标微信群" tabindex="-1">1、获取目标微信群 <a class="header-anchor" href="#_1、获取目标微信群" aria-label="Permalink to &quot;1、获取目标微信群&quot;">​</a></h3><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240528223152.png" alt=""></p><h3 id="_2、鼠标移动到群聊底部" tabindex="-1">2、鼠标移动到群聊底部 <a class="header-anchor" href="#_2、鼠标移动到群聊底部" aria-label="Permalink to &quot;2、鼠标移动到群聊底部&quot;">​</a></h3><p>首先鼠标定位群聊，然后进入对话框，方便后续鼠标向上移动，查看群聊天记录</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240528223715.png" alt=""></p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240528223233.png" alt=""></p><p>其中捕获“微信群对话框” 通过搜索群聊的第 1 个位置来匹配，而不是名称，也就是捕获的时候编辑勾选使用 index ，而不是 title，避免换了群名，就导致无法找到元素</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240525212501.png" alt=""></p><p>移动鼠标到到鼠标底部位置（鼠标放到群聊底部，查看对应的坐标）</p><p>获取相似元素列表：校验验证有多个元素</p><p>移动鼠标到群聊底部：</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240525225022.png" alt=""></p><p>聊天记录很长，需要支持 长 token 的大模型，比如 Kimi</p><p>子流程返回值，使用 result.xxx</p><h2 id="三、总结" tabindex="-1">三、总结 <a class="header-anchor" href="#三、总结" aria-label="Permalink to &quot;三、总结&quot;">​</a></h2><p>本文提到的 RPA 主流程和子流程如下，为了让大家我放到</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240528222848.png" alt=""></p>',33),c=[s];function o(p,r,h,l,m,u){return t(),i("div",null,c)}const d=a(e,[["render",o]]);export{_ as __pageData,d as default};
