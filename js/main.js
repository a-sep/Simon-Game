/*jshint esversion: 6 */
// ========= ver. 1.0  ===========
// jshint ignore:line
"use strict";
let turnedOn = false;
let strictMode = false;

let start = document.getElementById('start');
let strict = document.getElementById('strict');
let turnOnButton = document.getElementsByClassName('switch');
let green = document.getElementById('green');
let red = document.getElementById('red');
let yellow = document.getElementById('yellow');
let blue = document.getElementById('blue');

document.getElementById("victory").style.display = 'none'; // jshint ignore:line

// wybierajac element po nazwie klasy otrzymujemy tablice elementow dlatego 'switchButton[0]'
turnOnButton[0].addEventListener('click', function() {
    if (!turnedOn) {
        turnedOn = true;
        this.style.left = '68px';
        document.getElementById('count-number').style.color = '#ff0000';
        start.addEventListener('click', play);
    } else {
        turnedOn = false;
        this.style.left = '90px';
        document.getElementById('count-number').style.color = '#990000';
        start.removeEventListener('click', play);
        document.getElementById('count-number').textContent = '--';
    }
    arr = [];
    count = 0;
    strictMode = false;
    document.getElementById('strict-led').style.background = '#320000';
});

strict.addEventListener('click', function() {
    if (turnedOn && !strictMode) {
        strictMode = true;
        document.getElementById('strict-led').style.background = '#ff0000';
    } else if (turnedOn && strictMode) {
        strictMode = false;
        document.getElementById('strict-led').style.background = '#320000';
    }
});

/*
1 losuj liczbe, zapal klawisze,
2 pozostaw czas na wklepanie klawiszy (tyle sekund ile count klawiszy)
3 po wklepaniu rob krok 1
4 jesli blad i jesli strict===false wyswietl raz jeszcze kolejnosc klawiszy
5 jesli blad i strict===true to zresetuj dane i zacznij od pocztku
*/

let arr = [];
let count = 0;
let lightIndex = 0;
let greenAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
let redAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
let yellowAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
let blueAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
let errorAudio = new Audio('../audio/click.mp3')

function play() {
    //  dadaj nowa liczbe do arr[] i wyswietl pokaz
    if (count > 0) {
        arr = [];
        count = 0;
    }
    playNext();
    return;
}

function playNext() {
    //  dadaj nowa liczbe do arr[] i wyswietl pokaz
    count++;
    updateCounter(count);
    arr.push(getRandomButton());
    showButtons(0);
    return;
}
function showButtons(index) {
    eventsOFF();
    lightIndex = 0;
    let my = setTimeout(function() {
        lightOnButtons(arr[index]);
        if (index < arr.length) {
            index++;
            showButtons(index);
            return;
        } else {
            //sekwencja sie wyswietlila, teraz kolej na gracza
            console.log('koniec pokazu, kolej gracza', arr);
            eventsON();
            return;
        }
    }, 1000);
}

function light() {
    // naciskaj kolejne i sprawdzaj czy sie zgadza z arr, jesli nie to daj sygnal blad
    // i teraz jesli jest blad i strict===true to resetuj gre, jesli strict===false to wyswietl poprawna sekwencje
    // odpal kolejne losowanie liczby
    if (lightIndex < arr.length) {

        if (arr[lightIndex] === this.id) {
            lightOnButtons(this.id);
            lightIndex++;
            console.log('test OK', this.id);
        } else {
            errorAudio.play();
            if (strictMode) {
                arr = [];
                count = 0;
                console.log('RESET - test DUPA, strict === true', this.id);
            } else {
                showButtons(0);
                console.log('test DUPA, strict === false', this.id);
            }
        }
    }
    if (lightIndex >= arr.length) {
        if (count === 20) { // TODO change this line to 'count === 20'
            victory();
            setTimeout(playNext, 2000);
        } else {
            setTimeout(playNext, 1000);
        }
    }
    return;
}

function victory() {
    arr = [];
    count = 0;
    console.log('VICTORY is Yours !!!');
    document.getElementById("victory").style.display = 'inline'; // jshint ignore:line
    setTimeout(function() {
        document.getElementById("victory").style.display = 'none'; // jshint ignore:line
    }, 2000);
}

function eventsON() {
    green.addEventListener('click', light);
    red.addEventListener('click', light);
    yellow.addEventListener('click', light);
    blue.addEventListener('click', light);
}

function eventsOFF() {
    green.removeEventListener('click', light);
    red.removeEventListener('click', light);
    yellow.removeEventListener('click', light);
    blue.removeEventListener('click', light);
}

function lightOnButtons(id) {
    let time = 400;
    switch (id) {
        case 'green':
            green.style.background = '#b3ff47';
            greenAudio.play();
            setTimeout(resetButtons, time);
            break;
        case 'red':
            red.style.background = '#fc4545';
            redAudio.play();
            setTimeout(resetButtons, time);
            break;
        case 'yellow':
            yellow.style.background = '#fbff45';
            yellowAudio.play();
            setTimeout(resetButtons, time);
            break;
        case 'blue':
            blue.style.background = '#4041ff';
            blueAudio.play();
            setTimeout(resetButtons, time);
            break;
    }
    return;
}

function resetButtons() {
    green.style.background = '#76b51c';
    red.style.background = '#ad2121';
    yellow.style.background = '#d1d51b';
    blue.style.background = '#2122ad';
    return;
}

function updateCounter(c) {
    if (c < 10) {
        return document.getElementById('count-number').textContent = '0' + c;
    } else {
        return document.getElementById('count-number').textContent = c;
    }
}

function getRandomButton() {
    let num = getRandomIntInclusive(0, 3);
    switch (num) {
        case 0:
            return 'green';
        case 1:
            return 'red';
        case 2:
            return 'yellow';
        case 3:
            return 'blue';
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
