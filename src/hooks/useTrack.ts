import React from 'react';
import axios from 'axios';
import { Track } from '../models/TrackModel';
import { environments } from '../environments/environments';

const { baseUrl } = environments;

const useTrack = () => {

  const checkBiotrack = (id: string) => id.split('BT-').length > 1;
  
  const createTrack = async (
    event: string,
    type: string,
    name: string,
    inputs: Array<number | string>,
    expiration: string,
    lot?: string
  ) => {
    try {      
      return await axios.post<Track>(`${baseUrl}/tracks`, {
        event: event,
        type: type,
        name: name,
        inputs: inputs,
        expiration: expiration,
        batchCode: lot || Math.floor(Math.random() * 1000).toString(),
      });
    } catch (error: any) {      
      return error;
    }
  };

  const getSingleTrack = async (id: string) => {
    try {
      
      return checkBiotrack(id)
        ? await axios.get<Track>(`${baseUrl}/tracks/${id.split('BT-')[1]}`)
        : 'No Biotrack Material';
    } catch (error: any) {
      return error.data.message;
    }
  }
  
  const getHistoryTrack = async (id: string) => {
    try {
      return checkBiotrack(id)
        ? await axios.get<Track>(
            `${baseUrl}/tracks/${id.split('BT-')[1]}/supplyChain`
          )
        : 'No Biotrack Material';
    } catch (error: any) {
      return error.data.message
    }
  };

  const concatTrack = async (id: string, event: string) => {
    try {
      return checkBiotrack(id) ? 
      await axios.put<Track>(`${baseUrl}/tracks/${id.split('BT-')[1]}/${event}`) :
      'No Biotrack Material';
    } catch (error: any) {
      return error.data.message;
    }
  };

  return {
    getHistoryTrack,
    getSingleTrack,
    concatTrack,
    createTrack,
    checkBiotrack,
  };
};

export default useTrack;
