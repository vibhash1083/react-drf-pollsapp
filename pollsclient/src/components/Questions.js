import React, { Component } from 'react';
import {Link} from 'react-router';

export default class Questions extends Component {

	constructor(props) 
	{
        super(props);
        this.state = { editView: false };
    }

	handleDelete(e)
	{
	    e.preventDefault();
    	const id = this.props.question.id;
	    this.props.actions.deleteQues(id);
  	}

  	toggleEdit() 
  	{
        this.state.editView ? this.setState({editView: false}) : this.setState({editView: true});
    }

  	handleChange(key, e) 
  	{
        let newState = {};
        newState[key] = e.target.value;
        this.setState(newState);
    }

    submitEditHandler(e) 
    {
        e.preventDefault();
        console.log('Props', this.props);

        this.props.actions.editQues({
            question_text: this.state.question,
            id : this.props.question.id });

        this.setState({editView: false});
    }

    render() {
    const { question, i } = this.props;
    return (
            	<div className='QuestionSection'>
            	<table>
            	<tbody>
            		<tr>
	            		<td width="250">
		            		{i+1} <Link to={`/question/${question.id}`}>{question.question_text}</Link>
		            	</td>

		            	<td width="20">
			                <button className="destroy" onClick={this.handleDelete.bind(this)}>
		                   		&times;
		                	</button>
		                </td>

		                <td width="200">
		                	<button className="btn btn-default" onClick={this.toggleEdit.bind(this)}>
		                    	Edit
		                	</button>
		                </td>
	                </tr>
	            </tbody>
	            </table>

                {this.state.editView &&
                <form onSubmit={this.submitEditHandler.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="questionTitle"><b>Question:</b> </label>
                        <input
                            onChange={this.handleChange.bind(this, 'question')}
                            name="question"
                            type="text"
                            className="form-control"
                            placeholder={question.question_text}
                        />
                    </div>
                  	<br/>
                    <button type="submit" className="btn btn-primary">Submit Edits</button>
                </form>}

              	</div>
            );
    }
}