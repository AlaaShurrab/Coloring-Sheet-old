//HTML & CSS Layout

//creating main body ,contaner ,and toolbar.
const totwidth  = window.innerWidth;
const totheight = window.innerHeight;

const width = totwidth-90;
const height = totheight-10;

var oveWidth = width%40;
var oveheight = (height%40 / height )*100;

var numRows =parseInt( height/40);
var numcolumns = parseInt(width/40);

var drType = "random";
var clicked = false;

const style = document.createElement('style');
style.innerHTML = `
    body {
        margin:0px;
        margin-top:10px;
        padding:0px;
    }

    #mainBody{
        margin:0px;
        padding:0px;
        height:${height-oveheight}px;
        width:${totwidth}px;
        display:grid;
        grid-template-areas:'mainBar mainDiv';
        grid-gap: 0;
    }

    .mainBar{
        height:50%;
        width: 70%;
        margin-top:200%;
        border-style: solid;
        border-width: 5px 5px 5px 0;
        border-radius: 0 25px 25px 0;
        background-color: lightgrey;
        display:grid;
        grid-template-areas:
            'icon1'
            'icon2'
            'icon3'
            'icon4';
    }

    .mainDiv{
        margin:auto;
        width: ${width-oveWidth}px ;
        height:100%;
        display: grid;
        grid-template-rows: repeat(auto-fill, 40px);
        grid-template-columns: repeat(auto-fill, 40px);
    }

    .mainDiv div{
        height: 40px;
        width: 40px;
    }

    .icon1,.icon2,.icon3,.icon4{
        padding: auto;
        // text-align: center;
        align-self: auto;
        margin:auto;
        cursor: pointer;
    }

    input[type="color"] {
        -webkit-appearance: none;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
    }

    input[type="color"]::-webkit-color-swatch-wrapper {
        padding: 0;
    }

    input[type="color"]::-webkit-color-swatch {
        border: none;
        border-radius: 50%;
    }

    // h6{
    //     cursor: pointer;
    // }
`

var mainBody = document.querySelector('#mainBody');

document.getElementById("head").appendChild(style);
var mainBar = document.createElement('div');
mainBody.appendChild(mainBar).classList.add("mainBar");
var mainDiv = document.createElement('div');
mainBody.appendChild(mainDiv).classList.add("mainDiv");

//creating the main functionality
const divGenerator = (numRows,numcolumns)=>{
    let index = 1;
    while (index <= (numRows*numcolumns)) {
        index++;
        var subDiv = document.createElement('div');
        subDiv.addEventListener("mousedown",makeclick);
        subDiv.addEventListener("mouseup",unclick);
        subDiv.addEventListener("drag",unclick);
        subDiv.addEventListener("mousemove",(e) => {
            if (clicked) {
                if (drType=="select") {
                    select(e.currentTarget);
                }else if (drType=="random") {
                    pante(e.currentTarget);
                }else if (drType=="eraser") {
                    eraser(e.currentTarget);
                }
            }
        });
        document.querySelector('.mainDiv').appendChild(subDiv).classList.add('subdiv');
    }
}

//creating the tools
divGenerator(numRows,numcolumns);

var divnum = 1;
while (divnum != 5) {
    var icon = document.createElement('div');

    if (divnum != 1){
        icon.innerHTML=`<img src="img/${divnum-1}.png" width="50" height="50">`
        if (divnum == 2) {
            icon.addEventListener("click",setTyperandom);
        }else if (divnum == 3) {
            icon.addEventListener("click",setTypeeraser);
        }else if (divnum == 4) {
            icon.addEventListener("click",setReset);
        }
    }else{
        icon.innerHTML=`<input type="color" id="sColor" value="#ff0000">`
        icon.addEventListener("click",setTypeselect);
    }
    
    document.querySelector('.mainBar').appendChild(icon).classList.add("icon"+divnum);
    divnum++;
}

//contral functions
function setReset() {
    document.querySelector('.mainDiv').innerHTML="";
    divGenerator(numRows,numcolumns);
    drType="random";
}

function setTypeselect(){
    drType = "select"    
}

function setTyperandom(){
    drType = "random"    
}

function setTypeeraser(){
    drType = "eraser"    
}

function eraser(e){
    e.removeAttribute("style");
}

function makeclick() {
    if (drType=="eraser"){
        this.removeAttribute("style");
    }
    clicked = true;
}

function unclick() {
    clicked = false;
}

function pante(e) {//random color creator.
    e.style.backgroundColor=`${"#"+((1<<24)*Math.random()|0).toString(16)}`;
}

function select(e) {//fixed color creator.
    e.style.backgroundColor=`${document.querySelector("#sColor").value}`;
}
