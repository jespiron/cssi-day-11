window.onload = () => {
    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            console.log("logged in as", user.displayName);
            googleUser = user;
        } else {
            console.log("not logged in");
        }
    });

    const createNoteButton = document.querySelector("#createNoteButton");
    createNoteButton.addEventListener("click", () => {
        // get values from the form
        const noteTitle = document.querySelector("#noteTitle").value;
        const noteText = document.querySelector("#noteText").value;
        console.log(noteTitle, noteText);

        // write to database
        firebase.database().ref(`/users/${googleUser.uid}`).push({
            title: noteTitle,
            text: noteText
        }).catch(error => {
            console.log("error writing new note", error);
        })
    });
}