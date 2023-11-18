$(function () {
  $("#calculate").click(function () {
   //创建一个表单拿来装临床信息
    let formData = new FormData();
     //如果输入的值有问题就警告？
    if($("#age_at_hj").val() == null || $("#age_at_hj").val()<=0 ||$("#age_at_hj").val()>300){
      $("#myModalLabel").html('Please enter the correct age');
      $('#myModal').modal('show');
      return;
    }
    var inputNode = $('.inputWrap .warnning');

    if (inputNode.length > 0) {
        id = inputNode[0].id;
        $("#myModalLabel").html('Please enter the correct age');
        $('#myModal').modal('show');
        $("#" + id).addClass('warnning');
        return;
    }
    
      //年龄
      if ($('#age_at_hj').val()) {
          formData.append("AGE", parseInt($('#age_at_hj').val()));
      }
      //性别
      formData.append("gender", parseInt($("input[name='Sex']:checked").val()));
      //T stage
      formData.append("Tstage", parseInt($("#T_stage option:selected").val()));
      //N stage
      formData.append("Nstage", parseInt($("#N_stage option:selected").val()));
      //Total stage
      formData.append("TNM_stage", parseInt($("input[name='TNM_stage']:checked").val()));
      $('#loading').modal('show');
      function insertAfter(newElement, targetElement) {
        // newElement是要追加的元素targetElement 是指定元素的位置
        var parent = targetElement.parentNode; // 找到指定元素的父节点
        parent.appendChild(newElement, targetElement);
      }
      $.ajax({
          type : "POST",
          processData: false,
          contentType: false,
          url: "/calculate", 
          headers: { Authorization: "1a2cEFgh" },
          data: formData,
          error : function() {
            alert('error');
          },
          success:function(result){
            $('#loading').modal('hide');
            $('#resultWrap').css('display', 'block');
            $("#box1").html(result.answer);
            var p = document.createElement("p"); //生成一个p标签
            p.innerHTML = result.log_list; //日志存放到P标签内
            var header = document.getElementById("log_text");
            insertAfter(p, header); //将p标签添加到log_text div中
            window.scrollTo(0, document.documentElement.scrollHeight)
          } 
      });

 //如果第二个计算按钮（示例按钮）按下，就不后台计算，直接展示演示结果
  $("#exam").click(function(){
      $("#resultWrap").css("display", 'block');
  })
})
  
});
