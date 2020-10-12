export default class Section {
  constructor(name, about) {
    this.name = document.querySelector(name);
    this.about = document.querySelector(about);
  }

  getUserInfo() {
    return this.obj = { name: this.name.textContent, about: this.about.textContent };
  }

  setUserInfo(data) {
    this.name.textContent = data.name;
    this.about.textContent = data.about;
  }


}
