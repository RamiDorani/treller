import httpService from './httpService';


export const todoService = {
    query,
    getById,
    remove,
    save
  }
  
  function query(filterBy = {}) {
    let queryStr = '?';
    for (const key in filterBy) {
      queryStr += `${key}=${filterBy[key]}&`;
    }
    return httpService.get(`todo${queryStr || ''}`);
  }
  
  // function query() {
  //   return httpService.get(`todo`);
  // }
  
  function getById(todoId) {
    return httpService.get(`todo/${todoId}`)
  }
  
  function remove(todoId) {
    return httpService.delete(`todo/${todoId}`)
  }
  
  async function save(todo) {
    if (todo._id) {
      return httpService.put(`todo/${todo._id}`, todo)
    } else {
      return httpService.post(`todo`, todo);
    }
  }