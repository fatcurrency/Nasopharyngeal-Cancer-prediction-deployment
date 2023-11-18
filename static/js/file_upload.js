$(function () {
  //在图像导入成功后显示第一个文件的文件名
$("#fileUpload").change(function(){
  var _name = $("#fileUpload")[0].files[0].name;
  $(".up").html(_name);
  $(".up").css('fontSize', '20px');
  $(".up").css('color', '#000');
  $(".up").css('color', '#000');
})

})