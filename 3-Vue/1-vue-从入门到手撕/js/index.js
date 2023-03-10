const user = {
  name: '愿景',
  birth: '2002-5-7'
}

observe(user)

function showFirstName() {
  const firstName = document.querySelector('#firstName')
  firstName.textContent = '姓：' + user.name[0]
}

function showLastName() {
  const lastName = document.querySelector('#lastName')
  lastName.textContent = '名：' + user.name.slice(1)
}

function showAge() {
  const age = document.querySelector('#age')
  age.textContent = '年龄：' + user.birth
}


autoRun(showFirstName)
autoRun(showLastName)
autoRun(showAge)
