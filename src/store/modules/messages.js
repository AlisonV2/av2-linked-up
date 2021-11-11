import { messagesCollection, auth } from '@/utils/firebase';
import * as Sentry from '@sentry/vue';

/**
 * Vuex module for messages
 * @module messages
 * @requires firebase
 * @requires Sentry
 */
export default {
  /**
   * @name State
   * @type {object}
   * @property {array} messages - Array of messages
   */
  state: {
    messages: [],
    clientMessages: [],
    artistMessages: [],
  },
  /**
   * @name Mutations
   * @type {object}
   * @property {array} setMessages
   * @property {array} setClientMessages
   * @property {array} setArtistMessages
   */
  mutations: {
    setMessages(state, payload) {
      state.messages = payload;
    },
    setClientMessages(state, payload) {
      state.clientMessages = payload;
    },
    setArtistMessages(state, payload) {
      state.artistMessages = payload;
    },
  },
  /**
   * @name Actions
   * @type {object}
   * @property {void} startChat
   * @property {void} sendMessage
   * @property {array} getMessages
   * @property {array} getClientMessages
   * @property {array} getArtistMessages
   */
  actions: {
    /**
     * @description Start a new chat (from artist to client)
     * @method startChat
     * @returns {object}
     * @async
     */
    async startChat(_, payload) {
      // needed : receiver uid, project id, receiver name, sender name, message
      console.log(payload);
      const user = auth.currentUser;
      const projectId = payload.id;
      const message = {
        project: projectId,
        artist: payload.artistName,
        client: payload.clientName,
        artistId: payload.artistId,
        clientId: payload.clientId,
        messages: [
          {
            sender: user.uid,
            senderName: user.displayName,
            message: payload.message,
            date: new Date(),
          },
        ],
      };
      try {
        await messagesCollection.doc(projectId).set({ ...message });
        console.log('message sent!');
      } catch (err) {
        Sentry.captureException(err);
      }
    },
    /**
     * @description Send a new message
     * @method sendMessage
     * @returns {object}
     * @async
     */
    async sendMessage(_, payload) {
      console.log('messageSent')
      const user = auth.currentUser;
      const projectId = payload.projectId;
      const message = {
        sender: user.uid,
        senderName: user.displayName,
        message: payload.message,
        date: new Date(),
      }
      const chat = await messagesCollection.doc(projectId).get();
      console.log(chat.data())
      try {
        await messagesCollection.doc(projectId).update({
          messages: [...chat.data().messages, message],
        });
      } catch (err) {
        Sentry.captureException(err);
      }
    },
    /**
     * @description get user messages
     * @method getMessages
     * @returns {array}
     * @async
     */
    async getMessages({ commit }, payload) {
      try {
        const messages = [];
        const docs = await messagesCollection
          .where('project', '==', payload)
          .get();
          docs.forEach((doc) => {
            const message = doc.data().messages;
            messages.push(message);
          });
        commit('setMessages', messages);
      } catch (err) {
        Sentry.captureException(err);
      }
    },
    /**
     * @description get client messages
     * @method getClientMessages
     * @returns {array}
     * @async
     */
    async getClientMessages({ commit }) {
      const user = auth.currentUser.uid;
      const messages = [];
      try {
        const docs = await messagesCollection
          .where('clientId', '==', user)
          .get();

        docs.forEach((doc) => {
          const message = { ...doc.data() };
          messages.push(message);
        });

        commit('setClientMessages', messages);
      } catch (err) {
        Sentry.captureException(err);
      }
    },
    /**
     * @description get artist messages
     * @method getArtistMessages
     * @returns {array}
     * @async
     */
    async getArtistMessages({ commit }) {
      const user = auth.currentUser.uid;
      const messages = [];
      try {
        const docs = await messagesCollection
          .where('artistId', '==', user)
          .get();

        docs.forEach((doc) => {
          const message = { ...doc.data() };
          messages.push(message);
        });
        commit('setArtistMessages', messages);
      } catch (err) {
        Sentry.captureException(err);
      }
    },
  },
  /**
   * @name Getters
   * @type {object}
   * @property {array} getMessages
   * @property {array} getClientMessages
   * @property {array} getArtistMessages
   */
  getters: {
    getMessages(state) {
      return state.messages;
    },
    getClientMessages(state) {
      return state.clientMessages;
    },
    getArtistMessages(state) {
      return state.artistMessages;
    }
  },
};
