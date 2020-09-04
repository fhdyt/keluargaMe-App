import createDataContext from './createDataContext';
import serverApi from '../api/server';
import { navigate } from '../navigationRef';

const memberReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_family':
      return {personData:action.payload, loading:false};
    case 'failedBanner':
      return { ...state, failedBanner: action.payload, loading:false };
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
    const response = await serverApi.get('/member');
    dispatch({ type: 'fetch_family', payload: response.data}); 
  } catch(err){
    console.log(err)
    dispatch({ type: 'failedBanner', payload: true });
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
    const response = await serverApi.post('/member', { pid, name, address, phone, birthdate, diedate, gender, tags });

    dispatch({ type: 'add_member', payload: response.data});
    if(callback){
      callback()
    }
  } catch (err) {
    navigate('Home')
    dispatch({ type: 'errorBanner', payload: true });
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
    const response = await serverApi.put('/member', { _id, pid, name, address, phone, birthdate, diedate, gender, tags:tags_server });
    dispatch({ type: 'edit_member', payload: {_id, pid, name, address, phone, birthdate, diedate, gender, tags}});
    if(callback){
      callback()
    }
  } catch (err) {
    navigate('Home')
    dispatch({ type: 'errorBanner', payload: true });
  }
};

const deleteMember = dispatch => async (_id, callback) => {
    try{
      const response = await serverApi.delete(`/member/${_id}`);
      dispatch({ type: 'deleteMember', payload: _id});
      if(callback){
        callback()
      }
    } catch(err){
      navigate('Home')
      dispatch({ type: 'errorBanner', payload: true });
    }
    
};

export const { Provider, Context } = createDataContext(
  memberReducer,
  { add_member, 
    edit_member, 
    fetchFamily, 
    deleteMember
   },{
     personData:[],
     errorBanner:false,
     loading:true,
     failed:false
   }
);
