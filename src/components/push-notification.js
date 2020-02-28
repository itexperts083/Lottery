import firebase from 'firebase';


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCog1bydLc-M0qV4TknyPDwrht-VyfwUEg",
    authDomain: "lottery-50a0a.firebaseapp.com",
    databaseURL: "https://lottery-50a0a.firebaseio.com",
    projectId: "lottery-50a0a",
    storageBucket: "lottery-50a0a.appspot.com",
    messagingSenderId: "555256544306",
    appId: "1:555256544306:web:6e13287e1f93160d97102b",
    measurementId: "G-40NRGRW0RN"
};


export const initializeFirebase = () => {
    firebase.initializeApp(firebaseConfig);

    navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((registration) => {
            firebase.messaging().useServiceWorker(registration);
        });
}

export const askForPermissioToReceiveNotifications = async () => {
    try {
        const messaging = firebase.messaging();
        await messaging.requestPermission();
        const token = await messaging.getToken();
        console.log('Token:', token);


        //Send token to server....
        //

        // create a new XMLHttpRequest
        var xhr = new XMLHttpRequest()

        // get a callback when the server responds
        xhr.addEventListener('load', () => {
            // update the state of the component with the result here
            console.log(xhr.responseText)



        })
        // open the request with the verb and the url
        xhr.open('POST', 'https://push.quinielashoy.com/subscribe')
        // xhr.open('POST', 'http://0.0.0.0:28100/subscribe')
        let state = JSON.parse(localStorage.getItem("reminder_state"))

        let categories = ""


        if (state["Quiniela"])
        {
         categories += "0"
        }

        if (state["Quiniela Primera"])
        {
         categories += "1"
        }

        if (state["Quiniela Matutina"])
        {
         categories += "2"
        }

        if (state["Quiniela Vespertina"])
        {
         categories += "3"
        }

        if (state["Quiniela Nocturna"])
        {
         categories += "4"
        }



        // send the request
        xhr.send(JSON.stringify({ 	"token" : token,
            "categories" : categories,
            "data" : JSON.parse(localStorage.getItem("reminder_state"))
        }))


        return token;
    } catch (error) {
        console.error(error);
    }
}

