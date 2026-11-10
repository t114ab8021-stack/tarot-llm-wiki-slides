# 塔羅 LLM Wiki 與 HTML 教學簡報

- 本資料夾是獨立的第二份作業；不得改動相鄰 App 或第一份作業。
- 先讀 docs/DISCUSSION.md，確認主題與受眾；新範圍先與使用者討論。
- Wiki 是 Markdown 來源筆記、主張清單、相互連結的知識頁。不得把普通連結清單或搜尋摘要冒充 ingest。
- 新來源加入 content/sources.json，實際讀取正文，填入定位、日期、短摘句、自行摘要與限制。失敗來源保留 rejected 紀錄，不算進五篇。
- 每篇非公有領域來源英文直接引文總計不超過 25 字；不用整頁原文當公開素材。
- 史實與方法主張必須指向 accepted 來源；自編練習標為 original；直接圖像觀察標為 observation 並指向素材。
- 簡報只引用 Wiki 已收錄的 claim ID。輸出前檢查來源鏈：投影片 → 知識頁 → 主張 → 來源筆記。
- 來源不一致先核對時間與範圍，不用多數投票決定真偽，不寫尚未證明的絕對說法。
- HTML 簡報使用可存取按鈕、鍵盤導覽、講者筆記、逐頁來源、列印樣式；手機允許單頁內容自然捲動，不裁掉文字。
- 新增頁面改 content，不手改產生的 HTML。共用樣式在 public/site.css、public/slides.css。
- npm run ingest → npm run query -- 關鍵詞 → npm run build → npm run check。至少實測桌機及手機切頁、測驗、筆記和圖片載入。
- 讀取過程、真實失敗及修正記錄於 runs/ 與 content/workflow.json；不得捏造反思，不把測試故意注入的錯誤算成真實執行故障。
- build/check 是確定性腳本；閱讀、綜合和內容判斷由本次 LLM 輔助完成。沒有接 LLM API 時不可宣稱即時 AI 聊天或自動代理。
- 發布至獨立 tarot-llm-wiki-slides 專案，GitHub 帳號沿用使用者確認的 t114ab8021-stack；檢查目的地後再發布。
