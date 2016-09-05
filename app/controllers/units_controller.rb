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
end
