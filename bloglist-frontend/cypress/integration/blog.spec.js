describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.visit('http://localhost:3000')

    })

    it('login form is shown', function() {
        cy.get('form')
    })


    describe('Login', function(){
        it('succeeds with correct credentials', function() {
            const user = {name:'user', password:'1234', username:'testusereeeeee'}
            cy.request('POST', 'http://localhost:3000/api/users', user)
                .get('#username').type('testusereeeeee')
                .get('#password').type('1234')
                .get('#login-button').click()
                .get('#welcome').contains('Welcome user !')
        })


        it('fails with wrong credentials', function() {
            cy.get('#login-button')
                .click()
                .get('#username').type('wrong user')
                .get('#password').type('1234')
                .get('#login-button').click()
                .get('#notification')
                    .should('contain', 'user not found')
                    .should('have.css', 'color','rgb(255, 0, 0)')

            cy.get('html').should('not.contain', 'Welcome user !')
        })


        
    })




})
