function getUniqueId(parts: number): string {
  const stringArr = [];
  for(let i = 0; i< parts; i++){
    // tslint:disable-next-line:no-bitwise
    const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    stringArr.push(S4);
  }
  return stringArr.join('-');
}

export function esRequest(method:string, esUrl:string, payload) {
  const msg = {
    rid: getUniqueId(2),
    type: 'es.api.request',
    esUrl,
    method,
    payload,
  }

  return new Promise((resolve, reject) => {
    const resolver = (e) => {
      const {data, type} = e;
      console.log('response', data);
      if(type === 'message' && data.type === 'es.api.response' && msg.rid === data.rid) {
        window.removeEventListener('message', resolver, false);
        if(data.error) {
          reject(data.error);
        } else {
          resolve({json: data.json});
        }
      }
    }

    const timeout = () => {
      window.removeEventListener('message', resolver, false);
      reject('timeout');
    }

    setTimeout(timeout, 30000);

    window.addEventListener('message', resolver, false);
    window.parent.postMessage(msg, "*");
  });

}