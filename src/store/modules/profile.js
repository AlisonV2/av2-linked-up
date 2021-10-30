import { auth, artistsCollection, storage } from '@/utils/firebase';

/**
 * Vuex module for artists' profiles
 * @module ArtistProfile
 * @requires FirebaseConfig
 */
export default {
  /**
   * @name State
   * @type {object}
   * @property {object} artistProfile - Used for admin part of the website.
   * @property {string} thumbnailUrl - Used for admin part of the website.
   * @property {object} profile - Used for the public parts of the website
   * @property {array} artists - Used for the public parts of the website
   */
  state: {
    artistProfile: {},
    thumbnailUrl: '',
    profile: {},
    artists: [],
  },
  /**
   * @name Mutations
   * @type {object}
   * @mutator {object} setArtistProfile=artistProfile
   * @mutator {string} setThumbnail=thumbailUrl
   * @mutator {object} setProfile=profile
   * @mutator {array} setAllArtists=artists
   */
  mutations: {
    // Used for admin part
    setArtistProfile(state, payload) {
      state.artistProfile = payload;
    },
    setThumbnail(state, payload) {
      state.thumbnailUrl = payload;
    },
    // Used for public part
    setProfile(state, payload) {
      state.profile = payload;
    },
    setAllArtists(state, payload) {
      state.artists = payload;
    },
  },
  /**
   * @name Actions
   * @type {object}
   * @getter {void} setArtistProfile
   * @getter {string} setArtistThumbnail=thumbnailUrl
   * @getter {object} getArtistProfile=artistProfile
   * @getter {object} getProfile=profile
   * @getter {array} getAllArtists=artists
   */
  actions: {
    /**
     * @description Admin part - Sets artist's profile in firebase's artistsCollection
     * @method setArtistProfile
     * @param {object} payload
     * @returns {void}
     */
    async setArtistProfile(_, payload) {
      const user = auth.currentUser.uid;

      try {
        await artistsCollection.doc(user).update({
          uid: user,
          name: payload.name,
          city: payload.city,
          zip: payload.zip,
          shop: payload.shop,
          style: payload.style,
          thumbnail: payload.thumbnail,
          socialLink: payload.socialLink,
          insta: payload.insta,
          description: payload.description,
        });
      } catch (err) {
        console.log(err.message);
        return;
      }
    },
    /**
     * Admin part
     * @description Sends thumbnail file to firebase storage, Get file URL from storage, Update thumbnail field with file url
     * @method setArtistThumnail
     * @param {object} payload
     * @returns {string}
     */
    async setArtistThumbnail({ commit }, payload) {
      const user = auth.currentUser.uid;
      const file = payload;
      const storageRef = storage.ref();
      const artistsRef = storageRef.child(`artists/${user}/${file.name}`);

      const task = await artistsRef.put(file);
      task.ref.getDownloadURL().then((res) => {
        commit('setThumbnail', res);
      });
    },
    /**
     * Admin part
     * @description Get artist profile from firebase
     * @method getArtistProfile
     * @returns {array}
     */
    async getArtistProfile({ commit }) {
      const user = auth.currentUser.uid;
      const doc = await artistsCollection.doc(user).get();
      if (!doc.exists) {
        return;
      }
      commit('setArtistProfile', doc.data());
    },
    /** Public part
     * @description Get artist by id
     * @method getArtistById
     * @param {object} payload
     * @returns {array}
     */
    async getArtistById({ commit }, payload) {
      const user = payload;
      const doc = await artistsCollection.doc(user).get();
      if (!doc.exists) {
        return;
      }
      commit('setProfile', doc.data());
    },
    /** Public part
     * @description Get artist by id
     * @method getAllArtists
     * @returns {array}
     */
    async getAllArtists({ commit }) {
      const snap = await artistsCollection.get();
      const artists = [];
      snap.forEach((doc) => [
        artists.push({
          id: doc.id,
          ...doc.data(),
        }),
      ]);
      commit('setAllArtists', artists);
    },
  },
  /**
   * @name Getters
   * @type {object}
   * @getter {object} getArtistProfile=artistProfile
   * @getter {object} getProfile=profile
   * @getter {array} getAllArtists=artists
   */
  getters: {
    getArtistProfile(state) {
      return state.artistProfile;
    },
    getProfile(state) {
      return state.profile;
    },
    getAllArtists(state) {
      return state.artists;
    },
  },
};
