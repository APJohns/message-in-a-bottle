import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyABsuBL5CTelfpCxfKhqGyisW1mqzfSoR0",
	authDomain: "message-in-a-bottle-aj.firebaseapp.com",
	databaseURL: "https://message-in-a-bottle-aj.firebaseio.com"
});

const base = Rebase.createClass(firebase.database());

export { firebaseApp };
export default base;
