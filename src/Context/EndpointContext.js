import {createContext,useContext} from 'react'

export const Endpoints = createContext()

 export const useEndpoint = () => {
     return useContext(Endpoints)
 }