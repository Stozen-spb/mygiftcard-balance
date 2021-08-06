<template>
	<div class="row align-items-center justify-content-center">
		 			 <form class="col-8">
                        <div class="card border-primary rounded-0">
                            <div class="card-header p-0">
                                <div class="bg-info text-white text-center py-2">
                                    <h3>
                                     MYGIFTCARD BALANCE
                                    </h3>
                                </div>


                            </div>
                            <div class="card-body p-3">

                                <!--Body-->
                                <div class="form-group">
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text"><i class="fa fa-phone text-info" aria-hidden="true"></i></div>
                                        </div>
                                        <input 
                                        	type="text"
                                        	v-model='userPhone' 
                                        	class="form-control" 
                                        	id="userPhone" 
                                        	name="userPhone" 
                                        	placeholder="В формате +79455551125" 
                                        	required
                                        >
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text"><i class="fa fa-envelope text-info"></i></div>
                                        </div>
                                        <input type="text" class="form-control" id="accessCode" name="accessCode" placeholder="Код из SMS">
                                    </div>
                                </div>

                                <div class="text-center">
                                    <button 
	                                    id="get-access-code"
	                                    class="btn btn-info btn-block rounded-0 py-2"
                                    >
                                    Получить код
                               		 </button>
                                </div>
                                <div class="text-center">
                                    <input 
                                    	@click="login"
	                                    id="login"
	                                    type="submit" 
	                                    value="Войти" 
	                                    class="btn btn-info btn-block rounded-0 py-2"
                                    >
                                </div>
                            </div>
                            <div class="text-center register">
                            	 Нет аккаунта?
						        <router-link to="/register">Зарегистрироваться</router-link>
                            </div>

                        </div>
                    </form>
	</div>
</template>



<script>
	import firebase from 'firebase';
	export default {
		data(){
			return {
				userPhone:'+79999999999'
			}
		},
		methods: {
			sendSMS() {
				const self = this;
				const phoneNumber = this.userPhone
				const appVerifier = window.recaptchaVerifier;
				firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
			    .then((confirmationResult) => {
			      // SMS sent. Prompt user to type the code from the message, then sign the
			      // user in with confirmationResult.confirm(code).
			      self.confirmationResult = confirmationResult;
			      // ...
			    }).catch((error) => {
			      // Error; SMS not sent
			      // ...
			    });

			},
			login(e) {
				e.preventDefault()
				const self = this
				const code = '999999'
				this.confirmationResult.confirm(code).then((result) => {
				  // User signed in successfully.
				  const user = result.user;
				  self.$store.commit('userLogin',user)
				  // ...
				}).catch((error) => {
				  // User couldn't sign in (bad verification code?)
				  // ...
				});
			}

		},
		computed: {

		},
		mounted() {
			const self = this;
		    // Start Firebase invisible reCAPTCHA verifier
		    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('get-access-code', {
		      'size': 'invisible',
		      'callback': (response) => {
		        // reCAPTCHA solved, allow signInWithPhoneNumber.
		        self.sendSMS();
		      }
		    });
		    window.recaptchaVerifier.render().then((widgetId) => {
			    window.recaptchaWidgetId = widgetId;
			    const recaptchaResponse = grecaptcha.getResponse(recaptchaWidgetId);
			    console.log(recaptchaResponse)
			  });	    
		}
	}
</script>

<style scoped>
	.register {
		padding-bottom: 15px;
	}
</style>

getAccessCode