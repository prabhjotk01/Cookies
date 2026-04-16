'use strict';

const box1 = document.getElementById('box1');
const box2 = document.getElementById('box2');
const overlay = document.getElementById('overlay');

const acceptBtn = document.getElementById('acceptBtn');
const settingsBtn = document.getElementById('settingsBtn');
const saveBtn = document.getElementById('saveBtn');
const rejectBtn = document.getElementById('rejectBtn');

const chkBrowser = document.getElementById('chkBrowser');
const chkOS= document.getElementById('chkOS');
const chkScreen = document.getElementById('chkScreen');

const LIFETIME = 15;

function setCookie(name, value, maxAge) {
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)};
    path=/; 
    SameSite=Lax`;
    if (maxAge) {
        cookieString += `; max-age=${maxAge}`;
    }
    document.cookie = cookieString;
}
