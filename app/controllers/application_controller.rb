class ApplicationController < ActionController::Base

  def demo
    # redirect_to ""
  end

  def dashboard
    if current_user.status == "Teacher"
      redirect_to "/teachers/#{current_user.id}"
    else
      redirect_to "/students/#{current_user.id}"
    end
  end


private
  def after_sign_in_path_for(resource)
    if current_user.status == "Teacher"
      "/teachers/#{current_user.id}"
    else
      "/students/#{current_user.id}"
    end
  end

  def after_sign_out_path_for(resource)
    root_path
  end

end
