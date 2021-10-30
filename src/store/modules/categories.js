import { artistsCollection } from '@/utils/firebase';

export default {
    state: {
        artists: []
    },
    mutations: {
        setArtistsByStyle(state, payload) {
            state.artists = payload;
        }
    },
    actions: {
        async getArtistsByStyle({commit}, payload) {
            const snap = await artistsCollection.where('style', '==', payload).get();
            const artists = [];
            snap.forEach((doc) => [
              artists.push({
                id: doc.id,
                ...doc.data(),
              }),
            ]);
            commit('setArtistsByStyle', artists);
        }
    },
    getters: {}
}