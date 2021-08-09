<template>
	<div class="row align-items-center justify-content-center register">
		 			 <form class="col col-lg-6 col-xl-4">
                        <div class="card border-primary rounded-0">
                            <div class="card-header p-0">
                                <div class="bg-info text-white text-center py-2">
                                    <h3>
                                     РЕГИСТРАЦИЯ
                                    </h3>
                                </div>


                            </div>
                            <div class="card-body p-3">

                                <!--Body-->
                                <div class="form-group">
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text"><i class="fa fa-address-book text-info" aria-hidden="true"></i></div>
                                        </div>
                                        <input 
                                            type="text" 
                                            v-model='userName'
                                            class="form-control" 
                                            id="userName" 
                                            name="userName" 
                                            placeholder="Ваше имя" 
                                            required
                                        >
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text"><i class="fa fa-phone text-info" aria-hidden="true"></i></div>
                                        </div>
                                        <input 
                                        	type="text"
                                            v-model="userPhone" 
											@input='inputUserPhone'
											@change='changeUserPhone'
                                        	class="form-control" 
                                        	id="userPhone" 
                                        	name="userPhone" 
                                        	placeholder="В формате +79455551125" 
                                        	required
											:class="userPhoneClass"
											:disabled='codeSent'
                                        >
                                    </div>
                                </div>
                                <div v-if='codeSent' class="form-group">
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text"><i class="fa fa-envelope text-info"></i></div>
                                        </div>
                                        <input type="text" class="form-control" id="smsCode" name="accessCode" placeholder="Код из SMS" v-model="smsCode">
                                    </div>
                                </div>
								<div id="capcha"></div>		
                                <div v-if='(!allowRegistration || allowRegistration == "allow") && !codeSent '  class="text-center">
                                    <input 
	                                    id="get-access-code-for-register"
										@click='sendSMS'
	                                    type="submit" 
	                                    value="Получить код" 
	                                    class="btn btn-info btn-block rounded-0 py-2"
										:disabled="!userPhoneValid || codeSent"
                                    >
                                </div>
								<div v-if="allowRegistration =='disallow'">
									<span class="text-danger">Пользователь с таким номером телефона уже зарегестрирован</span>
								</div>
								<div v-if="showWrongCodeAlert">
									<span class="text-danger">Неверный код!!!</span>
								</div>
                                <div v-if='allowRegistration == "allow" && codeSent' class="text-center">
                                    <input 
	                                    id="register"
	                                    type="submit" 
                                        @click="register"
	                                    value="Зарегистрироваться" 
	                                    class="btn btn-info btn-block rounded-0 py-2"
										:disabled="!smsCode"
                                    >
                                </div>
                            </div>

                        </div>
                    </form>
	</div>
</template>



<script>
    import firebase from 'firebase'
	export default {
		data(){
			return {
				userPhone: '',
                userName: '',
				userPhoneValid: '',
				codeSent: false,
				smsCode: null,
				showWrongCodeAlert: false,
			}
		},
		methods: {
			inputUserPhone(e) {
				if ( /^\+7\d{10}$/.test(this.userPhone) ) {
					this.userPhoneValid = true
					const event = new Event('change');
					e.target.dispatchEvent(event);
				} else {
					this.userPhoneValid = false
				}
			},
			changeUserPhone() {
				if (this.userPhoneValid == true) {
					this.$store.dispatch('checkUserForRegistration',this.userPhone)
				}
			},
            sendSMS(e) {
				e.preventDefault()
				if (!this.userPhoneValid || !this.allowRegistration ) {
					console.log('Не дождались проверки пользователя на сущестование или неверный телефон')
					return false
				}
				const self = this;
				const phoneNumber = this.userPhone
				const appVerifier = window.recaptchaVerifier;
				firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
			    .then((confirmationResult) => {
			      // SMS sent. Prompt user to type the code from the message, then sign the
			      // user in with confirmationResult.confirm(code).
				  console.log('sms sent')
			      self.confirmationResult = confirmationResult;
				  self.codeSent = true
			      // ...
			    }).catch((error) => {
			      // Error; SMS not sent
			      alert(`ошибка sms не отправлен ${error.message}`)
			    });

			},
			register(e) {
				e.preventDefault()
				const self = this
				const code = this.smsCode;
				this.confirmationResult.confirm(code).then((result) => {
				  // User signed in successfully.
				  const user = result.user;
                  user.userName = self.userName
				  self.$store.dispatch('userRegister',user)
				  // ...
				}).catch((error) => {
				  // User couldn't sign in (bad verification code?)
				  // ...
				  self.showWrongCodeAlert = true
				});
			}
		},
		computed: {
			userPhoneClass() {
				if (this.userPhoneValid === true) {
					return 'is-valid'
				}
				if (this.userPhoneValid === false) {
					return 'is-invalid'
				}
				return ''  
			},
			allowRegistration() {
				return this.$store.getters.allowRegistration
			}
		},
        mounted() {
            const self = this;
		    // Start Firebase invisible reCAPTCHA verifier
		    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('capcha', {
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
		margin-top: 20%;
	}
</style>