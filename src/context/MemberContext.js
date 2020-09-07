import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import serverApi from '../api/server';
import { navigate } from '../navigationRef';

const memberReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_family':
      return {personData:action.payload, loading:false};
    case 'refresh':
      return { loading:action.payload };
    case 'failedBanner':
      return { ...state, failedBanner: action.payload, loading:false };
    case 'failed_action':
      return { ...state, failedAction: action.payload, loading:false };
    case 'deleteMember':
      return {
        ...state,
        personData: state.personData.filter(
          personData => personData._id !== action.payload
        )
      };
    case 'add_member':
      return {...state, personData:[...state.personData ,action.payload]};
    case 'edit_member':
      const updatePerson = action.payload;
      const updatePersons = state.personData.map(person => {
        if (person._id === updatePerson._id) {
          return updatePerson;
        }
        return person;
      });
        return {
          ...state,
          personData: updatePersons
        };
    default:
      return state;
  }
};

const fetchFamily = dispatch => async () => {
  try{
    const token = await AsyncStorage.getItem('token');
    const response = await serverApi.get('/member', 
    {
        headers:{  
          "Authorization": `Bearer ${token}`
        },
      }
    );
    dispatch({ type: 'fetch_family', payload: response.data}); 
  } catch(err){
    console.log(err)
    dispatch({ type: 'failedBanner', payload: true });
    dispatch({ type: 'failed_action', payload: true });
  }
};

const add_member = dispatch => async ({ pid, name, address, phone, birthdate, diedate, gender, tags }, callback) => {
  if(tags === true){
    tags = 'assistant'
  }
  else{
    tags = ''
  }
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await serverApi.post('/member', { pid, name, address, phone, birthdate, diedate, gender, tags },
    {
      headers:{  
        "Authorization": `Bearer ${token}`
      },
    });
    dispatch({ type: 'add_member', payload: response.data});
    if(callback){
      callback()
    }
  } catch (err) {
    navigate('Home')
    //dispatch({ type: 'failed_action', payload: true });
  }
};

const edit_member = dispatch => async ({ _id, pid, name, address, phone, birthdate, diedate, gender, tags_status}, callback) => {
  if(tags_status === true){
    tagss = 'assistant'
    tags_server = 'assistant'
  }
  else{
    tagss = ['']
    tags_server = ''
  }
  try {
    const tags = [tagss]
    const token = await AsyncStorage.getItem('token');
    const response = await serverApi.put('/member', { _id, pid, name, address, phone, birthdate, diedate, gender, tags:tags_server },
    {
      headers:{  
        "Authorization": `Bearer ${token}`
      },
    });
    dispatch({ type: 'edit_member', payload: {_id, pid, name, address, phone, birthdate, diedate, gender, tags}});
    if(callback){
      callback()
    }
  } catch (err) {
    navigate('Home')
    dispatch({ type: 'failed_action', payload: true });
  }
};

const deleteMember = dispatch => async (_id, callback) => {
    try{
      const token = await AsyncStorage.getItem('token');
      const response = await serverApi.delete(`/member/${_id}`,
      {
        headers:{  
          "Authorization": `Bearer ${token}`
        },
      });
      dispatch({ type: 'deleteMember', payload: _id});
      if(callback){
        callback()
      }
    } catch(err){
      navigate('Home')
      dispatch({ type: 'failed_action', payload: true });
    }
    
};

const failedActionClose = dispatch => async () => {
    dispatch({ type: 'failed_action', payload: false });
};

const refreshing = dispatch => async (_id, callback) => {
  dispatch({ type: 'refresh', payload: true});
}

export const { Provider, Context } = createDataContext(
  memberReducer,
  { add_member, 
    edit_member, 
    fetchFamily, 
    deleteMember,
    failedActionClose,
    refreshing
   },{
     personData:[],
     errorBanner:false,
     loading:true,
     failedAction:false
   }
);
