$(function () {
  //对于临床信息输入框的防止错误验证
  var thresholdPara = {
    'age_at_hj':[0, 1000],
    'EBV':[0, 1000],
    'LDH':[0,100],
    'ALB':[0,100],
    'BMI':[0,100],

  };
  $('.inputWrap input').blur(function () {
    var warnning_flg = false;
    $(this).removeClass('warnning');
    var id = this.id;
    var value;
    if(!thresholdPara[id]){
      return;
    }
    if (id == 'age_at_hj'){
        value = parseFloat(this.value);
    } else{
        value = parseFloat(this.value)
    }
    var minValue = thresholdPara[id][0];
    var maxValue = thresholdPara[id][1];
    $("#myModalLabel").html('Please enter the correct value');
    if ((id == 'age_at_hj')&&(value < minValue || value > maxValue)){
      $('#myModal').modal('show');
      warnning_flg = true;
    }else if((id == 'EBV' || id == 'LDH' || id == 'ALB' || id == 'BMI') && (value < minValue)){
        $('#myModal').modal('show');
        warnning_flg = true;
    }
    if(warnning_flg) {
        $(this).addClass('warnning');
    }
  });
})