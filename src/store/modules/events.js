import { auth, eventsCollection, artistsCollection } from '@/utils/firebase';
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
    orgaEvents: [],
    eventArtists: [],
    clientEvents: [],
    artistEvents: {},
  },
  /**
   * @name Mutations
   * @type {object}
   * @property {array} setEvents
   * @property {object} setEventById
   * @property {array} setOrgaEvents
   * @property {array} setEventArtists
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
    },
    setEventArtists(state, payload) {
      state.eventArtists = payload;
    },
    setClientEvents(state, payload) {
      state.clientEvents = payload;
    },
    setArtistEvents(state, payload) {
      state.artistEvents = payload;
    },
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
    /**
     * Admin part
     * @description Create a new event
     * @method setNewEvent
     * @returns {string}
     * @async
     */
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
    /**
     * Admin part
     * @description Update event to add id
     * @method updateEvent
     * @returns {string}
     * @async
     */
    async updateEvent(_, payload) {
      try {
        await eventsCollection.doc(payload).update({ id: payload });
      } catch (err) {
        Sentry.captureException(err);
        return;
      }
    },
    /**
     * @description Get all events
     * @method getEvents
     * @returns {array}
     * @async
     */
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
    /**
     * @description Get event by id
     * @method getEventsById
     * @returns {array}
     * @async
     */
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
    /**
     * @description Get organizer's events
     * @method getOrgaEvents
     * @returns {array}
     * @async
     */
    async getOrgaEvents({ commit }) {
      const events = [];
      const user = auth.currentUser.uid;
      try {
        const docs = await eventsCollection.where('orgaId', '==', user).get();

        docs.forEach((doc) => {
          const date = doc.data().createdAt;
          const event = {
            ...doc.data(),
            createdAt: format(date.toDate(), 'dd/MM/yyyy'),
          };
          events.push(event);
        });
        commit('setOrgaEvents', events);
      } catch (err) {
        Sentry.captureException(err);
        return;
      }
    },
    /**
     * Admin part
     * @description update event - only by organizer
     * @method getOrgaEvents
     * @returns {array}
     * @async
     */
    async updateOrgaEvent(_, payload) {
      try {
        const eventId = payload.id;
        await eventsCollection.doc(eventId).update({ ...payload });
      } catch (err) {
        Sentry.captureException(err);
        return;
      }
    },
    /**
     * @description Add participation to attendees array
     * @method setParticipation
     * @returns {void}
     * @async
     */
    async setParticipation(_, payload) {
      let attendees = [];
      const user = auth.currentUser.uid;
      const eventId = payload.eventId;
      const data = {
        userId: user,
        tickets: payload.tickets,
      };

      try {
        const doc = await eventsCollection.doc(eventId).get();
        const event = doc.data().attendees;
        if (event) {
          event.forEach((attendee) => {
            console.log(attendee, 'if');
            if (attendee.userId === user) {
              attendees = event;
            } else {
              attendees.push(attendee);
              attendees.push(data);
            }
          });
        } else {
          attendees.push(data);
        }
        eventsCollection.doc(eventId).update({ attendees: attendees });
      } catch (err) {
        Sentry.captureException(err);
        return;
      }
    },
    /**
     * @description Add participation to stands array
     * @method setBooking
     * @returns {void}
     * @async
     */
    async setBooking(_, payload) {
      const stands = [];
      const user = auth.currentUser.uid;
      const userName = auth.currentUser.displayName;
      const eventId = payload.eventId;
      const data = {
        userId: user,
        email: payload.email,
        userName: userName,
      };

      try {
        const doc = await eventsCollection.doc(eventId).get();
        const event = doc.data().stands;
        if (event) {
          event.forEach((attendee) => {
            if (attendee.userId === user) {
              throw new Error('You already booked a stand');
            } else {
              stands.push(attendee);
            }
            stands.push(data);
          });
          eventsCollection.doc(eventId).update({ stands: stands });
        } else {
          stands.push(data);
          eventsCollection.doc(eventId).update({ stands: stands });
        }
      } catch (err) {
        Sentry.captureException(err);
        return;
      }
    },
    /**
     * @description Get all artists attending an event
     * @method getEventArtists
     * @returns {void}
     * @async
     */
    async getEventArtists({ commit }, payload) {
      try {
        const eventArtists = [];
        const doc = await eventsCollection.doc(payload).get();
        const artists = doc.data().stands;
        artists.forEach(async (artist) => {
          const artistProfile = await artistsCollection
            .doc(artist.userId)
            .get();
          const data = artistProfile.data();
          eventArtists.push(data);
        });
        commit('setEventArtists', eventArtists);
      } catch (err) {
        Sentry.captureException(err);
        return;
      }
    },
    /**
     * Admin part
     * @description Get all event an artist is attending - Both as a visitor and a stand holder
     * @method getArtistEvents
     * @returns {void}
     * @async
     */
    async getArtistEvents({ commit }) {
      const user = auth.currentUser.uid;
      const attendance = [];
      const stands = [];

      try {
        const docs = await eventsCollection.get();

        docs.forEach(async (doc) => {
          const attend = doc.data().attendees;
          attend.forEach((attendee) => {
            if (attendee.userId === user) {
              attendance.push(doc.data());
            }
          });

          const stand = doc.data().stands;
          stand.forEach((event) => {
            if (event.userId === user) {
              stands.push(doc.data());
            }
          });
        });
        console.log(attendance);
        console.log(stands);
        commit('setArtistEvents', { stands: stands, attendance: attendance });
      } catch (err) {
        Sentry.captureException(err);
        return;
      }
    },
    /**
     * @description Get all event a client is attending
     * @method getClientEvents
     * @returns {void}
     */
    async getClientEvents({ commit }) {
      const user = auth.currentUser.uid;
      const attendance = [];

      try {
        const docs = await eventsCollection.get();
        docs.forEach(async (doc) => {
          const attend = doc.data().attendees;
          attend.forEach((attendee) => {
            if (attendee.userId === user) {
              attendance.push(doc.data());
            }
          });
        });
        console.log(attendance);
        commit('setClientEvents', attendance);
      } catch (err) {
        Sentry.captureException(err);
        return;
      }
    },
  },
  /**
   * @name Getters
   * @type {object}
   * @property {array} getEvents - Gets all events
   * @property {array} getEventById - Gets event by id
   * @property {array} getOrgaEvents - Get all events created by user
   * @property {array} getClientEvents - Get all events where user is attending
   * @property {array} getArtistEvents - Get all events where artist is attending && participating
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
    },
    getEventArtists(state) {
      return state.eventArtists;
    },
    getClientEvents(state) {
      return state.clientEvents;
    },
    getArtistEvents(state) {
      return state.artistEvents;
    },
  },
};
