<template>
	<div class="row align-items-center justify-content-center">
		 			 <form class="col-8">
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
                                            class="form-control" 
                                            id="userName" 
                                            name="userPhone" 
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
                                    <input 
	                                    id="getAccessCodeForRegister"
	                                    type="submit" 
	                                    value="Получить код" 
	                                    class="btn btn-info btn-block rounded-0 py-2"
                                    >
                                </div>
                                <div class="text-center">
                                    <input 
	                                    id="register"
	                                    type="submit" 
	                                    value="Зарегистрироваться" 
	                                    class="btn btn-info btn-block rounded-0 py-2"
                                    >
                                </div>
                            </div>

                        </div>
                    </form>
	</div>
</template>



<script>
	export default {
		data(){
			return {
				some:1
			}
		},
		methods: {

		},
		computed: {

		}
	}
</script>

<style scoped>
</style>