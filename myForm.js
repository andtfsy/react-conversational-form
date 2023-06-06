import React from 'react';
import { ConversationalForm } from 'conversational-form';

export default class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.formFields = [
      {
        'tag': 'input',
        'type': 'radio',
        'name': 'brushingFrequency',
        'cf-questions': 'How often do you brush your teeth?',
        'cf-label': 'Less than once a day',
        'value': 'less_than_once',
      },
      {
        'tag': 'input',
        'type': 'radio',
        'name': 'brushingFrequency',
        'cf-label': 'Once a day',
        'value': 'once',
      },
      {
        'tag': 'input',
        'type': 'radio',
        'name': 'brushingFrequency',
        'cf-label': 'Twice a day',
        'value': 'twice',
      },
      {
        'tag': 'input',
        'type': 'radio',
        'name': 'brushingFrequency',
        'cf-label': 'More than twice a day',
        'value': 'more_than_twice',
      },
      {
        'tag': 'input',
        'type': 'radio',
        'name': 'sugarConsumption',
        'cf-questions': 'How would you describe your sugar consumption?',
        'cf-label': 'Low',
        'value': 'low',
      },
      {
        'tag': 'input',
        'type': 'radio',
        'name': 'sugarConsumption',
        'cf-label': 'Moderate',
        'value': 'moderate',
      },
      {
        'tag': 'input',
        'type': 'radio',
        'name': 'sugarConsumption',
        'cf-label': 'High',
        'value': 'high',
      },
      {
        'tag': 'input',
        'type': 'checkbox',
        'name': 'dentalIssues',
        'cf-questions': 'Do you have any specific dental issues or concerns?',
        'cf-label': 'Toothache',
        'value': 'toothache',
      },
      {
        'tag': 'input',
        'type': 'checkbox',
        'name': 'dentalIssues',
        'cf-label': 'Gum bleeding',
        'value': 'gum_bleeding',
      },
      {
        'tag': 'input',
        'type': 'checkbox',
        'name': 'dentalIssues',
        'cf-label': 'Tooth sensitivity',
        'value': 'tooth_sensitivity',
      },
    ];
    this.state = {
      isLoading: false,
    };

    this.submitCallback = this.submitCallback.bind(this);
  }

  componentDidMount() {
    this.cf = ConversationalForm.startTheConversation({
      options: {
        submitCallback: this.submitCallback,
        preventAutoFocus: true,
      },
      tags: this.formFields,
    });
    this.elem.appendChild(this.cf.el);
  }

  /*submitCallback() {
    const formDataSerialized = this.cf.getFormData(true);
   // this.cf.addRobotChatResponse('Here is your assessment:');
    this.cf.addRobotChatResponse('Here is your oral care plan:');
    const plan = this.displayRecommendations(formDataSerialized);
    this.props.onSubmit(plan);
  }*/
  submitCallback() {
    const formDataSerialized = this.cf.getFormData(true);
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.cf.addRobotChatResponse('Here is your oral care plan:');
      const plan = this.displayRecommendations(formDataSerialized);
      this.props.onSubmit(plan);
      this.setState({ isLoading: false });
    }, 3000); // Adjust the delay time (in milliseconds) as needed
  }

  

  displayRecommendations(formData) {
    const { brushingFrequency, sugarConsumption, dentalIssues } = formData;

    let recommendations = [];

    if (Array.isArray(brushingFrequency) && brushingFrequency.includes('less_than_once')) {
      recommendations.push('Increase brushing frequency to at least once a day.');
    } else if (Array.isArray(brushingFrequency) && brushingFrequency.includes('twice')) {
      recommendations.push('Continue brushing twice a day for good oral hygiene.');
    }
    

    if (Array.isArray(sugarConsumption) && sugarConsumption.includes('high')) {
      recommendations.push('Reduce sugar intake for better oral health.');
    }

    if (Array.isArray(dentalIssues) && dentalIssues.includes('toothache')) {
      recommendations.push('Consult a dentist to address toothache.');
    }
    let plan = '';

    recommendations.forEach((recommendation) => {
      plan += recommendation + '\n';
      this.cf.addRobotChatResponse(recommendation);
    });

    return plan;
  }

  render() {
    const { isLoading } = this.state;

    return (
      <div>
        {isLoading ? (
          <div>Generating Plan...</div>
        ) : (
          <div ref={(ref) => (this.elem = ref)} />
        )}
      </div>
    );
  }
}