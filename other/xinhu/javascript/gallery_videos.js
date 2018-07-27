var gallery_videos = [{
  title: "新湖國小全國音樂賽",
  ID: "kQPnbimrj_c",
  year: 2018,
  month: 3,
  day: 11,
  category: "音樂"
}, {
  title: "106下新湖國小開學活動",
  ID: "z8EX1mJa4OI",
  year: 2018,
  month: 2,
  day: 28,
  category: "綜合"
}, {
  title: "2018新湖國小卡資堡營隊活動",
  ID: "2WrW3MsZN38",
  year: 2018,
  month: 2,
  day: 5,
  category: "營隊"
}, {
  title: "新湖國小1060830新生開學日",
  ID: "WirpvsViSUQ",
  year: 2017,
  month: 8,
  day: 31,
  category: "綜合"
}, {
  title: "107學校日影片 我們不一樣",
  ID: "tGExIPu7xak",
  year: 2018,
  month: 3,
  day: 12,
  category: "綜合"
}, {
  title: "享受剎那間的悸動",
  ID: "RJ-zqYifzuM",
  year: 2018,
  month: 3,
  day: 11,
  category: "音樂"
}, {
  title: "107家長日報告",
  ID: "W-iPX1yr2kY",
  year: 2018,
  month: 3,
  day: 2,
  category: "教育"
}, {
  title: "先鋒計畫",
  ID: "cF5Q0TglbG0",
  year: 2018,
  month: 3,
  day: 2,
  category: "教育"
}, {
  title: "英雄任務",
  ID: "_rI0geDlvXo",
  year: 2018,
  month: 3,
  day: 2,
  category: "教育"
}, {
  title: "2018 卡資堡活動花絮",
  ID: "BVTEsmflgCE",
  year: 2018,
  month: 2,
  day: 2,
  category: "營隊"
}, {
  title: "2018-三對三鬥牛賽",
  ID: "suRMQoa6C4c",
  year: 2018,
  month: 1,
  day: 21,
  category: "體育"
}, {
  title: "腳踏車體驗課程",
  ID: "PS-qMbFyTPQ",
  year: 2018,
  month: 1,
  day: 21,
  category: "綜合"
}, {
  title: "106合唱團晨光音樂劇",
  ID: "gYnt_BnW4BI",
  year: 2018,
  month: 1,
  day: 3,
  category: "音樂"
}, {
  title: "中興國小來訪",
  ID: "f2BaX5FilzM",
  year: 2017,
  month: 12,
  day: 8,
  category: "教育"
}, {
  title: "宣導 ～ 走廊不奔跑",
  ID: "BO-LFJlpXyM",
  year: 2017,
  month: 12,
  day: 4,
  category: "教育"
}, {
  title: "106新湖體表會CF",
  ID: "uM1OAURvuvc",
  year: 2017,
  month: 11,
  day: 21,
  category: "體育"
}, {
  title: "106藝術亮點成果短片",
  ID: "olF06ZdDhHM",
  year: 2017,
  month: 11,
  day: 19,
  category: "美術"
}, {
  title: "2017 中正盃滾球賽",
  ID: "UuZKstGAzf8",
  year: 2017,
  month: 11,
  day: 19,
  category: "體育"
}, {
  title: "田徑隊 -106秋季公開賽",
  ID: "uWmKyy9BIVA",
  year: 2017,
  month: 12,
  day: 4,
  category: "體育"
}, {
  title: "106教師節大會",
  ID: "B5qHAzDOu2M",
  year: 2017,
  month: 9,
  day: 29,
  category: "綜合"
}];

function category2class(category) {
  if (category == "綜合") {
      return "general"
  } else if (category == "體育") {
      return "phy"
  } else if (category == "音樂") {
      return "music"
  } else if (category == "美術") {
      return "art"
  } else if (category == "教育") {
      return "edu"
  } else if (category == "營隊") {
      return "camp"
  }
}