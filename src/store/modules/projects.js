import {
  auth,
  projectsCollection,
  clientsCollection,
  artistsCollection,
} from '@/utils/firebase';
import * as Sentry from '@sentry/vue';

/**
 * Vuex module for Projects
 * @module projects
 * @requires firebase
 */
export default {
  /**
   * @name State
   * @type {object}
   */
  state: {
    newProject: {},
    artistProjects: [],
    clientProjects: [],
  },
  /**
   * @name Mutations
   * @type {object}
   * @property {object} setNewProject
   * @property {object} setArtistProjects
   * @property {object} setClientProjects
   */
  mutations: {
    setNewProject(state, payload) {
      state.newProject = payload;
    },
    setArtistProjects(state, payload) {
      state.artistProjects = payload;
    },
    setClientProjects(state, payload) {
      state.clientProjects = payload;
    },
  },
  /**
   * @name Actions
   * @type {object}
   * @property {object} setNewProject
   * @property {array} getArtistProjects
   * @property {array} getClientProjects
   * @property {void} addClientProject
   * @property {void} addArtistProject
   */
  actions: {
    async setNewProject({ commit, dispatch }, payload) {
      const client = payload.clientId;
      const artist = payload.artistId;
      try {
        const { docId } = await projectsCollection.add({
          ...payload,
          createdAt: new Date(),
        });
        commit('setNewProject', payload);
        dispatch('addClientProject', { projectId: docId, clientId: client });
        dispatch('addArtistProject', { projectId: docId, artistId: artist });
      } catch (err) {
        Sentry.captureException(err);
        return;
      }
    },
    async getArtistProjects({ commit }) {
      const projects = [];
      const user = auth.currentUser.uid;
      try {
        const docs = await projectsCollection
          .where('artistId', '==', user)
          .get();
        docs.forEach((doc) => {
          const project = { ...doc.data() };
          projects.push(project);
        });
        commit('setArtistProjects', projects);
      } catch (err) {
        Sentry.captureException(err);
        return;
      }
    },
    async getClientProjects({ commit }) {
      const projects = [];
      const user = auth.currentUser.uid;
      try {
        const docs = await projectsCollection
          .where('clientId', '==', user)
          .get();
        docs.forEach((doc) => {
          const project = { ...doc.data() };
          projects.push(project);
        });
        commit('setClientProjects', projects);
      } catch (err) {
        Sentry.captureException(err);
        return;
      }
    },
    async addClientProject(_, payload) {
      const client = payload.clientId;
      const project = payload.projectId;

      const updatedProjects = [];
      const doc = await clientsCollection.doc(client).get();
      const clientProjects = doc.data().projects;

      if (clientProjects) {
        for (let i = 0; i < clientProjects.length; i++) {
          updatedProjects.push(clientProjects[i]);
        }
        updatedProjects.push(project);
      } else {
        updatedProjects.push(project);
      }

      try {
        await clientsCollection
          .doc(client)
          .update({ project: updatedProjects });
      } catch (err) {
        Sentry.captureException(err);
        return;
      }
    },
    async addArtistProject(_, payload) {
      const artist = payload.artistId;
      const project = payload.projectId;

      const updatedProjects = [];
      const doc = await artistsCollection.doc(artist).get();
      const artistProjects = doc.data().projects;

      if (artistProjects) {
        for (let i = 0; i < artistProjects.length; i++) {
          updatedProjects.push(artistProjects[i]);
        }
        updatedProjects.push(project);
      } else {
        updatedProjects.push(project);
      }

      try {
        await artistsCollection
          .doc(artist)
          .update({ project: updatedProjects });
      } catch (err) {
        Sentry.captureException(err);
        return;
      }
    },
  },
  /**
   * @name Getters
   * @type {object}
   * @property {array} getClientProjects
   * @property {array} getArtistProjects
   */
  getters: {
    getClientProjects(state) {
      return state.clientProjects;
    },
    getArtistProjects(state) {
      return state.artistProjects;
    },
  },
};
