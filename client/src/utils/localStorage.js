//get planId from user object in session
export const getWorkoutsByPlanId = () => {
    const savedPlanId = localStorage.getItem('planId')
      ? JSON.parse(localStorage.getItem('planId'))
      : [];
    return savedPlanId;
  };
  
  //save exercises via planId from session?
  export const savePlanId = (exercises) => {
    if (exercises.length) {
      localStorage.setItem('saved_exercises', JSON.stringify(exercises));
    } else {
      localStorage.removeItem('saved_exercises');
    }
  };
  
//remove exercises?
  
//     const updatedSavedPlanId = savedplId?.filter((savedBookId) => savedBookId !== bookId);
//     localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));
  
//     return true;
//   };