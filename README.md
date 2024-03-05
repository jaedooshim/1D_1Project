# 1Day-1Project

## BackEnd - 심재두

## #프로젝트 소개
- 1D-1Project : 하루에 3~4개의 테이블로 구성하여 사이드 프로젝트를 진행
<br>
- 멤버/게시글/태그/댓글 로 구성되어 있으며 bcrypt,jwt 모듈을 만들어 OOP 형식으로 적용 및
<br>
멤버의 커스텀데코레이터, 가드를 만들어 적용
- 하나의 멤버는 여러개의 게시글을 작성할 수 있으며 게시글에 맞는 태그를 설정할 수 있다.
그리고 각 게시글에 해당하는 댓글을 작성할 수 있다.

## Rest API
| Content   | Method   | Path                                    |
|-----------|----------|-----------------------------------------|
| 멤버생성      | `POST`   | /members                                |
| 멤버수정      | `PUT`    | /members/:memberId                      |
| 멤버 비밀번호수정 | `PATCH`  | /members/:memberId/password             |
| 멤버조회      | `GET`    | /members/:memberId                      |
| 멤버 목록조회   | `GET`    | /members                                |
| 멤버삭제      | `DELETE` | /members/:memberId                      |
| 게시글 생성    | `POST`   | /publish                                |
| 게시글 수정    | `PUT`    | /publish/:publishId                     |
| 게시글 삭제    | `PUT`    | /publish/:publishId                     |
| 게시글 조회    | `GET`    | /publish/:publishId                     |
| 게시글 목록조회  | `GET`    | /publish                                |
| 태그생성      | `POST`   | /publish/tags                           |
| 태그수정      | `PATCH`  | /publish/tags/:tagId                    |
| 태그삭제      | `DELETE` | /publish/tags/:tagId                    |
| 태그조회      | `GET`    | /publish/tags/:tagId                    |
| 태그 목록조회   | `GET`    | /publish/tags                           |
| 댓글생성      | `POST`   | /publish/comments                       |
| 댓글수정      | `PATCH`  | /publish/:publishId/comments/:commentId |
| 댓글삭제      | `DELETE` | /publish/:publishId/comments/:commentId |
| 댓글조회      | `GET`    | /publish/:publishId/comments/:commentId |
| 댓글 목록조회   | `GET`    | /publish/comments                       |


### 사용기술

- TypeScript
- NestJs
- Prisma
- PostgreSQL
- Docker



### Server Use

```bash
npm run start:dev
```

### Install
```angular2html
npm i | npm install
```

### Docker PostgreServer Port
```angular2html
5432:5432
```