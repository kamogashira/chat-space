$(function(){
  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var image = message.image ? `<img class="message__lower__image" src= ${ message.image }>` : "";
    var html = `<div class="message" data-message_id="${ message.id }">
                  <div class="message__upper">
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
                  </div>
                </div>`
  return html;
  }

  function scrollBottom(){
    $('.messages').animate({
      scrollTop: $('.messages')[0].scrollHeight
    }, 300, 'swing');
  }

  $('#box').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
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
      $('.messages').append(html);
      $('#box')[0].reset();
      scrollBottom();
    })
    .fail(function(){
      alert('error');
    })
    .always(function(data){
      $('.box__btn').prop('disabled', false);
    })
  })
  var reloadMessages = function() {
    last_message_id = $('.message').last().data('messageId');
    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log('success');
      var insertHTML = '';
      if (messages.length !== 0) {
        messages.forEach(function(message){
          insertHTML += buildHTML(message);
        });
      }
      var messageHTML = $('.messages');
      messageHTML.append(insertHTML);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function() {
      console.log('error');
      alert('自動更新に失敗しました');
    });
  };
  if (location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages, 5000);
  }
})