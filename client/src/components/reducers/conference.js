


export default (conference=[],action) =>{
    switch (action.type){
        case 'FETCH_ADMIN':
            return action.payload;        
            
            case 'UPDATE_CONFERENCE':
                return conference.map((post)=>post._id === action.payload._id ? action.payload:post);

                case 'FETCH_EDITOR':
                    return action.payload;   

                    case 'FETCH_ADMIN_CONFERENCE':
                        return action.payload;    


                        case 'UPDATE_CONFERENCE_APPROVEL':
                            return conference.map((post)=>post._id === action.payload._id ? action.payload:post);

                            case 'CONFERENCE_DECLINE':
                                return conference.map((post)=>post._id === action.payload._id ? action.payload:post);
                            
                                case 'CONFERENCE_APPROVED':
                                return conference.map((post)=>post._id === action.payload._id ? action.payload:post);


                                

        default:
            return conference;

    }
}