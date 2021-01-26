const eventBus = {

  //Hakee eventin
  on (event, callback) {
    document.addEventListener(event, (e) => callback(e.detail));
  },

  //Luo eventin
  dispatch (event, data) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },

  //Poistaa eventin
  remove (event, callback) {
    document.removeEventListener(event, callback);
  },
};
  
export default eventBus;