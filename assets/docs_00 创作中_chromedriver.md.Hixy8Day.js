import{_ as s,c as a,o as n,a4 as e}from"./chunks/framework.4aTu-Nia.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/00 创作中/chromedriver.md","filePath":"docs/00 创作中/chromedriver.md"}'),p={name:"docs/00 创作中/chromedriver.md"},o=e(`<p>安装依赖</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>sudo yum update -y</span></span>
<span class="line"><span>sudo yum install -y wget unzip</span></span>
<span class="line"><span>sudo yum install -y xorg-x11-server-Xvfb epel-release</span></span>
<span class="line"><span>sudo yum install -y chromium # Chrome 浏览器</span></span></code></pre></div><p>Chromium 126.0.6478.114 Fedora Project</p><p>查找 chrome 对应的版本：</p><p><a href="https://www.cnblogs.com/aiyablog/articles/17948703" target="_blank" rel="noreferrer">https://www.cnblogs.com/aiyablog/articles/17948703</a></p><p>获取 chrome-driver 版本：</p><p>如果版本<strong>超过114版本</strong>,点击下图位置</p><p><a href="https://googlechromelabs.github.io/chrome-for-testing/#stable" target="_blank" rel="noreferrer">https://googlechromelabs.github.io/chrome-for-testing/#stable</a></p><p>否则使用</p><p><a href="https://developer.chrome.com/docs/chromedriver/downloads" target="_blank" rel="noreferrer">https://developer.chrome.com/docs/chromedriver/downloads</a></p><p><a href="https://storage.googleapis.com/chrome-for-testing-public/126.0.6440.0/linux64/chromedriver-linux64.zip" target="_blank" rel="noreferrer">https://storage.googleapis.com/chrome-for-testing-public/126.0.6440.0/linux64/chromedriver-linux64.zip</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>chromium-browser --version</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Replace the version number in the URL below with the correct version</span></span>
<span class="line"><span>wget -O chromedriver.zip https://chromedriver.storage.googleapis.com/126.0.6478.114/chromedriver_linux64.zip</span></span>
<span class="line"><span>unzip chromedriver.zip</span></span>
<span class="line"><span>sudo mv chromedriver-linux64/chromedriver /usr/local/bin</span></span>
<span class="line"><span>sudo chmod +x /usr/local/bin/chromedriver</span></span></code></pre></div><p>Install Python and Selenium</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>sudo yum install -y python3 python3-pip</span></span>
<span class="line"><span>pip3 install --upgrade pip</span></span>
<span class="line"><span>pip3 install selenium</span></span></code></pre></div><p>Run WebDriver with Selenium</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>from selenium import webdriver</span></span>
<span class="line"><span></span></span>
<span class="line"><span>option = webdriver.ChromeOptions()</span></span>
<span class="line"><span>option.add_argument(&quot;--headless&quot;)</span></span>
<span class="line"><span>option.add_argument(&quot;--disable-gpu&quot;)</span></span>
<span class="line"><span>option.add_argument(&quot;--no-sandbox&quot;)</span></span>
<span class="line"><span>option.add_argument(&quot;--disable-dev-shm-usage&quot;)</span></span>
<span class="line"><span>option.add_experimental_option(</span></span>
<span class="line"><span>    &quot;prefs&quot;, {&quot;profile.managed_default_content_settings.images&quot;: 2}</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>browser = webdriver.Chrome(options=option)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>try:</span></span>
<span class="line"><span>    browser.set_page_load_timeout(30)</span></span>
<span class="line"><span>    browser.get(&quot;https://www.baidu.com&quot;)</span></span>
<span class="line"><span>    print(browser.title)</span></span>
<span class="line"><span>finally:</span></span>
<span class="line"><span>    browser.quit()</span></span></code></pre></div><p>centos 速度慢的问题</p><p><a href="https://personalbioinformatics.blogspot.com/2020/12/centos7-selenium.html" target="_blank" rel="noreferrer">https://personalbioinformatics.blogspot.com/2020/12/centos7-selenium.html</a></p><p>yum install gcc python3-devel</p><p>pip3 install drissionpage</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>pip3 install flask</span></span></code></pre></div>`,21),t=[o];function i(l,r,c,d,h,u){return n(),a("div",null,t)}const b=s(p,[["render",i]]);export{g as __pageData,b as default};
