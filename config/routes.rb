
Rails.application.routes.draw do

  root to: 'application#index'
  get 'practice/show'

  devise_for :users, controllers: { registrations: 'users/registrations'}

  resources :cohorts
  resources :assignments


  #DASHBOARD ROUTES
  get 'students/:id/info', to: 'students#info'
  get 'students/:id/completed_assignments', to: 'students#completed_assignments'
  get 'students/:id/past_due_assignments', to: 'students#past_due_assignments'
  get 'students/:id/pending_assignments', to: 'students#pending_assignments'
  get 'students/:id/attempted_lessons', to: 'students#attempted_lessons'
  get 'students/:id/mastered_lessons', to: 'students#mastered_lessons'
  post 'students/:id/cohorts', to: 'students#assign_cohort'
  get 'students/:id', to: 'students#show'
  get 'teachers/:id/info', to: 'teachers#info'
  get 'teachers/:id', to: 'teachers#show'
  post 'teachers/:id/cohorts', to: 'teachers#assign_cohort'
  get 'teachers/:id/cohorts', to: 'teachers#cohorts'
  get 'practice/units/:unit_id/lessons/:lesson_id', to: 'practice#show'
  get 'cohorts/:id/cohort_info', to: 'cohorts#cohort_info'
  get 'cohorts/:id/students_info', to: 'cohorts#students_info'
  get 'cohorts/:id/assignments_info', to: 'cohorts#assignments_info'
  get 'lessons', to: 'lessons#show'
  get 'dashboard', to: 'application#dashboard'



  get '/units/:unit_id/lessons/:lesson_id', to: "units#lesson_show"

  get '/:lesson_id/UnitOneSentence', to: 'unitone#unitonesentence'
  post '/UnitOne/Attempts', to: 'unitone#attempts'

  get 'units/unit_list', to: 'units#unit_list'

  get '/units/:unit_id/lessons/:lesson_id/attempts/streak', to: 'attempts#streak'

end
