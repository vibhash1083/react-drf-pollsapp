import * as types from '../constants/ActionTypes';
import { BASE_URL } from '../constants/global';

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();

      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export function getQues() {
  return fetch(`${BASE_URL}questions/`, {
    credentials: 'same-origin'
  }).then(response => response.json()).then(json => ({
    type: types.GET_QUES,
    ques: json
  }));
}


export function addQues(question_text) {
      const newQues = {
        question_text: question_text,
        pub_date: '',
        created_date: ''
      };

      return fetch(`${BASE_URL}questions/`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken')
        },
        credentials: 'same-origin',
        body: JSON.stringify(newQues)
      }).then(response => response.json()).then(json => ({
        type: types.ADD_QUES,
        que: json
      }));
}

export function deleteQues(id) {
  console.log('delete',id);
  return fetch(`${BASE_URL}questions/`+`${id}`, {
    method: 'delete',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': getCookie('csrftoken')
    },
    credentials: 'same-origin'
  }).then(json => ({
    type: types.DELETE_QUES,
    id: id
  }));
}

export function editQues(editedQues) {
  console.log('editedQues',editedQues)

  return fetch(`${BASE_URL}questions/`+`${editedQues.id}`, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': getCookie('csrftoken')
    },
    credentials: 'same-origin',
    body: JSON.stringify(editedQues)
  }).then(response => response.json()).then(json => ({
    type: types.EDIT_QUES,
    que: json
  }));
}

export function getChoices() {

  return fetch(`${BASE_URL}choices/`, {
    credentials: 'same-origin'
  }).then(response => response.json()).then(json => ({
    type: types.GET_CHOICES,
    choices: json
  }));
}

export function addChoice(question, choice_text) {
      const newChoice = {
        question: question,
        choice_text: choice_text,
        votes: 0
      };

      return fetch(`${BASE_URL}choices/`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken')
        },
        credentials: 'same-origin',
        body: JSON.stringify(newChoice)
      }).then(response => response.json()).then(json => ({
        type: types.ADD_CHOICE,
        choice: json
      }));
}

export function editChoice(editedChoice) {

  return fetch(`${BASE_URL}choices/`+`${editedChoice.id}`, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': getCookie('csrftoken')
    },
    credentials: 'same-origin',
    body: JSON.stringify(editedChoice)
  }).then(response => response.json()).then(json => ({
    type: types.EDIT_CHOICE,
    choice: json
  }));
}
