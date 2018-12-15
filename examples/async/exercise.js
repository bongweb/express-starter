
// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });

// async await
async function asyncExercise() {
    try {
        let {email, isGold} = await getCustomer (1);
        if (!isGold) return;
        let topMovies = await getTopMovies();
        console.log(topMovies);
        let emailResponse =  await sendEmail(email,topMovies);
        console.log(emailResponse);
    } catch (err) {
        console.log('error', err.message);
    }
   
  }
  
  asyncExercise();
  
//  promise based  getCustomer
function getCustomer(id) {
    return new Promise ((resolve) => {
        setTimeout(() => {
            resolve({ 
                id, 
                name: 'Tejomay Saha', 
                isGold: true, 
                email: 'email' 
                })
            }, 1000);  
    }); 
}

// async based getCustomer

  
function getTopMovies() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['X-Man', 'Spiderman']);
            reject(new Error('could not find any movies'));
        }, 2000);
    })
}
  
  function sendEmail(email, movies) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('email is sent');
        }, 2000);
    })
 
  }