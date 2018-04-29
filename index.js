var express=require('express');
//var bodyParser=require('body-parser');

var app=express();

//app.use(bodyParser.urlencoded({ extended:false}));

app.get('/:dd', function(req, res){
  var regexp=/[^0-9]/g;
  var timestr=req.params.dd;
  if(regexp.test(timestr)==false){
      timestr=parseInt(timestr)*1000;
      var timeval=new Date(timestr);

      if(timeval=='Invalid Date')
      {
        var result='{"unix":null, "natural": null}';
      }
      else {
        var monthnames=['January','Feburary','March','April','May','June','July','August','September','Octorber','November','December'];
        var unixval=Math.floor(timeval.getTime()/1000+0.5);
        var dayval=timeval.getUTCDate();
        var monthval=monthnames[timeval.getUTCMonth()];
        var yearval=timeval.getUTCFullYear();
        var result={"unix":unixval,"natural":monthval+' '+dayval+', '+yearval};
        result=JSON.stringify(result);
      }
  }

  else
  {
    var timeval=new Date(timestr);

    console.log(timeval);
    if(timeval=='Invalid Date')
    {
      var result='{"unix":null, "natural": null}';
    }
    else {
      console.log("here");
      var monthnames=['January','Feburary','March','April','May','June','July','August','September','Octorber','November','December'];
      var unixval=Math.floor(timeval.getTime()/1000+0.5);
      var dayval=timeval.getUTCDate();
      var monthval=timeval.getUTCMonth();
      var monthstr=monthnames[monthval];
      var yearval=timeval.getUTCFullYear();
      timeval=new Date(yearval, monthval, dayval,0,0,0,0);
      unixval=Math.floor(timeval.getTime()/1000+0.5);
      var result={"unix":unixval,"natural":monthstr+' '+dayval+', '+yearval};
      result=JSON.stringify(result);
    }
  }
  console.log(result);
  res.send(result);

});

app.get('/*', function(req, res){
  res.send('invalid url or date');
});

app.listen(3002);
