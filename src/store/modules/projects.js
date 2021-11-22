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
    projectById: {},
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
    /**
     * @description Submits a new project to an artist
     * @method setNewProject
     * @returns {string}
     * @async
     */
    async setNewProject({ commit, dispatch }, payload) {
      const userId = auth.currentUser.uid;
      const userName = auth.currentUser.displayName;
      try {
        const { id } = await projectsCollection.add({
          ...payload,
          clientId: userId,
          clientName: userName,
          createdAt: new Date(),
          status: 'Pending',
        });

        commit('setNewProject', payload);
        dispatch('updateProject', id);
      } catch (err) {
        Sentry.captureException(err);
        return;
      }
    },
    /**
     * @description get all projects for an artist
     * @method getArtistProjects
     * @returns {array}
     * @async
     */
    async getArtistProjects({ commit }) {
      const projects = [];
      const user = auth.currentUser.uid;
      try {
        const docs = await projectsCollection
          .where('artistId', '==', user)
          .get();

        docs.forEach((doc) => {
          const date = doc.data().createdAt;
          const project = {
            ...doc.data(),
            createdAt: format(date.toDate(), 'dd/MM/yyyy'),
          };
          projects.push(project);
        });
        commit('setArtistProjects', projects);
      } catch (err) {
        Sentry.captureException(err);
        return;
      }
    },
    /**
     * @description get all projects for a client
     * @method getClientProjects
     * @returns {array}
     * @async
     */
    async getClientProjects({ commit }) {
      const projects = [];
      const user = auth.currentUser.uid;
      try {
        const docs = await projectsCollection
          .where('clientId', '==', user)
          .get();
        docs.forEach((doc) => {
          const date = doc.data().createdAt;
          const project = {
            ...doc.data(),
            createdAt: format(date.toDate(), 'dd/MM/yyyy'),
          };
          projects.push(project);
        });
        commit('setClientProjects', projects);
      } catch (err) {
        Sentry.captureException(err);
        return;
      }
    },
    /**
     * @description updateProject
     * @method updateProject
     * @returns {void}
     * @async
     */
    async updateProject(_, payload) {
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
        const date = doc.data().createdAt;
        const project = {
          ...doc.data(),
          createdAt: format(date.toDate(), 'dd/MM/yyyy'),
        };
        commit('setProjectById', project);
      } catch (err) {
        Sentry.captureException(err);
        return;
      }
    },
    /**
     * @description modifies project status
     * @method setProjectStatus
     * @returns {string}
     * @async
     */
    async setProjectStatus(_, payload) {
      try {
        await projectsCollection
          .doc(payload.id)
          .update({ status: payload.status });
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
    getProjectById(state) {
      return state.projectById;
    },
  },
};
