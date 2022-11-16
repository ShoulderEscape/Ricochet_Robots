window.onload = function(){
    let blocks=document.querySelectorAll("td");
    blocks.innerHtml="Hello";
    table=document.createElement("Table");
    for(var i=1;i<17; i++){
        row=document.createElement("TR");
        for(var j=1;j<17; j++){
            let td=document.createElement("TD");
            td.setAttribute("id",i+","+j);
            if(j==5 && i==3){

                td.style.backgroundColor="red";
                td.classList.add("robot");
                td.setAttribute("onclick","Click(this)");
            }
            if(j==1){
                
                td.style.borderLeft="10px solid black";
            }
            if(j==16){
                
                td.style.borderRight="10px solid black";
            }
            if(i==1){
                td.style.borderTop="10px solid black";
            }
            if(i==16){
                td.style.borderBottom="10px solid black";
            }

            if(i>=8 && i<=9 && j>=8 && j<=9){
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