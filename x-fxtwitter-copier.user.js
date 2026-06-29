// ==UserScript==
// @name         X → FxTwitter Link Copier
// @namespace    https://github.com/Pyrite9/x-fxtwitter-copier
// @version      1.0.0
// @description  X "링크 복사" 시 x.com 주소를 fxtwitter.com으로 자동 변환
// @author       Pyrite9
// @match        https://x.com/*
// @match        https://twitter.com/*
// @run-at       document-start
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
  'use strict';

  // 트윗 permalink만 매칭. 호스트는 캡처 밖
  const TWEET = /^https?:\/\/(?:www\.)?(?:x|twitter)\.com(\/\w+\/status\/\d+)/i;

  // 호스트만 교체. 경로·쿼리 보존
  const toFx = (s) =>
    typeof s === 'string' ? s.replace(TWEET, 'https://fxtwitter.com$1') : s;

  // 복사될 선택 영역. X는 숨은 입력 요소 사용
  function selectedText() {
    const el = document.activeElement;
    if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) {
      return el.value.slice(el.selectionStart, el.selectionEnd);
    }
    return String(window.getSelection() ?? '');
  }

  // copy 가로채기 → 트윗 링크면 덮어쓰기
  document.addEventListener('copy', (e) => {
    const original = selectedText();
    const fixed = toFx(original);
    if (fixed === original) return; // 변환 없음 → 통과
    e.clipboardData.setData('text/plain', fixed);
    e.preventDefault();
  }, true);
})();
