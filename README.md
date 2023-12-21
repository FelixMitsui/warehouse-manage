# 倉儲後台管理

![登入頁面](https://github.com/FelixMitsui/warehouse-manage/blob/main/public/github_images/登入頁面.png?raw=true)

![首頁](https://github.com/FelixMitsui/warehouse-manage/blob/main/public/github_images/首頁.png?raw=true)

## 主要專案應用

1. vue3
2. el-element-plus
3. pinia

## 業務功能

1. 新增用戶、查詢、變更權限、刪除。
2. 新增商品、查詢、刪除。
3. 進貨申請、商品入庫。
4. 庫存查詢、變更儲位。

## 技術運用

### axios攔截器:

在請求與回覆的傳遞之間攔截物件，例如攔截請求物件之後，加入頁數、筆數等查詢參數再回傳出去。而錯誤的回覆訊息可以統一在攔截器內做處理，不用將錯誤訊息傳到組件上去。

### 路由守衛:

根據用戶的token狀態，輕鬆地控制用戶的路由尋訪，如果不使用路由守衛，就得在組件上做token判斷。

### 路由器管理:

於路由物件內添加allows陣列，依照陣列內的用戶身分分配路由，如此解決了要直接在組件上做身分判斷顯示與否的問題。

### 二進制操作權限:

用戶的auth屬性以數字表示，1=新增、2=變更、4=刪除，如果該用戶擁有所有操作權限，那麼auth為7，怎麼做的好處是，只需要一個數字類型就能表示用戶的權限。

## 資料夾結構

### views: 主要頁面組件。

### components: 覆用組件。

### layout: 包含header、side menu、main等非路由組件，而main組件作為頁面組件的入口。

### api: 數據請求。

### router: routes為路由集合，intercept為路由守衛。

### store: pinia數據儲存庫。

### utils: tools為公用函式，request為axios攔截器。
