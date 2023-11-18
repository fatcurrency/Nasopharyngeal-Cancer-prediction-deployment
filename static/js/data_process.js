//在数据处理部分，只上传图像文件，对图像文件进行几步处理操作，在计算部分再输入临床信息
$(function () {
  $("#process_btn").click(function () {
    //如果没有输入图像，就警告
    if($("#fileUpload")[0].files.length == 0){
      $("#myModalLabel").html('Please upload files');
      $('#myModal').modal('show');
      return;
    }
    let DataArr = $("#fileUpload")[0].files;
    
   //把所有图像文件放入表单
    let formData = new FormData();
     let _len = DataArr.length;
     for(let i = 0; i<_len ; i++){
        var files = DataArr[i];
        key='file'+i
        formData.append(key, files);
     }
     formData.append('file_len', _len)
    

     //如果输入的值有问题就警告？
    var inputNode = $('.inputWrap .warnning');

    if (inputNode.length > 0) {
        id = inputNode[0].id;
        $("#myModalLabel").html('Please enter the correct age');
        $('#myModal').modal('show');
        $("#" + id).addClass('warnning');
        return;
    }
    function insertAfter(newElement, targetElement) {
      // newElement是要追加的元素targetElement 是指定元素的位置
      var parent = targetElement.parentNode; // 找到指定元素的父节点
      parent.appendChild(newElement, targetElement);
    }
    function showLog(log_list){
      var p = document.createElement("p"); //生成一个p标签
      p.innerHTML = log_list; //日志存放到P标签内
      var header = document.getElementById("log_text");
      insertAfter(p, header); //将p标签添加到log_text div中
    }
  
    showLog('Begin to upload, about 1 minute')
      $.ajax({
          type : "POST",
          processData: false,
          contentType: false,
          url: "/Upload", 
          headers: { Authorization: "1a2cEFgh" },
          data: formData,
          error : function() {
            alert('error');
          },
          success:function(data){    
            showLog(data.log_list)
            showLog('Begin to unzip, within 1 min')     
            $.get("/Decompression", {}, function (data) {
              showLog(data.log_list)
              showLog('Begin to preprocess, within 1 min')
              $.get("/Preprocessing", {}, function (data) {
                showLog(data.log_list)
                showLog('Begin to segment, about 5 minutes')
                $.get("/Segmentation", {}, function (data) {
                  showLog(data.log_list)
                  showLog('Begin to restore resolution, within 1 min')
                  $.get("/Resolution", {}, function (data) {
                    showLog(data.log_list)
                    showLog('Begin to register, about 1 min')
                    $.get("/Register", {}, function (data) {
                      showLog(data.log_list)
                      showLog("Begin to extract features, about 2 min")
                      $.get("/Radiomics", {}, function (data) {
                        showLog(data.log_list)
                        $('#calculate').css('display', 'block');
                        window.scrollTo(0, document.documentElement.scrollHeight)
                        })
                      })
                    })
                  })
                })
              })

          }
      });
      

  });
});
