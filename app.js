// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBRZKpF8EnloOt1sjJCO12DPyPAHjM-zy8",
    authDomain: "fullstack-app-with-firebase.firebaseapp.com",
    databaseURL: "https://fullstack-app-with-firebase.firebaseio.com",
    projectId: "fullstack-app-with-firebase",
    storageBucket: "fullstack-app-with-firebase.appspot.com",
    messagingSenderId: "322443956075",
    appId: "1:322443956075:web:43174c831418fe1526862e"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference Cloud Firestore
var db = firebase.firestore();

// Get the name for the user
if (!localStorage.getItem('name')) {
	name = prompt('What is your name?')
	localStorage.setItem('name', name)
} else {
	name = localStorage.getItem('name')
}
document.querySelector('#name').innerText = name

// Change name
document.querySelector('#change-name').addEventListener('click', () => {
	name = prompt('What is your name?')
	document.querySelector('#name').innerText = name
})

// Send a new chat message
document.querySelector('#message-form').addEventListener('submit', e => {
	e.preventDefault();
	db.collection("messages")
	.add({
		name: name,
		message: document.querySelector('#message-input').value 
	})
	.then(function (docRef) {
		console.log("Document written with ID: ", docRef.id);
		document.querySelector('#message-form').reset()
	})
	.catch(function (error) {
		console.error("Error adding document: ", error);
	});
})

// Display chat stream
db.collection("messages")
.onSnapshot(function(snapshot) {
	document.querySelector('#messages').innerHTML = ""
	snapshot.forEach(function(doc) {console.log(doc);
		var message = document.createElement('div')
		message.innerHTML = `
		<p class="name">${doc.data().name}</p>
		<p>${doc.data().message}</p>
		`
		document.querySelector('#messages').prepend(message)
	});
});