# 塔羅入門：LLM Wiki × 教學 HTML 簡報

第二份獨立課堂作業。主題經使用者討論確認後才建立；原塔羅 App 與前份 AGENTS.md 作業沒有修改。

## 成果

- [作業網站](https://tarot-llm-wiki-slides.vercel.app/)
- [GitHub 完整專案](https://github.com/t114ab8021-stack/tarot-llm-wiki-slides)
- [教學 HTML 簡報](https://tarot-llm-wiki-slides.vercel.app/slides.html)
- [六項繳交內容](https://tarot-llm-wiki-slides.vercel.app/submission.html)
- `public/wiki.html`：可搜尋的 Wiki，5 個概念頁與 5 篇已 ingest 的來源筆記。
- `public/slides.html`：14 頁教學簡報，含逐頁來源、鍵盤導覽、筆記及兩題測驗。
- `public/workflow.html`：graph、重複與回退設計、原始執行紀錄與反思。
- `public/submission.html`：六項繳交內容整理。

## 什麼是這裡的 LLM Wiki？

這是一個檔案式知識庫：AI 實際閱讀來源，整理成 Markdown 筆記；將主張分成史實、方法、自編練習及圖像觀察，再編入相互連結的知識頁。簡報只取用 Wiki 的主張 ID。

證據鏈：**投影片 → Wiki 頁 → claim → 來源筆記 → 原始網址**。

來源正文由本次 web reader 取得，筆記由 LLM 輔助整理。`ingest` 腳本驗證及收錄筆記，`query` 是關鍵詞檢索。沒有接入即時 LLM API、向量搜尋或背景自主代理，不需要 API key。

## 五篇已 ingest 的資料

1. The Met — Before Fortune-Telling: The History and Structure of Tarot Cards。
2. V&A — A history of tarot cards。
3. Folger Shakespeare Library — Fortune’s Fools: early tarot cards。
4. Harvard Project Zero — See, Think, Wonder。
5. The Strong National Museum of Play — From Playing Cards to Divination。

來源網址、取得方式、定位、短摘句與限制見 `content/sources.json` 及 `wiki/sources/`。另有 R01 候選來源未取得正文，明確排除，不算第六篇 ingest。

## 重跑方式

Node.js 18 以上；主要建置不需安裝套件。

```sh
npm run ingest
npm run query -- 歷史 年代
npm run query -- 結構 花色 宮廷
npm run query -- RWS 繪者
npm run query -- 觀察 提問 練習
npm run build
npm run check
npm run build
npm start
```

開啟 http://127.0.0.1:4175 。最後一次 build 會將最新檢查報告放進網站。重跑 query 會追加真實查詢紀錄，不會清除先前結果。

可選瀏覽器檢查需要 Playwright 與 Chromium；設定 `PLAYWRIGHT_PATH`、`BROWSER_PATH` 後執行 `node scripts/browser-check.cjs`。沒有這些依賴時仍可建置及使用網站。執行紀錄見 `docs/EXECUTION.md`。

## 結構

```text
content/       來源、主張、Wiki、投影片、graph 與素材清單
wiki/sources/  已 ingest 的 Markdown 來源筆記
wiki/topics/   產生的相互連結知識頁
docs/          主題討論與真實執行說明
runs/          ingest／query／build／check／browser 原始紀錄
scripts/       收錄、查詢、建置、檢查及本機伺服器
public/        可部署的 HTML、CSS、JavaScript 與圖片
```

## 新增內容

先讀 `AGENTS.md`。取得新來源正文並記錄，建立有證據的 claim，連到 Wiki，執行 query，再新增使用這些 claim 的投影片。無來源的事實不能通過檢查；自編活動必須明確標示。

## 引用與圖片

文章沒有全文鏡像；只保留必要短摘句與自己的摘要。Project Zero 方法採簡短介紹並連回原頁，不重製原學習單。三張 RWS 圖片沿用工作區素材，原繪者 Pamela Colman Smith；逐張來源與雜湊記錄於 `content/assets.json`。

## 繳交

截止：2026/11/23 23:59；遲交：2026/11/24 16:00（台灣時間）。

標題：`學校 學號 系級 姓名 塔羅入門`。未提供的個人資料由本人填寫。
