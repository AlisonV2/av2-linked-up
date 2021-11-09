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
  },
  /**
   * @name Mutations
   * @type {object}
   * @property {array} setMessages
   */
  mutations: {
    setMessages(state, payload) {
      state.messages = payload;
    },
  },
  /**
   * @name Actions
   * @type {object}
   * @property {void} startChat
   * @property {void} sendMessage
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
        fromId: user.uid,
        toId: payload.clientId,
        from: user.displayName,
        to: payload.clientName,
        message: payload.message,
        createdAt: new Date().toString(),
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
      const projectId = '';
      const message = payload;
      const chat = await messagesCollection.doc(projectId).get();
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
    async getMessages({ commit }) {
      const user = auth.currentUser.uid;
      const messages = await messagesCollection
        .where('fromId', '==', user)
        .get();
      commit('setMessages', messages.data());
    },
  },
  /**
   * @name Getters
   * @type {object}
   * @property {array} getMessages
   */
  getters: {
    getMessages(state) {
      return state.messages;
    },
  },
};
