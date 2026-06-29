# x-fxtwitter-copier

X(트위터)에서 **"링크 복사"**를 누르면, `x.com` 주소를 자동으로 `fxtwitter.com` 주소로 바꿔서 클립보드에 넣어주는 유저스크립트.

## 왜 필요한가

`x.com` 링크를 디스코드나 텔레그램에 그냥 붙이면 임베드가 자주 깨진다. 영상이 재생되지 않거나, 다중 이미지가 한 장만 보이거나, 인용 트윗이 빠진다. [FxTwitter](https://github.com/FxEmbed/FxEmbed)는 같은 트윗을 받아 영상·다중 이미지·폴 결과·번역까지 제대로 임베드해주는 서비스다. 도메인만 `fxtwitter.com`으로 바꾸면 끝나지만, 매번 손으로 고치는 건 번거롭다. 이 스크립트는 그 한 단계를 복사 시점에 자동으로 처리한다.

```
복사한 원본 : https://x.com/jack/status/20
클립보드 결과 : https://fxtwitter.com/jack/status/20
```

트윗 permalink(`/status/` 링크)일 때만 변환한다. 프로필이나 검색 결과 링크를 복사하면 원본 그대로 둔다.

## 설치

### 1. Tampermonkey 설치

[Tampermonkey](https://www.tampermonkey.net/)를 브라우저에 설치한다. (Chrome / Edge / Firefox 등 지원)

### 2. 사용자 스크립트 허용 (Chrome 계열만)

Tampermonkey 5.3 이상을 Chrome 계열 브라우저에서 쓰면, 별도로 **"사용자 스크립트 허용(Allow User Scripts)"** 토글 또는 개발자 모드를 켜야 스크립트가 실행된다. 이 단계를 빠뜨리면 스크립트가 설치돼 있어도 아무 동작도 하지 않는다.

설정 방법: [Tampermonkey FAQ Q209](https://www.tampermonkey.net/faq.php?q=Q209)

Firefox는 이 단계가 필요 없다.

### 3. 스크립트 설치

아래 링크를 클릭하면 Tampermonkey 설치 화면이 뜬다.

➡️ **[x-fxtwitter-copier.user.js 설치](https://raw.githubusercontent.com/Pyrite9/x-fxtwitter-copier/main/x-fxtwitter-copier.user.js)**

> 설치 후 x.com을 새로고침하면 적용된다.

## 사용법

트윗에서 평소처럼 **공유 → 링크 복사**를 누르고 원하는 곳에 붙여넣으면 된다. 별도 버튼이나 단축키는 없다.

## 동작 방식

X의 "링크 복사"는 최신 클립보드 API(`navigator.clipboard.writeText`)가 아니라, 숨은 입력 요소에 URL을 넣고 선택한 뒤 `execCommand('copy')`를 호출하는 구식 방식을 쓴다. 그래서 이 스크립트는 `copy` 이벤트를 가로채, 선택된 텍스트를 읽고 → 트윗 링크면 도메인을 바꾸고 → `setData`로 클립보드 내용을 덮어쓴 뒤 → `preventDefault`로 원래 복사를 막는다.

## 알려진 제한

**Linux (X11) 가운데클릭 붙여넣기는 변환되지 않는다.** Linux에는 클립보드가 둘 있다. `Ctrl+C`로 들어가는 CLIPBOARD와, 텍스트를 선택만 해도 채워지는 PRIMARY(가운데클릭 붙여넣기용)다. 이 스크립트는 CLIPBOARD만 덮어쓰므로, `Ctrl+V`로 붙여넣으면 변환된 주소가 나오지만 가운데클릭으로 붙여넣으면 원본 `x.com`이 나올 수 있다. Windows·macOS에는 PRIMARY 개념이 없어 이 문제가 없다.

## 라이선스

MIT
