json.array! @users do |user|
  json.id     user.id
  json.name   users.name
  json.email  user.email
end