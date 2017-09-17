$(function () {
    let pageIndex = 0;
    let queryString = '';

    $('.search-submit').on('click', () => {
        queryString = $('.search-input').val();
        console.log(queryString);
    });


    $.ajax({
        url: 'getPage',
        type: 'get',
        data: {
            start: pageIndex,
            length: queryString
        },
        success: (e) => {
            console.log('success', e)
        },
        error: (e) => {
            console.log('err', e)
        }
    })


    function htmlTpl(data) {
        let html = `
        <li>
            <h3 class="item-header">${data.title}</h3>
            <div class="item-content">
                <p>
                    ${data.details}
                </p>
                ${data.imgs ? `<p class="item-have-img">原帖中有图片，如要查看情点击右下角<span>原页面</span></p>` : ''}
            </div>
            <div class="item-footer">
                <a href="${data.url}" target="_blank">
                    去原页面
                </a>
            </div>
        </li>
        `;
        return html;
    }

})