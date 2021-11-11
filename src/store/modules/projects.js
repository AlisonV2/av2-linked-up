import { auth, projectsCollection } from '@/utils/firebase';
import * as Sentry from '@sentry/vue';
import { format } from 'date-fns';

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
    projectById: {}
  },
  /**
   * @name Mutations
   * @type {object}
   * @property {object} setNewProject
   * @property {object} setArtistProjects
   * @property {object} setClientProjects
   * @property {object} setProjectById
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
    setProjectById(state, payload) {
      state.projectById = payload;
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
   * @property {object} getProjectById
   */
  actions: {
    async setNewProject({ commit, dispatch }, payload) {
      try {
        const { id } = await projectsCollection.add({
          ...payload,
          createdAt: new Date(),
          status: 'Pending'
        });

        commit('setNewProject', payload);
        dispatch('updateProject', id);
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
          const date = doc.data().createdAt;
          const project = { ...doc.data(), createdAt: format(date.toDate(), 'dd/MM/yyyy') };
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
    async updateProject(_, payload) {
      console.log(payload);
      try {
        await projectsCollection.doc(payload).update({ id: payload });
      } catch (err) {
        Sentry.captureException(err);
        return;
      }
    },
    async getProjectById({ commit }, payload) {
      try {
        const doc = await projectsCollection.doc(payload).get();
        const project = doc.data();
        commit('setProjectById', project)
      } catch (err){
        Sentry.captureException(err);
        return;
      }
    },
    async setProjectStatus(_, payload) {
      try {
        await projectsCollection.doc(payload.id).update({ status: payload.status });
      } catch (err) {
        Sentry.captureException(err);
        return;
      }
    }
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
    getProjectById(state) {
      return state.projectById;
    }
  },
};
