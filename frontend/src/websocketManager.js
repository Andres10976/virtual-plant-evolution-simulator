import { io } from "socket.io-client";
import { updatePlant, createPlant } from './redux/plantsSlice';

const SOCKET_URL = 'http://localhost:5000';

let socket;

export const initializeSocket = (store) => {
  socket = io(SOCKET_URL, {
    transports: ['websocket', 'polling']
  });

  socket.on('connect', () => {
    console.log('Connected to WebSocket');
  });

  socket.on('plantUpdate', (updatedPlant) => {
    store.dispatch(updatePlant(updatedPlant));
  });

  socket.on('newPlant', (newPlant) => {
    store.dispatch(createPlant(newPlant));
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket');
  });

  socket.on('connect_error', (error) => {
    console.log('Connection error:', error);
  });
};

export const closeSocket = () => {
  if (socket) socket.close();
};