
$(function () {
  var Data = [
    {
      "age_at_hj": 20,
      "Sex": 1,
      "T_stage": 3,
      "N_stage": 3,
      "EBV": 120000,
      "LDH": 153,
      "ALB": 41.2,
      "BMI": 20.42,
      "risk_prob": '1.45',
      "risk_level": 'high',
      "download": 'http://101.89.95.81:8250/download/1/ME130812MR3025.zip'
    },
    {
      "age_at_hj": 24,
      "Sex": 1,
      "T_stage": 3,
      "N_stage": 3,
      "EBV": 851000,
      "LDH": 170,
      "ALB": 41.1,
      "BMI": 19.05,
      "risk_prob": '1.49',
      "risk_level": 'high',
      "download": 'http://101.89.95.81:8250/download/2/ME130812MR3025.zip'
    },
    {
      "age_at_hj": 41,
      "Sex": 1,
      "T_stage": 1,
      "N_stage": 2,
      "EBV": 0,
      "LDH": 178.9,
      "ALB": 42.8,
      "BMI": 18.82,
      "risk_prob": '0.13',
      "risk_level": 'low',
      "download": 'http://101.89.95.81:8250/download/3/ME130812MR3025.zip'
    },
    {
      "age_at_hj": 42,
      "Sex": 1,
      "T_stage": 1,
      "N_stage": 2,
      "EBV": 216,
      "LDH": 210.2,
      "ALB": 41.2,
      "BMI": 20.76,
      "risk_prob": '0.13',
      "risk_level": 'low',
      "download": 'http://101.89.95.81:8250/download/4/ME130812MR3025.zip'
    },
  ];
function changeDisable(type){
  let _type = type == "Dis"? true: false;
  $('#age_at_hj').attr('disabled', _type);
  $("input[name='Sex']").attr("disabled", _type);
  $('#T_stage').attr('disabled', _type);
  $('#N_stage').attr('disabled', _type);
  $('#Total_stage').attr('disabled', _type);
  }

function setValue(value){
  let CurData = Data[Number(value-1)]?Data[Number(value-1)]:Data[0];
  $('#age_at_hj').val(CurData["age_at_hj"]);
  if(CurData["Sex"] == 1){
    $("input[name='Sex'][value='2']").attr("checked",false);
    $("input[name='Sex'][value='1']").attr("checked",true);
  }else{
    $("input[name='Sex'][value='1']").attr("checked",false);
    $("input[name='Sex'][value='2']").attr("checked",true);
  }
  $('#T_stage').val(CurData["T_stage"]);
  $('#N_stage').val(CurData["N_stage"]);
  $('#EBV').val(CurData["EBV"]);
  $('#LDH').val(CurData["LDH"]);
  $('#ALB').val(CurData["ALB"]);
  $('#BMI').val(CurData["BMI"]);
  $(".download").attr("href", CurData['download']);
  $(".download").css('display', 'block');
}
  $(".Tab").click(function(){
  let _name = $(this).attr("name");
  $(this).attr("class", "Tab active").siblings().removeClass('active');
  if(_name == "Calculate"){
    $(".up").replaceWith('<div class="up">+</div>');
    $(".text1").html("Upload or drag the data folder here");
    changeDisable();

    $(".download").css('display', 'none');
    $("#calculate").css('display', 'none');
    $("#exam").css('display', 'none');
    $(".form-img").css('display', 'block');
    $(".resultWrap").css('display', 'none');
    $('#age_at_hj').val('');
    $("input[name='Sex'][value='2']").attr("checked",false);
    $("input[name='Sex'][value='1']").attr("checked",true);
    $('#T_stage').val('1');
    $('#N_stage').val('0');

    return;
  }
  $(".up").replaceWith('<div class="up">↓</div>');
  $("#exam").css('display', 'block');
  $("#calculate").css('display', 'none');
  $(".form-img").css('display', 'none');
  $(".text1").html("download sample of MR image");
  setValue(_name);
  changeDisable("Dis");
})

})