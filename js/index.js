let Todolist = function(){
    // Date로 today와 date변수를 선언
    let today = new Date();
    let date = new Date();
    let month = "";

    $("a[name=preMon]").click(function() { // 이전달
        $("#calendar > tbody > td").remove();
        $("#calendar > tbody > tr").remove();
        today = new Date ( today.getFullYear(), today.getMonth()-1, today.getDate());
        buildCalendar();
    })
    
    $("a[name=nextMon]").click(function(){ //다음달
        $("#calendar > tbody > td").remove();
        $("#calendar > tbody > tr").remove();
        today = new Date ( today.getFullYear(), today.getMonth()+1, today.getDate());
        buildCalendar();
    })

    // 달력을 만들어 주는 함수
    function buildCalendar(option) {
        if(option) {
            today = new Date();
            date = new Date();
            month = "";

            $('.cal').empty();
            let nowYear = today.getFullYear(); //2021
            let nowMonth = today.getMonth(); // 11
            let firstDay = new Date(nowYear, nowMonth, 1).getDay();
            let lastDate = new Date(nowYear, nowMonth+1, 0).getDate();

            if ((nowYear%4===0 && nowYear % 100 !== 0) || nowYear%400 === 0) {
                lastDate[1] = 29;
            }
            $('#year').text(nowYear);
            month = transMonthName(nowMonth+1);
            $(".year_mon").text(month);
            
            
            for (i=0; i <firstDay; i++) { // 첫번째 줄 빈칸
                $("#calendar tbody:last").append("<td></td>");
            }

            for (i=1; i<=lastDate; i++) {
                plusDate = new Date(nowYear, nowMonth, i).getDay(); // 12월 1일은? 수요일 -> 3
                let daytoday = nowYear + "-" + nowMonth + "-" + plusDate;
                if (plusDate == 0) {
                    $('#calendar tbody:last').append("<tr></tr>");
                }
                $('#calendar tbody:last').append(`<td class='date' style="cursor: pointer;"onclick='Todolist.showPopup(this);' value=${daytoday}>`+ i + "</td>");
            }
            console.log($("#calendar > tbody > td").length); // 34^^
            if($("#calendar > tbody > td").length%7 != 0) {
                // 나머지가 6이기 때문에 통과
                for(i=1; i<= $('#calendar > tbody > td').length%7; i++) {
                    $('#calendar tbody:last').append("<td></td>");
                }
            }

            $(".date").each(function(index){ // 오늘 날짜 표시
                let idx = $(".date").eq(index).text()
                // console.log(idx);
                if(nowYear == date.getFullYear() && nowMonth == date.getMonth() && $(".date").eq(index).text() == date.getDate()) {
                    $(".date").eq(index).addClass('colToday');
                    $(".colToday").css('background-color','pink');
                }
            }) 
        }
        else {
            let nowYear = today.getFullYear(); //2021
            let nowMonth = today.getMonth(); // 11
            let firstDay = new Date(nowYear, nowMonth, 1).getDay();
            let lastDate = new Date(nowYear, nowMonth+1, 0).getDate();

            if ((nowYear%4===0 && nowYear % 100 !== 0) || nowYear%400 === 0) {
                lastDate[1] = 29;
            }
            $('#year').text(nowYear);
            month = transMonthName(nowMonth+1);
            $(".year_mon").text(month);
            
            
            for (i=0; i <firstDay; i++) { // 첫번째 줄 빈칸
                $("#calendar tbody:last").append("<td></td>");
            }

            for (i=1; i<=lastDate; i++) {
                plusDate = new Date(nowYear, nowMonth, i).getDay(); // 12월 1일은? 수요일 -> 3
                let daytoday = nowYear + "-" + (nowMonth+1) + "-" + i;
                if (plusDate == 0) {
                    $('#calendar tbody:last').append("<tr></tr>");
                }
                $('#calendar tbody:last').append(`<td class='date' style="cursor: pointer;"onclick='Todolist.showPopup($(this).attr("value"));' value=${daytoday}>`+ i + "</td>");
            }
            console.log($("#calendar > tbody > td").length); // 34^^
            if($("#calendar > tbody > td").length%7 != 0) {
                // 나머지가 6이기 때문에 통과
                for(i=1; i<= $('#calendar > tbody > td').length%7; i++) {
                    $('#calendar tbody:last').append("<td></td>");
                }
            }

            $(".date").each(function(index){ // 오늘 날짜 표시
                let idx = $(".date").eq(index).text()
                if(nowYear == date.getFullYear() && nowMonth == date.getMonth() && $(".date").eq(index).text() == date.getDate()) {
                    $(".date").eq(index).addClass('colToday');
                    $(".colToday").css('background-color','pink');
                }
            }) 
        }
    }

    function transMonthName(monthNum) {
        let month ="";
        switch(monthNum) {
            case 1:
                month="January";
                break;
            case 2:
                month="February";
                break;
            case 3:
                month="March";
                break;
            case 4:
                month="April";
                break;
            case 5:
                month="May";
                break;
            case 6:
                month="June";
                break;
            case 7:
                month="July";
                break;
            case 8:
                month="August";
                break;
            case 9:
                month="September";
                break;
            case 10:
                month="October";
                break;
            case 11:
                month="November";
                break;
            case 12:
                month="December";
                break;
            default:
                break;
        }
    
        return month
    }
    
    function showPopup(obj) {
        let popup_value = obj
        console.log(popup_value);
        window.open("popup.html?data="+popup_value, "_blank", "width=500, height=480, left=200, top=100, resizable=no"); 
    }

    return { 
        init: function () {
            buildCalendar(false);
        },
        buildCalendar : buildCalendar,
        showPopup : showPopup
    }
}();

document.addEventListener('DOMContentLoaded', function () {
    Todolist.init();
});
