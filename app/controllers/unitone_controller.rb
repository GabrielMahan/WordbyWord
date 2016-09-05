class UnitoneController < ApplicationController
  def one
  end

  def two
  end

  def three
  end

  def four
  end

  def five
  end

  def attempts
    if current_user
      binding.pry
      params.permit(:subjects, :verbs, :objects).each do |key, value|

        Attempt.create(
          prompt_type: 'UnitOneSentence',
          prompt_id: value[:prompt_id],
          correct?: value[:correct],
          scholar_id: current_user.id,
          scholar_type: current_user.type
        )
      end
    end
  end

  def unitonesentence
    sentence = Unit.first.lessons.find(3).sentences.sample
    prompts = sentence.unit_one_prompts


    if prompts.find_by(answer_type: 'S')
      subject_prompt =  prompts.find_by(answer_type: 'S')
      subjects = subject_prompt.answer.scan(/\w+/)
      subject_prompt_id = subject_prompt.id
    else
      subjects = []
      subject_prompt_id = 0
    end

    if prompts.find_by(answer_type: 'V')
      verb_prompt = prompts.find_by(answer_type: 'V')
      verbs = verb_prompt.answer.scan(/\w+/)
      verb_prompt_id = verb_prompt.id
    else
      verbs = []
      verb_prompt_id = 0
    end

    if prompts.find_by(answer_type: 'O')
      object_prompt = prompts.find_by(answer_type: 'O')
      objects = object_prompt.answer.scan(/\w+/)
      object_prompt_id = object_prompt.id
    else
      objects = []
      object_prompt_id = 0
    end



    # binding.pry
    return render json: {
      sentence: sentence.content.split,
      subjects: subjects,
      verbs: verbs,
      objects: objects,
      verb_prompt_id: verb_prompt_id,
      subject_prompt_id: subject_prompt_id,
      object_prompt_id: object_prompt_id
    }
  end

end
