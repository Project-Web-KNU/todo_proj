let TodoListPopUp = function () {

    let param = ""

    async function setParam(data) {
        let obj = {};
        let url = decodeURI(data);
        url = url.slice(1, url.length);
        param = url.split('=')[1];
    }

    async function post_findAllTodo() {
        const response = await fetch('/api/v1/todolist/list?date=' + param, {
            method: 'GET',
        })

        if (response.status === 200) {
            let list = document.getElementById('list')
            list.innerHTML = '';
            let html = '';
            const post = await response.json();
            console.log(post);
            console.log(post.count);
            for (item in post.memos) {
                let memo = post.memos[item].memo;
                let postTag = `<tr><th scope="row"><i class="far fa-check-circle"></i></th><td>${memo}</td></tr>`;
                html += postTag;
            }
            list.insertAdjacentHTML('afterbegin', html);
        }
    }

    function submit() {
        alert("일정을 추가하였습니다." + param);
    }

    return {
        init: function (data) {
            setParam(data);
            post_findAllTodo();
        },
        setParam: setParam,
        submit: submit

    }
}();

document.addEventListener('DOMContentLoaded', function () {
    let data = window.location.search;
    TodoListPopUp.init(data);
});

function submit() {
    let data = document.querySelector('text').innerHTML;
    document.write(td);
}