<template>
  <div class="row">
    <app-title mode="title-img">Your profile</app-title>
    <div class="toast-success" v-if="showSuccessToast">
      Update successful
    </div>
    <div class="toast-error" v-if="showErrorToast">
      Oops... Something went wrong :(
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
        class="img-fluid"
      />
      <div class="mt-3">
        <input type="file" @change="setPreviewImage($event)" />
        <div class="error">{{ fileErr }}</div>
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
  name: 'AdminProfile',
  data() {
    return {
      previewImage: null,
      profile: {
        name: '',
        city: '',
        zip: '',
        shop: '',
        style: '',
        thumbnail: '',
      },
      showSuccessToast: false,
      showErrorToast: false,
      fileSelected: null,
      fileErr: null,
    };
  },
  /* Get artistProfile
   ** Set profile.thumbnail as previewUrl
   */
  async created() {
    await this.$store
      .dispatch('getArtistProfile')
      .then(() => {
        this.profile = this.$store.state.profile.artistProfile;
      })
      .then(() => {
        this.previewImage = this.profile.thumbnail;
      });
  },
  methods: {
    /* Reset profile.thumbnail
     ** Clear cache
     ** Check file type
     ** Set fileSelected as previewImage
     ** Send fileSelected to DB
     */

    setPreviewImage($event) {
      this.profile.thumbnail = '';

      if (this.previewImage.startsWith('blob:')) {
        URL.revokeObjectURL(this.previewImage);
      }

      const file = $event.target.files[0];
      const types = ['image/png', 'image/jpeg'];

      if (file && types.includes(file.type)) {
        this.fileSelected = file;
        this.fileErr = null;
        this.previewImage = URL.createObjectURL(file);
      } else {
        this.fileSelected = null;
        this.fileErr = 'Please select an image file (png or jpeg).';
      }
    },
    /* Set thumbnailUrl
     ** Get thumbnail Url from store
     ** Set profileData
     ** Show success/error toast
     */
    async setArtistProfile() {
      const file = this.fileSelected;
      this.showToast = false;
      let thumbnail;

      try {
        await this.$store
          .dispatch('setArtistThumbnail', file)
          .then(async () => {
            thumbnail = await this.$store.state.profile.thumbnailUrl;
          })
          .then(async () => {
            const profileData = {
              name: this.profile.name,
              city: this.profile.city,
              zip: this.profile.zip,
              shop: this.profile.shop,
              style: this.profile.style,
              thumbnail: thumbnail,
            };
            await this.$store.dispatch('setArtistProfile', profileData);
            this.showSuccessToast = true;
            this.showErrorToast = false;
            setTimeout(() => {
              this.showSuccessToast = false;
            }, 3000);
          });
      } catch (err) {
        this.showErrorToast = true;
        this.showSuccessToast = false;
        setTimeout(() => {
          this.showErrorToast = false;
        }, 3000);
      }
    },
  },
};
</script>
