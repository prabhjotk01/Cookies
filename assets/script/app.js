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
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=/; SameSite=Lax`;

    if (maxAge !== undefined) {
        cookieString += `; max-age=${maxAge}`;
    }

    document.cookie = cookieString;
}

function getCookie(name) {
    if (document.cookie) {
        const cookiePairs = document.cookie.split(';');
        for (let i = 0; i < cookiePairs.length; i++) {
            let trimmedCookie = cookiePairs[i].trim();
            if (decodeURIComponent(trimmedCookie.split('=')[0]) === name) {
                return decodeURIComponent(trimmedCookie.split('=')[1]);
            }
        }
    }
    return null;
}

function getBrowserName() {
    const ua = navigator.userAgent;

    if (ua.includes('Edg')) return 'Edge';
    if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
    if (ua.includes('Firefox')) return 'Firefox';
    return 'Unknown';
}

// ========== OS NAME (CLASS STYLE) ==========

function getOSName() {
    const ua = navigator.userAgent;

    if (ua.includes('Android')) return 'Android';
    if (ua.includes('iPhone')) return 'iOS';
    if (ua.includes('Win')) return 'Windows';
    if (ua.includes('Mac')) return 'MacOS';
    

    return 'UnKnown';
}

function getScreenSize() {
    return `${screen.width}x${screen.height}`;
}



function showBox(box) {
    overlay.classList.add('open');
    box.classList.add('open');
}

function hideBox(){
    overlay.classList.remove('open');
    box1.classList.remove('open');
    box2.classList.remove('open');
}

acceptBtn.addEventListener('click', function() {
    setCookie('consent', 'all', LIFETIME);
    setCookie('browser', getBrowserName(), LIFETIME);
    setCookie('os', getOSName(), LIFETIME);
    setCookie('screen', getScreenSize(), LIFETIME);
    hideBox();
});

settingsBtn.addEventListener('click', function() {
    hideBox();
    showBox(box2);
});

saveBtn.addEventListener('click', function() {
    setCookie('consent', 'selected', LIFETIME);

    if (chkBrowser.checked) setCookie('browser', getBrowserName(), LIFETIME);
    if (chkOS.checked) setCookie('os', getOSName(), LIFETIME);
    if (chkScreen.checked) setCookie('screen', getScreenSize(), LIFETIME);

    hideBox();
});

rejectBtn.addEventListener('click', function() {
    setCookie('consent', 'rejected', LIFETIME);
    hideBox();
});


if (getCookie('consent') === null) {
    setTimeout(function() {
        showModal(box1);
    }, 1500);
}
