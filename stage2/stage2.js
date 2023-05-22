window.onload = function(){
	pageLoad();
	windowsize();

	/* 윈도우 창 크기를 변경할 때마다 canvas 크기도 변경 */
	$(window).resize(windowsize);
	hp();
	init();
	draw();
}

/* 플레이어 스킬 변수 */
var qskill = 0;
var qskill_timer = 30;
var qskill_repeat;
var qskill_cooltime = 0;

var wskill = 0;
var wskill_timer = 10;
var wskill_repeat;
var wskill_repeat2;
var wskill_cooltime = 0;
var yplus = 480;
var wskill_count = 0;
var attack_x;

/* 보스의 공격이 일정시간마다 진행되기위해 필요한 변수 */
var timer = 0;
var time_repeat;

var attack1 = 0; //1이면 보스패턴 1이 시작된 상태
var attack1_repeat;
var attack1_timer = 0;

var attack2 = 0;
var attack2_timer = 0;
var attack2_repeat;
var attack_position;
var attack2_count = 0;

var attack4 = 0;
var attack4_brick;
var attack4_brick_x = 150;
var attack4_brick_y = 110;



/* 스페이스바를 누르면 start_number = 1로 변경 되면서 공이 발사됨 */
var start_number = 0;
var drawinterval = 0;

/*canvas 너비, 높이 */
var cvwd = 600;
var cvht = 600;

/* 벽돌의 x,y좌표 */
var bricks = [0,0,0,0,0] ;
var BRICKWIDTH = 119;
var BRICKHEIGHT = 29;

/* 게임시작 후 카운트 세주는 변수 */
var count = 3;

/* setinterval 입력받는 변수 */
var repeat;

/* canvas, context 선언 */
var screen;
var context;

/* 공의 반지름 */
var ballRadius = 10;

/* 공의 이동속도 */
var xvelocity = 2;
var yvelocity = 2;
var dx;
var dy;

/* 공의 x,y좌표. */
var x;
var y;

/* 바(bar)의 x좌표 */
var barx = cvwd/2;
var barwidth = 100;
var barheight = 10;
var bar_state = 0;

/* window 높이 ,너비 */
var wdht;
var wdwd;

/* boss의 x,y좌표*/
var bossx;
var bossy;
var bosswd= 80;
var bossht= 80;

/*플레이어, 보스 체력 */
var p_hp = 0;
var b_hp = 20;

/* window size 변경 해주는 함수 */
function windowsize(){
	var screen = document.getElementById("screen");
	var button = document.getElementById("gamestart");
	var bossui = document.getElementById("boss_UI");
	var playerui = document.getElementById("player_UI");
	wdht = (window.outerHeight-cvht)/4;
	wdwd = (window.outerWidth-cvwd)/2;
	buwd = ((window.outerWidth)/2);
	screen.style.top = wdht+"px";
	screen.style.left = wdwd+"px";
	button.style.top = (wdht + cvht + 20) + "px";
	button.style.left = buwd-150+"px";
	bossui.style.left = (wdwd-200) + "px";
	bossui.style.top = wdht + "px";
	playerui.style.left = (wdwd + cvwd) + "px";
	playerui.style.top = (wdht) + "px";
}

function pageLoad(){
	var start_button = document.getElementById("gamestart");
	start_button.onclick = wait;
}

/*---------------------------------------------------------게임시작 관련 함수---------------------------------------------------------*/
/* 게임시작 버튼 눌렀을 때 동작하는 함수 */
function wait(){
	$("#gamestart").css({
		"display" : "none"
	});
    repeat = setInterval(start, 1000);
}

function start(){
    context.clearRect(0,0,cvwd,cvht);
    drawText(count);
    count--;
    if(count == -1){
        clearInterval(repeat);
        count = 3;
        repeat = setInterval(draw,1);
        drawinterval = 1;
		time_repeat = setInterval(timeAttack,1000);
        addEventListener('mousemove', mousemove);
		addEventListener("keydown", keydown);
    }
}

/*---------------------------------------------------------게임시작 관련 함수---------------------------------------------------------*/






/*---------------------------------------------------------그리는것 관련 함수---------------------------------------------------------*/
/* 공의 x,y좌표 초기값을 설정 */
function init(){
	screen = document.getElementById("screen");
	context = screen.getContext("2d");
	x = barx;
	y = cvht-20-ballRadius;
    dx = 0;
    dy = 0;
}

function draw(){
	context.clearRect(0,0,cvwd,cvht);
	/* 보스 공격 관련 조건문 */
    if(attack1 == 1){
        bossAttack1();
    }
    if(attack2 == 1){
        bossAttack2();
    }
    if(attack4 == 1){
        bossAttack4();
    }

	/* drawPaddle 관련 위치 조건문 */
	if(barx > (cvwd-barwidth/2)){
		barx = cvwd-barwidth/2;
	}
	else if(barx < barwidth/2){
		barx = barwidth/2;
	}
	
	/* 스페이스바 유무 관련 조건문 */
	if(start_number==0){
		x = barx;
	}

	/* 스킬 관련 조건문 */
	if(qskill == 1){
		drawshield();
	}
	if(wskill == 1){
		drawsword();
	}

	boss();
	drawBall();
	drawPaddle();
	collision();
}

/* 공 그리는 함수 */
function drawBall(){
	context.beginPath();
	context.arc(x,y,ballRadius,0,Math.PI*2);
	context.fillStyle = "black";
	context.fill();
}

/* 바(bar) 그리는 함수 */
function drawPaddle(){
	context.beginPath();
	context.rect((barx-barwidth/2),cvht-20,barwidth,barheight);
    if(bar_state == 0){
        context.fillStyle = "black";
    }
    else if(bar_state == 1){
        context.fillStyle = "blue";
    }
	context.fill();
}

/* 글씨 기본 설정 해주는 함수 */
function drawText(text){
    context.font = 'bold 70px arial';
    context.fillStyle = 'dodgerblue';
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, cvwd/2, cvht/2);
}



function drawshield(){
	context.beginPath();
	context.arc(barx,cvht-20,barwidth/2,Math.PI,0);
	context.strokeStyle = "yellow";
	context.stroke();
}

/*w키를 누르면 검격이 나가게 보여주는 함수 */
function drawsword(){
	context.beginPath();
	context.rect(attack_x-15,yplus,30,100); // 가로 30 세로 100의 검 생성
	context.fillStyle = "yellow";
	context.fill();
}

/* 보스를 그려주는 함수 */
function boss(){
	bossx = (cvwd-bosswd)/2;
	bossy = 10;
	context.beginPath();
	context.rect(bossx,bossy,bosswd,bossht);
	context.fillStyle = "red";
	context.fill();

}

//보스 체력 감소 해주는 함수
function b_hp_decrease(){
    if(attack4 == 1){
        return;
    }else {
        b_hp--;
	    hp();
	    var num = b_hp*15;
	    $("#container").animate({
	    	"height" : num+"px"
	    });
	    if(b_hp < 0 || b_hp == 0){
		    game_over(1);
	    }
    }
}

//보스 체력 회복 해주는 함수
function b_hp_increase(){
    if(b_hp == 20){
        return;
    }
    else {
        b_hp++;
	    hp();
	    var num = b_hp*15;
	    $("#container").animate({
	    	"height" : num+"px"
	    });
    }
}

function p_hp_decrease(){
    if(qskill == 1){
        qskill = 0;
        return;
    }
	var p_hp_array = $(".state");
	p_hp_array[p_hp].src = "empty_hearted.png";
	p_hp++;
	if(p_hp == 3){
		game_over(2);
	}
}

function game_over(who){
		removeEventListener('keydown', keydown);
		removeEventListener('mousemove', mousemove);
		clearInterval(repeat);
		clearInterval(attack2_repeat);
		clearInterval(time_repeat);
        drawinterval = 0;
		context.clearRect(0,0,cvwd,cvht);
		if(who == 1){
			drawText("You Win");
		}
		else if(who == 2){
			drawText("You Lose");
		}
}
/* 플레이어, 보스 체력 출력해주는 함수 */
function hp(){
	$("#bp_num").text(b_hp);
}

/*---------------------------------------------------------그리는것 관련 함수---------------------------------------------------------*/



/* 충돌 감지 */
function collision(){
	var dxf = dx;
	if(dxf < 0){
		dxf = -dxf;
	}
    if(attack4 == 1){
        if(x > attack4_brick_x - ballRadius && x < attack4_brick_x + 20 + ballRadius && y < attack4_brick_y + 20 + ballRadius && y > attack4_brick_y + 20){
            //공이 보스패턴4로 소환된 첫번째 벽의 밑면에 맞는 경우
            dy = -dy;
            attack4 = 0;
            b_hp_decrease();
        }
        else if(x > attack4_brick_x - ballRadius && x < attack4_brick_x + 20 + ballRadius && y > attack4_brick_y- ballRadius && y < attack4_brick_y){
            //공이 윗면에 맞는경우
            dy = -dy;
            attack4 = 0;
            b_hp_decrease();
        }
        else if(x > attack4_brick_x - ballRadius && x < attack4_brick_x && y > attack4_brick_y - ballRadius && y < attack4_brick_y + 20 + ballRadius){
            //공이 왼쪽 면에 맞는경우
            dx = -dx;
            attack4 = 0;
            b_hp_decrease();
        }
        else if(x < attack4_brick_x + 20 + ballRadius && x > attack4_brick_x + 20 && y > attack4_brick_y - ballRadius && y < attack4_brick_y + 20 + ballRadius){
            //공이 오른쪽 면에 맞는 경우
            dx = -dx;
            attack4 = 0;
            b_hp_decrease();
        }
    }
        if((x < bossx & x > bossx -ballRadius - dxf & y < bossy + bossht +ballRadius & y > bossy - ballRadius)||(x < bossx +bosswd + ballRadius + dxf & x > bossx + bosswd & y < bossy + bossht +ballRadius & y > bossy - ballRadius)){ //보스의 왼쪽, 오른쪽에 충돌
            if(attack1 == 1){ //보스가 회복 배리어를 친 상태면 체력 회복
                b_hp_increase();
            }
            else {
                b_hp_decrease();
            }
            dx = -dx;
        }
        else if((y > bossy+bossht & y < bossy + bossht + ballRadius + yvelocity & x > bossx-ballRadius & x < bossx + bosswd + ballRadius)||(y < bossy & y > bossy-ballRadius - yvelocity& x > bossx-ballRadius & x < bossx + bosswd + ballRadius)){ //보스의 위, 아래에 충돌
            if(attack1 == 1){ //보스가 회복 배리어를 친 상태면 체력 회복
                b_hp_increase();
            }
            else {
                b_hp_decrease();
            }
            dy = -dy;
        }
    

	if((y > (cvht-20-ballRadius-yvelocity))){
		if(x > barx+(barwidth/2+ballRadius) || x < barx-(barwidth/2+ballRadius)){ //바의 영역에서 벗어난 경우
			if(y > (cvht-20-yvelocity)){
				ballRadius = 10;
				init();
				draw();
				p_hp_decrease();
				start_number=0;
				addEventListener("keydown", keydown);
			}
		}else if(x > barx -(barwidth/2+ballRadius) &&x < barx + (barwidth/2+ballRadius)){ //바의 영역에 있는 경우	
				dx = xvelocity * (x-barx)/(barwidth+ballRadius/2);
				dy = -dy;
		}else{ //바의 영역의 마지노선에 맞닿는 경우
			dy = -dy;
			dx = -dx;
		}
	}
	else if(y < ballRadius){ //위쪽 벽면에 부딪히는 경우
		dy = -dy;
	}
    
    if(x < ballRadius){ // 왼쪽 벽면에 부딪히는 경우
        dx = -dx;
    }
    else if(x > cvwd-ballRadius){ // 오른쪽 벽면에 부딪히는 경우
        dx = -dx;
    }


    y += dy;
    x += dx;

}



/*---------------------------------------------------------마우스, 키보드 이벤트리스너---------------------------------------------------------*/

/* 스페이스바를 누를 경우 공 발사
스페이스바를 누르면 start_number 변수에 1값이 대입되고, 스킬을 사용할 수 있게 됨 */
function keydown(event){
	if(start_number == 0){
		//스페이스바를 누를경우
		if(event.keyCode == 32){
			start_number=1;
			dy = yvelocity;
            if(drawinterval == 0){
                repeat = setInterval(draw,1);
            }
		}
	}
	else if(start_number == 1){
		//q를 누를경우
		if (qskill_cooltime == 0 && qskill == 0 && event.keyCode == 81) { //쿨타임이 아니고, 보호막이 활성화되지 않을 때 사용 가능
			qskill = 1; //이 변수가 1일 때 보호막 활성화
			$("#qskill").css({ //스킬 이미지를 지우고 쿨타임 글씨 영역 활성화
				"display" : "none"
			});
			$("#qtimer").css({
				"display" : "block"
			});
			$("#qtimer").text(qskill_timer); //쿨타임 글씨 활성화
			qskill_repeat = setInterval(skill_timer1, 1000); 
			qskill_cooltime = 1;
		}
		else if (wskill_cooltime == 0 && wskill == 0 && event.keyCode == 87) { 
			wskill = 1; //이 변수가 1일 때 보호막 활성화
			wskill_count = 0;
			attack_x = barx;
			$("#wskill").css({ //스킬 이미지를 지우고 쿨타임 글씨 영역 활성화
				"display" : "none"
			});
			$("#wtimer").css({
				"display" : "block"
			});
			$("#wtimer").text(wskill_timer); //쿨타임 글씨 활성화
			wskill_repeat = setInterval(skill_timer2, 1000); 
			wskill_cooltime = 1;
			wskill_repeat2 = setInterval(wskill_time, 1);
		}
	}
}

function skill_timer1(){
	qskill_timer--;
	if(qskill_timer == 28){
		qskill = 0;
	}
	else if(qskill_timer == -1){
		qskill_timer = 30;
		clearInterval(qskill_repeat);
		$("#qskill").css({
			"display" : "block"
		});
		$("#qtimer").css({
			"display" : "none"
		});
		qskill_cooltime = 0;
	}
	$("#qtimer").text(qskill_timer);
}

function skill_timer2(){
	wskill_timer--;
	if(wskill_timer == -1){
		wskill_timer = 10;
		clearInterval(wskill_repeat);
		$("#wskill").css({
			"display" : "block"
		});
		$("#wtimer").css({
			"display" : "none"
		});
		wskill_cooltime = 0;
	}
	$("#wtimer").text(wskill_timer);
}

/* 1개의 검이 떨어지는 움직임을 재현해주는 함수 */
function wskill_time(){
	yplus = yplus - 2; // Y좌표는 2칸씩 이동
	if(wskill_count == 0 && yplus < bossy+bossht && attack_x + 30 >= bossx && attack_x <= bossx + bosswd){
        if(attack1 == 1){
            b_hp_increase();
        }
        else {
            b_hp_decrease();
        }
        wskill_count = 1;
		wskill = 0;
	}

    if(attack4 == 1){
        if(attack_x > attack4_brick_x - 30 && attack_x < attack4_brick_x + 20 + 30 && yplus < attack4_brick_y + 20){
            //공이 보스패턴4로 소환된 첫번째 벽의 밑면에 맞는 경우
            attack4 = 0;
            wskill = 0;
            wskill_count =1;
            b_hp_decrease();
        }
    }
	if(yplus + 100 == 0){ //검이 영역 밖으로 나갔을 경우 함수 종료
		yplus = 480;
		clearInterval(wskill_repeat2);
		wskill_count = 0;
		wskill = 0;
	}
}

/* 마우스 움직임에 따라 바를 다시 그리는 함수 */
//영역 밖을 나갈시 최대 영역으로 바를 그림
function mousemove(event){
	barx = event.clientX-wdwd;
}

/*---------------------------------------------------------마우스, 키보드 이벤트리스너---------------------------------------------------------*/









/*---------------------------------------------------------보스 공격패턴 함수---------------------------------------------------------*/

function timeAttack(){
	timer += 1;

	if(timer % 8 == 0){
        var randnum
        if(attack4 == 1){
            randnum = Math.floor(Math.random()*3);    
        }
        else {
            randnum = Math.floor(Math.random()*4);
        } 
		if(randnum == 0){ //첫번째 보스 패턴 ( 보스 배리어 )
			attack1 = 1; //1로 값을 변경해줌으로써 draw에서 bossAttack1()을 반복적으로 호출
            bossAttack1();
            attack1_repeat = setInterval(bossAttack1_timer,1000); //3초동안만 보스 배리어 지속
		}
		else if(randnum == 1){ 
			attack_position = Math.random()*500;
            bossAttack2();
            attack2 = 1;
            attack2_repeat = setInterval(bossAttack2_timer,1000);
		}
		else if(randnum == 2){
			removeEventListener('mousemove',mousemove);
            setTimeout(bossAttack3,1000);
            bar_state = 1;
		}
		else if(randnum == 3){ 
			attack4 = 1;
            var num = Math.floor(Math.random()*3);
            attack4_brick_x = 150*(num+1);
            bossAttack4();
		}

	}
	$("#timer").text(timer);
}

//보스 캐릭터 주변에 초록색 원을 그려주는 함수
function bossAttack1(){
    context.beginPath();
	context.arc(bossx+bosswd/2,bossy+bossht/2,bosswd/2+10,0,Math.PI*2);
	context.strokeStyle = "green"
	context.stroke();
}

//2초를 세주는 함수. 2초가 되면 보스패턴1 종료.
function bossAttack1_timer(){ 
    if(attack1_timer == 2){
        attack1 = 0;
        attack1_timer = 0;
        clearInterval(attack1_repeat);
        return;
    }
    else{
        attack1_timer++;
    }
}


function bossAttack2(){
    if(attack2_timer == 2){
        context.beginPath();
        context.rect(attack_position,cvht-100,100,100);
        context.fillStyle = "red";
        context.fill();
        if(barx+barwidth/2 < attack_position || barx-barwidth/2 > attack_position+100){
            return;
        }
        else {
            if(attack2_count == 0){
                p_hp_decrease();
                attack2_count = 1;
            }
            else{
                return;
            }
        }
    }
    else if(attack2_timer == 3){
        attack2_timer = 0;
        attack2 = 0;
        attack2_count = 0;
        clearInterval(attack2_repeat);
        return;
    }
    else if(attack2_timer < 2){
        context.beginPath();
        context.rect(attack_position,cvht-100,100,100);
        context.fillStyle = "gray";
        context.fill();
    }
}

function bossAttack2_timer(){
    attack2_timer++;
}

function bossAttack3(){
    addEventListener('mousemove',mousemove);
    bar_state = 0;
}

function bossAttack4(){
    context.beginPath();
    context.rect(attack4_brick_x,attack4_brick_y,20,20);
    context.fillStyle = "blue";
    context.fill();
}



/*---------------------------------------------------------보스 공격패턴 함수---------------------------------------------------------*/