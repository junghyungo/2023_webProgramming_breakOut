$(document).ready(function () {
    
    // 배경음악, 배경음악 버튼, 배경음악 선택
    var bgm1 = new Audio("./audio/bgm1.mp3");
    var bgm2 = new Audio("./audio/bgm2.mp3");
    var bgm3 = new Audio("./audio/bgm3.mp3");
    var click = new Audio("./audio/clickEffect.mp3");   // 버튼 클릭시 효과음

    var currentBGM = bgm1;    // 현재 재생/중지 상태의 음악파일, 환경설정에서 변경 가능
    currentBGM.play();
    currentBGM.loop = true;   // 반복재생

    // 좌측 상단 오디오 버튼 클릭 시
    $("#audioVol").click(function() {
        if(!currentBGM.paused) {    // 재생 -> 정지
            $("#audioVol").css({ "background": "url(./img/volOff_50x50.png)" });
            currentBGM.pause();
        }
        else {  // 정지 -> 재생
            $("#audioVol").css({ "background": "url(./img/volOn_50x50.png)" });
            currentBGM.play();
        }
    });

    // 시작(스테이지), 환경설정, 상점 버튼 클릭 시 메인메뉴 애니메이션
    $(".main-btn").click(function() {
        click.play();   // 버튼 클릭 효과음
        $("#main-menu").addClass("animateContent1");    // 메인 메뉴 페이지 전환 효과 (작아지는)
        setTimeout(function() {
            $("#main-menu").removeClass("animateContent1").hide();  // 1초 후 메인 메뉴 디스플레이 none
        }, 1000);
    });

    // 각 스테이지 선택 시 스테이지 선택 화면 애니메이션
    $(".stage-btn").click(function() {
        click.play();   // 버튼 클릭 효과음
        $("#select-stage").removeClass("animateContent2").addClass("animateContent1");    // 스테이지 선택 페이지 전환 효과 (작아지는)
        setTimeout(function() {
            $("#select-stage").removeClass("animateContent1").hide();
        }, 1000);
    });

    // 시작버튼(스테이지 선택) 클릭 시 스테이지 선택 화면 애니메이션
    $("#start-btn").click(function () {
        // 메인 메뉴가 사라지면서 스테이지 선택 페이지 등장
        setTimeout(function() {
            $("#select-stage").addClass("animateContent2").css({ "display": "inline-block" });  
        }, 1000);
        // 첫번째 보스 캔버스
        $("#stgbtn1").click(function() {
            setTimeout(function() {
                $("#stage1").addClass("animateContent2").css({ "display": "inline-block" });
            }, 1000);
        });
        // 두번째 보스 캔버스
        $("#stgbtn2").click(function() {
            setTimeout(function() {
                $("#stage2").addClass("animateContent2").css({ "display": "inline-block" });
            }, 1000);
        });
        // 세번째 보스 캔버스
        $("#stgbtn3").click(function() {
            setTimeout(function() {
                $("#stage3").addClass("animateContent2").css({ "display": "inline-block" });
            }, 1000);
        });
        // 뒤로가기 버튼 클릭 시 스테이지 화면과 메인 메뉴 애니메이션
        $(".go-back-btn").click(function () {
            click.play();   // 버튼 클릭 효과음
            $("#select-stage").removeClass("animateContent2").addClass("animateContent1");  // 스테이지 선택 페이지 줄어드는 애니메이션
            setTimeout(function() {
                $("#select-stage").removeClass("animateContent1").hide();   // 스테이지 선택 페이지 none해주고
                $("#main-menu").show().addClass("animateContent2");         // 다시 메인 메뉴 나타나게
                setTimeout(function() {
                    $("#main-menu").removeClass("animateContent2");
                }, 2000);
            }, 1000);
        });
    });

    // 위와 애니메이션 동작 방식 동일
    // 환경설정버튼 클릭 시 환경설정 화면 애니메이션
    $("#settings-btn").click(function () {
        // 메인 메뉴가 사라지면서 환경설정 페이지 등장
        setTimeout(function() {
            $("#settings-menu").addClass("animateContent2").css({ "display": "inline-block" });
        }, 1000);
        // 배경화면 선택
        $("#bgImg-select").change(function() {  // select 변경 시
            var currentImg = $("#bgImg-select option:selected").text(); // 선택 된 값 변수에 대입
            if (currentImg == "aqua") {
                $(".screen").css({"background-color" : "aqua"});
            }
            else if (currentImg == "crimson") {
                $(".screen").css({"background-color" : "crimson"});
            }
            else if (currentImg == "coral") {
                $(".screen").css({"background-color" : "coral"});
            }
        });
        // 배경음악 선택
        $("#music-select").change(function() {  // select 변경 시
            var currentBGMName = $("#music-select option:selected").text(); // 선택 된 값 변수에 대입
            if (currentBGMName == "Music 1") {
                $("#audioVol").css({ "background": "url(./img/volOn_50x50.png)" });
                currentBGM.pause();
                currentBGM = bgm1; 
                currentBGM.play();
                currentBGM.loop = true;
            }
            else if (currentBGMName == "Music 2") {
                $("#audioVol").css({ "background": "url(./img/volOn_50x50.png)" });
                currentBGM.pause();
                currentBGM = bgm2; 
                currentBGM.play();
                currentBGM.loop = true;
            }
            else if (currentBGMName == "Music 3") {
                $("#audioVol").css({ "background": "url(./img/volOn_50x50.png)" });
                currentBGM.pause();
                currentBGM = bgm3; 
                currentBGM.play();
                currentBGM.loop = true;
            }
        });
        // 뒤로가기
        $(".go-back-btn").click(function () {
            click.play();
            $("#settings-menu").removeClass("animateContent2").addClass("animateContent1");
            setTimeout(function() {
                $("#settings-menu").removeClass("animateContent1").hide();
                $("#main-menu").show().addClass("animateContent2");
                setTimeout(function() {
                    $("#main-menu").removeClass("animateContent2");
                }, 2000);
            }, 1000);
        });
    });

    // 상점버튼 클릭 시 상점 화면 애니메이션
    $("#shop-btn").click(function () {
        // 메인 메뉴가 사라지면서 상점 페이지 등장
        setTimeout(function() {
            $("#shop-menu").addClass("animateContent2").css({ "display": "inline-block" });
        }, 1000);
        // 뒤로가기
        $(".go-back-btn").click(function () {
            click.play();
            $("#shop-menu").removeClass("animateContent2").addClass("animateContent1");
            setTimeout(function() {
                $("#shop-menu").removeClass("animateContent1").hide();
                $("#main-menu").show().addClass("animateContent2");
                setTimeout(function() {
                    $("#main-menu").removeClass("animateContent2");
                }, 2000);
            }, 1000);
        });
    });

    // 스테이지 화면 각 화면 마우스 오버 시 보스 이미지로 변환
    $("#stgbtn1").mouseenter(function () {
        $(this).css({ 
            "background": "url(./img/bossFirst_110x80.gif)",
            "background-repeat" : "no-repeat"
        });
    })
    $("#stgbtn1").mouseout(function () {
        $(this).css({ "background": "url(./moon.png)" });
    })
    $("#stgbtn2").mouseenter(function () {
        $(this).css({ 
            "background": "url(./img/bossSecond_122x80.gif)",
            "background-repeat" : "no-repeat"
        });
    })
    $("#stgbtn2").mouseout(function () {
        $(this).css({ "background": "url(./moon.png)" });
    })
    $("#stgbtn3").mouseenter(function () {
        $(this).css({ 
            "background": "url(./img/bossLast_101x80.gif)",
            "background-repeat" : "no-repeat"
        });
    })
    $("#stgbtn3").mouseout(function () {
        $(this).css({ "background": "url(./moon.png)" });
    })
    // 뒤로가기 버튼 오버 시
    $(".go-back-btn").mouseenter(function () {
        $(this).css({ "background": "url(./img/backHover_50x50.png)" });
    })
    $(".go-back-btn").mouseout(function () {
        $(this).css({ "background": "url(./img/back_50x50.png)" });
    })
});