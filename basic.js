var dizi;
var time;
let isRunning = false;
const barsArea = document.querySelector('#barsArea');
const status = document.querySelector('.status');
const textArea = document.querySelector('#numbersArea');
const timeArea = document.querySelector('#time');
const submitBtn = document.querySelector('#submit');

//Text Area Events
textArea.addEventListener('focus',function() {
    textArea.style.backgroundColor = '#eaeaea';
});
textArea.addEventListener('blur',function() {
    textArea.style.backgroundColor = '#fff';
});

//Submit Button
submitBtn.addEventListener('click',sort);

//Main function
function sort(event) {
    event.preventDefault();
    if (isRunning == false) {
        isRunning = true;
        getNumbers();
        getTime();
        clearArea();
        getItems();
        bubble_sort()
    } else {
        let alert = document.createElement('div');
        alert.setAttribute('class','alert alert-warning alert-dismissible fade show');
        alert.innerText = 'Bir simülasyon bitmeden diğerine başlayamazsınız. Şunu Deneyin: Sayfayı Yenilemek';

        let alertBtn = document.createElement('button');
        alertBtn.setAttribute('class','close');
        alertBtn.setAttribute('type','button');
        alertBtn.setAttribute('data-dismiss','alert');
        let alertBtnSpan = document.createElement('span');
        alertBtnSpan.innerHTML= '&times;';

        alertBtn.appendChild(alertBtnSpan);
        alert.appendChild(alertBtn);
        console.log(alert);
        submitBtn.parentElement.appendChild(alert);

    }
}

function clearArea() { 
    let bars = document.querySelectorAll('.bar');
    bars.forEach(element => {
        element.remove();
    });
}
function getNumbers() {
    this.dizi = textArea.value.split(',');
};
function getTime() {
    this.time = Number(timeArea.value*1000);
};

//Adding bar elements to the Bars Area
function getItems() {
    //Find width of elements
    var areaWidth = document.querySelector('#barsArea').offsetWidth;
    var itemWidth = ( (areaWidth)-((dizi.length-1)*4) )/dizi.length;

    //Creating bar elements
    for (let i=0; i<dizi.length; i++) {
        let element = document.createElement('div');
        element.classList.add('bar');

        element.style.width= `${itemWidth}px`;

        dizi[i]>500 ? element.style.height= 500+'px' : element.style.height= `${dizi[i]}px`;

        barsArea.appendChild(element);
    }
}

//Delay Function
const delay = ms => new Promise(res => setTimeout(res, ms));

//Bubble Sort algorithm Function
async function bubble_sort() {
    var swapp;
    var n = (dizi.length-1);
    var x = barsArea;

    status.textContent ='Simülasyon Oynatılıyor...';

    do {
        swapp = false;
        for (var i=0; i<n; i++) {
            var x_1= x.children[i].style.height;
            var x_1Index= x_1.indexOf('px');
            x_1 = x_1.slice(0,x_1Index);

            var x_2= x.children[i+1].style.height;
            var x_2Index= x_2.indexOf('px');
            x_2 = x_2.slice(0,x_2Index);
            
            if ( Number(x_1) < Number(x_2) ) {
                x.children[i].classList.add('active');
                x.children[i+1].classList.add('next');
                await delay(this.time);
                var temp = x.children[i].style.height;
                x.children[i].style.height = x.children[i+1].style.height;
                x.children[i+1].style.height = temp;
                swapp = true;
                x.children[i].classList.remove('active');
                x.children[i+1].classList.remove('next');
                x.children[i].classList.add('next');
                x.children[i+1].classList.add('active');
                await delay(500);
                x.children[i].classList.remove('next');
                x.children[i+1].classList.remove('active');
            }
        }
        n--;
    } while(swapp);
    isRunning = false;
    status.style.color='green';
    status.textContent ='Simülasyon Tamamlandı';
}
