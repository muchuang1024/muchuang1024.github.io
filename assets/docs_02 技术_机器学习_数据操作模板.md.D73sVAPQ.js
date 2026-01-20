import{_ as s,c as a,o as n,a4 as p}from"./chunks/framework.4aTu-Nia.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/02 技术/机器学习/数据操作模板.md","filePath":"docs/02 技术/机器学习/数据操作模板.md"}'),e={name:"docs/02 技术/机器学习/数据操作模板.md"},l=p(`<h2 id="一、基本数据概览" tabindex="-1">一、基本数据概览 <a class="header-anchor" href="#一、基本数据概览" aria-label="Permalink to &quot;一、基本数据概览&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>df.info()</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>df.head()</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>df.describe()</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>df.isna().sum()</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>df.duplicated().sum()</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>df.nunique()</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>all_stats = auto_describe(df)</span></span>
<span class="line"><span>print(&quot;\\n所有特征统计:&quot;)</span></span>
<span class="line"><span>display(all_stats)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>iqr_result = detect_outliers_iqr(df)</span></span>
<span class="line"><span>display(iqr_result)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>stat, df_duplicate = check_duplicates(df, [&#39;id&#39;])</span></span>
<span class="line"><span>display(stat)</span></span></code></pre></div><h2 id="二、标签和特征" tabindex="-1">二、标签和特征 <a class="header-anchor" href="#二、标签和特征" aria-label="Permalink to &quot;二、标签和特征&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>target = &#39;exam_score&#39;</span></span>
<span class="line"><span>X = df.drop(columns=[target],axis=1)</span></span>
<span class="line"><span>y = df[target]</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>num_features = X.select_dtypes(exclude=&quot;object&quot;).columns</span></span>
<span class="line"><span>cat_features = X.select_dtypes(include=&quot;object&quot;).columns</span></span>
<span class="line"><span></span></span>
<span class="line"><span>low_cardinality_cols = [cname for cname in df.columns if df[cname].nunique() &lt; 10 and df[cname].dtype in [&quot;object&quot;, &quot;category&quot;]]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>numeric_cols = [cname for cname in df.columns if df[cname].dtype in [&#39;int64&#39;, &#39;float64&#39;]]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cols = low_cardinality_cols + numeric_cols</span></span></code></pre></div><h2 id="三、eda" tabindex="-1">三、EDA <a class="header-anchor" href="#三、eda" aria-label="Permalink to &quot;三、EDA&quot;">​</a></h2><h3 id="_1、eda-target-分布" tabindex="-1">1、EDA - Target 分布 <a class="header-anchor" href="#_1、eda-target-分布" aria-label="Permalink to &quot;1、EDA - Target 分布&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import matplotlib.pyplot as plt</span></span>
<span class="line"><span></span></span>
<span class="line"><span>plt.figure(figsize=(10, 5))</span></span>
<span class="line"><span>plt.hist(df[target], bins=50, alpha=0.7, edgecolor=&#39;black&#39;, color=&#39;skyblue&#39;)</span></span>
<span class="line"><span>plt.title(&#39;Distribution of Exam Scores (Target Variable)&#39;)</span></span>
<span class="line"><span>plt.xlabel(&#39;Exam Score&#39;)</span></span>
<span class="line"><span>plt.ylabel(&#39;Frequency&#39;)</span></span>
<span class="line"><span>plt.grid(True, alpha=0.3)</span></span>
<span class="line"><span>plt.show()</span></span></code></pre></div><h3 id="_2、eda-feature-分布" tabindex="-1">2、EDA - Feature 分布 <a class="header-anchor" href="#_2、eda-feature-分布" aria-label="Permalink to &quot;2、EDA - Feature 分布&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import matplotlib.pyplot as plt</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>FEATURES = list(df.columns[1:-1] )</span></span>
<span class="line"><span>print(f&quot;There are {len(FEATURES)} features:&quot;)</span></span>
<span class="line"><span>print(FEATURES)</span></span>
<span class="line"><span>import matplotlib</span></span>
<span class="line"><span></span></span>
<span class="line"><span># matplotlib.rcParams[&#39;font.sans-serif&#39;] = [&#39;SimHei&#39;]  # 或者 [&#39;Microsoft YaHei&#39;]</span></span>
<span class="line"><span>matplotlib.rcParams[&#39;axes.unicode_minus&#39;] = False    # 正确显示负号</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 指定部分字段展示顺序</span></span>
<span class="line"><span>ordinal_order = {</span></span>
<span class="line"><span>    &quot;sleep_quality&quot;:[&quot;poor&quot;,&quot;average&quot;,&quot;good&quot;],</span></span>
<span class="line"><span>    &quot;facility_rating&quot;:[&quot;low&quot;,&quot;medium&quot;,&quot;high&quot;],</span></span>
<span class="line"><span>    &quot;exam_difficulty&quot;:[&quot;easy&quot;,&quot;moderate&quot;,&quot;hard&quot;],</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>plot_features_dual_axis(</span></span>
<span class="line"><span>    df,</span></span>
<span class="line"><span>    cols=FEATURES,</span></span>
<span class="line"><span>    target_col=predict_obj,</span></span>
<span class="line"><span>    n_bins=10,</span></span>
<span class="line"><span>    n_wide=3,</span></span>
<span class="line"><span>    int_as_cat_unique_max=20,</span></span>
<span class="line"><span>    cat_order = ordinal_order,</span></span>
<span class="line"><span>)</span></span></code></pre></div><h3 id="_3、eda-相关性分析" tabindex="-1">3、EDA - 相关性分析 <a class="header-anchor" href="#_3、eda-相关性分析" aria-label="Permalink to &quot;3、EDA - 相关性分析&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import seaborn as sns</span></span>
<span class="line"><span></span></span>
<span class="line"><span>numerical_data = df[[&#39;age&#39;, &#39;study_hours&#39;, &#39;class_attendance&#39;, &#39;sleep_hours&#39;, &#39;exam_score&#39;]]</span></span>
<span class="line"><span>corr_matrix = numerical_data.corr()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>plt.figure(figsize=(10, 8))</span></span>
<span class="line"><span>sns.heatmap(corr_matrix, annot=True, cmap=&#39;coolwarm&#39;, center=0, square=True, fmt=&#39;.2f&#39;)</span></span>
<span class="line"><span>plt.title(&#39;Correlation Matrix&#39;)</span></span>
<span class="line"><span>plt.show()</span></span></code></pre></div><h2 id="三、训练测试集拆分" tabindex="-1">三、训练测试集拆分 <a class="header-anchor" href="#三、训练测试集拆分" aria-label="Permalink to &quot;三、训练测试集拆分&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># separate dataset into train and test</span></span>
<span class="line"><span>from sklearn.model_selection import train_test_split</span></span>
<span class="line"><span>X_train, X_test, y_train, y_test = train_test_split(X,y,test_size=0.2,random_state=42)</span></span>
<span class="line"><span>X_train.shape, X_test.shape</span></span></code></pre></div><h2 id="四、特征工程" tabindex="-1">四、特征工程 <a class="header-anchor" href="#四、特征工程" aria-label="Permalink to &quot;四、特征工程&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>from sklearn.preprocessing import OneHotEncoder, StandardScaler</span></span>
<span class="line"><span>from sklearn.compose import ColumnTransformer</span></span>
<span class="line"><span></span></span>
<span class="line"><span>numeric_transformer = StandardScaler()</span></span>
<span class="line"><span>oh_transformer = OneHotEncoder()</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Numerical columns:  Feature Scaling</span></span>
<span class="line"><span># Categorical columns： CategoryMean、One-Hot Encoding</span></span>
<span class="line"><span></span></span>
<span class="line"><span>preprocessor = ColumnTransformer(</span></span>
<span class="line"><span>    [</span></span>
<span class="line"><span>        (&quot;OneHotEncoder&quot;, oh_transformer, cat_features),</span></span>
<span class="line"><span>         (&quot;StandardScaler&quot;, numeric_transformer, num_features),        </span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>X = preprocessor.fit_transform(X)</span></span>
<span class="line"><span>X_val = preprocessor.transform(X_val)</span></span></code></pre></div><h2 id="五、模型训练" tabindex="-1">五、模型训练 <a class="header-anchor" href="#五、模型训练" aria-label="Permalink to &quot;五、模型训练&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>models = {</span></span>
<span class="line"><span>    &quot;Linear Regression&quot;: LinearRegression(),</span></span>
<span class="line"><span>    &quot;Lasso&quot;: Lasso(),</span></span>
<span class="line"><span>    &quot;Ridge&quot;: Ridge(),</span></span>
<span class="line"><span>    &quot;K-Neighbors Regressor&quot;: KNeighborsRegressor(),</span></span>
<span class="line"><span>    &quot;Decision Tree&quot;: DecisionTreeRegressor(),</span></span>
<span class="line"><span>    &quot;Random Forest Regressor&quot;: RandomForestRegressor(),</span></span>
<span class="line"><span>    &quot;XGBRegressor&quot;: XGBRegressor(), </span></span>
<span class="line"><span>    &quot;CatBoosting Regressor&quot;: CatBoostRegressor(verbose=False),</span></span>
<span class="line"><span>    &quot;AdaBoost Regressor&quot;: AdaBoostRegressor()</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>model_list = []</span></span>
<span class="line"><span>r2_list =[]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>for i in range(len(list(models))):</span></span>
<span class="line"><span>    model = list(models.values())[i]</span></span>
<span class="line"><span>    model.fit(X_train, y_train) # Train model</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # Make predictions</span></span>
<span class="line"><span>    y_train_pred = model.predict(X_train)</span></span>
<span class="line"><span>    y_test_pred = model.predict(X_test)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # Evaluate Train and Test dataset</span></span>
<span class="line"><span>    model_train_mae , model_train_rmse, model_train_r2 = evaluate_model(y_train, y_train_pred)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    model_test_mae , model_test_rmse, model_test_r2 = evaluate_model(y_test, y_test_pred)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    print(list(models.keys())[i])</span></span>
<span class="line"><span>    model_list.append(list(models.keys())[i])</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    print(&#39;Model performance for Training set&#39;)</span></span>
<span class="line"><span>    print(&quot;- Root Mean Squared Error: {:.4f}&quot;.format(model_train_rmse))</span></span>
<span class="line"><span>    print(&quot;- Mean Absolute Error: {:.4f}&quot;.format(model_train_mae))</span></span>
<span class="line"><span>    print(&quot;- R2 Score: {:.4f}&quot;.format(model_train_r2))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    print(&#39;----------------------------------&#39;)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    print(&#39;Model performance for Test set&#39;)</span></span>
<span class="line"><span>    print(&quot;- Root Mean Squared Error: {:.4f}&quot;.format(model_test_rmse))</span></span>
<span class="line"><span>    print(&quot;- Mean Absolute Error: {:.4f}&quot;.format(model_test_mae))</span></span>
<span class="line"><span>    print(&quot;- R2 Score: {:.4f}&quot;.format(model_test_r2))</span></span>
<span class="line"><span>    r2_list.append(model_test_r2)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    print(&#39;=&#39;*35)</span></span>
<span class="line"><span>    print(&#39;\\n&#39;)</span></span></code></pre></div><h2 id="六、模型评估" tabindex="-1">六、模型评估 <a class="header-anchor" href="#六、模型评估" aria-label="Permalink to &quot;六、模型评估&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>def evaluate_model(y_true, y_pred):</span></span>
<span class="line"><span>    mae = mean_absolute_error(y_true, y_pred)</span></span>
<span class="line"><span>    mse = mean_squared_error(y_true, y_pred)</span></span>
<span class="line"><span>    rmse = np.sqrt(mean_squared_error(y_true, y_pred))</span></span>
<span class="line"><span>    r2_square = r2_score(y_true, y_pred)</span></span>
<span class="line"><span>    return mae, rmse, r2_square</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>import numpy as np</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def rmse(y_true, y_pred):</span></span>
<span class="line"><span>    return np.sqrt(mean_squared_error(y_true, y_pred))</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import pandas as pd</span></span>
<span class="line"><span>import matplotlib.pyplot as plt</span></span>
<span class="line"><span></span></span>
<span class="line"><span>feature_importance = pd.DataFrame({</span></span>
<span class="line"><span>    &#39;feature&#39;: X_train.columns,</span></span>
<span class="line"><span>    &#39;importance&#39;: model.feature_importances_</span></span>
<span class="line"><span>}).sort_values(&#39;importance&#39;, ascending=False)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>print(&quot;Important Features:&quot;)</span></span>
<span class="line"><span>display(feature_importance)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>plt.figure(figsize=(12, 8))</span></span>
<span class="line"><span>top_features = feature_importance.head(15)</span></span>
<span class="line"><span>plt.barh(range(len(top_features)), top_features[&#39;importance&#39;])</span></span>
<span class="line"><span>plt.yticks(range(len(top_features)), top_features[&#39;feature&#39;])</span></span>
<span class="line"><span>plt.gca().invert_yaxis()</span></span>
<span class="line"><span>plt.xlabel(&#39;Importance Score&#39;)</span></span>
<span class="line"><span>plt.title(&#39;Top 15 Feature Importance (XGBoost)&#39;)</span></span>
<span class="line"><span>plt.grid(True, alpha=0.3, axis=&#39;x&#39;)</span></span>
<span class="line"><span>plt.tight_layout()</span></span>
<span class="line"><span>plt.show()</span></span></code></pre></div><h2 id="七、参考" tabindex="-1">七、参考 <a class="header-anchor" href="#七、参考" aria-label="Permalink to &quot;七、参考&quot;">​</a></h2><p><a href="https://github.com/vasudevdhakad99/MLPROJECT1/blob/main/notebook/2.%20MODEL%20TRAINING.ipynb" target="_blank" rel="noreferrer">https://github.com/vasudevdhakad99/MLPROJECT1/blob/main/notebook/2. MODEL TRAINING.ipynb</a></p><p><a href="https://medium.com/@vasudevdhakad99/predicting-student-test-scores-using-machine-learning-553bcb863b6b" target="_blank" rel="noreferrer">https://medium.com/@vasudevdhakad99/predicting-student-test-scores-using-machine-learning-553bcb863b6b</a></p>`,30),t=[l];function i(o,r,c,d,u,h){return n(),a("div",null,t)}const g=s(e,[["render",i]]);export{_ as __pageData,g as default};
