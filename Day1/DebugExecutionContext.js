function a() {
  console.log("A start");
  b();
  console.log("A end");
}

function b() {
  console.log("B start");
  console.trace("Trace in B");
  console.log("B end");
}

a();

//Output
//A start 
//B start 
//Trace: Trace in B 
//... 
//B end 
//A end