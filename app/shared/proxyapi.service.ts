const targetWindow = window.parent;

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
        resolve({json: data.json});
      }
    }

    window.addEventListener('message', resolver, false);
    
    //reject('timeout');
    targetWindow.postMessage(msg, "*");
  });

}