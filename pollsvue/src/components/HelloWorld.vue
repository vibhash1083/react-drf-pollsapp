<template>
    <div class="hello">
        <h1 class="title">Polls App</h1>
        <!-- Page title -->
        <hr>

        <div class="columns">
            <div class="column is-half">
                <h2 class="subtitle">Questions</h2>

                <div class="polls">
                    <div class="card" v-for="question in questions" :key="question.id">
                        <!-- Loop through the questions array -->
                        <div class="card-content">
                            <div class="content">
                                {{ question.question_text }}
                                <!-- Print the question text here -->
                            </div>
                        </div>

                        <footer class="card-footer">
                            <a class="card-footer-item"></a>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      questions: [] // Array for holding the questions
    }
  },
  mounted () { // This will be called when HelloWorld is loaded
    this.getQuestions() // Call our getQuestions function below
  },
  methods: {
    getQuestions () {
      axios({
        method: 'get',
        url: 'http://localhost:8000/api/questions/'
      }).then(response => this.questions = response.data)
    }
  }
}
</script>

<style scoped>
.select, select { /* 100% width for the select */
  width: 100%;
}

.card { /* Adding some air under the questions */
  margin-bottom: 25px;
}
</style>
