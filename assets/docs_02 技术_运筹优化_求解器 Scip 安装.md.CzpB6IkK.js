import{_ as s,c as a,o as n,a4 as p}from"./chunks/framework.4aTu-Nia.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/02 技术/运筹优化/求解器 Scip 安装.md","filePath":"docs/02 技术/运筹优化/求解器 Scip 安装.md"}'),e={name:"docs/02 技术/运筹优化/求解器 Scip 安装.md"},l=p(`<p>#运筹优化 #求解器</p><h2 id="下载" tabindex="-1">下载 <a class="header-anchor" href="#下载" aria-label="Permalink to &quot;下载&quot;">​</a></h2><p>Scip是集成在SCIP Optimization Suite下的，通过页面 <a href="https://scipopt.org/index.php#download" target="_blank" rel="noreferrer">https://scipopt.org/index.php#download</a> 下载对应系统的安装包</p><p><a href="https://scipopt.org/download.php?fname=scipoptsuite-8.0.3.tgz" target="_blank" rel="noreferrer">https://scipopt.org/download.php?fname=scipoptsuite-8.0.3.tgz</a></p><h2 id="编译安装" tabindex="-1">编译安装 <a class="header-anchor" href="#编译安装" aria-label="Permalink to &quot;编译安装&quot;">​</a></h2><h3 id="_1-安装依赖" tabindex="-1">1. 安装依赖 <a class="header-anchor" href="#_1-安装依赖" aria-label="Permalink to &quot;1. 安装依赖&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>brew install gcc</span></span>
<span class="line"><span>brew install cmake </span></span>
<span class="line"><span>brew install bison</span></span>
<span class="line"><span>brew install IPOPT</span></span>
<span class="line"><span>brew install tbb</span></span></code></pre></div><h3 id="_2-设置scip安装目录" tabindex="-1">2. 设置scip安装目录 <a class="header-anchor" href="#_2-设置scip安装目录" aria-label="Permalink to &quot;2. 设置scip安装目录&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>export SCIPOPTDIR=/usr/local/scip</span></span>
<span class="line"><span>export PATH=$PATH:$SCIPOPTDIR/bin</span></span>
<span class="line"><span>export DYLD_LIBRARY_PATH=$SCIPOPTDIR/lib/libscip.8.0.dylib</span></span>
<span class="line"><span>source .bash_profile</span></span></code></pre></div><h3 id="_3-解压-scipoptsuite-8-0-0-tgz" tabindex="-1">3. 解压 scipoptsuite-8.0.0.tgz <a class="header-anchor" href="#_3-解压-scipoptsuite-8-0-0-tgz" aria-label="Permalink to &quot;3. 解压 scipoptsuite-8.0.0.tgz&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>tar zxvf scipoptsuite-8.0.3.tgz</span></span></code></pre></div><h3 id="_4-install-soplex-and-scip" tabindex="-1">4. install soplex and scip <a class="header-anchor" href="#_4-install-soplex-and-scip" aria-label="Permalink to &quot;4. install soplex and scip&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>mkdir /usr/local/scip</span></span>
<span class="line"><span>cd scipoptsuite-8.0.3</span></span>
<span class="line"><span>mkdir build</span></span>
<span class="line"><span>cmake -S . -B build -DCMAKE_INSTALL_PREFIX=$SCIPOPTDIR</span></span>
<span class="line"><span>make -C ./build -j 16</span></span>
<span class="line"><span>sudo make -C ./build install</span></span></code></pre></div><p>Notice：安装过程中如果遇到错误，删除build安装提示缺失的依赖后重新执行</p><h3 id="_5-python支持" tabindex="-1">5. python支持 <a class="header-anchor" href="#_5-python支持" aria-label="Permalink to &quot;5. python支持&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>pip install pyscipopt</span></span></code></pre></div><h2 id="求解示例" tabindex="-1">求解示例 <a class="header-anchor" href="#求解示例" aria-label="Permalink to &quot;求解示例&quot;">​</a></h2><h3 id="_1-scip命令求解" tabindex="-1">1. scip命令求解 <a class="header-anchor" href="#_1-scip命令求解" aria-label="Permalink to &quot;1. scip命令求解&quot;">​</a></h3><p>新建一个文件，example.lp</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>Maximize</span></span>
<span class="line"><span>obj: 3 x+2 y</span></span>
<span class="line"><span>Subject to</span></span>
<span class="line"><span>c1: 2 x + y &lt;= 18</span></span>
<span class="line"><span>c2: 2 x + 3 y &lt;= 42</span></span>
<span class="line"><span>c3: 3 x + y &lt;= 24</span></span>
<span class="line"><span>c4: x &gt;= 0</span></span>
<span class="line"><span>c5: y &gt;= 0</span></span></code></pre></div><p>scip 进入命令行，执行read\\optimize和输出解的命令</p><p><img src="https://fastly.jsdelivr.net/gh/caijinlin/imgcdn/image-20230724161034555.png" alt=""></p><h3 id="_2-python求解" tabindex="-1">2. python求解 <a class="header-anchor" href="#_2-python求解" aria-label="Permalink to &quot;2. python求解&quot;">​</a></h3><p>import pyscipopt 出错解决方案：</p><p><a href="https://github.com/scipopt/PySCIPOpt/issues/372" target="_blank" rel="noreferrer">https://github.com/scipopt/PySCIPOpt/issues/372</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>#打印出共享库 scip.cpython-311-darwin.so 依赖的其他共享库</span></span>
<span class="line"><span></span></span>
<span class="line"><span>otool -L /usr/local/lib/python3.11/site-packages/pyscipopt/scip.cpython-311-darwin.so </span></span>
<span class="line"><span></span></span>
<span class="line"><span>#使用 install_name_tool 工具,修改共享库 scip.cpython-311-darwin.so 中依赖 libscip.8.0.dylib 的路径,原来可能指向 /usr/local/lib/libscip.8.0.dylib ,修改为 /usr/local/scip/lib/libscip.8.0.dylib </span></span>
<span class="line"><span></span></span>
<span class="line"><span>sudo install_name_tool -change libscip.8.0.dylib /usr/local/scip/lib/libscip.8.0.dylib /usr/local/lib/python3.11/site-packages/pyscipopt/scip.cpython-311-darwin.so</span></span></code></pre></div><p>求解代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>from pyscipopt import Model, quicksum</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def solve_linear_program():</span></span>
<span class="line"><span>    # Create a SCIP model</span></span>
<span class="line"><span>    model = Model(&quot;LinearProgram&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # Create variables</span></span>
<span class="line"><span>    x = model.addVar(vtype=&quot;C&quot;, name=&quot;x&quot;)</span></span>
<span class="line"><span>    y = model.addVar(vtype=&quot;C&quot;, name=&quot;y&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # Set objective function (maximize 3x + 2y)</span></span>
<span class="line"><span>    model.setObjective(3 * x + 2 * y, &quot;maximize&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # Add constraints</span></span>
<span class="line"><span>    model.addCons(2 * x + y &lt;= 18, &quot;c1&quot;)</span></span>
<span class="line"><span>    model.addCons(2 * x + 3 * y &lt;= 42, &quot;c2&quot;)</span></span>
<span class="line"><span>    model.addCons(3 * x + y &lt;= 24, &quot;c3&quot;)</span></span>
<span class="line"><span>    model.addCons(x &gt;= 0, &quot;c4&quot;)</span></span>
<span class="line"><span>    model.addCons(y &gt;= 0, &quot;c5&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # Solve the linear program</span></span>
<span class="line"><span>    model.optimize()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # Check if the problem is solved to optimality</span></span>
<span class="line"><span>    if model.getStatus() == &quot;optimal&quot;:</span></span>
<span class="line"><span>        print(&quot;Optimal solution found.&quot;)</span></span>
<span class="line"><span>        print(&quot;Objective value:&quot;, model.getObjVal())</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # Get the variable values</span></span>
<span class="line"><span>        print(&quot;x =&quot;, model.getVal(x))</span></span>
<span class="line"><span>        print(&quot;y =&quot;, model.getVal(y))</span></span>
<span class="line"><span>    else:</span></span>
<span class="line"><span>        print(&quot;No optimal solution found.&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>if __name__ == &quot;__main__&quot;:</span></span>
<span class="line"><span>    # Solve the linear program and print the results</span></span>
<span class="line"><span>    solve_linear_program()</span></span></code></pre></div><p>输出如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>feasible solution found by trivial heuristic after 0.0 seconds, objective value 0.000000e+00</span></span>
<span class="line"><span>presolving:</span></span>
<span class="line"><span>(round 1, fast)       0 del vars, 2 del conss, 0 add conss, 4 chg bounds, 0 chg sides, 0 chg coeffs, 0 upgd conss, 0 impls, 0 clqs</span></span>
<span class="line"><span>   (0.0s) running MILP presolver</span></span>
<span class="line"><span>   (0.0s) MILP presolver found nothing</span></span>
<span class="line"><span>   (0.0s) symmetry computation started: requiring (bin +, int +, cont +), (fixed: bin -, int -, cont -)</span></span>
<span class="line"><span>   (0.0s) no symmetry present</span></span>
<span class="line"><span>presolving (2 rounds: 2 fast, 1 medium, 1 exhaustive):</span></span>
<span class="line"><span> 0 deleted vars, 2 deleted constraints, 0 added constraints, 4 tightened bounds, 0 added holes, 0 changed sides, 0 changed coefficients</span></span>
<span class="line"><span> 0 implications, 0 cliques</span></span>
<span class="line"><span>presolved problem has 2 variables (0 bin, 0 int, 0 impl, 2 cont) and 3 constraints</span></span>
<span class="line"><span>      3 constraints of type &lt;linear&gt;</span></span>
<span class="line"><span>Presolving Time: 0.02</span></span>
<span class="line"><span>transformed 1/1 original solutions to the transformed problem space</span></span>
<span class="line"><span></span></span>
<span class="line"><span> time | node  | left  |LP iter|LP it/n|mem/heur|mdpt |vars |cons |rows |cuts |sepa|confs|strbr|  dualbound   | primalbound  |  gap   | compl. </span></span>
<span class="line"><span></span></span>
<span class="line"><span>* 0.0s|     1 |     0 |     2 |     - |    LP  |   0 |   2 |   3 |   3 |   0 |  0 |   0 |   0 | 3.300000e+01 | 3.300000e+01 |   0.00%| unknown</span></span>
<span class="line"><span>  0.0s|     1 |     0 |     2 |     - |   584k |   0 |   2 |   3 |   3 |   0 |  0 |   0 |   0 | 3.300000e+01 | 3.300000e+01 |   0.00%| unknown</span></span>
<span class="line"><span></span></span>
<span class="line"><span>SCIP Status        : problem is solved [optimal solution found]</span></span>
<span class="line"><span>Solving Time (sec) : 0.03</span></span>
<span class="line"><span>Solving Nodes      : 1</span></span>
<span class="line"><span>Primal Bound       : +3.30000000000000e+01 (2 solutions)</span></span>
<span class="line"><span>Dual Bound         : +3.30000000000000e+01</span></span>
<span class="line"><span>Gap                : 0.00 %</span></span>
<span class="line"><span>Optimal solution found.</span></span>
<span class="line"><span>Objective value: 33.0</span></span>
<span class="line"><span>x = 2.9999999999999996</span></span>
<span class="line"><span>y = 12.0</span></span></code></pre></div>`,30),i=[l];function t(o,c,d,r,u,h){return n(),a("div",null,i)}const g=s(e,[["render",t]]);export{b as __pageData,g as default};
