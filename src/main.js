const $siteList = $('.siteList');
const $lastLi = $siteList.find('li.last');
const x = localStorage.getItem('x');
const xObject = JSON.parse(x);
window.hashMap = xObject || [
    {logo: 'G', url: 'https://github.com'},
    {logo: 'B', url: 'https://bilibili.com'},
    {logo: 'X', url: 'https://xiedaimala.com'},
    {logo: 'M', url: 'https://developer.mozilla.org/zh-CN/'},
    {logo: 'F', url: 'https://www.freecodecamp.org/'}
]
const simplifyUrl = (url) => {
   return url.replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .replace(/\/.*/, '');
}

const favicon = (url) => {
    // API http://blog.cccyun.cn/post-388.html
    return 'http://favicon.cccyun.cc/' + url.replace(/\b\/.*/, '');
}

const render = () => {
    $siteList.find('li:not(.last)').remove();
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
            <div class="site">
                <div class="logo"><img src="${favicon(node.url)}" alt="${node.logo}"></div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div>
        </li>`).insertBefore($lastLi);
        $li.on('click', () => { window.open(node.url) });
        $li.on('click', '.close', (e) => {
            e.stopPropagation(); // 阻止冒泡
            hashMap.splice(index, 1); // delete
            render();
        });
    });
}
render();

$('.addButton').on('click', () => {
    let url = window.prompt('enter website');
    if(url !== ''){
        if (url.indexOf('https') !== 0) {
            url = 'https://' + url;
        }
        hashMap.push({
                logo: simplifyUrl(url)[0],
                url: url
            }
        );
        render();
    }    
});

window.onbeforeunload = () => {
    //console.log('hi'); // localStoage 只能存字符串
    const string = JSON.stringify(hashMap);
    // console.log(typeof hashMap);
    // console.log(hashMap);
    // console.log(typeof string);
    // console.log(string);
    localStorage.setItem('x', string);
}

$(document).on('keypress', (e) => {
    // const key = e.key
    const {key} = e;
    console.log(key);
    for( let i = 0; i < hashMap.length; i++){
        if( hashMap[i].logo.toLowerCase() === key ){
            window.open(hashMap[i].url);
        }
    }
})