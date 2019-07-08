# README

<!-- This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ... -->
## Userテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|
|e-mail|text|null: false, unique: true|
|password|text|null: false, unique: true|
|group_id|integer||

### Association
- has_many :groups, through: :groups_users
- has_many :chats

## Groupテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|text|null: false, unique: true|
|user_id|integer|null: false, foreign_key: true|
|chat_id|integer|null: false, foreign_key: true|

### Association
- has_many :users, through: :groups_users
- has_many :chats

## GroupsUsersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## Chatテーブル

|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group_id|integer||
|message|text||
|image|text||

### Association
- belongs_to :group