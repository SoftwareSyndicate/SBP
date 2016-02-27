

class NotificationService {
  constructor() {
    this.listeners = {};
  }

  listenFor(eventName, listener, binder){
    var group = this.listeners[eventName];
    if(!group){
      group = [];
      this.listeners[eventName] = group;
    }

    var l = {};
    l.eventName = eventName;
    l.listener = listener;
    l.binder = binder;

    group.push(l);
  }

  notify(eventName){
    var group = this.listeners[eventName];
    console.log(eventName);
    if(group){
      group.forEach((l)=>{
        if('binder' in l){
          l.listener.apply(l.binder,arguments);
        } else {
          l.listener.apply(l.listener, arguments);
        }
      });
    }
  }

  removeListener(eventName, listener){
    var group = this.listeners[eventName];

    if(group){
      group.forEach(function(l,ix){
        if(l.listener===listener){
          group.splice(ix,1);
        }
      });
    }
  }
}

module.exports = new NotificationService();
export default module.exports;
