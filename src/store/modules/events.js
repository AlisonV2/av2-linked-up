import { auth, eventsCollection } from '@/utils/firebase';
import * as Sentry from '@sentry/vue';
import { format } from 'date-fns';

/**
 * Vuex module for events
 * @module events
 * @requires firebase
 */
export default {
  /**
   * @name State
   * @type {object}
   */
  state: {
    events: [],
    eventById: {},
    orgaEvents: []
  },
  /**
   * @name Mutations
   * @type {object}
   * @property {array} setEvents
   * @property {object} setEventById
   * @property {array} setOrgaEvents
   */
  mutations: {
    setEvents(state, payload) {
      state.events = payload;
    },
    setEventById(state, payload) {
      state.eventById = payload;
    },
    setOrgaEvents(state, payload) {
      state.orgaEvents = payload;
    }
  },
  /**
   * @name Actions
   * @type {object}
   * @property {object} setNewEvent
   * @property {object} getEventById
   * @property {object} updateEvent
   * @property {array} getEvents
   * @property {array} getOrgaEvents
   */
  actions: {
    async setNewEvent({ dispatch }, payload) {
      const userId = auth.currentUser.uid;
      const userName = auth.currentUser.displayName;
      try {
        const { id } = await eventsCollection.add({
          ...payload,
          orgaId: userId,
          orgaName: userName,
          createdAt: new Date(),
        });
        dispatch('updateEvent', id);
      } catch (err) {
        Sentry.captureException(err);
        return;
      }
    },
    async updateEvent(_, payload) {
      try {
        await eventsCollection.doc(payload).update({ id: payload });
      } catch (err) {
        Sentry.captureException(err);
        return;
      }
    },
    async getEvents({ commit }) {
      try {
        const snap = await eventsCollection.get();
        const events = [];
        snap.forEach((doc) => [
          events.push({
            id: doc.id,
            ...doc.data(),
          }),
        ]);
        commit('setEvents', events);
      } catch (err) {
        Sentry.captureException(err);
        return;
      }
    },
    async getEventById({ commit }, payload) {
      try {
        const doc = await eventsCollection.doc(payload).get();
        const date = doc.data().createdAt;
        const event = {
          ...doc.data(),
          createdAt: format(date.toDate(), 'dd/MM/yyyy'),
        };
        commit('setEventById', event);
      } catch (err) {
        Sentry.captureException(err);
        return;
      }
    },
    async getOrgaEvents({commit}) {
        const events = [];
        const user = auth.currentUser.uid;
        try {
          const docs = await eventsCollection
            .where('orgaId', '==', user)
            .get();
  
          docs.forEach((doc) => {
            const date = doc.data().createdAt;
            const event = { ...doc.data(), createdAt: format(date.toDate(), 'dd/MM/yyyy') };
            events.push(event);
          });
          commit('setOrgaEvents', events);
      } catch (err) {
        Sentry.captureException(err);
        return;
      }
    },
    async updateOrgaEvent(_, payload) {
      try {
        const eventId = payload.id;
        await eventsCollection.doc(eventId).update({ ...payload });
      } catch (err) {
        Sentry.captureException(err);
        return;
      }
    }
  },
  /**
   * @name Getters
   * @type {object}
   * @property {array} getEvents - Gets all events
   * @property {array} getEventById - Gets event by id
   * @property {array} getOrgaEvents - Get all events created by user
   */
  getters: {
    getEvents(state) {
      return state.events;
    },
    getEventById(state) {
      return state.eventById;
    },
    getOrgaEvents(state) {
      return state.orgaEvents;
    }
  },
};
