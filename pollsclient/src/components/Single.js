import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as QuesActions from '../actions/QuesActions';

class Single extends Component {

    constructor(props)
    {
        super(props);
        this.state = {selectedOption:0, formsubmit: false};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event)
    {
        this.setState({selectedOption: event.target.value, formsubmit: false});    
    }

    handleSubmit(event) 
    {
        event.preventDefault();
        const c_index = this.props.choices.findIndex(x => x.id===parseInt(this.state.selectedOption));
        const choice_obj = this.props.choices[c_index];

        this.props.actions.editChoice({
                question: choice_obj.question,
                choice_text: choice_obj.choice_text,
                id : choice_obj.id,
                votes: choice_obj.votes+1,
            })

        this.getUpdate();
        this.setState({selectedOption: 0, formsubmit: true});
    }

    getUpdate(){
        this.props.actions.getChoices();
    }

    render() {

        const { questions,choices } = this.props;
        const {id} = this.props.params;

        const i = questions.findIndex(x => x.id === id);
        const question_obj = questions[i];

        const question_choice = choices.filter((option) => option.question === question_obj.id);

        let single_content = null;

        if(question_choice == null)
        {
            single_content = <div>No choices found</div>
        }
        
        if(!this.state.formsubmit)
        {
            single_content = <div className="ChoicesListSection">
                                  <h2>Poll Your Choice</h2>
                                    <ul><p>{question_obj.id}. {question_obj.question_text}</p></ul>

                                    <form onSubmit={this.handleSubmit.bind(this)}>
                                        {question_choice.map((option, i) =>
                                            <ul>
                                            <label>
                                                <input type='radio' key={i} name='{option.id}'
                                                value={option.id} onChange={this.handleChange.bind(this)}/>
                                                {option.choice_text  } <br/>
                                            </label>
                                            </ul>
                                        )}
                                        <ul><input type='submit' value='Submit'/></ul>
                                    </form>
                            </div>
        }
        else
        {
            single_content = <div className="VotesSummarySection">
                                  <h2>Votes Summary</h2>
                                    <ul><p>{question_obj.id}. {question_obj.question_text}</p></ul>
                                    <div>
                                    {question_choice.map((option,i) =>
                                        <ul><label>
                                        {option.choice_text  } Votes : {option.votes}<br/>
                                        </label></ul>
                                        )}
                                    </div>
                                    <h3>Thank You</h3>
                                <Link to={"/"}>Go Back to the list of questions</Link>

                            </div>
        }

        return (
                <div>
                    {single_content}
                </div>
                );
    }
}

function mapState(state) 
{
  return {
        questions: state.ques,
        choices: state.choices
  };
}

function mapDispatch(dispatch) 
{
  return {
    actions: bindActionCreators(QuesActions, dispatch)
  };
}

export default connect(mapState, mapDispatch)(Single);
