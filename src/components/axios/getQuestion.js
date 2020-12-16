import * as axios from 'axios'


export const getQuestions = async () => {
  return axios.get(`https://opentdb.com/api.php?amount=10`)
                .then(response => {
                    return response.data.results;
                })
  
}