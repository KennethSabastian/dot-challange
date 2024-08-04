import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Post } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { before } from 'node:test';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../src/user/entities/user.entity';
import { DataSource } from 'typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  
  afterAll(async ()=>{
    const dataSource = app.get(DataSource);
    await dataSource.createQueryBuilder().delete().from(User).execute();
    
  })

  const user = {
    "username": "Kenneth Sabastian",
    "password": "nomor123",
    "name": "Kenneth Sabastian"
  }
  let token:string = "";
  describe("Auth", ()=>{
    it('(POST) Auth - Register', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(user)
        .expect(201)
        .then( (res) =>{
          expect(res.body.username).toEqual(user.username);
          expect(res.body.name).toEqual(user.name);
        });
    });
    it('(POST) Auth - Login', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({"username":user.username,"password":user.password})
        .expect(201)
        .then( (res) =>{
          expect(res.text).toBeDefined()
          token = res.text
        });
    });
  })
  describe("User", ()=>{
    it('(GET) User - Get User Profile', () => {
      return request(app.getHttpServer())
        .get('/user/profile')
        .set("Authorization","Bearer "+token)
        .expect(200)
        .then( (res) =>{
          expect(res.body.username).toEqual(user.username);
          expect(res.body.name).toEqual(user.name);
        });
    });
    it('(PUT) User - Update User Profile', () => {
      return request(app.getHttpServer())
        .put('/user/update')
        .set("Authorization","Bearer "+token)
        .send({"username": user.name+"123"})
        .expect(200)
        .then( (res) =>{
          expect(res.body.username).toEqual(user.username+"123");
          expect(res.body.name).toEqual(user.name);
        });
    });
  })

  const post = {
    "title": "Ayam Goreng",
    "message": "Ayam Goreng Enak Sekali",
  }
  let post_id = 1;
  describe("Post", () =>{
    it('(Post) Post - Create New Post', () => {
      return request(app.getHttpServer())
        .post('/post/create')
        .send(post)
        .set("Authorization","Bearer "+token)
        .expect(201)
        .then( (res) =>{
          expect(res.body.title).toEqual(post.title);
          expect(res.body.message).toEqual(post.message);
          post_id = res.body.id;
        });
    });
    it('(Get) Post - Get Post By User ID', () => {
      return request(app.getHttpServer())
        .get('/post/post')
        .set("Authorization","Bearer "+token)
        .expect(200)
        .then( (res) =>{
          expect(res.body[0].title).toEqual(post.title);
          expect(res.body[0].message).toEqual(post.message);
          expect(res.body[0].user.username).toEqual(user.username+"123");
          expect(res.body[0].user.name).toEqual(user.name);
        });
    });
    it('(Put) Post - Update Post By Post ID', () => {
      return request(app.getHttpServer())
        .put('/post/update')
        .set("Authorization","Bearer "+token)
        .send({"id":post_id,"title":post.title+"123"})
        .expect(200)
        .then( (res) =>{
          expect(res.body.title).toEqual(post.title+"123");
          expect(res.body.message).toEqual(post.message);
        });
    });
    it('(Delete) Post - Delete Post By Post Id', () => {
      return request(app.getHttpServer())
        .delete('/post/delete')
        .set("Authorization","Bearer "+token)
        .expect(200)
    });
  })

  it('(Delete) User - Delete User Profile', () => {
    return request(app.getHttpServer())
      .delete('/user/delete')
      .set("Authorization","Bearer "+token)
      .expect(200)
  });
})
