# GitHub Pages 部署

依 `PROJECT_BRIEF.md`：正式網址為 **https://micro.weichenchu.com/**，網站位於根路徑 `/`，與 `weichenchu.com` 主網站分開。

## 已備妥的設定

- `.github/workflows/deploy-pages.yml`：push 到 `main` 或手動執行後，安裝依賴、跑測試、建置，僅發布 `dist/`。
- `public/CNAME`：`micro.weichenchu.com`，Vite 會複製到輸出目錄。
- `public/.nojekyll`：輸出為預先建置的靜態檔案。
- Vite `base: "./"`：資源由目前文件相對載入，正式網域根路徑與本機預覽都適用；沒有寫死 `/micro-detective/`。
- 頁面切換使用既有 React state，沒有需要伺服器 rewrite 的路由。

## Repository 管理者的一次性設定

1. 將此專案放入對應 GitHub repository；在 **Settings → Pages → Build and deployment → Source** 選 **GitHub Actions**。
2. 在 Pages 的 **Custom domain** 設定 `micro.weichenchu.com`。對自訂 Actions workflow，不能只依賴 CNAME 檔案。
3. 在網域 DNS 將 `micro` 子網域的 CNAME 指向該 GitHub Pages 帳號的 `<owner>.github.io`（owner 以實際 repository 擁有者為準），不要修改主網域的網站設定。
4. DNS 驗證和憑證就緒後，在 Pages 啟用 **Enforce HTTPS**。
5. 推送 `main` 或在 Actions 手動執行 Deploy GitHub Pages。發布成功後，在正式網址測試圖片、語言、課程、練習、筆記本及重新整理。

本次只準備程式與設定，未推送、修改 DNS 或發布正式網站。既有 Sites 設定保留，但此 workflow 不使用 Sites、後端服務或資料庫。

## 官方參考

- [GitHub Pages 自訂 workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [GitHub Pages 自訂網域](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Vite 靜態部署](https://vite.dev/guide/static-deploy.html)
