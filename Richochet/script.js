// Look at this: https://www.youtube.com/watch?v=I6AyJLMw6lQ
const rows=16;
const cols=16;
window.onscroll = () => { window.scroll(0, 0); };
var taken=[];
var right=[];
var left=[];
var roof=[];
var bottom=[];

window.onload = function(){
    
    //Walls
    for(let i=0; i<8; i++){
        x=Math.floor(Math.random()*rows/2)+1;
        let n=x+7;
        let text;
        //console.log(i+": "+x);
        switch(i){
            case 0:
                text=1+","+x;
                taken.push(text);
                left.push(text);
                break;
            case 1:
                text=1+","+n;
                taken.push(text);
                right.push(text);
                break;
            case 2:
                text=16+","+x;
                taken.push(text);
                left.push(text);
                break;
            case 3:
                text=16+","+n;
                taken.push(text);
                right.push(text);
                break;
            case 4:
                text=x+","+1;
                taken.push(text);
                bottom.push(text);
                break;
            case 5:
                text=n+","+1;
                taken.push(text);
                roof.push(text);
                break;
            case 6:
                text=x+","+16;
                taken.push(text);
                bottom.push(text);
            case 7:
                text=n+","+16;
                taken.push(text);
                roof.push(text);
                break;
            default:
                alert("Faulty program");
                break;
        }
    } 
    for(let i=0; i<16; i++){
        
        var thispos;
        var j=0;
        var x;
        var y;
        
        do{
            
            j++;
            x=Math.floor(Math.random() * 14) +2;
            y=Math.floor(Math.random() * 14) +2;
            thispos=x+"," +y;
            var xneg=x-1;
            var yneg=y-1;
            var xpos=x+1;
            var ypos=y+1;
        } while(
            taken.includes( xneg+","+  ypos) || taken.includes( xneg+","+  y) || taken.includes( xneg+","+  yneg) || 
            taken.includes( x+","+  ypos) || taken.includes( x+","+  y) || taken.includes( x+","+  yneg)|| 
            taken.includes( xpos+","+  ypos) || taken.includes( xpos+","+  y) || taken.includes( xpos+","+  yneg) ||
            (y>=rows/2-1 && y<=rows/2+2 && x>=cols/2-1 && x-1<=cols/2+2));
        if(i<4){ 
            left.push(thispos); 
            bottom.push(thispos);
        } else if(i<8){ 
            right.push(thispos); 
            bottom.push(thispos);
        } else if(i<12){ 
            left.push(thispos);
            roof.push(thispos);
        } else{ 
            right.push(thispos);
            roof.push(thispos);
        }
        taken.push(thispos);
    }
    
    //Create Grid
    table=document.createElement("Table");
    for(var i=1;i<rows+1; i++){
        row=document.createElement("TR");
        for(var j=1;j<cols+1; j++){
            let td=document.createElement("TD");
            var id=i+","+j;
            if(taken.includes(id)){
                if(right.includes(id)){
                    td.style.borderRight="5px solid black"; 
                }
                if(left.includes(id)){
                    td.style.borderLeft="5px solid black"; 
                }
                if(roof.includes(id)){
                    td.style.borderTop="5px solid black";
                }
                if(bottom.includes(id)){
                    td.style.borderBottom="5px solid black";
                }


            }
            td.setAttribute("id",i+","+j);
            
            if(j==1){
                
                td.style.borderLeft=" 5px solid black";
            }
            if(j==cols){
                
                td.style.borderRight=" 5px solid black";
            }
            if(i==1){
                td.style.borderroof=" 5px solid black";
            }
            if(i==rows){
                td.style.borderBottom=" 5px solid black";
            }

            if(i>=rows/2 && i<=rows/2+1 && j>=cols/2 && j<=cols/2+1){
                td.style.backgroundColor="black";
            }


            row.appendChild(td);
            
        }
        table.appendChild(row);
    }
    document.getElementById("body").appendChild(table)

    //Robots

    for (let i = 0; i < 4; i++) {
        let x;
        let y;

        do{
            x=Math.floor(Math.random()*15)+1;
            y=Math.floor(Math.random()*15)+1;
        } while(taken.includes(x+","+y) || (y>=rows/2-1 && y<=rows/2+2 && x>=cols/2-1 && x-1<=cols/2+2))


        switch (i) {
            case 0:
                createRobot(x, y, "red");
                break;
            case 1:
                createRobot(x, y, "blue");

                break;
            case 2:
                createRobot(x, y, "yellow");

                break;
            case 3:
                createRobot(x, y, "green");

                break;
        
            default:
                alert("Invalid Input");
                break;
        }
        
    }
}
//Targeting
function Click(element){
    const targets=document.getElementsByClassName("target");
    if(element.classList.contains("target")){
        element.classList.remove("target")
    } else{
        if(targets.length>0){
            targets[0].classList.remove("target");
        }
         
        element.classList.add("target");
    }
    
}
//Travelling
document.addEventListener('keypress', checkkey);

function checkkey(event){

    if(document.getElementsByClassName("target").length==1){
        console.log("Here")
        let ID=document.getElementsByClassName("target").id;
        console.log(ID);
        let positions=id.split(',');
        var x=positions[0];
        var y=positions[1];
        document.getElementById(id).classList.remove("target");

        if (event== 'w') {
            // up arrow
            document.getElementById(x+","+ y+1);
            alert("here");
        }
        else if (event.keyCode == '40') {
            // down arrow
        }
        else if (event.keyCode == '37') {
           // left arrow
        }
        else if (event.keyCode == '39') {
           // right arrow
        }
    }
}
function createRobot(posX, posY, robot){
    const formerrobot=document.getElementsByClassName(robot);
    if(formerrobot.length>0){
        formerrobot.forEach(element => {
            element.remove;
        });
    }
    

    let position=document.getElementById(posX+","+posY);

    let div=document.createElement("DIV");
    div.classList.add(robot);
    div.classList.add("robot");
    div.setAttribute("onclick", "Click(this)")
    position.appendChild(div);

}