$(function() {
  var search_list = $("#user-search-result");
  var user_list = $("#chat-group-users");
  function searchUser(user) {
    var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${ user.name }</p>
                    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</div>
                </div>`
    search_list.append(html);
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div class='chat-group-user'>${ msg }</div>`
    search_list.append(html);
  }

  function appendUserToGroup(user_id, user_name) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value=${user_id}>
                    <p class='chat-group-user__name'>${user_name}</p>
                    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn data-user-id=${user_id}'>削除</div>
                </div>`
    user_list.append(html);
  }

  $("#user-search-field.chat-group-form__input").on("keyup", function() {
    var input = $("#user-search-field.chat-group-form__input").val();
    if (input != ""){
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            searchUser(user);
          });
          return users
        }
        else {
          appendErrMsgToHTML("一致するユーザーはいません");
        }

      })
      .fail(function() {
        alert('error');
      });
    }
  });
  search_list.on("click", ".chat-group-user__btn", function() {
    var user_id = $(this).data('userId');
    var user_name = $(this).data('userName');
　  if($.inArray(user_name,gon.group_name_list) === -1) {
      $(this.previousElementSibling).remove();
      $(this).remove();
      appendUserToGroup(user_id, user_name);
    }
  });

  user_list.on("click", ".user-search-remove.chat-group-user__btn.chat-group-user__btn--remove.js-remove-btn", function() {
    var selected_user_name = $(this.previousElementSibling).text();
    var users = gon.users.filter(function(user){
      return user.name !== selected_user_name;
    })
    $(this.previousElementSibling).remove();
    $(this).remove();
  });
});