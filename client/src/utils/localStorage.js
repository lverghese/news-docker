//get planId from user object in session
export const getSavedCircuitId = () => {
    const savedCircuitId= localStorage.getItem('saved_circuits')
      ? JSON.parse(localStorage.getItem('saved_circuits'))
      : [];
    return savedCircuitId;
  };
  
  //save exercises via planId from session?
  export const saveCircuitId = (circuitArr) => {
    if (circuitArr.length) {
      localStorage.setItem('saved_circuits', JSON.stringify(circuitArr));
    } else {
      localStorage.removeItem('saved_circuits');
    }
  };

  export const removeCircuit = (circuitId) => {
    const savedCircuits = localStorage.getItem('saved_circuits')
    ? JSON.parse(localStorage.getItem('saved_circuits'))
    :null;
    if(!savedCircuits){
      return false;
    };

    const updatedSavedCircuits = saveCircuitId?.filter((savedCircuitId) => savedCircuits != circuitId)
    localStorage.setItem('saved_circuits', JSON.stringify(updatedSavedCircuits));
    return true;
  };