import users from '../fixtures/users/users.json'
import blogs from '../fixtures/blogs/blogs.json'

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, users.first)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.get('#login-form')
    cy.contains('login')
  })

  describe('Login', function() {
    it('user can log in', function() {
      cy.get('#username').type(users.first.username)
      cy.get('#password').type(users.first.password)
      cy.get('#login-button').click()
      cy.contains(`${users.first.name} logged in`)
    })

    it('login fails with wrong password', function() {
      cy.get('#username').type(users.first.username)
      cy.get('#password').type('notarealpassword')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password')
      cy.get('html').should('not.contain', `${users.first.name} logged in`)
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({
        username: users.first.username,
        password: users.first.password})
    })

    it('a new blog can be added', function() {
      cy.contains('add a new blog').click()
      cy.get("#new-title").type(blogs.first.title)
      cy.get("#new-author").type(blogs.first.author)
      cy.get("#new-url").type(blogs.first.url)
      cy.get("#newblog-create-btn").click()
      cy.get("#blogslist")
        .contains(blogs.first.title)
    })

    describe('and several blogs exists', function() {
      beforeEach(function() {
        cy.addBlog(blogs.first)
        cy.addBlog(blogs.second)
        cy.addBlog(blogs.third)
      })

      it('a blog can be liked', function() {
        cy.get('.blog').eq(0).contains('show').click()
        cy.get('.like-btn').eq(0).click()
        cy.get('.blog').eq(0).should('contain', 'likes: 1')
      })

      it('a blog can be removed', function() {
        cy.get('.blog').eq(0).contains('show').click()
        cy.get('.remove-btn').eq(0).click()
        cy.get('html').should('not.contain', blogs.first.title)        
      })

      it('blog remove button is not visible for user that did not add the blog', function() {
        cy.get('#logout-btn').click()
        cy.request('POST', `${Cypress.env('BACKEND')}/users/`, users.second)
        cy.login({
          username: users.second.username,
          password: users.second.password
        })
        cy.get('.blog').eq(0).contains('show').click()
        cy.get('.remove-btn').eq(0).should('have.css', 'display', 'none')
      })

      it('blogs are initially ordered by most likes first', function() {
        // open full info for each blog so that each like-button is clickable
        cy.get('.blog').eq(0).contains('show').click()
        cy.get('.blog').eq(1).contains('show').click()
        cy.get('.blog').eq(2).contains('show').click()
        // click like-button for the third blog
        cy.get('.like-btn').eq(2).click()
        // third blog is displayed first with one like
        cy.get('.blog').eq(0).should('contain', blogs.third.title)
        // click like-button for the second blog
        cy.get('.like-btn').eq(2).click()
        // second blog is displayed second with one like
        cy.get('.blog').eq(1).should('contain', blogs.second.title)
        // click like-button for the second blog
        cy.get('.like-btn').eq(1).click()
        // second blog is displayed first with two likes
        cy.get('.blog').eq(0).should('contain', blogs.second.title)
        // first blog is displayed last with no likes
        cy.get('.blog').eq(2).should('contain', blogs.first.title)
      })

    })
  })
})