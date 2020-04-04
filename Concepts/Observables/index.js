
var button = document.querySelector('button');

var observer ={
    next: function (value){
        console.log(value);
    },
    error: function(error){
        console.log(error);
        
    },
    complete: function(){
        console.log('completed');
        
    }
}

/* Rx.Observable.fromEvent(button,'click')
.subscribe((value)=>{
    console.log(value.clientX);
}) */

Rx.Observable.fromEvent(button,'click')
.subscribe(observer)

console.log(Rx);
