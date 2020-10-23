//entrys for main menu
var entrys = [
{name: "open", url:"apps/run/index.html"},
{name: "bing", url:"https://www.bing.com"},
{name: "calculator", url:"https://www.desmos.com/scientific"},
{name: "vm_in_browser", url:"https://copy.sh/v86/"},
{name: "clock", url:"apps/clock/index.html"},
{name: "terminal", url:"apps/terminal/index.html"}//,
//{name: "awfice text editor", url:"data:text/html,<body contenteditable style=line-height:1.5;font-size:20px>"},
//{name: "awfice spreadsheet", url:"data:text/html,<table id=t><script>z=Object.defineProperty,p=parseFloat,s='style';for(I=[],D={},C={},q=_=>I.forEach(e=>{try{e.value=D[e.id]}catch(e){}}),t[s].borderCollapse='collapse',i=0;i<101;i++)for(r=t.insertRow(-1),j=0;j<27;j++)c=String.fromCharCode(65+j-1),d=r.insertCell(-1),d[s].border='1px solid gray',d[s].textAlign='right',d.innerHTML=i?j?'':i:c,i*j&&I.push(d.appendChild((f=>(f.id=c+i,f[s].border='none',f[s].width='4rem',f[s].textAlign='center',f.onfocus=e=>f.value=C[f.id]||'',f.onblur=e=>{C[f.id]=f.value,q()},get=_=>{v=C[f.id]||'';if('='!=v.charAt(0))return isNaN(p(v))?v:p(v);with(D)return eval(v.slice(1))},a={get},z(D,f.id,a),z(D,f.id.toLowerCase(),a),f))(document.createElement`input`)))</script>"},
//{name: "awfice drawing app", url:"data:text/html,<canvas id=v><script>d=document,d.body.style.margin=0,P='onpointer',c=v.getContext`2d`,v.width=innerWidth,v.height=innerHeight,c.lineWidth=2,f=0,d[P+'down']=e=>{f=e.pointerId+1;e.preventDefault();c.beginPath();c.moveTo(e.x,e.y)};d[P+'move']=e=>{f==e.pointerId+1&&c.lineTo(e.x,e.y);c.stroke()},d[P+'up']=_=>f=0</script></canvas>"},
//{name: "awfice presentation maker", url:"https://htmlpreview.github.io/?https://github.com/zserge/awfice/blob/main/beam.html"}//changed to web page adress because it was not working
];
