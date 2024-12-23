# Troubleshooting Lab 心得

一開始很沒有方向，就慢慢透過前幾次作業的內容和參考文獻、慢慢摸索，但就是遵循著

1. 發現問題
2. 探索這個問題
3. 解決這個問題

這樣的步驟慢慢前進，再加上好心人在分享區提醒要注意防火牆的規則，最後磕磕絆絆還是成功解決了。

後續為了熟悉整個流程，也重新開了一個 instance，從頭再來一遍，並將 reboot 後可能遇到的問題也一併解決。

也注意到，其實一切問題都有跡可循

### 1.

例如當發現 `curl localhost` 被拒絕連線，可能有以下原因：

-   服務沒有啟動
-   服務啟動時遇到問題
-   服務成功啟動了，但防火牆在阻擋

### 2.

當在 error.log 遇到 Permission Denied，可以去檢查 檔案的權限

### 3.

當一個 process 的 PPID 為 1，UID 為 root，代表是機器或 instance 時自動啟動的，可以去找找設定檔

總結來說，這個 lab 讓我知道：一個服務要可以被正常 access，裡面包含許多要素，例如：服務本身、防火牆、作業系統（檔案權限）等等，親自體驗系統診斷和故障排除，收穫良多！
