var httpRequest=new XMLHttpRequest();
var location;
httpRequest.open("GET","http://api.weatherapi.com/v1/current.json?key=b6a1837e79404d5ba5d143116210305&q=Egypt");
httpRequest.send();
httpRequest.addEventListener("readystatechange",function(){
      if(httpRequest.readyState==4&&httpRequest.status==200)
      {
            location=JSON.parse(httpRequest.response);
            console.log(location)
      }
})