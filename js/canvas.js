// $(function(){
//     var balls = [];
//     var edge = 0;
//     var canvas = $("#head_canvas");
//     var w = canvas[0].clientWidth;
//     var h = canvas[0].clientHeight;
//     canvas.attr("width",w)
//     canvas.attr("height",h)
//     window.onresize = function () {
//         w = canvas[0].clientWidth;
//         h = canvas[0].clientHeight;
//         canvas.attr("width",w)
//         canvas.attr("height",h)
//     }
//     function init(){
//         console.log(1111111)
//         var c = canvas[0].getContext("2d");
//         c.clearRect(0,0,w,h);
//         balls.map((v,i) => {
//             v.render(c);
//             if(new Date().getTime() - v.t > 6000){
//                 balls.splice(i,1);
//             }
//         })
//         requestAnimationFrame(init);
//     }
//     this.timer = setInterval(() => {
//         balls.push(new ball());
//     },1000)
//     requestAnimationFrame(init);

//     function ball () {
//         this.x = Math.random();
//         this.y = Math.random();
//         this.r = parseInt(Math.random()*10) + 10;
//         this.color = `rgb(${parseInt(Math.random()*255)},${parseInt(Math.random()*255)},${parseInt(Math.random()*255)})`;
//         this.a = 1;
//         this.v = 0;
//         this.t = new Date().getTime();
//     }
//     ball.prototype.render = function (ctx) {
//         var x = parseInt(this.x*w);
//         var y = parseInt(this.y*(h - 20));
//         var radiaGradient = ctx.createRadialGradient(x,y,0,x,y,this.r);
//         radiaGradient.addColorStop(0,"#fff");
//         radiaGradient.addColorStop(1,this.color);
//         ctx.save();
//         ctx.beginPath();
//         ctx.fillStyle = radiaGradient;
//         ctx.arc(x,y,this.r,0,Math.PI*2,false);
//         ctx.fill();
//         ctx.restore();
//         this.v = this.v + this.a/h;
//         this.y = this.y + this.v;
//         if(parseInt(this.y*h) >= h-20){
//             this.y = (h-20)/h;
//             this.v *= -0.9;
//         }
//     }
// })
$(function(){
    var grasses = [];
    var edge = 0;
    var turns = 0;
    var stars = [];
    var canvas1 = $("#head_canvas1");
    var canvas2 = $("#head_canvas2");
    var w = canvas1[0].clientWidth;
    var h = canvas1[0].clientHeight;
    canvas1.attr("width",w);
    canvas1.attr("height",h);
    canvas2.attr("width",w);
    canvas2.attr("height",h);
    for(var i=0;i<150;i++){
        grasses.push(new grass());
    }
    for(var i=0;i<100;i++){
        stars.push(new star);
    };
    window.onresize = function () {
        w = canvas1[0].clientWidth;
        h = canvas1[0].clientHeight;
        canvas1.attr("width",w);
        canvas1.attr("height",h);
        canvas2.attr("width",w);
        canvas2.attr("height",h);
        sky();
    }
    requestAnimationFrame(init);
    sky();

    function init() {
        var c = canvas2[0].getContext("2d");
        c.clearRect(0,0,w,h);
        c.save();
        grasses.map((v,i) => {
            v.render(c,edge);
        })
        stars.map((v,i) => {
            v.render(c);
        })
        c.restore();
        edge+=0.05;
        if(edge>=Math.PI*2){
            edge = 0;
        }
        requestAnimationFrame(init);
    }
    function sky() {
        var c = canvas1[0].getContext("2d");
        c.clearRect(0,0,w,h);
        var radiaGradient = c.createRadialGradient(200,h/2,0,200,h/2,1400);
        radiaGradient.addColorStop(0,"#132D81");
        radiaGradient.addColorStop(1,"rgba(1,14,22,0.8)");;
        c.fillStyle = radiaGradient;
        c.arc(200,h/2,1400,0,Math.PI*2,true);
        c.fill();
        c.restore(); 
        
        c.save();
        c.beginPath();
        c.fillStyle = "#fff";
        c.arc(200,h/2,30,0,Math.PI*2,true);
        c.shadowOffsetX = 0;
        c.shadowOffsetY = 0;
        c.shadowColor = "#fff";
        c.shadowBlur = 50;
        c.fill();
        c.restore();
    }
    function grass() {
        this.x = Math.random();
        this.w = Math.random();
        this.sin = Math.random()*Math.PI*2;
        
    }
    grass.prototype.render = function(ctx,sin) {
        ctx.save();
        ctx.beginPath();
        let x = parseInt(this.x*w);
        let gw = parseInt(this.w*(h/26));
        let ys = h;
        let ye = ys - (gw * 20);
        ctx.moveTo(x-gw/2,ys);
        let lineGradient = ctx.createLinearGradient(x,ys,x,ye);
        lineGradient.addColorStop(0,"#135211");
        lineGradient.addColorStop(1,"#66A729");
        ctx.fillStyle = lineGradient;
        ctx.quadraticCurveTo(x-gw/3,ys - (ys-ye)/2,x+Math.sin(sin+this.sin)*gw*5,ye);
        ctx.quadraticCurveTo(x+gw/3,ys - (ys-ye)/2,x+gw/2,ys);
        ctx.fill();
        ctx.restore();
    }
    function star() {
        this.x = Math.random();
        this.y = Math.random();
        this.r = Math.random()*1.2;
        this.start =  Math.random();
    }
    star.prototype.render = function(ctx) {
        var cy = 3;//周期
        var date = new Date();
        var ms = date.getMilliseconds() + (date.getSeconds()%cy+1)*1000 + this.start*cy*1000;
        var yu = ms%(cy*1000);
        var r = yu<cy*1000/2 ? 0.5 + yu/(cy*1000/2) : 0.5 + (cy*1000 - yu)/(cy*1000/2);
        ctx.save();
        ctx.beginPath();
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 2;
        ctx.shadowColor = "#f3daa1";
        ctx.fillStyle = "rgba(243, 218, 161, 0.8)";
        ctx.arc(parseInt(this.x*w),parseInt(this.y*h),this.r*r,0,Math.PI*2,true);
        ctx.fill();
        ctx.restore();
    }
})