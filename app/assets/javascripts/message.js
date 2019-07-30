$(function(){
  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var image = message.image ? `<img class="message__lower__image" src= ${ message.image }>` : "";
    var html = `<div class="message__upper">
                  <p class="message__upper__name">
                    ${message.user_name}
                  </p>
                  <p class="message__upper__date">
                    ${message.date}
                  </p>
                </div>
                <div class="message__lower">
                  <p class="message__lower__content">
                    ${content}
                  </p>
                  ${image}
                </div>`
  return html;
  }
  $('#box').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.box__input__text').val('')
    })
    .fail(function(){
      alert('error');
    })
    .always(function(data){
      // var result = $('.box__btn').is(':disabled');
      // console.log(result)
      $('.box__btn').prop('disabled', false);　//ここで解除している
    })
  })
})