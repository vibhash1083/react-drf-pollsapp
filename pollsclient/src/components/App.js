import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Questions from '../components/Questions';

import * as QuesActions from '../actions/QuesActions';

class App extends Component {

  componentDidMount()
  {
        this.props.actions.getQues();
        this.props.actions.getChoices();
  }

  constructor(props) 
  {
        super(props);
        this.state = { addQuesView: false, addChoiceView: false, selectedQuestion: -1};
  }

  toggleAddQues()
  {
        this.setState({addChoiceView: false});
        this.state.addQuesView ? this.setState({addQuesView: false}) : this.setState({addQuesView: true});     
  }

  toggleAddChoice() 
  {
        this.setState({addQuesView: false});
        this.state.addChoiceView ? this.setState({addChoiceView: false}) : this.setState({addChoiceView: true});     
  }

  handleQuesSelect(event)
  {
        this.setState({selectedQuestion: event.target.value});
  }

  handleQuesSubmit(e)
  {
        e.preventDefault();
        const question = this.refs.question_text.value;
        this.props.actions.addQues(question);

        this.state.addQuesView ? this.setState({addQuesView: false}) : this.setState({addQuesView: true});       
  } 

  handleChoiceSubmit(e)
  {
        e.preventDefault();

        const q_index = this.props.ques.findIndex(x => x.id===parseInt(this.state.selectedQuestion));
        const ques_obj = this.props.ques[q_index];

        const choice_text = this.refs.choice_text.value;

        this.props.actions.addChoice(ques_obj.id, choice_text);

        this.setState({addChoiceView: false});
        this.getUpdate();
  } 

  getUpdate()
  {
        this.props.actions.getQues();
        this.props.actions.getChoices();
  }

  render()
  {
    const { ques } = this.props;

    let ques_div = <p><b>No Questions Found</b></p>;

    if(this.props.ques.length > 0)
    {
      ques_div = <div>{this.props.ques.map((question, i) => <Questions {...this.props} key={i} i={i} question={question}/>)}</div>
    }

    return (
          <div>
            <div>
              
              <button className="btn btn-default" onClick={this.toggleAddQues.bind(this)}>
                Add a question
              </button>

              <button className="btn btn-default" onClick={this.toggleAddChoice.bind(this)}>
                Add a choice
              </button>

              <br />
              <br />
              <br />

              <div className = "addQuestions">
                {this.state.addQuesView &&
                  <form ref="questionForm" onSubmit={this.handleQuesSubmit.bind(this)}>
                      <div className="question-form-group">
                          <label htmlFor="questionTitle"><b>Question: </b> </label>
                          <input type="text" ref="question_text" placeholder="Question" /><br/>
                      </div>
                      <br />
                      <button type="submit" className="btn btn-primary">Submit</button>
                  </form>}
              </div>
            </div> 

            <div className = "addChoice">
                {this.state.addChoiceView &&
                  <form ref="choiceForm" onSubmit={this.handleChoiceSubmit.bind(this)} onfocus="this.selectedIndex = -1;">
                      <div className="choice-form-group">

                            <div className="dropdown">
                              <div id="myDropdown" className="dropdown-content">
                              <label htmlFor="QuestionOptions"><b>Question: </b> </label>                                
                                  <select name = "questions" onChange={this.handleQuesSelect.bind(this)} onfocus="this.selectedIndex = -1;">
                                    <option value="-1">Please Select</option>
                                    {ques.map((question, i) =>                                      
                                            <option key={i} name="{question.id}" value={question.id}>
                                              { question.question_text  } 
                                            </option>                                      
                                    )}
                                  </select>
                              </div>
                            </div>

                          <label htmlFor="choiceTitle"><b>Choice: </b> </label>
                          <input type="text" ref="choice_text" placeholder="Choice"/><br/>
                      </div>

                      <br />
                      <button type="submit" className="btn btn-primary">Submit</button>
                  </form>}
            </div>

            <h3>Questions List</h3>

            {ques_div}

          </div>
    );
  }
}

function mapState(state) 
{
  return {
    ques: state.ques,
  choices: state.choices
  };
}

function mapDispatch(dispatch) 
{
  return {
    actions: bindActionCreators(QuesActions, dispatch)
  };
}

export default connect(mapState, mapDispatch)(App);
