let Todolist = function () {
    // Date로 today와 date변수를 선언
    let today = new Date();
    let date = new Date();
    let month = "";
    let posts = "";

    $("a[name=preMon]").click(function () { // 이전달
        $("#calendar > tbody > td").remove();
        $("#calendar > tbody > tr").remove();
        today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        buildCalendar();
    })

    $("a[name=nextMon]").click(function () { //다음달
        $("#calendar > tbody > td").remove();
        $("#calendar > tbody > tr").remove();
        today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
        buildCalendar();
    })

    // 달력을 만들어 주는 함수
    async function buildCalendar(option) {
        if (option) {
            today = new Date();
            date = new Date();
            month = "";

            $('.cal').empty();
            let nowYear = today.getFullYear(); //2021
            let nowMonth = today.getMonth(); // 11
            let firstDay = new Date(nowYear, nowMonth, 1).getDay();
            let lastDate = new Date(nowYear, nowMonth + 1, 0).getDate();

            if ((nowYear % 4 === 0 && nowYear % 100 !== 0) || nowYear % 400 === 0) {
                lastDate[1] = 29;
            }
            $('#year').text(nowYear);
            month = transMonthName(nowMonth + 1);
            $(".year_mon").text(month);

            // 전체 일정을 호출!
            const response = await fetch('/api/v1/todolist/list', {
                method: 'GET'
            });
            
            // 오류가 없을시.. 해당 내용 콘솔에 출력
            if (response.status === 200) {
                posts = await response.json();
            }

            for (i = 0; i < firstDay; i++) { // 첫번째 줄 빈칸
                $("#calendar tbody:last").append("<td></td>");
            }

            for (i = 1; i <= lastDate; i++) {
                html = [];
                plusDate = new Date(nowYear, nowMonth, i).getDay(); // 12월 1일은? 수요일 -> 3
                let daytoday = nowYear + "-" + (nowMonth + 1) + "-" + i;
                // date에 필터를 걸어서 해당 하는 날에 있는 메모들만 추출
                let testPost = posts.memos.filter((item)=> item.date === daytoday);
                for (post in testPost) {
                    if (html.length > 2) {
                        html.push(`<p>(총${testPost.length}개)</p>`);
                        break;
                    }
                    postTag  = `<p style="text-overflow: ellipsis;white-space : nowrap;overflow : hidden;width:85px">${testPost[post].memo}</p>`;
                    html.push(postTag);
                };
                html = html.join("");
                if (plusDate == 0) {
                    $('#calendar tbody:last').append("<tr></tr>");
                }
                $('#calendar tbody:last').append(`<td class='date' style="cursor: pointer;"onclick='Todolist.showPopup($(this).attr("value"));' value=${daytoday}>` + i +`<div>${html}</div>` + "</td>");
            }
            console.log($("#calendar > tbody > td").length); // 34^^
            if ($("#calendar > tbody > td").length % 7 != 0) {
                // 나머지가 6이기 때문에 통과
                for (i = 1; i <= $('#calendar > tbody > td').length % 7; i++) {
                    $('#calendar tbody:last').append("<td></td>");
                }
            }

            $(".date").each(function (index) { // 오늘 날짜 표시
                let idx = $(".date").eq(index).text()
                // console.log(idx);
                if (nowYear == date.getFullYear() && nowMonth == date.getMonth() && $(".date").eq(index).text() == date.getDate()) {
                    $(".date").eq(index).addClass('colToday');
                    $(".colToday").css('background-color', 'pink');
                }
            })
        }
        else {
            let nowYear = today.getFullYear(); //2021
            let nowMonth = today.getMonth(); // 11
            let firstDay = new Date(nowYear, nowMonth, 1).getDay();
            let lastDate = new Date(nowYear, nowMonth + 1, 0).getDate();

            if ((nowYear % 4 === 0 && nowYear % 100 !== 0) || nowYear % 400 === 0) {
                lastDate[1] = 29;
            }
            $('#year').text(nowYear);
            month = transMonthName(nowMonth + 1);
            $(".year_mon").text(month);

            // 전체 일정을 호출!
            const response = await fetch('/api/v1/todolist/list', {
                method: 'GET'
            });
            
            // 오류가 없을시.. 해당 내용 콘솔에 출력
            if (response.status === 200) {
                posts = await response.json();
            }

            for (i = 0; i < firstDay; i++) { // 첫번째 줄 빈칸
                $("#calendar tbody:last").append("<td></td>");
            }

            for (i = 1; i <= lastDate; i++) {
                html = [];
                plusDate = new Date(nowYear, nowMonth, i).getDay(); // 12월 1일은? 수요일 -> 3
                let daytoday = nowYear + "-" + (nowMonth + 1) + "-" + i;
                // date에 필터를 걸어서 해당 하는 날에 있는 메모들만 추출
                let testPost = posts.memos.filter((item)=> item.date === daytoday);
                for (post in testPost) {
                    if (html.length > 2) {
                        html.push(`<p>(총${testPost.length}개)</p>`);
                        break;
                    }
                    postTag  = `<p style="text-overflow: ellipsis;white-space : nowrap;overflow : hidden;width:85px">${testPost[post].memo}</p>`;
                    html.push(postTag);
                };
                html = html.join("");
                if (plusDate == 0) {
                    $('#calendar tbody:last').append("<tr></tr>");
                }
                $('#calendar tbody:last').append(`<td class='date' style="cursor: pointer;"onclick='Todolist.showPopup($(this).attr("value"));' value=${daytoday}>` +`<span class ="days">${i}</span>` +`<div>${html}</div>` + "</td>");
            }
            console.log($("#calendar > tbody > td").length); // 34^^
            if ($("#calendar > tbody > td").length % 7 != 0) {
                // 나머지가 6이기 때문에 통과
                for (i = 1; i <= $('#calendar > tbody > td').length % 7; i++) {
                    $('#calendar tbody:last').append("<td></td>");
                }
            }

            $(".days").each(function (index) { // 오늘 날짜 표시
                let days = $('.days').eq(index).text();
                if (nowYear == date.getFullYear() && nowMonth == date.getMonth() && days == date.getDate()) {
                    $(".date").eq(index).addClass('colToday');
                    $(".colToday").css('background-color', 'pink');
                }
            })
        }
    }

    function transMonthName(monthNum) {
        let month = "";
        switch (monthNum) {
            case 1:
                month = "January";
                break;
            case 2:
                month = "February";
                break;
            case 3:
                month = "March";
                break;
            case 4:
                month = "April";
                break;
            case 5:
                month = "May";
                break;
            case 6:
                month = "June";
                break;
            case 7:
                month = "July";
                break;
            case 8:
                month = "August";
                break;
            case 9:
                month = "September";
                break;
            case 10:
                month = "October";
                break;
            case 11:
                month = "November";
                break;
            case 12:
                month = "December";
                break;
            default:
                break;
        }

        return month
    }

    function showPopup(obj) {
        let popup_value = obj
        console.log(popup_value);
        window.open("popup.html?data=" + popup_value, "popup", "width=500, height=480, left=200, top=100, resizable=no");
    }

    return {
        init: function () {
            buildCalendar(false);
        },
        buildCalendar: buildCalendar,
        showPopup: showPopup
    }
}();

document.addEventListener('DOMContentLoaded', function () {
    Todolist.init();
});
