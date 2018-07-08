//We will define actions that will dispatch actions to our redux store
import axios from 'axios';

//const url = "http://localhost:5000/api/"
const url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/api/";

export function loadArticles() {
    return (dispatch) => {
        axios.get(`${url}articles`).then((res) => {
            let articles = res.data
            dispatch({
                type: 'LOAD_ARTICLES',
                articles
            }).catch(error => console.log('Load article icinde error var: ', error))
        })
    }
}

export function getUser(_id) {
    return (dispatch) => {
        axios.get(`${url}user/${_id}`).then((res) => {
            return res.data
        }).catch( error => console.log('getUser yaparken error oldu: ', error))
    }
}

export function getUserProfile(_id) {
    return (dispatch) => {
        axions.get(`${url}user/profile/${_id}`).then((res) => {
            let profile = res.data;
            dispatch({
                type: 'SET_PROFILE',
                profile
            })
        }).catch( error => console.log('getUserProfile içinde error olustu: ', error))
    }
}

export function getArticle(article_id) {
    return (dispatch) => {
        axios.get(`${url}article/${article_id}`).then((res) => {
            let article = res.data;
            dispatch({
                type: 'VIEW_ARTICLE',
                article
            })
        }).catch( error => console.log('Article alınırken bir sorun oluştu, oluşan sorun şu: ', error))
    }
}

// article_id, author_id, comment
export function comment () {
    return (dispatch) => {

    }
}
// res.body.article_id
// post methodunda ilgili endpoint'de article_id parametresini bir javascript objesi olarak geçiyoruz.
export function clap (article_id) {
    return (dispatch) => {
        axios.post(`${url}article/${article_id}`, {article_id}).then((res) => {
            dispatch({
                type: 'CLAP_ARTICLE'
            })
        }).catch( error => console.log('Clap ile votelarken bir sorun oluştu: ', error))
    }
}

export function follow (_id, user_id) {
    return (dispatch) => {
        axios.post(`${url}user/follow`, {_id, user_id}).then((res) => {
            dispatch({
                type: 'FOLLOW_USER',
                user_id
            })
        }).catch( error => console.log('Followlarken bir sorun oluştu: ', error))
    } 
}

export function SignInUser (user_data) {
    return (dispatch) => {
        axios.post(`${url}user`, {user_data}).then((res) => {
            let user = res.data
            localStorage.setItem('Auth', JSON.stringify(user))
            dispatch({
                type: 'SET_USER',
                user
            })
        })
    }
}

export function toggleClose() {
    return (dispatch) => {
        dispatch({
            type: 'TOGGLE_MODAL', 
            modalMode: false
        })
    }
}
export function toggleOpen() {
    return (dispatch) => {
        dispatch({
            type: 'TOGGLE_MODAL', 
            modalMode: true
        })        
    }    
}

