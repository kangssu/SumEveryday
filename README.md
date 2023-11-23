# [개인프로젝트] SumEveryday - 썸에브리데이 💵💸
> 사실 종이 가계부로 사용하다가 7월달이 마지막 장인 걸 알게 되었고, 또 새롭게 살바에는 내가 만들어서 쓰겠다!라는 생각으로 진행하게 되었습니다.
> 혹시나 제가 원하는 심플한 가계부 구성을 누군가가 원할수도 있지 않을까하는 생각도 하면서 즐겁게 만들었습니다.

</br>

## 목차
#### [1. 개요](#개요)
##### [1-1. 썸 에브리데이 뜻은?](썸-에브리데이-뜻은?)
##### [&nbsp;&nbsp;1-2. 실행 환경](#실행-환경)
##### [&nbsp;&nbsp;1-3. 기술 스택](#기술-스택)
#### [2. ERD 및 디렉토리 구조](#ERD-및-디렉토리-구조)
##### &nbsp;&nbsp;2-1. ERD
##### &nbsp;&nbsp;2-2. server 디렉토리 구조
##### &nbsp;&nbsp;2-2. client 디렉토리 구조
#### [3. 기능구현](#기능구현)
#### [4. API 명세](#API-명세)
#### [5. 트러블 슈팅](#트러블-슈팅)
#### [6. 고민의 흔적](#고민의-흔적)

</br>

## 개요
* 아날로그 종이로 쓰는 가계부 써볼까? **"아니..공간만 차지하네.."**
* 아이패드로 다른 사람들처럼 글씨 쓰면서 꾸며볼까? **"아니.. 내 손재주가 따라와 주질 않아.."**
* 앱으로 쓰는 가계부 써볼까? **"아니..화면이 너무 작아서 답답해.."**
* 종이로 차지하는 공간 걱정, 꾸미기 걱정, 작은 화면 걱정! 이제 그만해! 썸에브리데이가 해결해줄께!
* **수입, 지출 비용만 매일 기록해! 썸에브리데이가 전부 계산해줄 테니까!** 💘

### 썸 에브리데이 뜻은?
* 가계부를 쓸 때 더하기&빼기를 많이 쓰지 않나요?
* 가계부에서 더하기&빼기를 많이 쓰지만 매일매일 더하기 쓰는 일이 많으면 좋지 않나요?
* **좋아하는 사람과의 썸이 아닌, Sum: 더하다 & Everyday: 매일을 합쳐서 썸에브리데이라고 지었습니다.**

### 실행 환경
* .env 파일
```
PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=

JWT_SECRET_KEY=
```

* server 실행
```
npm run start
```

* client 실행
```
npm run start
```

</br>

### 기술 스택
### Backend
<img src="https://img.shields.io/badge/TypeScript-version 5-3178C6">&nbsp;
<img src="https://img.shields.io/badge/Nest.js-version 10-E0234E">&nbsp;
<img src="https://img.shields.io/badge/TypeORM-version 0.3-fcad03">&nbsp;
<img src="https://img.shields.io/badge/MySQL-version 8-00758F">&nbsp;

### Frontend
<img src="https://img.shields.io/badge/TypeScript-version 5-3178C6">&nbsp;
<img src="https://img.shields.io/badge/React-version 18-3178C6">&nbsp;
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 

<br>

## ERD 및 디렉토리 구조
<details>
<summary><strong>ERD</strong></summary>
<div markdown="1">
 
<img src="https://github.com/kangssu/Curiosity-solved/assets/83870420/8132bfbf-42b6-437d-9a4a-f7a04d38e596">
</div>
</details>

<details>
<summary><strong>server 디렉토리 구조</strong></summary>
<div markdown="1">
 
```bash
src
 ┣ decorator
 ┃ ┗ userDecorator.ts
 ┣ entity
 ┃ ┣ accountBook.entity.ts
 ┃ ┗ user.entity.ts
 ┣ enum
 ┃ ┣ accountBook.enum.ts
 ┃ ┗ errorCode.enum.ts
 ┣ error
 ┃ ┣ apiResult.ts
 ┃ ┗ customException.ts
 ┣ feature
 ┃ ┣ accountBook
 ┃ ┃ ┣ accountBook.app.module.ts
 ┃ ┃ ┣ accountBook.controller.ts
 ┃ ┃ ┣ accountBook.lib.ts
 ┃ ┃ ┗ accountBook.service.ts
 ┃ ┣ admin
 ┃ ┃ ┣ admin.app.module.ts
 ┃ ┃ ┣ admin.controller.ts
 ┃ ┃ ┣ admin.dto.ts
 ┃ ┃ ┗ admin.service.ts
 ┃ ┣ auth
 ┃ ┃ ┣ guard
 ┃ ┃ ┃ ┗ jwt.guard.ts
 ┃ ┃ ┣ strategy
 ┃ ┃ ┃ ┗ jwt.strategy.ts
 ┃ ┃ ┣ auth.app.module.ts
 ┃ ┃ ┣ auth.controller.ts
 ┃ ┃ ┗ auth.service.ts
 ┃ ┣ search
 ┃ ┃ ┣ search.app.module.ts
 ┃ ┃ ┣ search.controller.ts
 ┃ ┃ ┣ search.dto.ts
 ┃ ┃ ┗ search.service.ts
 ┃ ┗ user
 ┃ ┃ ┣ user.app.module.ts
 ┃ ┃ ┣ user.controller.ts
 ┃ ┃ ┣ user.dto.ts
 ┃ ┃ ┗ user.service.ts
 ┣ util
 ┃ ┗ util.ts
 ┣ app.controller.spec.ts
 ┣ app.controller.ts
 ┣ app.module.ts
 ┣ app.service.ts
 ┗ main.ts
```
</div>
</details>

<details>
<summary><strong>client 디렉토리 구조</strong></summary>
<div markdown="1">
 
```bash
src
 ┣ components
 ┃ ┣ admin
 ┃ ┃ ┣ modal
 ┃ ┃ ┃ ┣ accountBookDelete.css
 ┃ ┃ ┃ ┣ accountBookDelete.tsx
 ┃ ┃ ┃ ┣ accountBookModify.css
 ┃ ┃ ┃ ┗ accountBookModify.tsx
 ┃ ┃ ┗ dateSearchForm.tsx
 ┃ ┣ errorMessage
 ┃ ┃ ┣ accountBookConbineErrorMessage.tsx
 ┃ ┃ ┣ adminDateConbineErrorMessage.tsx
 ┃ ┃ ┗ dateConbineErrorMessage.tsx
 ┃ ┗ layout
 ┃ ┃ ┣ footer.css
 ┃ ┃ ┣ footer.tsx
 ┃ ┃ ┣ header.css
 ┃ ┃ ┣ header.tsx
 ┃ ┃ ┣ layout.css
 ┃ ┃ ┗ layout.tsx
 ┣ enum
 ┃ ┣ accountBook.enum.tsx
 ┃ ┗ errorCode.enum.tsx
 ┣ object
 ┃ ┣ accountBookObject.tsx
 ┃ ┗ adminObject.tsx
 ┣ page
 ┃ ┣ accountBook
 ┃ ┃ ┣ accountBook.css
 ┃ ┃ ┗ accountBook.tsx
 ┃ ┣ admin
 ┃ ┃ ┣ admin.css
 ┃ ┃ ┗ admin.tsx
 ┃ ┗ join
 ┃ ┃ ┣ join.css
 ┃ ┃ ┗ join.tsx
 ┣ App.css
 ┣ App.tsx
 ┣ index.css
 ┣ index.tsx
 ┗ setupProxy.js
```
</div>
</details>

</br>

## 기능구현
* 회원가입
  * 모든 항목 유효성 검사 및 패스워드 BCrypt 암호화 처리 기능 구현
  * 중복 아이디 또는 닉네임 등록 방지 기능 구현

* 로그인
  * 로그인시 토큰 발생하여 토큰이 존재하는 경우에만 CRUD 가능하도록 기능 구현
  * 아이디, 패스워드 확인 로직 기능 구현

* 현재 월 가계부 페이지 <code>회원 전용</code>
  * 현재 월에 대한 가계부를 주차로 구분하여 확인할 수 있는 페이지
  * 각 주차마다 총 지출, 총 수입이 자동으로 계산되어서 확인할 수 있는 기능 구현
  * 현재 월에 대한 총 지출, 총 수입, 잔액까지 확인할 수 있는 기능 구현
  * 자신이 등록한 이전 가계부의 년도와 월로 검색할 수 있는 기능 구현
  * 만약, 현재 월에 데이터가 없거나 각 주에 데이터가 없을 경우에 특정 문구 또는 아이콘 노출

* 가계부 관리 <code>회원 전용</code>
  * 월, 일, 카테고리(수입/지출), 가격, 내용을 입력하여 신규 등록 기능 구현
  * 단, 년도는 현재 년도가 자동으로 들어가며 모든 항목 유효성 검사 기능 구현
  * 기존에 등록한 모든 가계부 내역을 확인할 수 있는 기능 구현
  * 자신이 등록한 이전 가계부의 년도와 월로 검색할 수 있는 기능 구현
  * 자신이 등록한 이전 가계부에서 하나의 내역에 대해 수정 또는 삭제 기능 구현

</br>

## API 명세
|No| Title           | Method  | Path                       | Authorization |
|---|-----------------|:-------:|----------------------------|:-------------:|
|1|회원가입|`POST`|`/api/users/sign-up`|X|
|2|로그인|`POST`|`/api/auth/sign-in`|X|
|3|유저 조회|`GET`|`/api/users`|O|
|4|이번달 조회|`GET`|`/api/accountBooks/currentMonth`|O|
|5|가계부 내역 생성|`POST`|`/api/accountBooks`|O|
|6|가계부 내역 수정|`PATCH`|`/api/accountBooks/:id`|O|
|7|가계부 내역 삭제|`DELETE`|`/api/accountBooks/:id`|O|
|8|전체 가계부 내역 조회|`GET`|`/api/accountBooks`|O|
|9|가계부 검색(월 페이지)|`POST`|`/api/accountBooks/search`|O|
|10|가계부 검색(어드민 페이지)|`POST`|`/api/accountBooks/admin/search`|O|

</br>

[🌟🌟🌟 API 명세 상세보기 🌟🌟🌟](https://github.com/kangssu/SumEveryday/blob/main/docs/api.md)

</br>

## 트러블 슈팅
[⚡ Unexpected end of JSON input 오류 해결](https://dego.tistory.com/20)

</br>

## 고민의 흔적
[📝 React + NestJS 연동하는 방법(with. TypeScript)](https://dego.tistory.com/16) </br>
[📝 TypeScript에서 http-proxy-middleware 사용법](https://dego.tistory.com/17) </br>
[📝 react-hook-form 적용해보자!(with. TypeScript)](https://dego.tistory.com/19) </br>
[📝 choco 설치와 mkcert 설치 후 React 적용(with. React + TypeScript)](https://dego.tistory.com/21) </br>
[📝 로그인 시 JWT Token 발급 및 인증(Token sessionStorage 저장)](https://dego.tistory.com/22) </br>
[📝 변수명과 함수명에 대한 고민(아직도 ing...)](https://dego.tistory.com/23) </br>

