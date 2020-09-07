import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import serverApi from '../api/server';
import { navigate } from '../navigationRef';

const journalReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_journal':
      return { journalData:action.payload, loading:false };
    case 'refresh':
      return { loading:action.payload };
    case 'deleteJournal':
      return {
        ...state,
        journalData: state.journalData.filter(
          journalData => journalData._id !== action.payload
        ), errorBanner: false
      };
    case 'add_journal':
      return {...state, journalData:[...state.journalData ,action.payload], errorBanner: false};
    case 'show_loading':
      return {...state, loading:true, errorBanner:false};
    case 'edit_journal':
      const updateJournal = action.payload;
      const updateJournals = state.journalData.map(journal => {
        if (journal._id === updateJournal._id) {
          return updateJournal;
        }
        return journal;
      });
        return {
          ...state,
          journalData: updateJournals , errorBanner: false
        };
    default:
      return state;
  }
};

const fetchJournal = dispatch => async () => {
  console.log("FetchingData")
  try{
    const token = await AsyncStorage.getItem('token');
    const response = await serverApi.get('/journal',
    {
        headers:{  
          "Authorization": `Bearer ${token}`
        },
      });
    dispatch({ type: 'fetch_journal', payload: response.data});    
  } catch(err){
    navigate('Home')
  }
};

const add_journal = dispatch => async ({ title, content }, callback) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await serverApi.post('/journal', { title, content },
    {
        headers:{  
          "Authorization": `Bearer ${token}`
        },
      });
    dispatch({ type: 'add_journal', payload: response.data});
    if(callback){
      callback()
    }
  } catch (err) {
    navigate('Home')
  }
};

const edit_journal = dispatch => async ({ _id, title, content}, callback) => {
  try {
    console.log({ _id, title, content})
    const token = await AsyncStorage.getItem('token');
    const response = await serverApi.put('/journal', { _id, title, content },
    {
        headers:{  
          "Authorization": `Bearer ${token}`
        },
      });
    dispatch({ type: 'edit_journal', payload: {_id, title, content}});
    if(callback){
      callback()
    }
  } catch (err) {
    navigate('Home')
  }
};

const deleteJournal = dispatch => async (_id, callback) => {
    try{
      const token = await AsyncStorage.getItem('token');
      const response = await serverApi.delete(`/journal/${_id}`,
      {
        headers:{  
          "Authorization": `Bearer ${token}`
        },
      });
      dispatch({ type: 'deleteJournal', payload: _id});
      if(callback){
        callback()
      }
    } catch(err){
      navigate('Home')

    }
    
};

const refreshing = dispatch => async (_id, callback) => {
  dispatch({ type: 'refresh', payload: true});
}

export const { Provider, Context } = createDataContext(
  journalReducer,
  { add_journal, 
    edit_journal, 
    fetchJournal, 
    deleteJournal,
    refreshing
   },{
     journalData:[],
     loading:true,
   }
);
