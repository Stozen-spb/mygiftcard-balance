// import firebase from "firebase";
// firebase.auth().useDeviceLanguage();
// window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
//   'size': 'invisible',
//   'callback': (response) => {
//     // reCAPTCHA solved, allow signInWithPhoneNumber.
//     onSignInSubmit();
//   }
// });
export default {
	actions:{
		async login({dispatch,commit},{phone,code}){
			try {
				auth.signIn
			} catch(e) {

			}
		}
	}
}