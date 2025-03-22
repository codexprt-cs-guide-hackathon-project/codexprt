import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Editor } from '@monaco-editor/react';
import { v4 as uuidv4 } from 'uuid';
import JSZip from 'jszip';
import { Users, Plus, Download, X, LogOut, Loader2 } from 'lucide-react';

interface File {
  id: string;
  name: string;
  content: string;
}

interface CollabState {
  roomId: string | null;
  files: File[];
  activeFileId: string | null;
  participants: string[];
  isHost: boolean;
}

const COLLAB_STORAGE_KEY = 'collabState';

function Collab() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [state, setState] = useState<CollabState>(() => {
    const storedState = localStorage.getItem(COLLAB_STORAGE_KEY);
    if (storedState) {
      return JSON.parse(storedState);
    } else {
      return {
        roomId: null,
        files: [],
        activeFileId: null,
        participants: [],
        isHost: false,
      };
    }
  });
  const [newFileName, setNewFileName] = useState('');
  const [joinRoomId, setJoinRoomId] = useState('');
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);

  useEffect(() => {
    localStorage.setItem(COLLAB_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    const newSocket = io('wss://socketsbay.com/wss/v2/1/demo/');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    newSocket.on('message', (data) => {
      try {
        const parsedData = JSON.parse(data);

        switch (parsedData.type) {
          case 'participantJoined':
            setState(prev => ({
              ...prev,
              participants: [...prev.participants, parsedData.participantId]
            }));
            break;

          case 'participantLeft':
            setState(prev => ({
              ...prev,
              participants: prev.participants.filter(id => id !== parsedData.participantId)
            }));
            break;

          case 'fileUpdated':
            setState(prev => ({
              ...prev,
              files: prev.files.map(file =>
                file.id === parsedData.fileId ? { ...file, content: parsedData.content } : file
              )
            }));
            break;

          case 'roomClosed':
            if (parsedData.roomId === state.roomId) {
              setState({
                roomId: null,
                files: [],
                activeFileId: null,
                participants: [],
                isHost: false,
              });
              localStorage.removeItem(COLLAB_STORAGE_KEY);
            }
            break;
        }
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = (type: string, data: any) => {
    if (socket && socket.connected) {
      socket.send(JSON.stringify({
        type,
        roomId: state.roomId,
        ...data
      }));
    }
  };

  const createRoom = () => {
    setActiveButton('createRoom');
    setIsCreatingRoom(true);
    const roomId = uuidv4().slice(0, 8);
    sendMessage('createRoom', { roomId });
    setState(prev => ({
      ...prev,
      roomId,
      isHost: true,
      files: [{ id: uuidv4(), name: 'main.js', content: '// Start coding here' }]
    }));
    setTimeout(() => {
      setActiveButton(null);
      setIsCreatingRoom(false);
    }, 500);
  };

  const joinRoom = () => {
    setActiveButton('joinRoom');
    if (!joinRoomId) return;
    sendMessage('joinRoom', { roomId: joinRoomId });
    setState(prev => ({
      ...prev,
      roomId: joinRoomId
    }));
    setTimeout(() => setActiveButton(null), 200);
  };

  const leaveRoom = () => {
    setActiveButton('leaveRoom');
    if (state.roomId) {
      sendMessage('leaveRoom', {});
      setState({
        roomId: null,
        files: [],
        activeFileId: null,
        participants: [],
        isHost: false,
      });
      localStorage.removeItem(COLLAB_STORAGE_KEY);
    }
    setTimeout(() => setActiveButton(null), 200);
  };

  const closeRoom = () => {
    setActiveButton('closeRoom');
    if (state.roomId && state.isHost) {
      sendMessage('closeRoom', {});
      setState({
        roomId: null,
        files: [],
        activeFileId: null,
        participants: [],
        isHost: false,
      });
      localStorage.removeItem(COLLAB_STORAGE_KEY);
    }
    setTimeout(() => setActiveButton(null), 200);
  };

  const addNewFile = () => {
    setActiveButton('addNewFile');
    if (!newFileName) return;
    const newFile = {
      id: uuidv4(),
      name: newFileName,
      content: ''
    };
    setState(prev => ({
      ...prev,
      files: [...prev.files, newFile],
      activeFileId: newFile.id
    }));
    sendMessage('fileAdded', { file: newFile });
    setNewFileName('');
    setTimeout(() => setActiveButton(null), 200);
  };

  const handleEditorChange = (value: string | undefined, fileId: string) => {
    if (!value) return;
    sendMessage('fileUpdate', { fileId, content: value });
    setState(prev => ({
      ...prev,
      files: prev.files.map(file =>
        file.id === fileId ? { ...file, content: value } : file
      )
    }));
  };

  const downloadFile = (fileId: string) => {
    setActiveButton(`downloadFile-${fileId}`);
    const file = state.files.find(f => f.id === fileId);
    if (!file) return;

    const blob = new Blob([file.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
    setTimeout(() => setActiveButton(null), 200);
  };

  const downloadAllFiles = async () => {
    setActiveButton('downloadAllFiles');
    const zip = new JSZip();
    state.files.forEach(file => {
      zip.file(file.name, file.content);
    });

    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project.zip';
    a.click();
    URL.revokeObjectURL(url);
    setTimeout(() => setActiveButton(null), 200);
  };

  const getButtonClasses = (buttonId: string) => {
    return `transition-transform transform hover:scale-105 ${activeButton === buttonId ? 'scale-90' : ''}`;
  };

  if (!state.roomId) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
              <Users className="w-8 h-8 text-indigo-600" />
              <span style={{ color: '#3A83F6' }}>Code</span><span style={{ color: '#A855F8', marginLeft: '-10px' }}>Xprt</span> Collaborative Code Editor
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Code together in real-time with your team
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="space-y-6">
              <button
                onClick={createRoom}
                className={`w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors flex justify-center items-center ${getButtonClasses('createRoom')}`}
                disabled={isCreatingRoom}
              >
                {isCreatingRoom ? (
                  <div className="flex items-center justify-center">
                    Creating Room...
                    <Loader2 className="ml-2 w-4 h-4 animate-spin" />
                  </div>
                ) : (
                  'Create New Room'
                )}
              </button>

              <div className="flex gap-4">
                <input
                  type="text"
                  value={joinRoomId}
                  onChange={(e) => setJoinRoomId(e.target.value)}
                  placeholder="Enter room code"
                  className="flex-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button
                  onClick={joinRoom}
                  className={`bg-gray-800 dark:bg-gray-700 text-white py-2 px-6 rounded-md hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors ${getButtonClasses('joinRoom')}`}
                >
                  Join Room
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col animate-fade-in rounded-2xl m-0">
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Users className="w-5 h-5 text-indigo-600" />
              <span className="font-medium text-gray-900 dark:text-gray-300">Room: {state.roomId}</span>
              <span className="text-gray-500 dark:text-gray-400">
                ({state.participants.length} participants)
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={downloadAllFiles}
                className={`flex items-center gap-2 px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-md hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors ${getButtonClasses('downloadAllFiles')}`}
              >
                <Download className="w-4 h-4" />
                Download All
              </button>
              {state.isHost ? (
                <button
                  onClick={closeRoom}
                  className={`flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors ${getButtonClasses('closeRoom')}`}
                >
                  <X className="w-4 h-4" />
                  Close Room
                </button>
              ) : (
                <button
                  onClick={leaveRoom}
                  className={`flex items-center gap-2 px-4 py-2 bg-gray-600 dark:bg-gray-700 text-white rounded-md hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors ${getButtonClasses('leaveRoom')}`}
                >
                  <LogOut className="w-4 h-4" />
                  Leave Room
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
          <div className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                placeholder="New file name"
                className="flex-1 p-2 text-sm border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button
                onClick={addNewFile}
                className={`p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 ${getButtonClasses('addNewFile')}`}
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {state.files.map(file => (
              <div
                key={file.id}
                className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                  state.activeFileId === file.id ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => setState(prev => ({ ...prev, activeFileId: file.id }))}
              >
                <span className="truncate text-gray-900 dark:text-gray-300">{file.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadFile(file.id);
                  }}
                  className={`p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 ${getButtonClasses(`downloadFile-${file.id}`)}`}
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1">
          {state.activeFileId && (
            <Editor
              height="100%"
              defaultLanguage="javascript"
              value={state.files.find(f => f.id === state.activeFileId)?.content}
              onChange={(value) => handleEditorChange(value, state.activeFileId!)}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: 'on'
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Collab;
