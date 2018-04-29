var config = {
    apiKey: "AIzaSyCxFuMNH24QMvjv-MQlXD6-XxuJ91rdcGM",
    authDomain: "reservation-list-63c5e.firebaseapp.com",
    databaseURL: "https://reservation-list-63c5e.firebaseio.com",
    projectId: "reservation-list-63c5e",
    storageBucket: "reservation-list-63c5e.appspot.com",
    messagingSenderId: "87136497350"
};

  //Initialize firebase (database)
  firebase.initializeApp(config);
  
  //Initialize firestore (Database methods)
  let db = firebase.firestore();

  //Collection destination
  const fireRefToCollection = db.collection('reservation');


