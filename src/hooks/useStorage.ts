const useStorage = () => {
  const prefix = "APP_"

  const get = (key: string, notParse?: boolean) => {
    const storage = window.localStorage.getItem(prefix + key)

    if(notParse){
      return storage || {}  
    }

    return JSON.parse(storage) || {}    
  }

  const set = (key: string,value: string, notParse?: boolean) => {
    window.localStorage.setItem(prefix + key, notParse? value : JSON.stringify(value) )
  }

  const reset = (key: string) => {
    window.localStorage.setItem(prefix + key, null)
  }

  const clear = (key:string) => {
    window.localStorage.removeItem(prefix + key)
  }

  return {
    getStorage: get,
    setStorage: set,
    resetStorage: reset,
    clearStorage: clear
  }


}

export default useStorage