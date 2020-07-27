const targetWindow = window.parent;

export function getRequest2(esUrl:string) {
  const msg = {
    rid: (new Date()).getTime(),
    type: 'es.api.request',
    esUrl,
    method: 'GET',
    timestamp: new Date(),
  }

  return new Promise((resolve, reject) => {
    const resolver = (e) => {
      const {data, type} = e;
      //debugger;
      if(type === 'message' && data.type === 'es.api.response' && msg.rid === data.rid) {
        resolve({json: data.json});
      }
    }

    window.addEventListener('message', resolver, false);
    
    //reject('timeout');
    targetWindow.postMessage(msg, "*");
  });

}