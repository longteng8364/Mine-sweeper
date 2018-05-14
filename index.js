var welcome = document.getElementsByClassName('welcome')[0],
start = document.getElementsByClassName('start')[0],
board = document.getElementsByClassName('board')[0],
alertBox = document.getElementsByClassName('alert')[0],
alertImg = document.getElementsByClassName('alert-img')[0],
close = document.getElementsByClassName('close')[0],
blocks;

var mineNum,
    mineLeft,
    mineMap = [];

function bindEvent (){
    start.onclick = function (){
        welcome.style.top = '-100%';
        init();
    }

    board.oncontextmenu = function (){
        return false;
    }

    board.onmousedown = function (e){
        var target = e.target;
        if(e.which == 1){
            leftClick(target);
        }else if(e.which == 3){
            rightClick(target);
        }
    }

    close.onclick = function (){
        alertBox.style.display = 'none';
        welcome.style.top = '0';
        board.innerHTML = '';
    }
}

bindEvent();

function init(){
    mineNum = 10;
    mineLeft = 10;
    for(var i = 0; i < 10; i++){
        for(var j = 0; j < 10; j++){
            var block = document.createElement('div');
            block.classList.add('block');
            block.setAttribute('id', i + '-' + j);
            board.appendChild(block);
            mineMap.push({mine: 0});
        }
    }

    blocks = document.getElementsByClassName('block');
    while(mineNum) {
        var mineIndex = Math.floor(Math.random() * 100);
        if(mineMap[mineIndex].mine === 0){
            mineMap[mineIndex].mine = 1;
            blocks[mineIndex].classList.add('isMine');
            mineNum --;
        }
    }
}

function leftClick(ele){
    if(ele.classList.contains('flag')){
        return;
    }
    var isMine = document.getElementsByClassName('isMine');
    if(ele && ele.classList.contains('isMine')){
        for(var i = 0; i < isMine.length; i++){
            isMine[i].classList.add('show');
        }
        setTimeout(function (){
            alertBox.style.display = 'block';
            alertImg.style.backgroundImage = 'url(./img/over.jpg)';
        }, 1000);
    }else{
        var n = 0;
        var posArr =ele && ele.getAttribute('id').split('-');
        var posX = posArr && +posArr[0];
        var posY = posArr && +posArr[1];
        ele && ele.classList.add('num');
        for(var i = posX - 1; i <= posX + 1; i++){
            for(var j = posY - 1; j <= posY + 1; j++){
                var aroundBox = document.getElementById(i + '-' + j);
                if(aroundBox && aroundBox.classList.contains('isMine')){
                    n++;
                }
            }
        }
        ele && (ele.innerHTML = n);
        if(n == 0){
            for(var i = posX - 1; i <= posX + 1; i++){
                for(var j = posY - 1; j <= posY + 1; j++){
                   var nearBox = document.getElementById(i + '-' + j);
                   if(nearBox && nearBox.length != 0){
                       if(!nearBox.classList.contains('check')){
                        nearBox.classList.add('check');
                        leftClick(nearBox);
                       }
                   }
                }
            } 
        }

    }
} 

function rightClick(ele){
    if(ele.classList.contains('num')){
        return;
    }
    ele.classList.toggle('flag');
    if(ele.classList.contains('isMine') && ele.classList.contains('flag')){
        mineLeft --;
    }
    
    if(mineLeft == 0){
        setTimeout(function (){
            alertBox.style.display = 'block';
            alertImg.style.backgroundImage = 'url(./img/success.png)';
        }, 300);   
    }
}