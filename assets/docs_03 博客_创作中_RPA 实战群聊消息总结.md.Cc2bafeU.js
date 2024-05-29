import{_ as a,c as i,o as n,a4 as s}from"./chunks/framework.4aTu-Nia.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/03 博客/创作中/RPA 实战群聊消息总结.md","filePath":"docs/03 博客/创作中/RPA 实战群聊消息总结.md"}'),c={name:"docs/03 博客/创作中/RPA 实战群聊消息总结.md"},t=s('<p>周末我坐在书房的电脑前，眼前是 30 个微信群的聊天窗口，每天 3000+未读信息让我感到压力山大。过去，我常常需要花费一两个小时来刷这些群信息，但有时大部分内容都毫无价值，让我深感时间被浪费了。</p><p>然而，今天我决定尝试一种新的方法。我运用 RPA（Robotic Process Automation）+ AI 技术，读取微信聊天记录，然后让大模型自动总结群聊记录并发送给我。</p><p>不到 10 分钟，我就收到了一份详细的群聊摘要，包含了所有核心信息。</p><p>我惊喜地发现，这份摘要不仅节省了我的时间，还让我能够直接掌握群聊的重点。我不再需要浪费时间在无意义的闲聊上，而是可以更加专注于工作和生活。</p><p>这个经历让我深刻体会到通过合理运用 RPA 和 AI 技术，我们能够更好地管理信息，提高工作效率，从而拥有更多时间去做自己喜欢的事情。我感到非常开心，决定将这种方法推荐给身边的朋友和同事，让更多的人受益。</p><p>在这篇文章中，我将使用 RPA 工具影刀来制作总结微信聊天记录的程序</p><h2 id="一、业务流程" tabindex="-1">一、业务流程 <a class="header-anchor" href="#一、业务流程" aria-label="Permalink to &quot;一、业务流程&quot;">​</a></h2><p>主流程完成微信记录的读取，然后调用子流程 1 完成微信聊天记录总结，调用子流程 2 完成发送消息到微信</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240528221451.png" alt=""></p><h3 id="_1、获取微信聊天记录" tabindex="-1">1、获取微信聊天记录 <a class="header-anchor" href="#_1、获取微信聊天记录" aria-label="Permalink to &quot;1、获取微信聊天记录&quot;">​</a></h3><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240528214508028.png" alt=""></p><h3 id="_2、调用-kimi-总结微信聊天记录" tabindex="-1">2、调用 Kimi 总结微信聊天记录 <a class="header-anchor" href="#_2、调用-kimi-总结微信聊天记录" aria-label="Permalink to &quot;2、调用 Kimi 总结微信聊天记录&quot;">​</a></h3><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240528221407.png" alt=""></p><h3 id="_3、发送群聊总结摘要到个人微信" tabindex="-1">3、发送群聊总结摘要到个人微信 <a class="header-anchor" href="#_3、发送群聊总结摘要到个人微信" aria-label="Permalink to &quot;3、发送群聊总结摘要到个人微信&quot;">​</a></h3><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240528221103.png" alt=""></p><h2 id="二、实操步骤" tabindex="-1">二、实操步骤 <a class="header-anchor" href="#二、实操步骤" aria-label="Permalink to &quot;二、实操步骤&quot;">​</a></h2><h3 id="_1、获取目标微信群" tabindex="-1">1、获取目标微信群 <a class="header-anchor" href="#_1、获取目标微信群" aria-label="Permalink to &quot;1、获取目标微信群&quot;">​</a></h3><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240528223152.png" alt=""></p><h3 id="_2、鼠标移动到群聊底部" tabindex="-1">2、鼠标移动到群聊底部 <a class="header-anchor" href="#_2、鼠标移动到群聊底部" aria-label="Permalink to &quot;2、鼠标移动到群聊底部&quot;">​</a></h3><p>首先鼠标定位群聊对话框，然后进入聊天记录，方便后续鼠标向上移动，查看群聊天记录</p><p>其中捕获“微信群对话框” 通过搜索目标群聊的第 1 个位置来匹配，而不是名称，也就是捕获的时候编辑勾选使用 index ，而不是 title，避免换了群名导致无法找到元素</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240525212501.png" alt=""></p><p>其中“文本输入区_微信群对话框” 就是下面的图1 位置，坐标位置（1227，774）就是下面的图 2 位置</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240528223233.png" alt=""></p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240528225133.png" alt=""></p><p>需要注意的是坐标位置（1227，774），和自己电脑微信窗口大小有关系，可以编辑移动鼠标指令，然后让鼠标移动到指定位置，看下指令界面显示的对应的坐标，然后填写移动鼠标的 X 和 Y</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240528225444.png" alt=""></p><h3 id="_3、获取光标之间的聊天记录" tabindex="-1">3、获取光标之间的聊天记录 <a class="header-anchor" href="#_3、获取光标之间的聊天记录" aria-label="Permalink to &quot;3、获取光标之间的聊天记录&quot;">​</a></h3><p>微信聊天窗口加载聊天记录是一部分一部分加载，当我们看完一部份，往上滑动屏幕，会触发加载功能，继续加载信息，所以我们想要获取更多的聊天信息，需要先滚动屏幕，让更多的聊天内容被加载。</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240528230524.png" alt=""></p><p>所以我们选择的外层指令是无限循环，内层选择“滚动鼠标滚轮”，直到比如碰到内容为“昨天”就停止，这样就能只查看今天的聊天记录了</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240528230307.png" alt=""></p><p>获取聊天记录使用“获取相似元素列表” 指令，并将多条聊天记录存储到变量中</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240528230822.png" alt=""></p><p>这里的相似元素组，每一个元素就是一条聊天记录</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240528231002.png" alt=""></p><h3 id="_4、总结微信聊天记录" tabindex="-1">4、总结微信聊天记录 <a class="header-anchor" href="#_4、总结微信聊天记录" aria-label="Permalink to &quot;4、总结微信聊天记录&quot;">​</a></h3><p>接收入参“聊天记录”，返回出参“总结内容”</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240528231342.png" alt=""></p><p>如果聊天记录比较长，可以设置较长的等待时间，比如 60s，避免 kimi 还没总结完成，就导致指令运行结束了，导致未找到元素异常</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240525225022.png" alt=""></p><h3 id="_5、发送到微信" tabindex="-1">5、发送到微信 <a class="header-anchor" href="#_5、发送到微信" aria-label="Permalink to &quot;5、发送到微信&quot;">​</a></h3><p>将总结好的内容发送到指定微信</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240528231730.png" alt=""></p><h2 id="三、总结" tabindex="-1">三、总结 <a class="header-anchor" href="#三、总结" aria-label="Permalink to &quot;三、总结&quot;">​</a></h2><p>本文提到的 RPA 主流程和子流程如下，为了让大家更快地完成这个机器人，我把机器人的源码整理到，公众号回复『 RPA总结聊天记录』获取，然后直接导入到影刀就可以了</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240528222848.png" alt=""></p><p>通过上述 RPA 程序的主流程，你也可以制作自己的 RPA 器人，帮助读者通过 RPA 工具实现自动化的信息获取和分享，提高了工作效率。更多 RPA 相关实战教程，可以看看下面这个专栏</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240523000822.png" alt=""></p>',49),p=[t];function e(o,m,h,r,g,l){return n(),i("div",null,p)}const d=a(c,[["render",e]]);export{_ as __pageData,d as default};
