const storage = window.require('electron-json-storage')

export function getDataFromStorage(key) {
  return new Promise((resolve, reject) => {
    storage.get(key, (err, data) => {
        if (err) reject(err)
        resolve(data)
    })
  })
}

export function setDataToStorage(key, data) {
  storage.set(key, data)
}
