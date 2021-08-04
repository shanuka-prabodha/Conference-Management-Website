export default (eventPosts=[],action) =>{
    switch (action.type){
        case 'FETCH_ALL':
            return action.payload;

        case 'CREATE':
            return [...postMessage,action.payload];

            case 'UPDATE':
            return eventPosts.map((post)=>post._id === action.payload._id ? action.payload:post);

            case 'DELETE':
                return eventPosts.filter((post)=>post._id !== action.payload._id );

                case 'FETCH_ALL_NO':
            return action.payload;

            case 'UPDATE_APPROVEL':
                return eventPosts.map((post)=>post._id === action.payload._id ? action.payload:post);

            case 'UPDATE_DECLINE':
            return eventPosts.map((post)=>post._id === action.payload._id ? action.payload:post);

            case 'FETCH_ALL_Decline':
            return action.payload;
            case 'FETCH_ALL_Approved':
            return action.payload;
                    
            case 'FETCH_ALL_WrokShops_Events':
            return action.payload;

            case 'FETCH_ALL_WrokShops_Events':
                return action.payload;

            

            
                        
                
            

        default:
            return eventPosts;

    }
}