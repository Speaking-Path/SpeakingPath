import React, { createContext, useContext, useMemo } from 'react'
import { io } from 'socket.io-client'

const SocketContext = createContext(null)
export const useSocket = () => {
  const socket = useContext(SocketContext)
  return socket
}

export const SocketProvider = (props) => {
  // socket.io 클라이언트 생성, 연결
  const socket = useMemo(()=>io('localhost:8000'), [])
  
  return (
    // provider : context의 변화를 알리는 역할
    // value로 socketcontext 값을 받아서 전달
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  )
}