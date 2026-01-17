import{_ as s,c as n,o as a,a4 as p}from"./chunks/framework.4aTu-Nia.js";const h=JSON.parse('{"title":"使用 IQR 法检测异常值","description":"","frontmatter":{},"headers":[],"relativePath":"docs/02 技术/机器学习/数据清洗/异常值处理.md","filePath":"docs/02 技术/机器学习/数据清洗/异常值处理.md"}'),t={name:"docs/02 技术/机器学习/数据清洗/异常值处理.md"},l=p(`<p>QR / 业务阈值</p><p>数值特征</p><table><thead><tr><th>方法</th><th>适用场景</th><th>实现方式</th></tr></thead><tbody><tr><td><strong>截断法</strong></td><td>异常值极少且明显错误</td><td>基于分位数或标准差阈值</td></tr><tr><td><strong>缩尾法</strong></td><td>保留异常值但减小影响</td><td>将超出阈值的数据设为阈值</td></tr><tr><td><strong>替换法</strong></td><td>异常值较多</td><td>用中位数/均值替换</td></tr><tr><td><strong>分箱法</strong></td><td>非线性关系</td><td>将连续值分箱为离散级别</td></tr><tr><td><strong>保留标志法</strong></td><td>异常值有意义</td><td>创建异常值标志特征</td></tr></tbody></table><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>class OutlierHandling:</span></span>
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
<span class="line"><span>        return df</span></span></code></pre></div><ul><li><p><strong>箱型图（IQR）方法</strong>：</p><p>IQR=Q 3−Q 1\\text{IQR} = Q 3 - Q 1 IQR=Q 3−Q 1</p><ul><li>异常值：小于 Q 1−1.5×IQRQ 1 - 1.5 \\times IQRQ 1−1.5×IQR 或大于 Q 3+1.5×IQRQ 3 + 1.5 \\times IQRQ 3+1.5×IQR 的数据。</li><li>处理方式：删除 / 替换（如用 <code>均值</code> 或 <code>中位数</code> 代替）。</li></ul></li></ul><h1 id="使用-iqr-法检测异常值" tabindex="-1">使用 IQR 法检测异常值 <a class="header-anchor" href="#使用-iqr-法检测异常值" aria-label="Permalink to &quot;使用 IQR 法检测异常值&quot;">​</a></h1><p>Q 1 = data[&#39;study_hours&#39;]. Quantile (0.25) Q 3 = data[&#39;study_hours&#39;]. Quantile (0.75) IQR = Q 3 - Q 1 Lower = Q 1 - 1.5 * IQR Upper = Q 3 + 1.5 * IQR</p><h1 id="限制范围-截断" tabindex="-1">限制范围（截断） <a class="header-anchor" href="#限制范围-截断" aria-label="Permalink to &quot;限制范围（截断）&quot;">​</a></h1><p>Data[&#39;study_hours&#39;] = data[&#39;study_hours&#39;]. Clip (lower=lower, upper=upper</p><p>理方式：删除 / 替换</p><ul><li><p><strong>Z-score 标准化</strong>：</p><p>Z=x−μσZ = \\frac{x - \\mu}{\\sigma}Z=σx−μ​</p><ul><li>∣Z∣&gt;3|Z| &gt; 3∣Z∣&gt;3 视为异常值。</li><li>适用于正态分布数据，如 <code>考试成绩</code>。</li></ul></li><li><p><strong>Winsorization（缩尾法）</strong>：将极端值替换为 <code>5% 和 95% 分位数</code>，适用于金融数据。</p></li></ul>`,11),e=[l];function o(i,r,c,d,u,q){return a(),n("div",null,e)}const f=s(t,[["render",o]]);export{h as __pageData,f as default};
