import{_ as p,c as i,o as r,a4 as t}from"./chunks/framework.4aTu-Nia.js";const u=JSON.parse('{"title":"一、介绍","description":"","frontmatter":{},"headers":[],"relativePath":"docs/00 创作中/运筹优化/jsprit.md","filePath":"docs/00 创作中/运筹优化/jsprit.md"}'),e={name:"docs/00 创作中/运筹优化/jsprit.md"},l=t('<h1 id="一、介绍" tabindex="-1">一、介绍 <a class="header-anchor" href="#一、介绍" aria-label="Permalink to &quot;一、介绍&quot;">​</a></h1><p>jsprit 是一个基于 java 的开源工具包，用于解决旅行商（TSP）和车辆路径问题（VRP）。 它轻量级，灵活且易于使用。</p><p><a href="https://github.com/graphhopper/jsprit" target="_blank" rel="noreferrer">https://github.com/graphhopper/jsprit</a></p><h1 id="二、原理" tabindex="-1">二、原理 <a class="header-anchor" href="#二、原理" aria-label="Permalink to &quot;二、原理&quot;">​</a></h1><p>jsprit 解决各种车辆路径问题的元启发式思想，应用的是由Schrimpf（2000）等人提出的 _<strong>ruin-and-recreate</strong>_原则。这是一个大型邻域搜索VNS，它结合了模拟退火和阈值接受算法的思想。</p><p>从本质上讲，它的工作原理如下：</p><p>从初始解决方案开始，它破坏了部分解决方案，导致</p><p>（i）一组请求不再由车辆提供服务</p><p>（ii）剩余的其他请求包含于部分解决方案。</p><p>因此，该步骤称为“破坏”(ruin)步骤。</p><p>基于部分解决方案（ii）来自（i）的所有作业再次重新集成，因此被称为“重新创建”_<strong>recreate</strong>_产生新解决方案。如果新解决方案具有一定的优势，则它被接受为新的最佳解决方案，于是开始了新的破坏和重新创建的迭代。一遍又一遍地重复这些步骤，直到满足某个终止标准（例如计算时间，最大迭代次数等）。</p><p>jsprit扩展了Schrimpf等人描述的核心算法，策略灵感来自Pisinger和Ropke（2007）的工作。</p><p>Jsprit的核心算法优势：</p><ol><li><p>它最适合具有许多约束和不连续解空间的复杂问题</p></li><li><p>它是一个通用的元启发式，可以用来解决许多经典的VRP类型</p></li><li><p>它可以以直观的方式同时计算</p></li><li><p>根据问题的复杂性，基本搜索策略（或局部移动）可以很容易地改变为小型和大型移动</p></li><li><p>它可以产生全新的邻域结构</p></li><li><p>搜索策略的数量可以保持较低，从而使得它结构简单，容易理解</p></li><li><p>破坏和重建之间有一个明显的区分 ，使约束检查更容易。</p></li></ol><h2 id="_1-1-工具的简要介绍" tabindex="-1">1.1 工具的简要介绍 <a class="header-anchor" href="#_1-1-工具的简要介绍" aria-label="Permalink to &quot;1.1 工具的简要介绍&quot;">​</a></h2><p>**OR-Tools：**OR-Tools是google开发的一个用于优化的开源软件套件，该套件不仅可以解决车辆路线规划问题，还能解决流量，整数和线性规划以及约束规划等其他问题。</p><p>**Jsprit：**jsprit是一个基于java的开源工具包，专门用于解决旅行商（TSP）和车辆路径问题（VRP），轻量级，灵活且易于使用。</p><h2 id="_1-2-车辆路径规划问题" tabindex="-1">1.2 车辆路径规划问题 <a class="header-anchor" href="#_1-2-车辆路径规划问题" aria-label="Permalink to &quot;1.2 车辆路径规划问题&quot;">​</a></h2><p>车辆路径规划问题在物流领域和生产领域的应用非常广泛。</p><p>在实际应用中也出现了一些在标准问题的基础上增加了某些变化之后的变型问题。其中较为常见的包括：</p><p>CVRP：Capacitated VRP, 限制配送车辆的承载体积、重量等。</p><p>VRPTW：VRP with Time Windows, 客户对货物的送达时间有时间窗要求。</p><p>VRPPD：VRP with Pickup and Delivery, 车辆在配送过程中可以一边揽收一边配送，在外卖O2O场景中比较常见。</p><p>MDVRP： Multi-Depot VRP, 配送网络中有多个仓库，同样的货物可以在多个仓库取货。</p><p>OVRP：Open VRP, 车辆完成配送任务之后不需要返回仓库。</p><p>VRPB： VRP with backhauls, 车辆完成配送任务之后回程取货。</p><h1 id="二、支持的vrp求解问题列表" tabindex="-1">二、支持的vrp求解问题列表 <a class="header-anchor" href="#二、支持的vrp求解问题列表" aria-label="Permalink to &quot;二、支持的vrp求解问题列表&quot;">​</a></h1><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20250126160312.png" alt=""></p><p><strong>除了上述典型的VRP问题之外，Jsprit还支持如下的设置：</strong></p><ul><li><p>设置车队大小为infinite，根据订单数量动态计算所需车辆</p></li><li><p>支持自定义设置成本的计算方式，根据行驶路径、固定成本和时间窗等成本</p></li><li><p>支持多车型和混合车队</p></li><li><p>如上问题和设置的组合</p></li></ul><h1 id="三、总结" tabindex="-1">三、总结 <a class="header-anchor" href="#三、总结" aria-label="Permalink to &quot;三、总结&quot;">​</a></h1><p><strong>OR-Tools</strong></p><ul><li><p>在解决VRP问题上</p><p>支持CVRP（和CVRP with penalty）、VRPTW、VRPPD等常见问题的解决，三种类型问题覆盖了VRP的很多场景</p><p>在求解速度和求解质量方面有一定的优势。</p></li><li><p>其他非VRP类型的问题上：支持线性/整数/约束规划等</p></li><li><p>语言支持上更丰富</p></li></ul><p><strong>Jsprit</strong></p><ol><li><p>在解决VRP问题上：</p><p>Jsprit是一个专门解决VRP问题的工具，支持的VRP的问题类型丰富，接口简单易用</p><p>在求解速度和求解质量方面相对ortools要差一些。</p></li><li><p>无法支持其他非VRP类型的问题</p></li><li><p>仅支持JAVA语言</p></li></ol><p>如果从通用性上考虑，OR-Tools是一个更合适的方案。</p><p>如果从VRP问题求解上看，OR-Tools支持的设置要少于Jsprit，Jsprit优势稍高一些，鉴于该工具不支持python，建议使用搭建web服务的方式使用。</p><h1 id="参考" tabindex="-1">参考： <a class="header-anchor" href="#参考" aria-label="Permalink to &quot;参考：&quot;">​</a></h1><p>Vehicle Routing Problem</p><p><a href="http://neo.lcc.uma.es/vrp/vehicle-routing-problem/" target="_blank" rel="noreferrer">http://neo.lcc.uma.es/vrp/vehicle-routing-problem/</a></p><p>google ortools</p><p><a href="https://developers.google.com/optimization/routing" target="_blank" rel="noreferrer">https://developers.google.com/optimization/routing</a></p><p>jsprit</p><p><a href="https://github.com/graphhopper/jsprit" target="_blank" rel="noreferrer">https://github.com/graphhopper/jsprit</a></p><p>【前沿】物界科技(WaterMirror)发布最快VRP计算引擎 πOS VRP Solver</p><p><a href="https://www.shangyexinzhi.com/article/details/id-389516/" target="_blank" rel="noreferrer">https://www.shangyexinzhi.com/article/details/id-389516/</a></p><h1 id="附" tabindex="-1">附 <a class="header-anchor" href="#附" aria-label="Permalink to &quot;附&quot;">​</a></h1><p><strong>jsprit 特性</strong></p><ul><li><p>支持无限和有限车队</p></li><li><p>支持混合车队</p></li><li><p>支持多仓库</p></li><li><p>支持开放线路</p></li><li><p>支持不同出发和达到地</p></li><li><p>支持多尺寸/分割的运力</p></li><li><p>支持中途拣货和投放</p></li><li><p>支持服务时间限制</p></li><li><p>支持有时间窗的任务</p></li><li><p>支持具有一定技能或载具要求的任务</p></li><li><p>支持优先级</p></li><li><p>支持定义额外的无状态和有状态的约束/条件以解释复杂问题的能力</p></li><li><p>针对经典问题实例的检验</p></li><li><p>支持可视化结果的工具集</p></li><li><p>活跃的开发</p></li><li><p>包含丰富的单元和集成测试</p></li><li><p>包含大量的实例</p></li><li><p>基于Apache V2协议</p></li></ul><p><strong>模块</strong><br> jsprit是一个多模块项目，包含如下模块：<br> jsprit-core<br> jsprit-analysis<br> jsprit-instances<br> jsprit-examples<br> jsprit-io</p>',50),a=[l];function o(s,n,h,c,d,g){return r(),i("div",null,a)}const m=p(e,[["render",o]]);export{u as __pageData,m as default};
