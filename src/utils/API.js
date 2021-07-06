import axios from "axios";

export default {
  // API request to server side
  register(data) {
    return axios.post("/auth/register", data);
  },
  registerExec(data) {
    return axios.post("/auth/registerexec", data);
  },
  create(data) {
    return axios.post("/auth/create", data);
  },
  login(data) {
    return axios.post("/auth/login", data);
  },
  loginExec(data) {
    return axios.post("/auth/loginexec", data);
  },
  loadUser(headers) {
    return axios.get("/auth/user", headers);
  },
  loadExec(headers) {
    return axios.get("/auth/exec", headers);
  },
  getMembers(token) {
    return axios.get("/api/getmembers", token);
  },
  searchMembers(query) {
    return axios.get(`/api/searchmembers/${query}`);
  },
  loadMember(id, token) {
    return axios.get(`/api/loadmember/${id}`, token);
  },
  editMember(member, id, token) {
    return axios.put(`/api/edit/member/${id}`, member, token);
  },
  loadMemberNotes(query, token) {
    const { id, userID } = query;
    return axios.get(`/api/loadmembernotes/${id}/${userID}`, token);
  },
  makeNewNote(note, token) {
    return axios.post("/api/newnote", note, token);
  },
  loadAllNotes(token) {
    return axios.get("/api/loadallnotes", token);
  },
  newUser(password_token) {
    return axios.get(`/auth/newuser/${password_token}`);
  },
  activateExec(password_token) {
    return axios.get(`/auth/activateexec/${password_token}`);
  },
  updatePassword(data) {
    return axios.post("/auth/updatepassword", data);
  },
  updateExecPassword(data) {
    return axios.post("/auth/updateexecpassword", data);
  },
  newestUsers(token) {
    return axios.get("/api/loadnewusers", token);
  },
  forgotPassword(data) {
    return axios.post("/auth/forgotpassword", data);
  },
  resetPassword(data) {
    return axios.post("/auth/resetpassword", data);
  },
  loadAllRequests(token) {
    return axios.get("/api/loadallrequests", token);
  },
  loadAllCategory(query, token) {
    return axios.get(`/api/loadallcategory/${query}`, token);
  },
  //END OF REQUESTS WORK
  loadNewRequests(token) {
    return axios.get("/api/loadnewrequests", token);
  },
  loadNewConcierge(token) {
    return axios.get("/api/loadnewconcierge", token);
  },
  loadMemberRequests(id, token) {
    return axios.get(`/api/loadmemberrequests/${id}`, token);
  },
  createNewRequest(data, token) {
    return axios.post("/api/newrequest", data, token);
  },
  deleteNote(id, token) {
    return axios.delete(`/api/deletenote/${id}`, token);
  },
  updateRequest(id, status, token) {
    return axios.put(`/api/updaterequest/${id}`, status, token);
  },
  // loadAllEvents(token) {
  //   return axios.get(`/api/loadallevents/`, token);
  // },
  attendee(data) {
    return axios.post(`/api/attendees/`, data);
  },
  createNewEvent(data, token) {
    return axios.post(`/api/newevent/`, data, token);
  },
  deleteEvent(id, token) {
    return axios.delete(`/api/deleteevent/${id}`, token);
  },
  loadSingleEvent(id) {
    return axios.get(`/api/loadsingleevent/${id}`);
  },

  uploadImages(picture, id) {
    return axios.post(`/api/uploadimages/${id}`, picture);
  },
  newCatalogItem(data, token) {
    return axios.post("/api/additem", data);
  },
  loadCatalog(token) {
    return axios.get("/api/loadcatalog", token);
  },
  loadCatalogItem(id, token) {
    return axios.get(`/api/loadcatalogitem/${id}`, token);
  },
  deleteCatalogItem(id, token) {
    return axios.delete(`/api/deleteitem/${id}`, token);
  },
  newRequestNote(note, token) {
    return axios.put("/api/requestnote/", note, token);
  },
  loadAllCompleted(token) {
    return axios.get("/api/loadallcompleted", token);
  },
};
