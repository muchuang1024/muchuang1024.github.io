import{_ as s,c as a,o as n,a4 as p}from"./chunks/framework.4aTu-Nia.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/00 创作中/运筹优化/约束优化.md","filePath":"docs/00 创作中/运筹优化/约束优化.md"}'),e={name:"docs/00 创作中/运筹优化/约束优化.md"},o=p(`<h2 id="一、介绍" tabindex="-1">一、介绍 <a class="header-anchor" href="#一、介绍" aria-label="Permalink to &quot;一、介绍&quot;">​</a></h2><p>约束优化（<strong>Constraint optimization</strong>）也称为 （<strong>Constraint Programming</strong>） (CP)，CP 基于可行性（找到可行的解决方案） 而不是优化 （找到最佳解决方案），并且侧重于约束和变量，而不是目标函数。事实上，CP 问题甚至可能没有目标函数 — 目标可能是通过向问题添加约束，将一大组可能的解决方案缩小到更易于管理的子集。</p><h2 id="二、tools-工具" tabindex="-1">二、Tools 工具 <a class="header-anchor" href="#二、tools-工具" aria-label="Permalink to &quot;二、Tools 工具&quot;">​</a></h2><p>Google 提供了几种解决 CP 问题的方法：</p><p><a href="https://developers.google.com/optimization/cp/cp_solver" target="_blank" rel="noreferrer">CP-SAT 求解器</a>：<strong>约束规划</strong> 使用 SAT（satisfiability）满足性方法的求解器。</p><p><a href="https://developers.google.com/optimization/routing/original_cp_solver" target="_blank" rel="noreferrer">原始 CP 求解器</a>：A Routing Library 中使用的 <strong>Constraint Programming</strong> 解算器</p><h2 id="三、cp-sat-solver" tabindex="-1">三、CP-SAT Solver <a class="header-anchor" href="#三、cp-sat-solver" aria-label="Permalink to &quot;三、CP-SAT Solver&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>from ortools.sat.python import cp_model</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def simple_sat_program():</span></span>
<span class="line"><span>    &quot;&quot;&quot;Minimal CP-SAT example to showcase calling the solver.&quot;&quot;&quot;</span></span>
<span class="line"><span>    # Creates the model.</span></span>
<span class="line"><span>    model = cp_model.CpModel()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # Creates the variables.</span></span>
<span class="line"><span>    num_vals = 3</span></span>
<span class="line"><span>    x = model.new_int_var(0, num_vals - 1, &quot;x&quot;)</span></span>
<span class="line"><span>    y = model.new_int_var(0, num_vals - 1, &quot;y&quot;)</span></span>
<span class="line"><span>    z = model.new_int_var(0, num_vals - 1, &quot;z&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # Creates the constraints.</span></span>
<span class="line"><span>    model.add(x != y)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # Creates a solver and solves the model.</span></span>
<span class="line"><span>    solver = cp_model.CpSolver()</span></span>
<span class="line"><span>    status = solver.solve(model)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if status == cp_model.OPTIMAL or status == cp_model.FEASIBLE:</span></span>
<span class="line"><span>        print(f&quot;x = {solver.value(x)}&quot;)</span></span>
<span class="line"><span>        print(f&quot;y = {solver.value(y)}&quot;)</span></span>
<span class="line"><span>        print(f&quot;z = {solver.value(z)}&quot;)</span></span>
<span class="line"><span>    else:</span></span>
<span class="line"><span>        print(&quot;No solution found.&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>simple_sat_program()</span></span></code></pre></div>`,8),l=[o];function t(r,i,c,_,d,u){return n(),a("div",null,l)}const v=s(e,[["render",t]]);export{h as __pageData,v as default};
