/*jshint esversion: 6 */
// ========= ver. 0.0  ===========
// jshint ignore:line
"use strict";
let turnedOn = false;
let strictMode = false;
let strict = document.getElementById('strict');
let switchButton = document.getElementsByClassName('switch');

// wybierajac element po nazwie klasy otrzymujemy tablice elementow dlatego 'switchButton[0]'
switchButton[0].addEventListener('click', function() {
    if (!turnedOn) {
        turnedOn = true;
        this.style.left = '68px';
        document.getElementById('count-number').style.color = '#ff0000';
    } else {
        turnedOn = false;
        this.style.left = '90px';
        document.getElementById('count-number').style.color = '#990000';

    }
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
