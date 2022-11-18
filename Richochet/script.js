const rows=16;
const cols=16;
window.onscroll = () => { window.scroll(0, 0); };
var taken=[];
var leftbottom=[];
var rightbottom=[];
var lefttop=[];
var righttop=[];

window.onload = function(){
    let blocks=document.querySelectorAll("td");
    blocks.innerHtml="Hello";
    table=document.createElement("Table");
    for(var i=0; i<16; i++){
        
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
        if(i<4){ leftbottom.push(thispos)
        } else if(i<8){ rightbottom.push(thispos); 
        } else if(i<12){ lefttop.push(thispos);
        } else{ righttop.push(thispos);
        }
        taken.push(thispos);
    }
    console.log(taken);

    for(var i=1;i<rows+1; i++){
        row=document.createElement("TR");
        for(var j=1;j<cols+1; j++){
            let td=document.createElement("TD");
            var id=i+","+j;
            if(taken.includes(id)){
                console.log("here");
                if(leftbottom.includes(id)){
                    td.style.borderLeft=" 5px solid black"; 
                    td.style.borderBottom=" 5px solid black";
                }
                if(rightbottom.includes(id)){
                    td.style.borderRight=" 5px solid black"; 
                    td.style.borderBottom=" 5px solid black";
                }
                if(lefttop.includes(id)){
                    td.style.borderLeft=" 5px solid black"; 
                    td.style.borderTop=" 5px solid black";
                }
                if(righttop.includes(id)){
                    td.style.borderRight=" 5px solid black"; 
                    td.style.borderTop=" 5px solid black";
                }


            }
            td.setAttribute("id",i+","+j);
            if(j==5 && i==3){

                td.style.backgroundColor="red";
                td.classList.add("robot");
                td.setAttribute("onclick","Click(this)");
            }
            if(j==1){
                
                td.style.borderLeft=" 5px solid black";
            }
            if(j==cols){
                
                td.style.borderRight=" 5px solid black";
            }
            if(i==1){
                td.style.borderTop=" 5px solid black";
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
}
function Click(element){
    if(element.classList.contains("target")){
        element.classList.remove("target");
        
    }else{
        element.classList.add("target");

    }
}
//Travelling
window.addEventListener('onkeypress', checkkey());

function checkkey(event){
    event = event || window.event;
    if(document.getElementsByClassName("target")==1){
        let id=document.getElementsByClassName("target").id;
        let positions=id.split(',');
        var x=positions[0];
        var y=positions[1];
        document.getElementById(id).classList.remove("target");

        if (event.keyCode == '38') {
            // up arrow
            document.getElementById(x+","+ y+1)
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


