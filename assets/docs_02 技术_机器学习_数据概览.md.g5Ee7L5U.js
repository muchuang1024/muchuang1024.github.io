import{_ as s,c as a,o as n,a4 as e}from"./chunks/framework.4aTu-Nia.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/02 技术/机器学习/数据概览.md","filePath":"docs/02 技术/机器学习/数据概览.md"}'),p={name:"docs/02 技术/机器学习/数据概览.md"},t=e(`<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>df.info()</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>df.head()</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>df.describe()</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>df.isna().sum()</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>df.duplicated().sum()</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>df.nunique()</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>X = df.drop(columns=[&#39;math_score&#39;],axis=1)</span></span>
<span class="line"><span>y = df[&#39;math_score&#39;]</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>num_features = X.select_dtypes(exclude=&quot;object&quot;).columns</span></span>
<span class="line"><span>cat_features = X.select_dtypes(include=&quot;object&quot;).columns</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>from sklearn.preprocessing import OneHotEncoder, StandardScaler</span></span>
<span class="line"><span>from sklearn.compose import ColumnTransformer</span></span>
<span class="line"><span></span></span>
<span class="line"><span>numeric_transformer = StandardScaler()</span></span>
<span class="line"><span>oh_transformer = OneHotEncoder()</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Numerical columns:  Feature Scaling</span></span>
<span class="line"><span># Categorical columns： One-Hot Encoding</span></span>
<span class="line"><span></span></span>
<span class="line"><span>preprocessor = ColumnTransformer(</span></span>
<span class="line"><span>    [</span></span>
<span class="line"><span>        (&quot;OneHotEncoder&quot;, oh_transformer, cat_features),</span></span>
<span class="line"><span>         (&quot;StandardScaler&quot;, numeric_transformer, num_features),        </span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>X = preprocessor.fit_transform(X)</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># separate dataset into train and test</span></span>
<span class="line"><span>from sklearn.model_selection import train_test_split</span></span>
<span class="line"><span>X_train, X_test, y_train, y_test = train_test_split(X,y,test_size=0.2,random_state=42)</span></span>
<span class="line"><span>X_train.shape, X_test.shape</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>def evaluate_model(true, predicted):</span></span>
<span class="line"><span>    mae = mean_absolute_error(true, predicted)</span></span>
<span class="line"><span>    mse = mean_squared_error(true, predicted)</span></span>
<span class="line"><span>    rmse = np.sqrt(mean_squared_error(true, predicted))</span></span>
<span class="line"><span>    r2_square = r2_score(true, predicted)</span></span>
<span class="line"><span>    return mae, rmse, r2_square</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>models = {</span></span>
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
<span class="line"><span>    print(&#39;\\n&#39;)</span></span></code></pre></div><h2 id="参考" tabindex="-1">参考 <a class="header-anchor" href="#参考" aria-label="Permalink to &quot;参考&quot;">​</a></h2><p><a href="https://github.com/vasudevdhakad99/MLPROJECT1/blob/main/notebook/2.%20MODEL%20TRAINING.ipynb" target="_blank" rel="noreferrer">https://github.com/vasudevdhakad99/MLPROJECT1/blob/main/notebook/2. MODEL TRAINING.ipynb</a></p>`,14),l=[t];function i(o,r,c,d,u,m){return n(),a("div",null,l)}const g=s(p,[["render",i]]);export{h as __pageData,g as default};
