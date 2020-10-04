export default class Section {
  constructor(name, info) {
    this.name = document.querySelector(name);
    this.info = document.querySelector(info);
  }

  getUserInfo() {
    return this.obj = { name: this.name.textContent, info: this.info.textContent };
  }

  setUserInfo(data) {
    this.name.textContent = data.name;
    this.info.textContent = data.info;
  }

  // console() {console.log(this.name, this.info)}

}
