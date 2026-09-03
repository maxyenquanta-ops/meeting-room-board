/* ===================================================================
   會議室預約看板 —— 預約時段衝突判斷邏輯
   由 index.html 以一般 <script src="app.js"></script> 載入（非 ES module）。
   此函式讀取全域的 state.bookings（於 index.html 中宣告）。
   =================================================================== */

// 衝突檢查：檢查 [startHour, endHour) 每一小時是否已被同室同日的其他預約占用
// excludeId 用於「修改」時排除自己
function hasConflict(roomId, dateStr, startHour, endHour, excludeId) {
  return state.bookings.some(b =>
    b.roomId === roomId &&
    b.date === dateStr &&
    b.id !== excludeId &&
    // 兩個區間 [b.startHour, b.endHour) 與 [startHour, endHour) 有交集即為衝突
    b.startHour < endHour &&
    b.endHour > startHour
  );
}
