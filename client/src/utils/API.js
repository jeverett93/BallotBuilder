// Setting up Google Civics API with query url, API key, and export to be used in other parts of application
import axios from "axios";

export default {
  getSenate: function() {
    return axios.get("/api/senate")
  },
  getPresident: function() {
    return axios.get("/api/president")
  },
  getHouse: function() {
    return axios.get("/api/house")
  },
  saveCandidate: function (data) {
    return axios.post("/api/saved", data)
  },
  getSaved: function () {
    return axios.get('/api/saved')
  },
  deleteCandidate: function (id) {
    return axios.delete('/api/saved/' + id)
  },
  getDistrict: function(zip) {
    return axios.get("/api/district/" + zip)
  },
  getHouseCandidates: function(distId) {
    return axios.get("/api/candidate/" + distId)
  },
  savePlan: function (plan) {
    return axios.post("/api/plan", plan)
  }
  // getValues: function(candId) {
  //   return axios.get("/api/values/" + candId)
  // },
};