class Api::MessagesController < ApplicationController
  protect_from_forgery except: :index
  before_action :set_group
  def index
    @messages = @group.messages.includes(:user).where('id > ?', params[:id])
    respond_to do |format|
      format.html
      format.json
    end
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end