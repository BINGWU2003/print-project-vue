
export default function textTemplate(LODOP, template = {}) {
  // LODOP.SET_PRINT_STYLEA(2, "FontName", "隶书")
  
  // LODOP.SET_PRINT_STYLEA(2, "FontColor", 0)
  LODOP.ADD_PRINT_TEXT(15, 2, 200, 20, "幼儿园夏款")
  LODOP.SET_PRINT_STYLEA(1, "FontSize", 18)
  LODOP.ADD_PRINT_TEXT(45, 2, 200, 20, "女连衣裙")
  LODOP.SET_PRINT_STYLEA(2, "FontSize", 18)
  LODOP.ADD_PRINT_TEXT(75, 2, 100, 20, "床次:622-1")
  LODOP.ADD_PRINT_TEXT(90, 2, 100, 20, "扎号:1")
  LODOP.ADD_PRINT_TEXT(105, 2, 100, 20, "部位:床头")
  LODOP.ADD_PRINT_TEXT(120, 2, 200, 20, "黑色/3XS")
  LODOP.SET_PRINT_STYLEA(6, "FontSize", 18)
  // LODOP.ADD_PRINT_TEXT(115, 2, 100, 20, "匹号:0")
  // LODOP.ADD_PRINT_TEXT(135, 2, 100, 20, "数量:10")
  // LODOP.ADD_PRINT_TEXT(135, 2, 100, 20, "共3扎25件")
  // LODOP.ADD_PRINT_TEXT(145, 2, 100, 20, "2008-11-9 17:05")
  // 页面旋转180度
  LODOP.SET_PRINT_STYLEA(0, "AngleOfPageInside", 180)
  LODOP.SET_PRINT_STYLE('Blod',1)
}