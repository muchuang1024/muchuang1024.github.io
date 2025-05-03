import{_ as s,c as a,o as n,a4 as p}from"./chunks/framework.4aTu-Nia.js";const v=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/02 技术/机器学习/机器学习.md","filePath":"docs/02 技术/机器学习/机器学习.md"}'),e={name:"docs/02 技术/机器学习/机器学习.md"},t=p(`<p>在实际应用中，我们会用<strong>训练集 (dtrain)</strong> 训练模型，<strong>验证集 (dval)</strong> 进行超参数调优，<strong>测试集 (dtest)</strong> 评估最终模型性能，而<strong>评估集 (deval)</strong> 则用于跨城市、跨地区或不同数据分布下的泛化能力测试。</p><h2 id="示例场景" tabindex="-1">示例场景 <a class="header-anchor" href="#示例场景" aria-label="Permalink to &quot;示例场景&quot;">​</a></h2><p>假设我们在 <strong>A 城市</strong> 训练一个模型来预测外卖订单的配送时间，并希望在 <strong>B 城市</strong> 进行评估，以检查模型是否能泛化到新城市。</p><h2 id="步骤-1-划分数据" tabindex="-1">步骤 1：划分数据 <a class="header-anchor" href="#步骤-1-划分数据" aria-label="Permalink to &quot;步骤 1：划分数据&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>from sklearn.model_selection import train_test_split</span></span>
<span class="line"><span>import xgboost as xgb</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 生成示例数据</span></span>
<span class="line"><span>X_A, y_A = city_A_data_X, city_A_data_y  # A 城市数据</span></span>
<span class="line"><span>X_B, y_B = city_B_data_X, city_B_data_y  # B 城市数据（评估集）</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 训练集和验证集（A 城市）</span></span>
<span class="line"><span>X_train, X_val, y_train, y_val = train_test_split(X_A, y_A, test_size=0.2, random_state=42)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 测试集（A 城市）</span></span>
<span class="line"><span>X_train, X_test, y_train, y_test = train_test_split(X_train, y_train, test_size=0.1, random_state=42)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 评估集（B 城市）</span></span>
<span class="line"><span>X_eval, y_eval = X_B, y_B  # 直接使用 B 城市数据</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 转换为 XGBoost 格式</span></span>
<span class="line"><span>dtrain = xgb.DMatrix(X_train, label=y_train)  # 训练集</span></span>
<span class="line"><span>dval = xgb.DMatrix(X_val, label=y_val)        # 验证集</span></span>
<span class="line"><span>dtest = xgb.DMatrix(X_test, label=y_test)     # 测试集</span></span>
<span class="line"><span>deval = xgb.DMatrix(X_eval, label=y_eval)     # 评估集</span></span></code></pre></div><h2 id="步骤-2-训练模型" tabindex="-1">步骤 2：训练模型 <a class="header-anchor" href="#步骤-2-训练模型" aria-label="Permalink to &quot;步骤 2：训练模型&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># 定义 XGBoost 参数</span></span>
<span class="line"><span>params = {</span></span>
<span class="line"><span>    &#39;objective&#39;: &#39;reg:squarederror&#39;,  # 预测配送时间</span></span>
<span class="line"><span>    &#39;eval_metric&#39;: &#39;rmse&#39;,            # 评估指标</span></span>
<span class="line"><span>    &#39;learning_rate&#39;: 0.1,</span></span>
<span class="line"><span>    &#39;max_depth&#39;: 6,</span></span>
<span class="line"><span>    &#39;subsample&#39;: 0.8,</span></span>
<span class="line"><span>    &#39;colsample_bytree&#39;: 0.8</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 训练模型，使用 \`dval\` 进行早停</span></span>
<span class="line"><span>watchlist = [(dtrain, &#39;train&#39;), (dval, &#39;val&#39;)]</span></span>
<span class="line"><span>model = xgb.train(params, dtrain, num_boost_round=500, evals=watchlist, early_stopping_rounds=50)</span></span></code></pre></div><ul><li><code>dtrain</code> 用于梯度更新</li><li><code>dval</code> 用于早停（避免过拟合），<code>early_stopping_rounds=50</code> ，如果验证集 RMSE 在 50 轮内没有下降，训练会提前停止，防止过拟合</li></ul><p>XGBoost 会自动打印训练过程，<strong>模型会在 167 轮停止，而不是训练满 500 轮</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>[0]	train-rmse:5.4321	val-rmse:5.6789</span></span>
<span class="line"><span>[10]	train-rmse:4.1234	val-rmse:4.6789</span></span>
<span class="line"><span>[50]	train-rmse:3.0123	val-rmse:3.4567</span></span>
<span class="line"><span>[100]	train-rmse:2.5012	val-rmse:2.8901</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>[217]	train-rmse:1.9345	val-rmse:2.1203</span></span>
<span class="line"><span>Stopping. Best iteration:</span></span>
<span class="line"><span>[167]	train-rmse:1.9500	val-rmse:2.1198</span></span></code></pre></div><p><strong><code>dval</code> 的关键作用：</strong></p><ol><li>训练时<strong>监控模型效果</strong>，决定是否停止训练</li><li><strong>调优超参数</strong>，找到最佳模型</li><li><strong>评估是否过拟合</strong>：如果 <code>train-rmse</code> 很低，但 <code>val-rmse</code> 远高，说明过拟合</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>y_pred_val = model.predict(dval) </span></span>
<span class="line"><span># 计算 RMSE </span></span>
<span class="line"><span>rmse_val = np.sqrt(np.mean((y_pred_val - y_val) ** 2))</span></span>
<span class="line"><span>print(f&quot;验证集 RMSE: {rmse_val:.4f}&quot;)</span></span></code></pre></div><h2 id="步骤-3-测试模型" tabindex="-1">步骤 3：测试模型 <a class="header-anchor" href="#步骤-3-测试模型" aria-label="Permalink to &quot;步骤 3：测试模型&quot;">​</a></h2><p><code>dtest</code> 用于最终测试模型效果，<strong>不能用于调参</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># 计算 A 城市的测试集误差 </span></span>
<span class="line"><span>y_pred_test = model.predict(dtest) </span></span>
<span class="line"><span>rmse_test = np.sqrt(np.mean((y_pred_test - y_test) ** 2)) </span></span>
<span class="line"><span>print(f&quot;A 城市测试集 RMSE: {rmse_test:.4f}&quot;)</span></span></code></pre></div><h2 id="步骤-4-评估模型-跨城市" tabindex="-1">## 步骤 4：评估模型（跨城市） <a class="header-anchor" href="#步骤-4-评估模型-跨城市" aria-label="Permalink to &quot;## 步骤 4：评估模型（跨城市）&quot;">​</a></h2><ul><li><code>deval</code> 代表<strong>新城市</strong>，用于检查模型的泛化能力</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># 计算 B 城市的评估误差</span></span>
<span class="line"><span>y_pred_eval = model.predict(deval)</span></span>
<span class="line"><span>rmse_eval = np.sqrt(np.mean((y_pred_eval - y_eval) ** 2))</span></span>
<span class="line"><span>print(f&quot;B 城市评估集 RMSE: {rmse_eval:.4f}&quot;)</span></span></code></pre></div>`,19),l=[t];function i(r,o,c,d,_,h){return n(),a("div",null,l)}const m=s(e,[["render",i]]);export{v as __pageData,m as default};
