
const rows=16;
const cols=16;
window.onscroll = () => { window.scroll(0, 0); };
var moves=0;
var totalmoves=0;
var taken=[];
var goalpositions=[];
var right=[];
var left=[];
var roof=[];
var bottom=[];
var wonsquares=[];
var startBlue;
var startRed;
var startYellow;
var startGreen;




window.onload = function(){
    
    //Walls
    for(let i=0; i<8; i++){
        x=Math.floor(Math.random()*rows/2);
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
        goalpositions.push(thispos);
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
            td.setAttribute('id',i+","+j);
            
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
                td.classList.add("black");
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
        } while(taken.includes(x+","+y) 
        || (y>=rows/2-1 && y<=rows/2+2 && x>=cols/2-1 && x-1<=cols/2+2) 
        || document.getElementById(x+","+y).classList.contains("robot"));


        switch (i) {
            case 0:
                createRobot(x, y, "red", false);
                break;
            case 1:
                createRobot(x, y, "blue", false);
                break;
            case 2:
                createRobot(x, y, "yellow", false);
                break;
            case 3:
                createRobot(x, y, "green", false);
                break;
            default:
                alert("Invalid Input");
                break;
        }        
    }
    goal();
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
document.onkeydown=checkkey;
function checkkey(event){

    if(event.keyCode=="82"){
        //Reset button
        let blueValues=startBlue.split(',');
        let greenValues=startGreen.split(',');
        let redValues=startRed.split(',');
        let yellowValues=startYellow.split(',');
       


        createRobot(blueValues[0],blueValues[1],"blue",false);
        createRobot(greenValues[0],greenValues[1],"green",false);
        createRobot(redValues[0],redValues[1],"red",false);
        createRobot(yellowValues[0],yellowValues[1],"yellow",false);
        moves=0;
        
    }

    
    if(document.getElementsByClassName("target").length==1){
        let element=document.getElementsByClassName("target")[0].parentNode;

        let ID=element.id;
        console.log(element);
        console.log(ID+" ");
        let positions=ID.split(',');
        var x=positions[0];
        var y=positions[1];
        console.log(x+","+y);
        
        let startX=x;
        let startY=y;
        let xAdd=1*x+1;
        let xSub=1*x-1;
        let ySub=1*y-1;
        let yAdd=1*y+1;

        if (event.keyCode== '38' && document.getElementById(xSub+","+y)) {
            // up arrow
            console.log(roof.includes(x+","+y));
            console.log(bottom.includes(xSub+","+y));
            console.log(document.getElementById(xSub+","+y).classList.contains("robotArea"));
            
            while(!(roof.includes(x+","+y) || bottom.includes(xSub+","+y) || 
            document.getElementById(xSub+","+y).classList.contains("robotArea") || 
            document.getElementById(xSub+","+y).classList.contains("black"))){
                console.log(document.getElementById(xSub+","+y));
                xSub--;
                x=1*x-1;
                if(!(document.getElementById(xSub+","+y))){
                    break;
                };
            }
            

        }
        else if (event.keyCode == '40' && document.getElementById(xAdd+","+y)) {
            // down arrow
            console.log(roof.includes(x+","+y));
            console.log(bottom.includes(xAdd+","+y));
            console.log(document.getElementById(xAdd+","+y).classList.contains("robotArea"));
            
            while(!(bottom.includes(x+","+y) || roof.includes(xAdd+","+y) || 
            document.getElementById(xAdd+","+y).classList.contains("robotArea") || 
            document.getElementById(xAdd+","+y).classList.contains("black"))){
                console.log(document.getElementById(xAdd+","+y));
                xAdd++;
                x=1*x+1;
                if(!(document.getElementById(xAdd+","+y))){
                    break;
                };
            }
            
        }
        else if (event.keyCode == '37' && document.getElementById(x+","+ySub)) {
            // left arrow
            console.log(roof.includes(x+","+y));
            console.log(bottom.includes(x+","+ySub));
            console.log(document.getElementById(x+","+ySub).classList.contains("robotArea"));
            
            while(!(left.includes(x+","+y) || right.includes(x+","+ySub) || 
            document.getElementById(x+","+ySub).classList.contains("robotArea") || 
            document.getElementById(x+","+ySub).classList.contains("black"))){
                console.log(document.getElementById(x+","+ySub));
                ySub--;
                y=1*y-1;
                if(!(document.getElementById(x+","+ySub))){
                    break;
                };
            }
        }
        else if (event.keyCode == '39' && document.getElementById(x+","+yAdd)) {
            // right arrow
            console.log(roof.includes(x+","+yAdd));
            console.log(bottom.includes(x+","+yAdd));
            console.log(document.getElementById(x+","+yAdd).classList.contains("robotArea"));
            
            while(!(right.includes(x+","+y) || left.includes(x+","+yAdd) || 
            document.getElementById(x+","+yAdd).classList.contains("robotArea") || 
            document.getElementById(x+","+yAdd).classList.contains("black"))){
                console.log(document.getElementById(x+","+yAdd));
                yAdd++;
                y=1*y+1;
                if(!(document.getElementById(x+","+yAdd))){
                    break;
                };
            }
        }
        var color;
        if(!(startX==x && startY==y)){
            moves++;
            if(document.getElementsByClassName("target")[0].classList.contains("red"   )){
                createRobot(x,y,"red"   ); 
                color="red";
            }
            if(document.getElementsByClassName("target")[0].classList.contains("blue"  )){
                createRobot(x,y,"blue"  ); 
                color="blue";
            }
            if(document.getElementsByClassName("target")[0].classList.contains("yellow")){
                createRobot(x,y,"yellow"); 
                color="yellow";
            }
            if(document.getElementsByClassName("target")[0].classList.contains("green" )){
                createRobot(x,y,"green" ); 
                color="green";
            }
        }
        
        console.log(color);
        document.getElementById("moves").innerHTML="Moves: "+moves;
        console.log(document.getElementsByClassName("target")[0])
        let parent=document.getElementsByClassName("target")[0].parentNode;
        console.log(parent.classList.contains("goal"));
        console.log(parent.classList.contains(color));
        console.log(parent);
        console.log(parent.classList.contains(color+" goal"))
        if(parent.classList.contains("goal") && parent.classList.contains(color)){
            goal();
        } 
        
    }
}
function createRobot(posX, posY, robot, stayTargeted=true){
    const formerrobot=document.getElementsByClassName(robot+ " robot");
    
    if(formerrobot.length>0){

        console.log(formerrobot[0].parentNode);
        const robotpos=formerrobot[0].parentNode;
        formerrobot[0].remove();
        
        robotpos.classList.remove("robotArea");
        
    }
    
    

    let position=document.getElementById(posX+","+posY);

    let div=document.createElement("DIV");
    if(stayTargeted){
        div.classList.add("target");
    } 
    div.classList.add(robot);
    div.classList.add("robot");
    div.setAttribute("onclick", "Click(this)")
    console.log(position);
    
    position.appendChild(div);
    position.classList.add("robotArea");

}
function goal(){
    
    const goal=document.getElementsByClassName("goal")[0];
    console.log(goal);
    totalmoves++;
    moves=0;
    
    if(goal){
        goal.classList.remove("goal");
        goal.classList.remove("red");
        goal.classList.remove("blue");
        goal.classList.remove("yellow");
        goal.classList.remove("green");

    }
    let Goal;
    do{
        Goal = goalpositions[Math.floor(Math.random()*goalpositions.length)];
    }while(wonsquares.includes(Goal));
    wonsquares.push(Goal);
    if(wonsquares.length==goalpositions.length){
        alert("All squares are finished!")
    }
    let GoalElement=document.getElementById(Goal);
    GoalElement.classList.add("goal");
    let ran=Math.floor(Math.random()*4);

    startBlue=document.getElementsByClassName("blue")[0].parentNode.id;
    startRed=document.getElementsByClassName("red")[0].parentNode.id;
    startYellow=document.getElementsByClassName("yellow")[0].parentNode.id;
    startGreen=document.getElementsByClassName("green")[0].parentNode.id;
    
    switch(ran){
        case 0:
            GoalElement.classList.add("red");
        break;
        case 1:
            GoalElement.classList.add("blue");
        break;
        case 2:
            GoalElement.classList.add("yellow");
        break;
        case 3:
            GoalElement.classList.add("green");
        break;
        default:
            alert(ran);
        break;


    }
    if(moves>0){
        alert("You made it in "+moves+" moves");

    }
    
    document.getElementById("moves").innerHTML="Moves: "+moves;


}