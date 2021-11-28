const toasts = {
  data() {
    return {
      showSuccessToast: false,
      showErrorToast: false,
    };
  },
  methods: {
    showSuccess() {
      this.showSuccessToast = true;
      this.showErrorToast = false;
      setTimeout(() => {
        this.showSuccessToast = false;
      }, 3000);
    },
    showError() {
      this.showErrorToast = true;
      this.showSuccessToast = false;
      setTimeout(() => {
        this.showErrorToast = false;
      }, 3000);
    },
  },
};

export default toasts;
