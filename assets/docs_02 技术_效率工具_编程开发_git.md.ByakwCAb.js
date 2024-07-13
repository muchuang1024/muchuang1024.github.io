import{_ as a,c as s,o as n,a4 as i}from"./chunks/framework.4aTu-Nia.js";const m=JSON.parse('{"title":"Git","description":"","frontmatter":{},"headers":[],"relativePath":"docs/02 技术/效率工具/编程开发/git.md","filePath":"docs/02 技术/效率工具/编程开发/git.md"}'),l={name:"docs/02 技术/效率工具/编程开发/git.md"},p=i(`<h1 id="git" tabindex="-1">Git <a class="header-anchor" href="#git" aria-label="Permalink to &quot;Git&quot;">​</a></h1><h2 id="基本使用" tabindex="-1">基本使用 <a class="header-anchor" href="#基本使用" aria-label="Permalink to &quot;基本使用&quot;">​</a></h2><h3 id="工作流" tabindex="-1">工作流 <a class="header-anchor" href="#工作流" aria-label="Permalink to &quot;工作流&quot;">​</a></h3><ul><li><code>git clone</code></li><li><code>git pull/git fetch</code></li><li><code>git commit</code></li><li><code>git merge/git rebase</code></li><li><code>git push</code></li><li><code>git tag</code></li></ul><h3 id="分支管理" tabindex="-1">分支管理 <a class="header-anchor" href="#分支管理" aria-label="Permalink to &quot;分支管理&quot;">​</a></h3><ul><li><code>git branch 分支名</code> 创建分支</li><li><code>git checkout 分支名</code> 切换分支</li><li><code>git checkout -b 分支名</code> 创建并切换分支</li><li><code>git branch -d</code> 删除分支</li></ul><h3 id="修改" tabindex="-1">修改 <a class="header-anchor" href="#修改" aria-label="Permalink to &quot;修改&quot;">​</a></h3><ul><li><code>git add</code></li><li><code>git rm</code></li><li><code>git mv</code></li><li><code>git checkout file</code></li><li><code>git cherry-pick commit_id</code> 在当前分支重放commit</li><li><code>git reset --soft HEAD^</code> 撤销提交并保留文件和索引</li><li><code>git reset HEAD^</code> 撤销提交并保留文件</li><li><code>git reset --hard HEAD^</code> 撤销提交</li><li><code>git revert commit_id</code> 撤销已push的commit</li></ul><h3 id="暂存" tabindex="-1">暂存 <a class="header-anchor" href="#暂存" aria-label="Permalink to &quot;暂存&quot;">​</a></h3><ul><li><code>git stash save</code></li><li><code>git stash apply</code></li><li><code>git stash drop</code></li><li><code>git stash clear</code></li><li><code>git stash list</code></li><li><code>git stash show [stash]</code></li></ul><h3 id="查看" tabindex="-1">查看 <a class="header-anchor" href="#查看" aria-label="Permalink to &quot;查看&quot;">​</a></h3><ul><li><code>git branch</code></li><li><code>git diff</code></li><li><code>git status</code></li><li><code>git log</code></li><li><code>git show</code></li></ul><h2 id="命令别名" tabindex="-1">命令别名 <a class="header-anchor" href="#命令别名" aria-label="Permalink to &quot;命令别名&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>alias gcl=&#39;git clone&#39;</span></span>
<span class="line"><span>alias ga=&#39;git add&#39;</span></span>
<span class="line"><span>alias grm=&#39;git rm&#39;</span></span>
<span class="line"><span>alias gap=&#39;git add -p&#39;</span></span>
<span class="line"><span>alias gall=&#39;git add -A&#39;</span></span>
<span class="line"><span>alias gf=&#39;git fetch --all --prune&#39;</span></span>
<span class="line"><span>alias gft=&#39;git fetch --all --prune --tags&#39;</span></span>
<span class="line"><span>alias gfv=&#39;git fetch --all --prune --verbose&#39;</span></span>
<span class="line"><span>alias gftv=&#39;git fetch --all --prune --tags --verbose&#39;</span></span>
<span class="line"><span>alias gus=&#39;git reset HEAD&#39;</span></span>
<span class="line"><span>alias grs=&#39;git reset --soft HEAD^&#39;</span></span>
<span class="line"><span>alias gpristine=&#39;git reset --hard &amp;&amp; git clean -dfx&#39;</span></span>
<span class="line"><span>alias gclean=&#39;git clean -fd&#39;</span></span>
<span class="line"><span>alias gm=&quot;git merge&quot;</span></span>
<span class="line"><span>alias gmv=&#39;git mv&#39;</span></span>
<span class="line"><span>alias g=&#39;git&#39;</span></span>
<span class="line"><span>alias get=&#39;git&#39;</span></span>
<span class="line"><span>alias gst=&#39;git status&#39;</span></span>
<span class="line"><span>alias gs=&#39;git status&#39;</span></span>
<span class="line"><span>alias gss=&#39;git status -s&#39;</span></span>
<span class="line"><span>alias gsu=&#39;git submodule update --init --recursive&#39;</span></span>
<span class="line"><span>alias gl=&#39;git pull&#39;</span></span>
<span class="line"><span>alias glum=&#39;git pull upstream master&#39;</span></span>
<span class="line"><span>alias gpr=&#39;git pull --rebase&#39;</span></span>
<span class="line"><span>alias gpp=&#39;git pull &amp;&amp; git push&#39;</span></span>
<span class="line"><span>alias gup=&#39;git fetch &amp;&amp; git rebase&#39;</span></span>
<span class="line"><span>alias gp=&#39;git push&#39;</span></span>
<span class="line"><span>alias gpo=&#39;git push origin&#39;</span></span>
<span class="line"><span>alias gpu=&#39;git push --set-upstream&#39;</span></span>
<span class="line"><span>alias gpuo=&#39;git push --set-upstream origin&#39;</span></span>
<span class="line"><span>alias gpom=&#39;git push origin master&#39;</span></span>
<span class="line"><span>alias gr=&#39;git remote&#39;</span></span>
<span class="line"><span>alias grv=&#39;git remote -v&#39;</span></span>
<span class="line"><span>alias gra=&#39;git remote add&#39;</span></span>
<span class="line"><span>alias gd=&#39;git diff&#39;</span></span>
<span class="line"><span>alias gdv=&#39;git diff -w &quot;$@&quot; | vim -R -&#39;</span></span>
<span class="line"><span>alias gc=&#39;git commit -v&#39;</span></span>
<span class="line"><span>alias gca=&#39;git commit -v -a&#39;</span></span>
<span class="line"><span>alias gcm=&#39;git commit -v -m&#39;</span></span>
<span class="line"><span>alias gcam=&quot;git commit -v -am&quot;</span></span>
<span class="line"><span>alias gci=&#39;git commit --interactive&#39;</span></span>
<span class="line"><span>alias gb=&#39;git branch&#39;</span></span>
<span class="line"><span>alias gba=&#39;git branch -a&#39;</span></span>
<span class="line"><span>alias gbt=&#39;git branch --track&#39;</span></span>
<span class="line"><span>alias gbm=&#39;git branch -m&#39;</span></span>
<span class="line"><span>alias gbd=&#39;git branch -d&#39;</span></span>
<span class="line"><span>alias gbD=&#39;git branch -D&#39;</span></span>
<span class="line"><span>alias gcount=&#39;git shortlog -sn&#39;</span></span>
<span class="line"><span>alias gcp=&#39;git cherry-pick&#39;</span></span>
<span class="line"><span>alias gco=&#39;git checkout&#39;</span></span>
<span class="line"><span>alias gcom=&#39;git checkout master&#39;</span></span>
<span class="line"><span>alias gcb=&#39;git checkout -b&#39;</span></span>
<span class="line"><span>alias gcob=&#39;git checkout -b&#39;</span></span>
<span class="line"><span>alias gct=&#39;git checkout --track&#39;</span></span>
<span class="line"><span>alias gexport=&#39;git archive --format zip --output&#39;</span></span>
<span class="line"><span>alias gdel=&#39;git branch -D&#39;</span></span>
<span class="line"><span>alias gmu=&#39;git fetch origin -v; git fetch upstream -v; git merge upstream/master&#39;</span></span>
<span class="line"><span>alias gll=&#39;git log --graph --pretty=oneline --abbrev-commit&#39;</span></span>
<span class="line"><span>alias gg=&quot;git log --graph --pretty=format:&#39;%C(bold)%h%Creset%C(magenta)%d%Creset %s %C(yellow)&lt;%an&gt; %C(cyan)(%cr)%Creset&#39; --abbrev-commit --date=relative&quot;</span></span>
<span class="line"><span>alias ggs=&quot;gg --stat&quot;</span></span>
<span class="line"><span>alias gsl=&quot;git shortlog -sn&quot;</span></span>
<span class="line"><span>alias gwc=&quot;git whatchanged&quot;</span></span>
<span class="line"><span>alias gt=&quot;git tag&quot;</span></span>
<span class="line"><span>alias gta=&quot;git tag -a&quot;</span></span>
<span class="line"><span>alias gtd=&quot;git tag -d&quot;</span></span>
<span class="line"><span>alias gtl=&quot;git tag -l&quot;</span></span>
<span class="line"><span># From http://blogs.atlassian.com/2014/10/advanced-git-aliases/</span></span>
<span class="line"><span># Show commits since last pull</span></span>
<span class="line"><span>alias gnew=&quot;git log HEAD@{1}..HEAD@{0}&quot;</span></span>
<span class="line"><span># Add uncommitted and unstaged changes to the last commit</span></span>
<span class="line"><span>alias gcaa=&quot;git commit -a --amend -C HEAD&quot;</span></span>
<span class="line"><span>alias ggui=&quot;git gui&quot;</span></span>
<span class="line"><span>alias gcsam=&quot;git commit -S -am&quot;</span></span>
<span class="line"><span>alias gstd=&quot;git stash drop&quot;</span></span>
<span class="line"><span>alias gstl=&quot;git stash list&quot;</span></span></code></pre></div>`,14),t=[p];function e(c,o,g,d,r,u){return n(),s("div",null,t)}const b=a(l,[["render",e]]);export{m as __pageData,b as default};
