<template>
  <div class="component-container">
    <button
      v-if="!formVisible"
      type="button"
      @click="formVisible = !formVisible"
      class="btn add-card"
    >
      Добавить карту
    </button>
    <div
      v-if="formVisible"
      class="row align-items-center justify-content-center"
    >
      <form class="col col-sm-10 col-md-10 col-lg-6 col-xl-4 animated fadeIn">
        <div class="card rounded-0">
          <div class="card-header p-0">
            <div class="bg-info text-white text-center py-2">
              <h3>
                <i class="fa fa-pencil"></i> Добавление карты
                <i @click="closeForm" class="fa fa-close"></i>
              </h3>
            </div>
          </div>
          <div class="card-body p-3">
            <!--Body-->
            <div class="form-group">
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <i
                      class="fa fa-credit-card text-info"
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
                <input
                  type="text"
                  v-model="cardNumber"
                  @input="checkSubmitBtn"
                  class="form-control"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="Последние 4 цифры"
                  maxlength="4"
                  required
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <i class="fa fa-list text-info"></i>
                  </div>
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="cardName"
                  name="cardName"
                  placeholder="Имя (необязательно)"
                  v-model="cardName"
                  @input="inputCardName"
                />
              </div>
            </div>

            <div class="text-center">
              <input
                id="submitBtn"
                @click="addCard"
                type="submit"
                :disabled="submitDisabled"
                value="Добавить"
                class="btn btn-info btn-block rounded-0 py-2"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formVisible: false,
      cardNumber: null,
      cardNumberInvalid: true,
      cardName: null
    };
  },
  computed: {
    submitDisabled() {
      if (!this.cardNumber || this.cardNumberInvalid) {
        return true;
      } else return false;
    }
  },
  methods: {
    checkSubmitBtn(e) {
      let value = e.target.value.replace(/[^0-9.]/g, "");
      if (/^\d{4}$/.test(value)) {
        this.cardNumberInvalid = false;
      } else {
        this.cardNumberInvalid = true;
      }
      this.cardNumber = value;
    },
    inputCardName(e) {
      let value = e.target.value.replace(/[^0-9A-Za-zА-Яа-я\s]/g, "");
      this.cardName = value;
    },
    closeForm() {
      this.formVisible = false;
    },
    addCard(e) {
      e.preventDefault();
      if (this.cardNumberInvalid) {
        console.log("invalid card number");
        return false;
      }
      const cardData = {
        cardNumber: this.cardNumber,
        cardName: this.cardName
      };
      this.$store.dispatch("addCard", cardData);
      this.formVisible = false;
      this.cardNumber = null;
      this.cardName = null;
    }
  }
};
</script>

<style scoped>
.fa-close {
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}
.add-card {
  margin-top: 0.5rem;
  background-color: #1b8;
  color: #fff;
}
.component-container {
  margin-top: 10px;
}
</style>
