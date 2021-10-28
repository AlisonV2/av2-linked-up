<template>
  <div class="row">
    <app-title mode="title-img">Your profile</app-title>
    <div id="toast-success" :class="{ 'show' : showToast }">
      <div class="toast-img"><i class="bi bi-check-circle"></i></div>
      <div class="toast-msg">Update successful</div>
    </div>
    <div class="col-12 col-lg-4 mt-4">
      <img
        :src="
          previewImage
            ? previewImage
            : require('@/assets/img/default-placeholder.png')
        "
        width="250"
        height="250"
        @click="selectImage"
        class="img-fluid"
      />
      <div class="mt-3">
        <input type="file" @input="pickFile" ref="fileInput" />
      </div>
      <!-- <div class="error">{{ fileError }}</div> -->
    </div>
    <form class="col-12 col-lg-8 mt-4" @submit.prevent="setArtistProfile">
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Public Name"
          v-model="profile.name"
        />
        <label>Public Name</label>
      </div>
      <div class="input-group">
        <div class="form-floating mb-3 col-lg-6">
          <input
            type="text"
            class="form-control"
            placeholder="City"
            v-model="profile.city"
          />
          <label>City</label>
        </div>
        <div class="form-floating mb-3 col-lg-6">
          <input
            type="text"
            class="form-control"
            placeholder="Zip Code"
            v-model="profile.zip"
          />
          <label>Zip Code</label>
        </div>
      </div>
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Shop"
          v-model="profile.shop"
        />
        <label>Shop</label>
      </div>
      <div>
        <select class="form-select" v-model="profile.style">
          <option disabled value="">Choose your style</option>
          <option value="black-work">Black Work</option>
          <option value="new-school">New School</option>
          <option value="old-school">Old School</option>
          <option value="surrealism">Surrealism</option>
        </select>
      </div>
      <div class="col-12 btn-right mt-3">
        <div class="btn-group mb-3">
          <app-button>Save</app-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      previewImage: null,
      profile: {
        name: '',
        city: '',
        zip: '',
        shop: '',
        style: '',
      },
      showToast: false,
    };
  },
  created() {
    this.$store.dispatch('getArtistProfile');
    this.profile = this.$store.state.profile.artistProfile;
  },
  methods: {
    selectImage() {
      this.$refs.fileInput.click();
    },
    pickFile() {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit('input', file[0]);
      }
    },
    async setArtistProfile() {
      this.showToast = false;
      const profileData = {
        name: this.profile.name,
        city: this.profile.city,
        zip: this.profile.zip,
        shop: this.profile.shop,
        style: this.profile.style,
      };

      try {
        await this.$store.dispatch('setArtistProfile', profileData);
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 5000);
        console.log('profile set!');
      } catch (err) {
        console.log(err.message);
      }
    },
  },
};
</script>

<style lang="scss">
#toast-success {
  visibility: hidden;
  width: 3rem;
  height: 3rem;
  margin: auto;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 2px;

  position: fixed;
  z-index: 1;
  left: 0;
  right: 0;
  bottom: 30px;
  font-size: 17px;
  white-space: nowrap;
  .toast-img {
    width: 50px;
    height: 50px;
    float: left;
    padding-top: 16px;
    padding-bottom: 16px;
    box-sizing: border-box;
    color: #fff;
  }
  .toast-msg {
    color: #fff;
    padding: 16px;
    overflow: hidden;
    white-space: nowrap;
  }
}

#toast-success.show {
    visibility: visible;
    -webkit-animation: fadein 0.5s, expand 0.5s 0.5s,stay 3s 1s, shrink 0.5s 2s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, expand 0.5s 0.5s,stay 3s 1s, shrink 0.5s 4s, fadeout 0.5s 4.5s;
}

@-webkit-keyframes fadein {
    from {bottom: 0; opacity: 0;} 
    to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
    from {bottom: 0; opacity: 0;}
    to {bottom: 30px; opacity: 1;}
}

@-webkit-keyframes expand {
    from {min-width: 50px} 
    to {min-width: 350px}
}

@keyframes expand {
    from {min-width: 50px}
    to {min-width: 350px}
}
@-webkit-keyframes stay {
    from {min-width: 350px} 
    to {min-width: 350px}
}

@keyframes stay {
    from {min-width: 350px}
    to {min-width: 350px}
}
@-webkit-keyframes shrink {
    from {min-width: 350px;} 
    to {min-width: 50px;}
}

@keyframes shrink {
    from {min-width: 350px;} 
    to {min-width: 50px;}
}

@-webkit-keyframes fadeout {
    from {bottom: 30px; opacity: 1;} 
    to {bottom: 60px; opacity: 0;}
}

@keyframes fadeout {
    from {bottom: 30px; opacity: 1;}
    to {bottom: 60px; opacity: 0;}
}
</style>
