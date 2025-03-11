import{_ as t,c as r,o as a,a4 as d}from"./chunks/framework.4aTu-Nia.js";const u=JSON.parse('{"title":"一 背景&目的","description":"","frontmatter":{},"headers":[],"relativePath":"docs/00 创作中/运筹优化/参数自动寻优.md","filePath":"docs/00 创作中/运筹优化/参数自动寻优.md"}'),o={name:"docs/00 创作中/运筹优化/参数自动寻优.md"},e=d('<h1 id="一-背景-目的" tabindex="-1">一 背景&amp;目的 <a class="header-anchor" href="#一-背景-目的" aria-label="Permalink to &quot;一 背景&amp;目的&quot;">​</a></h1><ul><li><p>当前参数为人工配置，强依赖于经验；</p></li><li><p>换电派单场景具有高度动态性，需动态调整参数适配变化的场景；</p></li><li><p>旨在为派单系统提供<strong>动态化、场景化</strong>的参数配置能力，通过实时请求数据驱动参数组合搜索，实现系统性能的最优适配。</p></li></ul><h1 id="二-调研" tabindex="-1">二 调研 <a class="header-anchor" href="#二-调研" aria-label="Permalink to &quot;二 调研&quot;">​</a></h1><p><strong>网格搜索（Grid Search）</strong></p><p>网格搜索是一种基于穷举思想的超参数调优方法。它通过预先定义每个参数的取值范围和步长，生成所有可能的参数组合，并逐一训练模型以评估效果。这种方法的最大优势是简单直观，且能保证在搜索范围内找到全局最优解。然而，当参数数量增加时，组合数会呈指数级增长（即维度灾难），导致计算成本急剧上升。因此，网格搜索仅适用于参数数量较少（如2-3个）且计算资源充足的场景。</p><p><strong>随机搜索（Random Search）</strong></p><p>随机搜索是网格搜索的改进版本，通过随机采样参数组合进行尝试。虽然可能遗漏某些最优解，但它在中高维参数空间中的效率显著高于网格搜索，尤其当参数重要性差异较大时（少数关键参数主导性能）。例如，在调优神经网络的初始学习率和批量大小时，随机搜索能以更少尝试次数找到近似最优解。其缺点是结果受采样分布影响，适用于需要快速获得可行解的工程场景。</p><p><strong>贝叶斯优化（Bayesian Optimization）</strong></p><p>贝叶斯优化通过构建目标函数的概率模型（如高斯过程）来指导参数搜索方向。它利用历史评估结果预测哪些参数组合更可能接近最优值，并在“探索未知区域”和“利用已知最优区域”之间动态平衡。这种方法在较少迭代次数内即可找到较优解，尤其适合目标函数评估成本高的场景（如训练深度学习模型）。但贝叶斯优化的实现复杂度较高，且对初始参数敏感，可能陷入局部最优。典型应用包括自动化机器学习框架（如AutoML）和复杂模型的超参数调优。</p><p><strong>基于树的调优（Tree-structured Parzen Estimator, TPE）</strong></p><p>TPE是贝叶斯优化的变种，使用树形结构对参数分布建模。它通过区分“表现优”和“表现差”的参数组，更新概率模型以指导后续采样。相比传统贝叶斯优化，TPE更高效且支持并行计算，常用于自动化机器学习工具（如Hyperopt、Optuna）。缺点是模型更新成本较高，对超参数设置敏感。</p><p><strong>强化学习（Reinforcement Learning, RL）</strong></p><p>强化学习将超参数优化视为一个序列决策问题：智能体通过与环境交互（如调整参数并观察模型效果）来学习最优策略。其核心优势是能够动态适应环境变化，并优化长期累积奖励（如多轮调参后的整体性能）。例如，在动态派单系统中，强化学习可以根据实时订单变化调整参数策略。然而，强化学习需要大量交互数据，训练过程不稳定，且实现复杂度极高，通常仅用于需要实时决策的复杂场景。</p><p><strong>遗传算法（Genetic Algorithm, GA）</strong></p><p>遗传算法模拟生物进化过程，通过选择、交叉、变异等操作生成新参数组合。它擅长处理非凸、多峰的目标函数，并支持混合参数类型（如离散与连续参数共存）。例如，在同时优化模型结构和超参数时，遗传算法能有效探索全局最优解。但其收敛速度较慢，且需大量计算资源，通常用于多目标优化或复杂参数空间（如组合优化问题）。</p><p><strong>Hyperband</strong></p><p>Hyperband通过动态资源分配加速参数搜索。其核心思想是对不同参数组合分配不同评估资源（如训练轮数），快速淘汰表现差的组合。例如，在训练深度模型时，先用少量epoch筛选候选参数，再对优质候选进行完整训练。这种方法显著提升了资源利用率，但依赖合理的早停策略，可能误删潜力参数。适用于需要快速筛选大规模参数组合的场景。</p><table><thead><tr><th><strong>方法</strong></th><th><strong>核心优势</strong></th><th><strong>核心缺陷</strong></th><th><strong>适用场景</strong></th></tr></thead><tbody><tr><td><strong>网格搜索</strong></td><td>全局最优解保证</td><td>计算成本高，维度灾难</td><td>小规模参数空间</td></tr><tr><td><strong>贝叶斯优化</strong></td><td>高效、智能探索</td><td>实现复杂，依赖初始点</td><td>高成本评估、中高维参数</td></tr><tr><td><strong>强化学习</strong></td><td>动态适应、长期优化</td><td>训练不稳定，实现复杂</td><td>动态环境、复杂决策</td></tr><tr><td><strong>随机搜索</strong></td><td>比网格搜索高效</td><td>可能遗漏最优解</td><td>中高维参数快速搜索</td></tr><tr><td><strong>遗传算法</strong></td><td>全局搜索能力强</td><td>收敛慢，资源消耗大</td><td>多目标优化、混合参数空间</td></tr><tr><td><strong>梯度优化</strong></td><td>收敛速度快</td><td>仅适用于可微参数</td><td>可微超参数（如学习率）</td></tr><tr><td><strong>Hyperband</strong></td><td>资源利用率高</td><td>依赖早停策略</td><td>大规模参数快速筛选</td></tr><tr><td><strong>TPE</strong></td><td>高效、支持并行</td><td>模型更新成本高</td><td>自动化机器学习框架</td></tr></tbody></table><h1 id="三-参数搜索框架" tabindex="-1">三 参数搜索框架 <a class="header-anchor" href="#三-参数搜索框架" aria-label="Permalink to &quot;三 参数搜索框架&quot;">​</a></h1><p>按请求进行参数搜索，为每个请求配置一组参数组合</p><h2 id="_3-1-参数说明" tabindex="-1">3.1 参数说明 <a class="header-anchor" href="#_3-1-参数说明" aria-label="Permalink to &quot;3.1 参数说明&quot;">​</a></h2><p>为了便于描述，设置如下参数：</p><ul><li><p>为请求数据，包括责任田信息、H3信息、站点信息、运力信息等；</p></li><li><p>为派单系统的可配置参数，包括最大距离、满载率、作业密度、低电额外分数等；</p></li><li><p>为给定配置参数和，再经过运筹求解之后指标的数值，包括每公里换电量、低电派发率等。</p></li></ul><h2 id="_3-2-代价函数" tabindex="-1">3.2 代价函数 <a class="header-anchor" href="#_3-2-代价函数" aria-label="Permalink to &quot;3.2 代价函数&quot;">​</a></h2><p>代价函数决定了参数优化的方向。它可以与运筹中的目标完全一致，也可以针对派单系统中的某个具体指标，这取决于我们希望优化系统参数的目标方向。例如，</p><ul><li><p>如果重点关注人效，可以将与效率相关的指标（如每公里换电量）作为代价函数；</p></li><li><p>若侧重提高低低电派单的情况，则可以选择低电派发率作为代价函数。</p></li></ul><p>因此，派单系统在进行参数搜索时，代价函数应具备高度可配置性，以支持多种派单场景。此外，还可以对多个指标进行加权求和，从而实现对多个目标的同步优化，即</p><p>通过设置权重来设置侧重的指标。</p><h2 id="_3-1-搜索策略" tabindex="-1">3.1 搜索策略 <a class="header-anchor" href="#_3-1-搜索策略" aria-label="Permalink to &quot;3.1 搜索策略&quot;">​</a></h2><p>贝叶斯优化，参数维度 &lt;= 20 目标函数是黑盒</p><h2 id="todo" tabindex="-1">TODO <a class="header-anchor" href="#todo" aria-label="Permalink to &quot;TODO&quot;">​</a></h2><p>一下决策变量维数很高，远大于20，且目标函数耗时的情况可以使用 zeroth gradient</p>',32),n=[e];function s(p,i,l,h,g,c){return a(),r("div",null,n)}const m=t(o,[["render",s]]);export{u as __pageData,m as default};
