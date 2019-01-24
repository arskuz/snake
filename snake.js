
const MAP_SIZE = 19


let fail = 0

let snake_head = new Map()
snake_head.x = 9
snake_head.y = 9
snake_head.orient = 8//down
snake_head.len = 2

let apple = new Map()
apple.x = 5
apple.y = 5

function apple_gen(){
  let noap = 1
  while(noap==1){
    apple.x=random_gen(1,MAP_SIZE-1)
    apple.y=random_gen(1,MAP_SIZE-1)
  if(check_solids(apple.x,apple.y)==0)
    {noap = 0}
  }
}

function random_gen(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

function add_listeners(){
  document.addEventListener("keydown", function(event){
    if(event.keyCode==68){
      rotate(6)}
    else if(event.keyCode == 65){
      rotate(4)}
    else if(event.keyCode==87){
      rotate(8)}
    else if(event.keyCode==83){
      rotate(2)}
    })
  }


let solids = [];
for (let j = 0; j <= MAP_SIZE; j++){
  solids[j] = [];
  for (let jj = 0; jj <= MAP_SIZE; jj++){
     solids[j][jj] = 0;
}}

function check_solids(sx,sy){
    if(solids[sx][sy]>0)
      {return 1}
    else {
      return 0
    }
}

function kill_solids(){
  for (let j = 0; j <= MAP_SIZE; j++){
    for (let jj = 0; jj <= MAP_SIZE; jj++){
      if(solids[j][jj]>0)
        {solids[j][jj]--}
}
}
}

function add_to_solids(){
  for (let j = 0; j <= MAP_SIZE; j++){
    for (let jj = 0; jj <= MAP_SIZE; jj++){
      if(solids[j][jj]>0)
        {solids[j][jj]++}
}
}
}


function oppdir(dir1,dir2){
  if(dir1==8 && dir2==2){return 1}
  if(dir2==8 && dir1==2){return 1}
  if(dir1==4 && dir2==6){return 1}
  if(dir2==4 && dir1==6){return 1}
}

function rotate(newdir){
  if(oppdir(newdir,snake_head.orient))
    {return}
  else
  {snake_head.orient = newdir}
}

var div = document.createElement('div')
document.body.appendChild(div)

div.style.cssText="font-family: monospace; \
";

function snake_move(){
  if(snake_head.orient==8)
      {snake_head.y--}
  else if(snake_head.orient==2)
      {snake_head.y++}
  else if(snake_head.orient==4)
      {snake_head.x--}
  else
      {snake_head.x++}

  if(snake_head.x==MAP_SIZE||snake_head.y==MAP_SIZE||snake_head.x==0||snake_head.y==0)
    {fail=1}
  if(check_solids(snake_head.x,snake_head.y)==1)
    {fail=1}
  if(snake_head.len>0)
      {solids[snake_head.x][snake_head.y] = snake_head.len}
  if(apple.x==snake_head.x&&apple.y==snake_head.y){
    apple_gen()
    snake_head.len++
    add_to_solids()}
    }

function update_map(){
  div.innerHTML = " ";

  if(fail==0){
    snake_move()
    kill_solids()
  }

  for(let j = 1; j<MAP_SIZE; j++) {
    for(let i = 1; i<MAP_SIZE; i++) {
      if(i==snake_head.x&&j==snake_head.y)
        {div.innerHTML+="S"}
      else if(i==apple.x&&j==apple.y)
        {div.innerHTML+="♦"}
      else if(check_solids(i,j)==1)
        {div.innerHTML+="S"}
      else
        {div.innerHTML+="_"}
      if(i==MAP_SIZE-1)
        {div.innerHTML+='<br />'}

    }
  }
}


add_listeners()

setTimeout(function remap() {
  if(fail==1)
    {div.innerHTML+="Your snake is dead! Bwahahahahahah!"}
  else
    {
      update_map();
      setTimeout(remap, 666);}
}, 666);
