import{_ as s,c as i,o as a,a4 as n}from"./chunks/framework.4aTu-Nia.js";const c=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/01 AI/AI 编程/Claude/Claude Code 第一个 Skills.md","filePath":"docs/01 AI/AI 编程/Claude/Claude Code 第一个 Skills.md"}'),l={name:"docs/01 AI/AI 编程/Claude/Claude Code 第一个 Skills.md"},h=n(`<p>Skills 是一个独立的功能包，它为 Claude 提供了专业的工作流、工具或领域知识。它们就像是 Claude 的“专属手册”，可以让 Claude 从一个通用助手变成一个特定领域的专家</p><p>以下是一个完整的指南，这个 Skill 可以系统地执行“元提示词生成 → 评估打分 → 最终优化”生成优质提示词</p><hr><h3 id="_2-创建-skill" tabindex="-1">2. 创建 Skill <a class="header-anchor" href="#_2-创建-skill" aria-label="Permalink to &quot;2. 创建 Skill&quot;">​</a></h3><h4 id="步骤-1-创建-skill-目录结构" tabindex="-1">步骤 1：创建 Skill 目录结构 <a class="header-anchor" href="#步骤-1-创建-skill-目录结构" aria-label="Permalink to &quot;步骤 1：创建 Skill 目录结构&quot;">​</a></h4><p>Skills 需要放在特定的目录中。你可以将其放在全局目录（<code>-/.claude/skills/</code>）或项目专用目录（<code>./.claude/skills/</code>）</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 假设你在全局目录下操作</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkdir</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.claude/skills/prompt-engineer/</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.claude/skills/prompt-engineer/</span></span></code></pre></div><h4 id="步骤-2-编写核心配置文件-skill-md" tabindex="-1">步骤 2：编写核心配置文件 <code>SKILL.md</code> <a class="header-anchor" href="#步骤-2-编写核心配置文件-skill-md" aria-label="Permalink to &quot;步骤 2：编写核心配置文件 \`SKILL.md\`&quot;">​</a></h4><p>每个 Skill 必须包含一个 <code>SKILL.md</code> 文件，这是 Skill 的“大脑”，用于告诉 Claude 何时以及如何使用它</p><p><strong>SKILL. Md 必备内容：</strong></p><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">---</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">prompt-engineer</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">description</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">一个专业的三步法提示词生成系统。它能将用户的模糊需求，通过元提示词生成、评估打分、最终优化三个步骤，自动转化为高质量的“超级提示词”。基于 Google 和 Anthropic 的最佳实践。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">---</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;"># 超级提示词工程师 Skill</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">我将作为一个自动化的提示词生成系统为您工作。请按顺序执行以下三个步骤，我将引导您完成从模糊需求到高质量提示词的全过程。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;">---</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;">## 第一步：使用元提示词生成初始提示词</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">首先，我将扮演“元提示词生成器”的角色。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">请向我提供您的</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;">**原始需求**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">（例如：“帮我写一篇关于时间管理的文章”或“帮我写一个Python重命名脚本”）。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;">**收到您的需求后，我将自动调用以下“元提示词”来为您生成结构化的初始提示词：**</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;">### 元提示词模板</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;"># Role</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">你是一位世界级的提示词工程师（Prompt Engineer），精通所有主流LLM（如Gemini, Claude, GPT）的最佳实践。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;"># Task</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">分析用户的原始输入，应用以下原则重写提示词：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;"> **Persona (角色)**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: 明确AI应扮演的专家角色</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">2.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;"> **Context (背景)**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: 补充缺失的背景信息</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">3.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;"> **Task (任务)**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: 使用清晰、动词驱动的指令</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">4.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;"> **Constraints (限制)**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: 明确“要做什么”和“不要做什么”</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">5.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;"> **Format (格式)**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: 指定输出格式</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">6.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;"> **CoT (思维链)**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: 在复杂任务中要求模型“一步步思考”</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">请按以下格式输出：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;">### 优化后的提示词（初稿）</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(这里是生成的完整Prompt)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;">### 变量说明</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(列出需要填写的变量，如 {target_audience}: 目标受众)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;">---</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;">## 第二步：使用评估提示词生成评估建议</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">在您得到第一步的“初始提示词”后，请将完整的初始提示词内容提供给我。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">我将扮演“评估器”的角色，对其质量进行多维度打分并给出具体改进建议。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;">**收到初始提示词后，我将自动调用以下“评估提示词”：**</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;">### 评估提示词模板</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;"># Role</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">你是一位专门从事LLM评估的QA工程师。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;"># Evaluation Criteria</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">请根据以下维度对给定的“Prompt Candidate”进行评分（1-5分）并提供具体修改建议：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;"> **明确性 (Clarity)**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: 指令是否直接、无歧义？</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">2.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;"> **结构完整性 (Structure)**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: 是否包含角色、任务、背景和格式？</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">3.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;"> **示例质量 (Few-Shot)**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: 是否提供了高质量的示例来引导模型？</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">4.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;"> **思维链 (Reasoning)**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: 对于复杂任务，是否要求模型“一步步思考”？</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">5.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;"> **限制条件 (Constraints)**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: 是否使用了肯定指令多于否定指令？</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;"># Output Format</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">请以JSON格式输出评估结果，包含 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\`scores\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">、</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\`overall_score\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">和 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\`suggestions\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">列表。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;">---</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;">## 第三步：根据评估建议和初始提示词生成最终建议</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">在您得到第二步的“评估结果”（JSON格式）后，请将</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;">**初始提示词**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">和</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;">**评估建议**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">一起提供给我。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">我将扮演“优化器”的角色，综合两者生成最终的、优化后的“超级提示词”。</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;">**收到以上两份材料后，我将执行最终优化，指令如下：**</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">请扮演一位提示词优化专家。您已收到以下两份材料：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 【初始提示词】</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">2.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 【评估建议】</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">请仔细分析评估建议中的每一条修改意见，并将其应用到初始提示词中，生成一个质量更高、更完整、更专业的最终版提示词。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">请确保最终输出包含清晰的Markdown格式、详细的变量说明和具体的示例。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;">---</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;">## 如何使用本 Skill</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;">  **开始**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">：当您说“我想生成一个提示词”或提及“提示词优化”时，我将自动启动此流程。</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">2.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;">  **执行顺序**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">：请严格按照“第一步 → 第二步 → 第三步”的顺序与我交互，并依次提供所需信息。</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">3.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;">  **输入格式**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">：</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    *</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   第一步输入：您的原始、模糊的需求描述。</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    *</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   第二步输入：第一步生成的完整“初始提示词”。</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    *</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   第三步输入：初始提示词 + 第二步生成的JSON评估结果。</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">4.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;">  **输出**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">：您将依次获得：① 结构化初稿、② 质量评估报告、③ 最终优化版提示词。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">现在，我们可以开始了。请告诉我您的原始需求（第一步）。</span></span></code></pre></div><blockquote><p><strong>提示</strong>：如果你不想手动编写 YAML 前言，也可以使用官方提供的 <code>skill-creator</code> 工具进行引导式创建，极大简化流程 [[7]] [[8]]。</p></blockquote><h4 id="步骤-3-添加辅助资源-可选" tabindex="-1">步骤 3：添加辅助资源（可选） <a class="header-anchor" href="#步骤-3-添加辅助资源-可选" aria-label="Permalink to &quot;步骤 3：添加辅助资源（可选）&quot;">​</a></h4><p>如果你的 Skill 需要特定的脚本、配置文件或示例代码，可以将它们一起放在同一目录下，Claude 可以直接引用这些资源</p><hr><h3 id="_3-安装与启用-skill" tabindex="-1">3. 安装与启用 Skill <a class="header-anchor" href="#_3-安装与启用-skill" aria-label="Permalink to &quot;3. 安装与启用 Skill&quot;">​</a></h3><h4 id="方式-1-手动加载-适合开发调试" tabindex="-1">方式 1：手动加载（适合开发调试） <a class="header-anchor" href="#方式-1-手动加载-适合开发调试" aria-label="Permalink to &quot;方式 1：手动加载（适合开发调试）&quot;">​</a></h4><p>如果你已经将 Skill 放在了 <code>.claude/skills/</code> 目录下，Claude Code 通常会自动发现并加载它。</p><h4 id="方式-2-使用-marketplace-适合正式使用" tabindex="-1">方式 2：使用 Marketplace（适合正式使用） <a class="header-anchor" href="#方式-2-使用-marketplace-适合正式使用" aria-label="Permalink to &quot;方式 2：使用 Marketplace（适合正式使用）&quot;">​</a></h4><p>你可以将 Skill 打包发布到 GitHub，然后通过 Claude 的命令行工具进行安装 [[11]] [[12]]：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 安装第三方 Skill</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">claude</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> skill</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://github.com/anthropics/claude-skills</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 安装本地 Skill</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">claude</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> skill</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./my-first-skill</span></span></code></pre></div><hr><h3 id="_4-使用你的-skill" tabindex="-1">4. 使用你的 Skill <a class="header-anchor" href="#_4-使用你的-skill" aria-label="Permalink to &quot;4. 使用你的 Skill&quot;">​</a></h3><h4 id="方法-1-自动触发" tabindex="-1">方法 1：自动触发 <a class="header-anchor" href="#方法-1-自动触发" aria-label="Permalink to &quot;方法 1：自动触发&quot;">​</a></h4><p>当你在对话中输入触发词（如“请审查以下代码”）时，Claude 会自动加载并使用你的 Skill 提供建议 [[13]] [[14]]。</p><h4 id="方法-2-手动调用-slash-command" tabindex="-1">方法 2：手动调用（Slash Command） <a class="header-anchor" href="#方法-2-手动调用-slash-command" aria-label="Permalink to &quot;方法 2：手动调用（Slash Command）&quot;">​</a></h4><p>如果你想直接执行 Skill 的特定功能，可以使用斜杠命令：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/fix-issue</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1234</span></span></code></pre></div><p>这将手动触发名为 <code>fix-issue</code> 的 Skill 并传递参数 <code>1234</code> [[15]]。</p><hr><h3 id="_5-测试与优化" tabindex="-1">5. 测试与优化 <a class="header-anchor" href="#_5-测试与优化" aria-label="Permalink to &quot;5. 测试与优化&quot;">​</a></h3><p>创建完 Skill 后，建议你进行几轮对话测试，确保触发条件准确，输出符合预期。你可以随时编辑 <code>SKILL.md</code> 并重新加载 Skill 来迭代改进 [[16]]。</p><hr><p><strong>总结</strong>：创建 Skill 的核心在于编写好 <code>SKILL.md</code> 文件中的前言（YAML）和详细的提示词（Prompt）。一旦熟悉了这个流程，你就可以构建出用于生成 PPT、审查 PR、重构代码等各种强大的自动化工具 [[17]] [[18]]。</p>`,34),t=[h];function p(k,e,d,E,o,r){return a(),i("div",null,t)}const y=s(l,[["render",p]]);export{c as __pageData,y as default};
