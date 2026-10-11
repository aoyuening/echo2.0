export type SceneId = 'cover' | 'cabin' | 'qingjiang' | 'lamp' | 'finalLetter';

export type CabinItemType = 'letter' | 'photo' | 'radio' | 'lamp';

export interface ClueItem {
  id: string;
  name: string;
  description: string;
  discoveredAt?: string;
}

/**
 * Global shared clue progress across all 5 chapters of 《回声：清江边的最后一封信》
 * Persisted seamlessly from Chapter 1 to Chapter 5.
 */
export interface JourneyClues {
  // 一、老屋
  cabinLetter: boolean; // 案头第一封信：“沿着清江往下走”
  cabinPhoto: boolean; // 墙上的老照片：青年与木桥
  cabinRadio: boolean; // 窗边老收音机：调频杂音与微弱低语
  cabinLamp: boolean; // 案头旧油灯：照亮桌角“归”字

  // 二、清江
  qingjiangSteps: boolean; // 清江石阶：潮湿的青苔与卵石
  qingjiangBox: boolean; // 锈蚀铁盒：卡在石隙中的陈旧物件

  // 三、旧码头
  pierButton: boolean; // 黄铜纽扣：印着岁月风雨的旧纽扣
  qingjiangSecondLetter: boolean; // 盒中第二封信：“去找那盏还亮着的灯”
  pierBoat: boolean; // 岸边缆舟：系在枯树桩旁的木船

  // 四、那盏灯
  lampShoes: boolean; // 门口沾泥布鞋：走过漫长山路的痕迹
  lampBamboo: boolean; // 窗边陈年竹编：朴素而坚韧的手艺
  lampPhotoFit: boolean; // 照片与纽扣吻合：青年衣领缺角吻合
  lampRadio: boolean; // 木架老收音机：“……清江……回来……”
  lampTea: boolean; // 案头微温热茶：新沏的一盏留客茶
  lampThirdLetter: boolean; // 案头第三封信：“请替我把灯留到天亮”
  lampKeptDawn: boolean; // 守灯至晓：替他把灯留到天亮

  // 五、最后一封信
  finalLetterRead: boolean; // 最后一封信：致所有离开又终会想起故乡的人
  finalEndingChoice: 'leave' | 'carry' | null; // 归宿抉择：回到山外 / 留在江边
}

export const initialJourneyClues: JourneyClues = {
  cabinLetter: false,
  cabinPhoto: false,
  cabinRadio: false,
  cabinLamp: false,
  qingjiangSteps: false,
  qingjiangBox: false,
  pierButton: false,
  qingjiangSecondLetter: false,
  pierBoat: false,
  lampShoes: false,
  lampBamboo: false,
  lampPhotoFit: false,
  lampRadio: false,
  lampTea: false,
  lampThirdLetter: false,
  lampKeptDawn: false,
  finalLetterRead: false,
  finalEndingChoice: null,
};
