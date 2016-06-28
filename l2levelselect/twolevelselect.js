$(function() {
  var area = [{ n: 1, s: [{n:11,s:[111,112]}, {n:12,s:[121,122]}] },
  { n: 2, s: [{n:21,s:[211,212]}, {n:22,s:[221,222]}] },
  { n: 3, s: [{n:31,s:[311,312]}, {n:32,s:[321,322]}] }];
  // area[0].n,area[1].n
// var area = [{n:1,s:[11,12]},{n:1,s:[11,12]}]

  var one = gatherAttrValueIntoArr(area, 'n');
  var twoS = gatherAttrValueIntoArr(area, 's');
  console.log(area);
  console.log(twoS[0]);
  // var two1 = gatherAttrValueIntoArr(twoS[0], 'n');
 // console.log(two1)
  var selectNum = $("#selectNum");
  var selects = selectNum.children("select");

  insertOptionIntoSelect(one, selects.eq(0));
  // 第二个select是根据第一个select
  selects.eq(0).change(function() {
    var i, l = one.length;
    for (i = 0; i < l; i++) {
      if (selects.eq(0).val() == one[i]) {
      	var two = twoS[i]
        insertOptionIntoSelect(gatherAttrValueIntoArr(two, 'n'), selects.eq(1));
        // 第三个select是根据第二个
        selects.eq(1).change(function() {
          var m, ml = two.length;
          for (m = 0; m < ml; m++) {
            // if (selects.eq(1).val() == one[i]) {
            if (selects.eq(1).val() == two[m].n) {
            	console.log(selects.eq(1).val())
            	console.log(two[m].n)
            	console.log(two[m].s)
              insertOptionIntoSelect(gatherAttrValueIntoArr(two[m].s, 'n'), selects.eq(2));
            }
          }

        })
      }
    }
  })











  /**
   * [insertOptionIntoSelect 在置空select里插入option]
   * @param  {[type]} arrInsert       [要插入option的值组成的数组]
   * @param  {[type]} $selectSelector [select的选择器]
   * @return {[type]}                 [无]
   */
  function insertOptionIntoSelect(arrInsert, $selectSelector) {
    if (!arrInsert instanceof Array) {
      throw new Error("第一个参数必须是数组")
    }
    // 置空
    $selectSelector.text("");
    var i, l = arrInsert.length;
    for (i = 0; i < l; i++) {
      var value = arrInsert[i];
      var option = $("<option>", { html: value, value: value });
      if (i == 0) {
        option.selected = true;
      }
      $selectSelector.append(option);
    }
  }
  /**
   * [gatherAttrValueIntoArr 由输入数组每项的某属性组成新数组]
   * @param  {[type]} arrObj [数组,且数组项是对象]
   * @param  {[type]} attr   [对象里的某属性]
   * @return {[type]}        [属性组成的新数组]
   * eg: var area = [{n:1},{n,2},{n:3}]   gatherAttrValueIntoArr(area,'n')  变成 [1,2,3]
   */
  function gatherAttrValueIntoArr(arrObj, attr) {
    if (!arrObj instanceof Array) {
      throw new Error("第一个参数必须是数组")
    };
    var arr = [];
    var i, l = arrObj.length;
    for (i = 0; i < l; i++) {
      arr.push(arrObj[i][attr]);
    }
    return arr;
  }

})
