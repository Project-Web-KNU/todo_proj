let TodoListPopUp = function () {

    let param = "";

    async function setParam(data) {
        let obj = {};
        let url = decodeURI(data);
        // url = ?data=2022-1-5
        url = url.slice(1, url.length);
        // url = data=2022-1-5
        param = url.split('=')[1];
        // ['data', '2022-1-5']
        // param = 2022-1-5
    }

    async function post_findAllTodo() {
        const response = await fetch('/api/v1/todolist/listone?date=' + param, {
            method: 'GET',
        });
        if (response.status === 200) {
            let list = document.getElementById('list');
            list.innerHTML = '';
            let html = '';
            const post = await response.json();
            for (item in post.memos) {
                let memo = post.memos[item].memo;
                let postTag = `<tr><th scope="row" onclick="TodoListPopUp.check(1);"><i class="far fa-check-circle"></i></th><td style="width:70%;">${memo}</td>
                <td style='text-align: center;'><i style="margin-right: 10px;" class="far fa-edit"></i><i class="far fa-trash-alt"></i></td></tr>`;
                html += postTag;
            }
            list.insertAdjacentHTML('afterbegin', html);
        };
    }

    async function submit() {
        let memo = document.getElementById('text').value;
        const response = await fetch('/api/v1/todolist/create', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                date: param,
                memo: memo
            })
        });

        if (response.status === 201) {
            alert("일정을 추가하였습니다.");
            location.reload();
        } else if (response.status === 400) {
            alert('3자 이상 50자 이하로 입력하여주세요!')
        } else {
            alert("할 일을 입력해주세요!");
        }
    }

    async function check(id) {
        alert("완료!")

    }

    async function edit(id){

    }

    async function del(id) {

    }

    return {
        init: function (data) {
            setParam(data);
            post_findAllTodo();
        },
        setParam: setParam,
        submit: submit,
        check: check,
        edit: edit,
        del: del

    }
}();

document.addEventListener('DOMContentLoaded', function () {
    let data = window.location.search;
    // ?data=2022-1-5
    TodoListPopUp.init(data);
});