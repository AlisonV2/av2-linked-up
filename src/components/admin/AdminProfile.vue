<template>
  <div class="row">
    <app-title mode="title-img">Your profile</app-title>
    <div class="col-12 btn-right">
      <div class="btn-group mb-3">
        <app-button>Save</app-button>
      </div>
    </div>
    <div class="col-12 col-lg-4">
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
      <div class="error">{{ fileError }}</div>
    </div>
    <form class="col-12 col-lg-8">
      <div class="form-floating mb-3">
        <input type="text" class="form-control" placeholder="Public Name" />
        <label>Public Name</label>
      </div>
      <div class="input-group">
        <div class="form-floating mb-3 col-lg-6">
          <input type="text" class="form-control" placeholder="City" />
          <label>City</label>
        </div>
        <div class="form-floating mb-3 col-lg-6">
          <input type="text" class="form-control" placeholder="Zip Code" />
          <label>Zip Code</label>
        </div>
      </div>
      <div class="form-floating mb-3">
        <input type="text" class="form-control" placeholder="Shop" />
        <label>Shop</label>
      </div>
      <div class="">
        <select class="form-select">
          <option selected>Choose your style</option>
          <option>Black Work</option>
          <option>New School</option>
          <option>Old School</option>
          <option>Surrealism</option>
        </select>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
      return {
        previewImage: null
      };
    },
  methods: {
      selectImage () {
          this.$refs.fileInput.click()
      },
      pickFile () {
        let input = this.$refs.fileInput
        let file = input.files
        if (file && file[0]) {
          let reader = new FileReader
          reader.onload = e => {
            this.previewImage = e.target.result
          }
          reader.readAsDataURL(file[0])
          this.$emit('input', file[0])
        }
      }
  }
};
</script>

<style lang="scss"></style>
