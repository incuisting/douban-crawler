$(function () {
    let pageIndex = 1;
    let queryString = '';
    let $loadMore = $('#more');
    let $itemsContainer = $('.items');
    let $search = $('.search');
    let $loadingImg = $('.loading');
    let $loadMoreText = $loadMore.children('span');
    let $loadMoreImg = $loadMore.children('img');

    console.log($loadMore);
    //监听submit的click
    $('.search-submit').on('click', () => {
        queryString = $('.search-input').val();
        pageIndex = 1;
        $loadingImg.addClass('active');
        $search.addClass('haveSearchData');
        getData(pageIndex, queryString)
            .done((res) => {
                console.log('res',res);
                beforeRender();
                render(res);
                $loadMore.addClass('active');
            })
            .fail((e) => {
                console.log('err', e);
                beforeRender();
                $itemsContainer.append("<li><h1>ops出错了</h1></li>");
            })
    });
    //监听loadmore的click
    $loadMore.on('click',()=>{
        pageIndex += 1;
        $loadMoreText.removeClass('active');
        $loadMoreImg.addClass('active');
        getData(pageIndex,queryString)
            .done((res)=>{
                $loadMoreText.addClass('active');
                $loadMoreImg.removeClass('active');
                render(res);
                $loadMore.addClass('active');
            })
            .fail((e)=>{
                console.log('err', e);
                $itemsContainer.append("<li><h1>ops出错了</h1></li>");
            })
    });

    function beforeRender() {
        $itemsContainer.empty();
        $loadMore.removeClass('active');
        $loadingImg.removeClass('active');
    }

    function render(data) {
        if(data.length > 0){
            data.forEach((item)=>{
                let html = htmlTpl(item);
                $itemsContainer.append(html);
            })
        }else{
            $itemsContainer.append(`<li><h1>第${pageIndex}页没有匹配的房源</h1></li>`);
        }
    }

    function getData(index, query) {
        return (
            $.ajax({
                url: 'getPage',
                type: 'get',
                data: {
                    index: index,
                    filter: query
                }
            })
        )
    }


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
        return $(html);
    }
})