export const createStore=(reducer)=>{
    let state;
    let listeners = [];
    let subscribe = (listener)=>{
        listeners.push(listener);
        return ()=>{
            listeners = listeners.filter(l=>l!==listener);
        }
    }
    let dispatch = (action)=>{
        state = reducer(state,action);
        listeners.forEach(listener=>listener());
    }
    let getState = ()=>{
        return state;
    }
    dispatch();
    return {
        getState,
        subscribe,
        dispatch
    }
}
