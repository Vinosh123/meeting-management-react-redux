import initialState from './initialState';
const meetingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INSERTING_MEETING_DATA':
            return {
                ...state,
                meetingData: [...state.meetingData, action.meetingData]
            };
        case 'UPDATING_MEETING_DATA':
            return {
                ...state,
                editingInfo: { ...action.editingInfo }
            };
        case 'DELETE_MEETING_DATA':
            return { ...state, meetingData: [...state.meetingData.filter(val => val.day !== action.data)] };
        default:
            return state;
    }
};
export default meetingReducer;