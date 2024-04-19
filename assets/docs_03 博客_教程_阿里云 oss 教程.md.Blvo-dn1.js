import{_ as a,c as e,o as s,a4 as t}from"./chunks/framework.4aTu-Nia.js";const _=JSON.parse('{"title":"一、开通","description":"","frontmatter":{},"headers":[],"relativePath":"docs/03 博客/教程/阿里云 oss 教程.md","filePath":"docs/03 博客/教程/阿里云 oss 教程.md"}'),c={name:"docs/03 博客/教程/阿里云 oss 教程.md"},n=t('<p>#公众号</p><h1 id="一、开通" tabindex="-1">一、开通 <a class="header-anchor" href="#一、开通" aria-label="Permalink to &quot;一、开通&quot;">​</a></h1><p>打开 <a href="https://free.aliyun.com/" target="_blank" rel="noreferrer">https://free.aliyun.com/</a> 找到对象存储 oss，可免费试用 20GB 3个月，试用期结束后，可以按照流量计费</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240324210917.png" alt=""></p><p>如果没有开通 oss，直接点击试用按钮</p><h1 id="二、创建-bucket" tabindex="-1">二、创建 Bucket <a class="header-anchor" href="#二、创建-bucket" aria-label="Permalink to &quot;二、创建 Bucket&quot;">​</a></h1><p>登录<a href="https://oss.console.aliyun.com/" target="_blank" rel="noreferrer">对象存储OSS控制台</a>，创建Bucket</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240324210936.png" alt=""></p><p>在<strong>创建Bucket</strong>面板，设置<strong>Bucket名称</strong>，设置<strong>地域</strong>，其他保留默认设置，然后单击<strong>确定</strong>。Bucket名称必须全局唯一，一旦创建不可更改</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240324210950.png" alt=""></p><p>创建成功后，就可以上传文件了</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240324211010.png" alt=""></p><h1 id="三、创建子用户" tabindex="-1">三、创建子用户 <a class="header-anchor" href="#三、创建子用户" aria-label="Permalink to &quot;三、创建子用户&quot;">​</a></h1><p>打开 RAM 控制台 <a href="https://ram.console.aliyun.com/users/create" target="_blank" rel="noreferrer">https://ram.console.aliyun.com/users/create</a></p><p>创建一个子账号，专门用户为编辑器提供上传图片的访问权限。注意：要勾选下面的 OpenAPI 调用访问</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240324211025.png" alt=""></p><p>创建成功后，会生成 AccessKey ID 和 AccessKey Secret，先复制出来，后面要用</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240324211041.png" alt=""></p><h1 id="四、新增授权策略" tabindex="-1">四、新增授权策略 <a class="header-anchor" href="#四、新增授权策略" aria-label="Permalink to &quot;四、新增授权策略&quot;">​</a></h1><p>创建一条 Bucket 授权策略，为阿里云账号授予该 Bucket 的读写权限，方便使用 PicGo 等工具上传</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240324211057.png" alt=""></p><h1 id="五、图床设置" tabindex="-1">五、图床设置 <a class="header-anchor" href="#五、图床设置" aria-label="Permalink to &quot;五、图床设置&quot;">​</a></h1><p>打开 PicGo 软件，添加阿里云 OSS，将上面的 key 和 secret ，以及 Bucket 和 存储区域，点击确定 并且设置为默认图床</p><p><img src="https://muchuang-img.oss-cn-beijing.aliyuncs.com/20240324211119.png" alt=""></p><p>完成上面的设置后，无论使用 Typora 还是 Obisian 都可以配置，粘贴图片时自动上传至 阿里云 oss</p>',25),o=[n];function r(i,p,l,u,h,m){return s(),e("div",null,o)}const d=a(c,[["render",r]]);export{_ as __pageData,d as default};
