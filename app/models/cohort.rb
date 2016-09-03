class Cohort < ApplicationRecord
  has_many :cohort_students
  has_many :cohort_teachers
  has_many :students, through: :cohort_students
  has_many :teachers, through: :cohort_teachers
  has_many :assignments

  validates :name, presence: true, length: { maximum: 75 }
  validates :access_code, presence: true, length: { maximum: 50 }
end
