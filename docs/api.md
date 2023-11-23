## API 명세
### 1. 회원가입
* **URL**
```
POST /api/users/sign-up
```

* **Request Body**

|No| Name           | Type  | Description                       
|---|-----------------|:-------:|----------------------------
|1|id|`string`|`사용자 아이디`
|2|password|`string`|`사용자 비밀번호`
|3|nickname|`string`|`사용자 닉네임`

* **Success Response**
```
{
    // 따로 리턴값 X
}
```

* **Fail Response**
```
// 중복 아이디 또는 닉네임이 존재하는 경우
{
    "idErrorMessage": "아이디가 중복되었습니다.",
    "nicknameErrorMessage": "닉네임이 중복되었습니다."
}
```
</br>

### 2. 로그인
* **URL**
```
POST /api/auth/sign-in
```

* **Request Body**

|No| Name           | Type  | Description                       
|---|-----------------|:-------:|----------------------------
|1|id|`string`|`사용자 아이디`
|2|password|`string`|`사용자 비밀번호`

* **Success Response**
```
{
    "accessToken": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImtheXl5MjAyMyIsImlhdCI6MTcwMDc0MjU3NywiZXhwIjoxNzAwOTE1Mzc3fQ.vu7UI73Dnbk1FokxPWf-DBwyTl42k3VdZRIjT17YdmQQeslAHaYboDqotEZF0RHIgb7LTek4GllVJ04qELE47w",
    "user": {
        "no": 8,
        "id": "kayyy2023",
        "password": "$2b$10$.KKotcmEW2aequywl9Jx1OeDaFSABtcTkzNnf0Wq3Ru8ayJijeRAm",
        "nickname": "저축이",
        "joinedAt": null,
        "createdAt": "2023-11-23T11:59:31.000Z"
    },
    "userErrorMessageObject": {}
}
```

* **Fail Response**
```
// 아이디가 존재하지 않을 경우
{
    "userErrorMessageObject": {
        "idErrorMessage": "아이디가 존재하지 않습니다."
    }
}

// 패스워드가 일치하지 않을 경우
{
    "userErrorMessageObject": {
        "passwordErrorMessage": "비밀번호가 일치하지 않습니다."
    }
}
```
</br>

### 3. 유저 조회
* **URL**
```
GET /api/users
```

* **Success Response**
```
{
    "no": 8,
    "id": "kayyy2023",
    "password": "$2b$10$.KKotcmEW2aequywl9Jx1OeDaFSABtcTkzNnf0Wq3Ru8ayJijeRAm",
    "nickname": "저축이",
    "joinedAt": null,
    "createdAt": "2023-11-23T11:59:31.000Z"
}
```

</br>

### 4. 이번달 조회
* **URL**
```
GET /api/accountBooks/currentMonth
```

* **Success Response**
```
{
    "currentMonth": 11,
    "firstWeek": [],
    "secondWeek": [],
    "thirdWeek": [],
    "fourthWeek": [
        {
            "no": 142,
            "userId": "kayyy2023",
            "week": "4th",
            "category": "수입",
            "date": {
                "day": 23,
                "year": 2023,
                "month": 11
            },
            "content": "푸라닭 치킨",
            "pay": "16000",
            "createdAt": "2023-11-23T12:08:05.000Z",
            "deletedAt": null
        }
    ],
    "fifthWeek": [],
    "incomeTotal": "16000",
    "expenceTotal": "0",
    "balance": "16000"
}
```

</br>

### 5. 가계부 내역 생성
* **URL**
```
POST /api/accountBooks
```

* **Request Body**

|No| Name           | Type  | Description                       
|---|-----------------|:-------:|----------------------------
|1|category|`CategoryEnum(수입,지출)`|`수입,지출 카테고리`
|2|date|`AccountBookDateEnum(year,month,day)`|`수입,지출 날짜`
|3|content|`string`|`수입,지출 내용`
|4|pay|`string`|`수입,지출 금액`

* **Success Response**
```
{
    "success": true,
    "data": {
        "userId": "kayyy2023",
        "week": "4th",
        "category": "지출",
        "date": {
            "month": 11,
            "day": 23,
            "year": 2023
        },
        "content": "립밥",
        "pay": "10000",
        "deletedAt": null,
        "no": 145,
        "createdAt": "2023-11-23T12:32:49.000Z"
    }
}
```

</br>

### 6. 가계부 내역 수정
* **URL**
```
PATCH /api/accountBooks/:id
```

* **Request Body**

|No| Name           | Type  | Description                       
|---|-----------------|:-------:|----------------------------
|1|category|`CategoryEnum(수입,지출)`|`수입,지출 카테고리`
|2|date|`AccountBookDateEnum(year,month,day)`|`수입,지출 날짜`
|3|content|`string`|`수입,지출 내용`
|4|pay|`string`|`수입,지출 금액`

* **Success Response**
```
{
    "no": 144,
    "userId": "kayyy2023",
    "week": "4th",
    "category": "지출",
    "date": {
        "day": 23,
        "year": 2023,
        "month": 11
    },
    "content": "립밥",
    "pay": "18000",
    "createdAt": "2023-11-23T12:32:35.000Z",
    "deletedAt": null
}
```

* **Fail Response**
```
// 가계부 내역이 존재하지 않을 경우
{
    "statusCode": 404,
    "message": "해당 가계부 내역은 존재하지 않습니다."
}
```

</br>

### 7. 가계부 내역 삭제
* **URL**
```
DELETE /api/accountBooks/:id
```

* **Success Response**
```
{
    "success": true,
    "data": {
        "no": 144,
        "deletedAt": "2023-11-23T12:36:38.000Z"
    }
}
```

* **Fail Response**
```
// 가계부 내역이 존재하지 않을 경우
{
    "statusCode": 404,
    "message": "해당 가계부 내역은 존재하지 않습니다."
}
```

</br>

### 8. 전체 가계부 내역 조회
* **URL**
```
GET /api/accountBooks
```

* **Success Response**
```
{
    "years": [
        2023
    ],
    "months": [
        11
    ],
    "accountBooks": [
        {
            "no": 142,
            "userId": "kayyy2023",
            "week": "4th",
            "category": "수입",
            "date": {
                "day": 23,
                "year": 2023,
                "month": 11
            },
            "content": "푸라닭 치킨",
            "pay": "16000",
            "createdAt": "2023-11-23T12:08:05.000Z",
            "deletedAt": null
        },
        {
            "no": 145,
            "userId": "kayyy2023",
            "week": "4th",
            "category": "지출",
            "date": {
                "day": 23,
                "year": 2023,
                "month": 11
            },
            "content": "립밥",
            "pay": "10000",
            "createdAt": "2023-11-23T12:32:49.000Z",
            "deletedAt": null
        }
    ]
}
```

</br>

### 9. 가계부 검색(월 페이지)
* **URL**
```
POST /api/accountBooks/search
```

* **Request Body**

|No| Name           | Type  | Description                       
|---|-----------------|:-------:|----------------------------
|1|month|`number`|`월`
|2|day|`number`|`일`

* **Success Response**
```
{
    "currentMonth": 11,
    "firstWeek": [],
    "secondWeek": [],
    "thirdWeek": [],
    "fourthWeek": [
        {
            "no": 142,
            "userId": "kayyy2023",
            "week": "4th",
            "category": "수입",
            "date": {
                "day": 23,
                "year": 2023,
                "month": 11
            },
            "content": "푸라닭 치킨",
            "pay": "16000",
            "createdAt": "2023-11-23T12:08:05.000Z",
            "deletedAt": null
        },
        {
            "no": 145,
            "userId": "kayyy2023",
            "week": "4th",
            "category": "지출",
            "date": {
                "day": 23,
                "year": 2023,
                "month": 11
            },
            "content": "립밥",
            "pay": "10000",
            "createdAt": "2023-11-23T12:32:49.000Z",
            "deletedAt": null
        }
    ],
    "fifthWeek": [],
    "incomeTotal": "16000",
    "expenceTotal": "10000",
    "balance": "6000"
}
```

</br>

### 10. 가계부 검색(어드민 페이지)
* **URL**
```
POST /api/accountBooks/admin/search
```

* **Request Body**

|No| Name           | Type  | Description                       
|---|-----------------|:-------:|----------------------------
|1|month|`number`|`월`
|2|day|`number`|`일`

* **Success Response**
```
[
    {
        "no": 142,
        "userId": "kayyy2023",
        "week": "4th",
        "category": "수입",
        "date": {
            "day": 23,
            "year": 2023,
            "month": 11
        },
        "content": "푸라닭 치킨",
        "pay": "16000",
        "createdAt": "2023-11-23T12:08:05.000Z",
        "deletedAt": null
    },
    {
        "no": 145,
        "userId": "kayyy2023",
        "week": "4th",
        "category": "지출",
        "date": {
            "day": 23,
            "year": 2023,
            "month": 11
        },
        "content": "립밥",
        "pay": "10000",
        "createdAt": "2023-11-23T12:32:49.000Z",
        "deletedAt": null
    }
]
```

</br>