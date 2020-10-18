export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
    this._body = config.body;
  }

  getInitialData() {
    return Promise.all([this.getUserInfo(),this.getAllCards()])
  }

  getAllCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    }).then((res) => {

      if (res.ok) {
        return res.json()
      } return Promise.reject()
    })
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    }).then((res) => {

      if (res.ok) {
        return res.json()
      } return Promise.reject()
    })
  }

  updateUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then((res) => {

      if (res.ok) {
        return res.json()
      } return Promise.reject()
    })
  }

  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then((res) => {

      if (res.ok) {
        return res.json()
      } return Promise.reject()
    })
  }

  deleteCard(data) {
    return fetch(`${this._url}/cards/${data._id}`, {
      method: 'DELETE',
      headers: this._headers
    }).then((res) => {
      if (res.ok) {
        return res.json()
      } return Promise.reject()
    })
  }

  likeCard(data) {
    return fetch(`${this._url}/cards/likes/${data._id}`, {
      method: 'PUT',
      headers: this._headers
    }).then((res) => {
      if (res.ok) {
        return res.json()
      } return Promise.reject()
    })
  }

  dislikeCard(data) {
    return fetch(`${this._url}/cards/likes/${data._id}`, {
      method: 'DELETE',
      headers: this._headers
    }).then((res) => {
      if (res.ok) {
        return res.json()
      } return Promise.reject()
    })
  }

  updatePhotoCard(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data,
      })
    }).then((res) => {

      if (res.ok) {
        return res.json()
      } return Promise.reject()
    })
  }

}
