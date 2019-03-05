var arr = ['gergewEWDQWER468546', 'greger65846er6gfe', 'greger65846er6gfe', 'greger65846er6gfe'];
  function arrayCnt(arr) {
  //不重复的元素
    var newArr = [];
    for(var i = 0; i < arr.length; i++) {
     if(newArr.indexOf(arr[i]) == -1) {
     newArr.push(arr[i])
     }
    }
    //每个元素重复的次数
    var newarr2 = new Array(newArr.length);
    for(var t = 0; t < newarr2.length; t++) {
     newarr2[t] = 0;
    }
    for(var p = 0; p < newArr.length; p++) {
     for(var j = 0; j < arr.length; j++) {
     if(newArr[p] == arr[j]) {
      newarr2[p]++;
     }
     }
    }
    for(var m = 0; m < newArr.length; m++) {
     console.log(newArr[m] + "重复的次数为：" + newarr2[m]);
    }
  }
  arrayCnt(arr);
 