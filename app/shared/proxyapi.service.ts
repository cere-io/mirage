export function esRequest(method:string, esUrl:string) {
  const msg = {
    rid: (new Date()).getTime(),
    type: 'es.api.request',
    esUrl,
    method,
  }

  return new Promise((resolve, reject) => {
    const resolver = (e) => {
      const {data, type} = e;
      console.log('response', data);
      if(type === 'message' && data.type === 'es.api.response' && msg.rid === data.rid) {
        window.removeEventListener('message', resolver, false);
        resolve({json: data.json});
      }
    }

    window.addEventListener('message', resolver, false);
    
    //reject('timeout');
    window.parent.postMessage(msg, "*");
  });

}