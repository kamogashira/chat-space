$(function(){
  $('#box').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
  })
})