export const RECEIVE_STARS = 'RECEIVE_STARS'; //done
export const SELECT_STAR = 'SELECT_STAR'; //done
export const CREATE_STAR = 'CREATE_STAR'; //done
export const CREATE_WISH = 'CREATE_WISH'; //done
export const RECEIVE_WISHES = 'RECEIVE_WISHES'; //done
export const DELETE_WISH = 'DELETE_WISH';

//action creator
const receiveStars = function (stars) {
    return {
        type: RECEIVE_STARS,
        stars
    };
};

//async action creator
export const loadStars = function () {
    return function (dispatch) {
        fetch('/api/stars')
        .then(res => res.json())
        .then(stars => {
            const action = receiveStars(stars);
            dispatch(action);
        }).catch(err => console.error(err));
    };
};

const receiveWishes = function (wishes) {
    console.log('da wishes', wishes)
    return {
        type: RECEIVE_WISHES,
        wishes
    };
};

//async action creator
export const loadWishes = function (starId) {
    return function (dispatch) {
        fetch('/api/wishes/' + starId)
        .then(res => res.json())
        .then(wishes => {
            const action = receiveWishes(wishes);
            dispatch(action);
        }).catch(err => console.error(err));
    };
};

//action creator for creating star
const getNewStar = function (star) {
    return {
        type: CREATE_STAR,
        star
    };
};

//async action creator POSTS (creats) new star
export const addStar = data =>
    dispatch => {
        const body = JSON.stringify(data),
        method = 'POST',
        headers = new window.Headers({
            'Content-Type': 'application/json'
        });

        return fetch('/api/stars', { method, body, headers })
        .then(res => res.json())
        .then(star => {
            dispatch(getNewStar(star));
        });
    };

const receiveStar = function (star) {
    return {
        type: SELECT_STAR,
        star
    };
};

export const loadStar = function (starId) {
    console.log('STARR',starId)
    return function (dispatch) {
        fetch('/api/stars/' + starId)
        .then(res => res.json())
        .then(star => {
            const action = receiveStar(star);
            dispatch(action);
        }).catch(err => console.error(err));
    };
};

const getNewWish = function (wish) {
    return {
        type: CREATE_WISH,
        wish
    };
};

//make sure it's getting the starId!!!
export const addWish = (data, starId) => 
    dispatch => {
        const body = JSON.stringify(data),
        method = 'POST',
        headers = new window.Headers({
            'Content-Type': 'application/json'
        });

        return fetch('/api/wishes/' + starId, { method, body, headers })
        .then(res => res.json())
        .then(wish => {
            dispatch(getNewWish(wish));
        });
    };

const toDelete = function (wishId) {
    return {
        type: DELETE_WISH,
        wishId
    }
}

//what's the syntax for deleting w fetch?
export const deleteWish = wishId => dispatch => { 
    dispatch(toDelete(wishId)) //deletes from the store
    fetch(`/api/wishes/${wishId}`) //deletes from the database
        .catch(err => console.error(err))
}



