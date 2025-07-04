import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
  }

  connect(userId) {
    if (!this.socket) {
      // Use relative path for socket connection - will connect to same origin
      this.socket = io('http://localhost:5001', {
        withCredentials: true
      });
      
      this.socket.on('connect', () => {
        console.log('Connected to server');
        this.isConnected = true;
        if (userId) {
          this.socket.emit('join', userId);
        }
      });

      this.socket.on('disconnect', () => {
        console.log('Disconnected from server');
        this.isConnected = false;
      });
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  sendMessage(data) {
    if (this.socket && this.isConnected) {
      this.socket.emit('sendMessage', data);
    }
  }

  onNewMessage(callback) {
    if (this.socket) {
      this.socket.on('newMessage', callback);
    }
  }

  onMessageSent(callback) {
    if (this.socket) {
      this.socket.on('messageSent', callback);
    }
  }

  offNewMessage() {
    if (this.socket) {
      this.socket.off('newMessage');
    }
  }

  offMessageSent() {
    if (this.socket) {
      this.socket.off('messageSent');
    }
  }
}

export default new SocketService();