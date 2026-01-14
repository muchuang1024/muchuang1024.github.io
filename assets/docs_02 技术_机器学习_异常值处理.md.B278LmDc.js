import{_ as s,c as n,o as a,a4 as p}from"./chunks/framework.4aTu-Nia.js";const f=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/02 技术/机器学习/异常值处理.md","filePath":"docs/02 技术/机器学习/异常值处理.md"}'),t={name:"docs/02 技术/机器学习/异常值处理.md"},l=p(`<p>数值特征</p><table><thead><tr><th>方法</th><th>适用场景</th><th>实现方式</th></tr></thead><tbody><tr><td><strong>截断法</strong></td><td>异常值极少且明显错误</td><td>基于分位数或标准差阈值</td></tr><tr><td><strong>缩尾法</strong></td><td>保留异常值但减小影响</td><td>将超出阈值的数据设为阈值</td></tr><tr><td><strong>替换法</strong></td><td>异常值较多</td><td>用中位数/均值替换</td></tr><tr><td><strong>分箱法</strong></td><td>非线性关系</td><td>将连续值分箱为离散级别</td></tr><tr><td><strong>保留标志法</strong></td><td>异常值有意义</td><td>创建异常值标志特征</td></tr></tbody></table><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>class OutlierHandling:</span></span>
<span class="line"><span>    &quot;&quot;&quot;异常值处理方法&quot;&quot;&quot;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    @staticmethod</span></span>
<span class="line"><span>    def detect_outliers_iqr(df, col, multiplier=1.5):</span></span>
<span class="line"><span>        &quot;&quot;&quot;IQR方法检测异常值&quot;&quot;&quot;</span></span>
<span class="line"><span>        q1 = df[col].quantile(0.25)</span></span>
<span class="line"><span>        q3 = df[col].quantile(0.75)</span></span>
<span class="line"><span>        iqr = q3 - q1</span></span>
<span class="line"><span>        lower_bound = q1 - multiplier * iqr</span></span>
<span class="line"><span>        upper_bound = q3 + multiplier * iqr</span></span>
<span class="line"><span>        return (df[col] &lt; lower_bound) | (df[col] &gt; upper_bound)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    @staticmethod</span></span>
<span class="line"><span>    def detect_outliers_zscore(df, col, threshold=3):</span></span>
<span class="line"><span>        &quot;&quot;&quot;Z-score方法检测异常值&quot;&quot;&quot;</span></span>
<span class="line"><span>        z_scores = np.abs((df[col] - df[col].mean()) / df[col].std())</span></span>
<span class="line"><span>        return z_scores &gt; threshold</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    @staticmethod</span></span>
<span class="line"><span>    def winsorize(df, col, limits=(0.05, 0.05)):</span></span>
<span class="line"><span>        &quot;&quot;&quot;缩尾处理&quot;&quot;&quot;</span></span>
<span class="line"><span>        from scipy.stats import mstats</span></span>
<span class="line"><span>        return mstats.winsorize(df[col], limits=limits)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    @staticmethod</span></span>
<span class="line"><span>    def cap_outliers(df, col, method=&#39;iqr&#39;, multiplier=1.5):</span></span>
<span class="line"><span>        &quot;&quot;&quot;封顶异常值&quot;&quot;&quot;</span></span>
<span class="line"><span>        if method == &#39;iqr&#39;:</span></span>
<span class="line"><span>            q1 = df[col].quantile(0.25)</span></span>
<span class="line"><span>            q3 = df[col].quantile(0.75)</span></span>
<span class="line"><span>            iqr = q3 - q1</span></span>
<span class="line"><span>            lower_bound = q1 - multiplier * iqr</span></span>
<span class="line"><span>            upper_bound = q3 + multiplier * iqr</span></span>
<span class="line"><span>        elif method == &#39;percentile&#39;:</span></span>
<span class="line"><span>            lower_bound = df[col].quantile(0.01)</span></span>
<span class="line"><span>            upper_bound = df[col].quantile(0.99)</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        df[col] = df[col].clip(lower=lower_bound, upper=upper_bound)</span></span>
<span class="line"><span>        return df</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    @staticmethod</span></span>
<span class="line"><span>    def create_outlier_flags(df, cols):</span></span>
<span class="line"><span>        &quot;&quot;&quot;创建异常值标志特征&quot;&quot;&quot;</span></span>
<span class="line"><span>        for col in cols:</span></span>
<span class="line"><span>            outliers = OutlierHandling.detect_outliers_iqr(df, col)</span></span>
<span class="line"><span>            df[f&#39;{col}_is_outlier&#39;] = outliers.astype(int)</span></span>
<span class="line"><span>        return df</span></span></code></pre></div>`,3),e=[l];function o(i,c,d,r,u,q){return a(),n("div",null,e)}const h=s(t,[["render",o]]);export{f as __pageData,h as default};
