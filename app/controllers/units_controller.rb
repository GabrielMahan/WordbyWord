class UnitsController < ApplicationController
  def unit_list
    units = Unit.all.map do |unit|
      {
        name: unit.name,
        lessons: unit.lessons
      }
    end

    units_hash = {
      units: units
    }

    render json: units_hash.to_json
  end

  def lesson_show
    @lesson_id = params[:lesson_id]
    @user_signed_in = user_signed_in?

    render :"unitone/show"
  end
end
