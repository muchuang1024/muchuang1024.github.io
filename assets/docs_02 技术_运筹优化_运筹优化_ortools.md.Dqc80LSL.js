import{_ as s,c as n,o as a,a4 as p}from"./chunks/framework.4aTu-Nia.js";const I=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/02 技术/运筹优化/运筹优化/ortools.md","filePath":"docs/02 技术/运筹优化/运筹优化/ortools.md"}'),l={name:"docs/02 技术/运筹优化/运筹优化/ortools.md"},e=p(`<p><a href="https://developers.google.com/optimization/routing" target="_blank" rel="noreferrer">https://developers.google.com/optimization/routing</a></p><p>以 mip 问题的求解为例，直接运行会报错误“java.lang.UnsatisfiedLinkError: no jniortools in java.library.path”</p><p>因为OR-Tools是一个C ++库，在Java中使用SWIG封装器（使用JNI调用等...），这是一个本机库而不是“纯粹的”java lib</p><p>因此创建 solver 前需要执行 loadNativeLibrariesPlus()</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>import com.sun.jna.Platform;  </span></span>
<span class="line"><span>import lombok.extern.slf4j.Slf4j;  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>import java.io.*;  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>/**  </span></span>
<span class="line"><span> * @Description * @Author tianxingjie * @Date 2021/8/26 10:41 上午  </span></span>
<span class="line"><span> */  </span></span>
<span class="line"><span>@Slf4j  </span></span>
<span class="line"><span>public class MyLoader {  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    private static boolean loaded = false;  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    private static final String TMP_DIRECTORY = &quot;/tmp/&quot;;  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    private static final String DARWIN_INTEL_BASE_PACH = &quot;/darwin-x86-64/&quot;;  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    private static final String DARWIN_ARM_BASE_PACH = &quot;/darwin-aarch64/&quot;;  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    private static final String LINUX_BASE_PACH = &quot;/linux-x86-64/&quot;;  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    private static final String DARWIN_PACH_JNI = &quot;libjniortools.dylib&quot;;  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    private static final String DARWIN_PACH_ORTOOLS = &quot;libortools.9.dylib&quot;;  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    private static final String LINUX_PACH_JNI = &quot;libjniortools.so&quot;;  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    private static final String LINUX_PACH_ORTOOLS = &quot;libortools.so.9&quot;;  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    public static void loadNativeLibrariesPlus() {  </span></span>
<span class="line"><span>        if (!loaded) {  </span></span>
<span class="line"><span>            synchronized (MyLoader.class) {  </span></span>
<span class="line"><span>                if (!loaded) {  </span></span>
<span class="line"><span>                    try {  </span></span>
<span class="line"><span>                        String basePath = &quot;&quot;;  </span></span>
<span class="line"><span>                        String pathJNI = &quot;&quot;;  </span></span>
<span class="line"><span>                        String pathOrtools = &quot;&quot;;  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>                        if (Platform.isMac()) {  </span></span>
<span class="line"><span>                            if(Platform.isIntel()){  </span></span>
<span class="line"><span>                                basePath = DARWIN_INTEL_BASE_PACH;  </span></span>
<span class="line"><span>                            }else{  </span></span>
<span class="line"><span>                                basePath = DARWIN_ARM_BASE_PACH;  </span></span>
<span class="line"><span>                            }  </span></span>
<span class="line"><span>                            pathJNI = DARWIN_PACH_JNI;  </span></span>
<span class="line"><span>                            pathOrtools = DARWIN_PACH_ORTOOLS;  </span></span>
<span class="line"><span>                        } else if (Platform.isLinux()) {  </span></span>
<span class="line"><span>                            basePath = LINUX_BASE_PACH;  </span></span>
<span class="line"><span>                            pathJNI = LINUX_PACH_JNI;  </span></span>
<span class="line"><span>                            pathOrtools = LINUX_PACH_ORTOOLS;  </span></span>
<span class="line"><span>                        }  </span></span>
<span class="line"><span>                        //写jni文件到本地  </span></span>
<span class="line"><span>                        File tmpJNI = new File(TMP_DIRECTORY + pathJNI);  </span></span>
<span class="line"><span>                        tmpJNI.deleteOnExit();  </span></span>
<span class="line"><span>                        log.info(&quot;tmpJNI绝对地址：{}&quot;, tmpJNI.getAbsolutePath());  </span></span>
<span class="line"><span>                        byte[] buff = new byte[1024];  </span></span>
<span class="line"><span>                        int len;  </span></span>
<span class="line"><span>                        OutputStream outJNI = null;  </span></span>
<span class="line"><span>                        InputStream inJNI = null;  </span></span>
<span class="line"><span>                        try {  </span></span>
<span class="line"><span>                            outJNI = new FileOutputStream(tmpJNI);  </span></span>
<span class="line"><span>                            inJNI = MyLoader.class.getResourceAsStream(basePath + pathJNI);  </span></span>
<span class="line"><span>                            while ((len = inJNI.read(buff)) != -1) {  </span></span>
<span class="line"><span>                                outJNI.write(buff, 0, len);  </span></span>
<span class="line"><span>                            }  </span></span>
<span class="line"><span>                        } finally {  </span></span>
<span class="line"><span>                            inJNI.close();  </span></span>
<span class="line"><span>                            outJNI.close();  </span></span>
<span class="line"><span>                        }  </span></span>
<span class="line"><span>                        //写ortools到本地  </span></span>
<span class="line"><span>                        File tmpOrtools = new File(TMP_DIRECTORY + pathOrtools);  </span></span>
<span class="line"><span>                        tmpOrtools.deleteOnExit();  </span></span>
<span class="line"><span>                        log.info(&quot;tmpOrtools：{}&quot;, tmpOrtools.getAbsolutePath());  </span></span>
<span class="line"><span>                        byte[] buffOrtools = new byte[1024];  </span></span>
<span class="line"><span>                        int lenOrtools;  </span></span>
<span class="line"><span>                        OutputStream outOrtools = null;  </span></span>
<span class="line"><span>                        InputStream inOrtools = null;  </span></span>
<span class="line"><span>                        try {  </span></span>
<span class="line"><span>                            outOrtools = new FileOutputStream(tmpOrtools);  </span></span>
<span class="line"><span>                            inOrtools = MyLoader.class.getResourceAsStream(basePath + pathOrtools);  </span></span>
<span class="line"><span>                            while ((lenOrtools = inOrtools.read(buffOrtools)) != -1) {  </span></span>
<span class="line"><span>                                outOrtools.write(buffOrtools, 0, lenOrtools);  </span></span>
<span class="line"><span>                            }  </span></span>
<span class="line"><span>                        } finally {  </span></span>
<span class="line"><span>                            inOrtools.close();  </span></span>
<span class="line"><span>                            outOrtools.close();  </span></span>
<span class="line"><span>                        }  </span></span>
<span class="line"><span>                        System.load(tmpJNI.getAbsolutePath());  </span></span>
<span class="line"><span>                        loaded = true;  </span></span>
<span class="line"><span>                        log.info(&quot;loadNativeLibrariesPlus | 加载成功&quot;);  </span></span>
<span class="line"><span>                    } catch (Exception e) {  </span></span>
<span class="line"><span>                        log.error(&quot;加载模型失败&quot;, e);  </span></span>
<span class="line"><span>                        throw new RuntimeException(e);  </span></span>
<span class="line"><span>                    }  </span></span>
<span class="line"><span>                }  </span></span>
<span class="line"><span>            }  </span></span>
<span class="line"><span>        }  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>}</span></span></code></pre></div>`,5),t=[e];function i(o,c,r,u,_,d){return a(),n("div",null,t)}const m=s(l,[["render",i]]);export{I as __pageData,m as default};
