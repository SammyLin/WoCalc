# 房貸計算機網頁設計腦力激盪

<response>
<probability>0.08</probability>
<text>
<idea>
  <design_movement>Neumorphism (新擬態) + Soft UI</design_movement>
  <core_principles>
    1. **溫柔的現實感**：房貸是沈重的壓力，介面應提供柔軟、非侵入性的視覺感受，減輕使用者的焦慮。
    2. **觸覺回饋**：按鈕與區塊像是有實體的按鍵，凸起或凹陷，讓輸入數據的過程更有「踏實感」。
    3. **清晰的層次**：利用光影而非線條來區分層級，讓資訊流動自然。
    4. **專注當下**：一次只呈現一個關鍵問題或數據，避免資訊過載。
  </core_principles>
  <color_philosophy>
    選用 **「晨霧藍 (Morning Mist Blue)」** 與 **「溫暖沙色 (Warm Sand)」**。
    這不是冷冰冰的銀行藍，而是帶有灰階、低飽和度的藍色，象徵理性的冷靜；搭配暖沙色作為背景，提供像家一樣的包容感。這組配色旨在傳達「理性規劃，溫暖成家」的情緒。
  </color_philosophy>
  <layout_paradigm>
    **卡片堆疊流 (Card Stack Flow)**。
    不使用傳統的 Grid 網格。輸入區塊像是一疊整理好的文件卡片，使用者處理完一張（例如輸入收入），該卡片會滑走或縮小，下一張卡片（輸入房價）浮現。結果頁面則是一張精緻的「核貸報告書」浮在最上層。
  </layout_paradigm>
  <signature_elements>
    1. **軟浮雕按鈕**：按鈕與背景同色，僅靠左上亮光與右下陰影區分，按下時有逼真的凹陷效果。
    2. **圓形進度環**：用來顯示收支比，像是一個精密的儀表，指針緩慢轉動，而非生硬的長條圖。
    3. **毛玻璃數據板**：關鍵結果（如月付金）顯示在帶有模糊背景的懸浮板上，與底層內容分離。
  </signature_elements>
  <interaction_philosophy>
    **慢節奏的引導**。
    每一個輸入都有微小的延遲與阻尼感，模擬真實物理世界的互動。滑動數值時，數字跳動帶有慣性。這不是要拖慢速度，而是要讓使用者在輸入大筆金額時感到慎重與安心。
  </interaction_philosophy>
  <animation>
    **流體與呼吸**。
    背景可能有極緩慢流動的漸層光暈。切換步驟時，元素像是在水中浮動般位移，而非生硬的切換。收支比過高時，儀表板會發出柔和的紅色脈衝警告，而非刺眼的紅框。
  </animation>
  <typography_system>
    標題使用 **"Noto Serif TC" (宋體)**，帶有人文氣息與信賴感；內文與數據使用 **"Nunito"** 或 **"Varela Round"**，圓潤的無襯線字體，減少數字的尖銳感，讓金額看起來沒那麼可怕。
  </typography_system>
</idea>
</text>
</response>

<response>
<probability>0.05</probability>
<text>
<idea>
  <design_movement>Swiss Style (瑞士國際主義風格) + Brutalism (輕微粗獷主義)</design_movement>
  <core_principles>
    1. **極致的客觀**：房貸計算是數學與邏輯，不需要多餘的裝飾，強調網格、秩序與可讀性。
    2. **數據即美學**：巨大的數字本身就是視覺主體，不隱藏殘酷的現實（如高額利息）。
    3. **功能優先**：所有的線條與色塊都必須有功能性意義，拒絕無意義的裝飾。
    4. **高對比度**：確保在任何光線下都能精確閱讀。
  </core_principles>
  <color_philosophy>
    **「黑白單色 (Monochrome)」** 搭配 **「螢光萊姆綠 (Electric Lime)」**。
    背景純白或極淺灰，文字純黑。萊姆綠僅用於「通過/安全」的指標或最重要的 Call-to-Action。這種高對比配色傳達出「精準、現代、不廢話」的專業金融工具形象。
  </color_philosophy>
  <layout_paradigm>
    **模組化網格系統 (Modular Grid System)**。
    畫面被粗黑線條嚴格分割成不同區域。左側是巨大的輸入欄位，右側是即時變動的計算結果。佈局像是一張現代化的報表或儀表板，資訊密度高但井然有序。
  </layout_paradigm>
  <signature_elements>
    1. **巨大的無襯線數字**：還款金額的字級極大，佔據視覺中心。
    2. **粗黑框線**：所有輸入框和按鈕都有明顯的粗黑邊框，帶有復古電腦介面的味道。
    3. **單色幾何圖示**：使用簡單的圓形、方形、三角形來代表不同類型的資產或支出。
  </signature_elements>
  <interaction_philosophy>
    **即時與直接**。
    沒有過渡動畫，輸入數字的瞬間結果直接跳變。開關是硬切的 Toggle，滑塊是方塊狀的拖曳條。強調工具的高效能與零延遲。
  </interaction_philosophy>
  <animation>
    **無 (None) 或 極簡位移**。
    幾乎不使用裝飾性動畫。唯一的動態可能是數據變化時的數字翻牌效果，或是游標懸停時，黑底白字瞬間反轉為白底黑字。
  </animation>
  <typography_system>
    全站使用 **"Inter"** 或 **"Helvetica Now"**，設定為 **Tight (緊縮)** 的字距。標題使用超粗體 (Black/Heavy)，內文使用中等粗細。完全捨棄襯線字體，追求絕對的現代感與易讀性。
  </typography_system>
</idea>
</text>
</response>

<response>
<probability>0.07</probability>
<text>
<idea>
  <design_movement>Abstract Organic (抽象有機) + Data Visualization Art</design_movement>
  <core_principles>
    1. **數據視覺化為藝術**：將枯燥的房貸數據轉化為生動的圖形，讓使用者直觀感受「負擔」與「餘裕」。
    2. **流動的財務狀況**：金錢是流動的，介面應反映出收入與支出的動態平衡。
    3. **自然隱喻**：用「水位」、「堆疊的石頭」或「生長的樹」來隱喻資產與負債。
    4. **探索性體驗**：鼓勵使用者嘗試不同數值，看看圖形會如何變化，而非單純填表。
  </core_principles>
  <color_philosophy>
    **「深海墨藍 (Deep Sea Ink)」** 與 **「珊瑚粉 (Coral Pink)」**、**「海藻綠 (Seaweed Green)」**。
    深色背景代表未知的未來，亮色圖形代表使用者的掌控力。這組配色既神秘又充滿活力，將房貸計算轉化為一場探索未來的旅程。
  </color_philosophy>
  <layout_paradigm>
    **非對稱分割 (Asymmetrical Split)**。
    左側 1/3 是簡潔的輸入控制台，右側 2/3 是滿版的互動式視覺化畫布。輸入的數據會即時影響右側圖形的形狀、大小與顏色。
  </layout_paradigm>
  <signature_elements>
    1. **變形蟲圖表 (Blob Charts)**：收支比不是圓餅圖，而是一個有機形狀的 Blob，支出越多，形狀越擠壓變形。
    2. **流動線條背景**：背景有淡淡的等高線或流體線條，隨著滑鼠移動而輕微波動。
    3. **懸浮的數據點**：關鍵數據像星體一樣懸浮在畫面上，點擊可展開詳細資訊。
  </signature_elements>
  <interaction_philosophy>
    **遊戲化與回饋**。
    調整滑塊時，右側的圖形會彈性縮放（Squash and Stretch）。當收支比達到健康狀態，畫面可能會綻放微小的粒子特效；若負擔過重，圖形顏色會轉暗且形狀變得尖銳。
  </interaction_philosophy>
  <animation>
    **物理模擬與變形**。
    所有的圖表變化都是平滑的變形動畫 (Morphing)。數值改變時，圖形像是有生命一樣生長或收縮。
  </animation>
  <typography_system>
    標題使用 **"Space Grotesk"** 或具有科技感的寬體字；內文搭配 **"Roboto Mono"** 等寬字體，營造一種「未來儀表板」的精密感，平衡有機圖形的隨性。
  </typography_system>
</idea>
</text>
</response>
